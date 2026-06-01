import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

export default function Support() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const sendMessage = async () => {
        if (!name.trim() || !message.trim()) {
            alert("Заполните все поля");
            return;
        }

        setSending(true);

        try {
            let conversationId =
                localStorage.getItem(
                    "support_conversation"
                );

            if (!conversationId) {
                const {
                    data: conversation,
                    error: conversationError,
                } = await supabase
                    .from("support_conversations")
                    .insert([
                        {
                            client_name: name,
                        },
                    ])
                    .select()
                    .single();

                if (conversationError)
                    throw conversationError;

                conversationId = conversation.id;

                localStorage.setItem(
                    "support_conversation",
                    conversationId
                );
            }

            // создаём первое сообщение
            const { error: messageError } =
                await supabase
                    .from("support_messages")
                    .insert([
                        {
                            conversation_id: conversationId,
                            sender: "client",
                            message: message,
                        },
                    ]);

            if (messageError) throw messageError;

            await fetch("/api/sendTelegram", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text:
                        `📩 Новое обращение\n\n` +
                        `👤 Клиент: ${name}\n\n` +
                        `💬 Сообщение:\n${message}`,
                }),
            });

            alert("Сообщение отправлено");

            setName("");
            setMessage("");
        } catch (err) {
            console.error(err);
            alert("Ошибка отправки");
        }

        setSending(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#F5F5F2",
                padding: "24px",
                boxSizing: "border-box",
            }}
        >
            <button
                onClick={() => navigate(-1)}
                style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    fontSize: "24px",
                }}
            >
                ↶
            </button>

            <h1
                style={{
                    marginTop: "24px",
                    marginBottom: "20px",
                }}
            >
                Поддержка
            </h1>

            <div
                style={{
                    background: "#fff",
                    borderRadius: "24px",
                    padding: "24px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                }}
            >
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "12px",
                        border: "1px solid #ddd",
                        marginBottom: "16px",
                        boxSizing: "border-box",
                    }}
                />

                <textarea
                    placeholder="Опишите ваш вопрос"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "12px",
                        border: "1px solid #ddd",
                        resize: "none",
                        marginBottom: "20px",
                        boxSizing: "border-box",
                    }}
                />

                <button
                    onClick={sendMessage}
                    disabled={sending}
                    style={{
                        width: "100%",
                        height: "56px",
                        borderRadius: "16px",
                        border: "none",
                        background:
                            "linear-gradient(180deg, #7CA917 0%, #558014 100%)",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    {sending ? "Отправка..." : "Отправить"}
                </button>
            </div>
        </div>
    );
}