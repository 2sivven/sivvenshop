import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

interface Message {
  id: string | number;
  conversation_id: string;
  sender: "client" | "admin" | "support";
  message: string;
  created_at: string;
}

export default function Support() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [startingChat, setStartingChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load existing session on mount
  useEffect(() => {
    const savedId = localStorage.getItem("support_conversation");
    const savedName = localStorage.getItem("support_client_name") || "Клиент";
    if (savedId) {
      setConversationId(savedId);
      setClientName(savedName);
      fetchMessages(savedId);
    }
  }, []);

  // Fetch past messages
  const fetchMessages = async (id: string) => {
    if (!id || id === "undefined" || id === "null") {
      localStorage.removeItem("support_conversation");
      setConversationId(null);
      return;
    }

    setLoadingHistory(true);

    // Safety timeout to turn off spinner after 5 seconds if connection is dead
    const safetyTimeout = setTimeout(() => {
      setLoadingHistory(false);
      console.warn("fetchMessages load timed out, disabling spinner.");
    }, 5000);

    try {
      const { data, error } = await supabase
        .from("support_messages")
        .select("*")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true });

      clearTimeout(safetyTimeout);

      if (error) {
        // If it's a UUID syntax error or invalid format, clear stale session
        const errMsg = error.message || "";
        if (
          errMsg.includes("invalid input syntax") ||
          errMsg.includes("uuid") ||
          errMsg.includes("not found")
        ) {
          localStorage.removeItem("support_conversation");
          setConversationId(null);
          return;
        }
        throw error;
      }

      if (data) {
        setMessages(data);
      }
    } catch (err: any) {
      console.error("Error fetching message history:", err);
      // Fallback: if there's any database schema/type error, reset conversation so user is not stuck
      const errorStr = String(err?.message || err);
      if (
        errorStr.includes("uuid") ||
        errorStr.includes("syntax") ||
        errorStr.includes("support_messages")
      ) {
        localStorage.removeItem("support_conversation");
        setConversationId(null);
      }
    } finally {
      setLoadingHistory(false);
    }
  };

  // Setup real-time listener when conversation is active
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`support_messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "support_messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // Handle scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingHistory]);

  // Start new conversation
  const handleStartChat = async () => {
    if (!name.trim()) {
      alert("Пожалуйста, введите ваше имя");
      return;
    }

    setStartingChat(true);
    try {
      const { data: conversation, error: conversationError } = await supabase
        .from("support_conversations")
        .insert([
          {
            client_name: name.trim(),
          },
        ])
        .select()
        .single();

      if (conversationError) throw conversationError;

      const newId = conversation.id.toString();
      localStorage.setItem("support_conversation", newId);
      localStorage.setItem("support_client_name", name.trim());

      setConversationId(newId);
      setClientName(name.trim());
    } catch (err) {
      console.error("Error creating support conversation:", err);
      alert("Не удалось начать диалог. Попробуйте еще раз.");
    } finally {
      setStartingChat(false);
    }
  };

  // Send message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageText.trim() || !conversationId) return;

    const isFirstMessage = messages.length === 0;
    const currentText = messageText.trim();
    setMessageText("");
    setSending(true);

    try {
      // 1. Write to Supabase
      const { data: newMsg, error: messageError } = await supabase
        .from("support_messages")
        .insert([
          {
            conversation_id: conversationId,
            sender: "client",
            message: currentText,
          },
        ])
        .select()
        .single();

      if (messageError) throw messageError;

      if (newMsg) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
      }

      // 2. Notify Telegram
      try {
        const prevId = localStorage.getItem("last_completed_conversation");
        let prefix = "";

        if (prevId && isFirstMessage) {
          prefix = `📨 Предыдущий диалог под номером ${prevId}  ( то есть, (ID: ${prevId}) ).\n`;
          localStorage.removeItem("last_completed_conversation");
        }

        await fetch("/api/sendTelegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text:
              prefix +
              `📨 Сообщение в чате поддержки (ID: ${conversationId})\n\n` +
              `👤 Клиент: ${clientName}\n` +
              `💬 Текст: ${currentText}`,
          }),
        });
      } catch (telegramErr) {
        console.warn("Telegram notification fell back, message saved in DB.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Не удалось отправить сообщение. Проверьте интернет соединение.");
    } finally {
      setSending(false);
    }
  };

  // Clear session to start over
  const handleClearSession = () => {
    if (conversationId) {
      localStorage.setItem("last_completed_conversation", conversationId);
    }
    localStorage.removeItem("support_conversation");
    localStorage.removeItem("support_client_name");
    setConversationId(null);
    setClientName("");
    setMessages([]);
    navigate("/product");
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/dead-grass.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "36px",
        border: "1px solid rgba(255,255,255,0.05)",
        margin: "10px",
        backgroundSize: "cover",
        position: "relative",
        overflowX: "hidden",
        color: "white",
        fontFamily: "SF Pro Display, sans-serif",
        padding: "22px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Верхняя панель */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            color: "white",
            fontSize: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ↶
        </button>

        {conversationId && (
          <button
            onClick={handleClearSession}
            style={{
              padding: "8px 14px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(220, 53, 69, 0.2)",
              color: "#FFA6A6",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(220, 53, 69, 0.35)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(220, 53, 69, 0.2)")
            }
          >
            Завершить диалог
          </button>
        )}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!conversationId ? (
          /* Форма Onboarding */
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "450px",
                background:
                  "linear-gradient(180deg, rgba(108,94,72,0.58) 0%, rgba(74,64,48,0.72) 100%)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: "32px",
                padding: "24px",
                boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  margin: "0 auto 18px auto",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                💬
              </div>

              <h2
                style={{
                  fontSize: "clamp(24px, 5vw, 30px)",
                  fontWeight: 800,
                  margin: "0 0 10px 0",
                  letterSpacing: "0.5px",
                  color: "#FFFFFF",
                }}
              >
                Чат поддержки
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: "1.5",
                  margin: "0 0 24px 0",
                }}
              >
                Напишите нам, и мы ответим на все интересующие вас вопросы в
                режиме реального времени.
              </p>

              <div style={{ textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  Как к вам обращаться:
                </label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    background: "rgba(0, 0, 0, 0.35)",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    color: "white",
                    outline: "none",
                    marginBottom: "20px",
                    caretColor: "#9ECE52",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleStartChat();
                  }}
                />
              </div>

              <button
                onClick={handleStartChat}
                disabled={startingChat}
                style={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "28px",
                  border: "none",
                  background:
                    "linear-gradient(180deg, #7CA917 0%, #558014 52%, #7CA917 100%)",
                  boxShadow: "0px 0px 20px rgba(124, 169, 23, 0.4)",
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.97)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {startingChat ? "Подключение..." : "Начать диалог"}
              </button>
            </div>
          </div>
        ) : (
          /* Окно активного чата */
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background:
                "linear-gradient(180deg, rgba(108,94,72,0.58) 0%, rgba(74,64,48,0.72) 100%)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "32px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
              overflow: "hidden",
            }}
          >
            {/* Шапка чата */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(124, 169, 23, 0.15)",
                  border: "1px solid rgba(124, 169, 23, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                🌾
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "16px" }}>
                  Служба заботы
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#9ECE52",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#9ECE52",
                    }}
                  />
                  Операторы онлайн
                </div>
              </div>
            </div>

            {/* Окно сообщений */}
            <div
              style={{
                flex: 1,
                padding: "20px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                maxHeight: "max(350px, 45vh)",
              }}
            >
              {loadingHistory ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "3px solid rgba(255,255,255,0.1)",
                      borderTop: "3px solid #9ECE52",
                      borderRadius: "50%",
                      animation: "spinChat 0.8s linear infinite",
                    }}
                  />
                  <style>
                    {`
                      @keyframes spinChat {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}
                  </style>
                </div>
              ) : messages.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>
                    👋
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    Здравствуйте, {clientName}!
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.5)",
                      marginTop: "4px",
                    }}
                  >
                    Напишите ваше сообщение в поле ниже, мы ответим в течение
                    нескольких минут.
                  </div>
                </div>
              ) : (
                messages.map((item) => {
                  const isUser = item.sender === "client";
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isUser ? "flex-end" : "flex-start",
                        width: "100%",
                      }}
                    >
                      {/* Имя отправителя */}
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: isUser
                            ? "rgba(158, 206, 82, 0.9)"
                            : "rgba(255, 255, 255, 0.6)",
                          marginBottom: "4px",
                          marginLeft: isUser ? "0" : "8px",
                          marginRight: isUser ? "8px" : "0",
                        }}
                      >
                        {isUser ? clientName : "Служба заботы"}
                      </span>
                      <div
                        style={{
                          maxWidth: "80%",
                          background: isUser
                            ? "linear-gradient(135deg, #7CA917 0%, #558014 100%)"
                            : "rgba(255, 255, 255, 0.14)",
                          backdropFilter: isUser ? "none" : "blur(4px)",
                          border: isUser
                            ? "none"
                            : "1px solid rgba(255, 255, 255, 0.08)",
                          boxShadow: isUser
                            ? "0 4px 12px rgba(124, 169, 23, 0.2)"
                            : "0 4px 12px rgba(0, 0, 0, 0.08)",
                          padding: "12px 16px",
                          borderRadius: isUser
                            ? "20px 20px 4px 20px"
                            : "20px 20px 20px 4px",
                          color: "#FFFFFF",
                        }}
                      >
                        {/* Текст */}
                        <div
                          style={{
                            fontSize: "14.5px",
                            lineHeight: "1.45",
                            wordBreak: "break-word",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {item.message}
                        </div>
                        {/* Время */}
                        <div
                          style={{
                            textAlign: "right",
                            fontSize: "10px",
                            opacity: 0.65,
                            marginTop: "5px",
                            fontWeight: 500,
                          }}
                        >
                          {formatTime(item.created_at)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Ввод сообщения */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: "14px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(0,0,0,0.2)",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Сообщение..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                style={{
                  flex: 1,
                  padding: "14px 18px",
                  borderRadius: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(0, 0, 0, 0.45)",
                  fontSize: "14.5px",
                  color: "#FFFFFF",
                  outline: "none",
                  caretColor: "#9ECE52",
                }}
              />
              <button
                type="submit"
                disabled={sending || !messageText.trim()}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "none",
                  background: messageText.trim()
                    ? "linear-gradient(180deg, #7CA917 0%, #558014 100%)"
                    : "rgba(255, 255, 255, 0.08)",
                  boxShadow: messageText.trim()
                    ? "0 4px 12px rgba(124, 169, 23, 0.35)"
                    : "none",
                  color: messageText.trim()
                    ? "white"
                    : "rgba(255,255,255,0.3)",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: messageText.trim() ? "pointer" : "default",
                  transition: "all 0.2s ease",
                }}
              >
                ➔
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
