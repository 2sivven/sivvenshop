import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    loadOrders();
    loadConversations();
  }, []);

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setOrders(data || []);
  }

  async function loadMessages(conversationId) {
    console.log("OPEN CHAT", conversationId);

    const { data, error } = await supabase
      .from("support_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      console.error(error);
      return;
    }

    setMessages(data || []);
    setSelectedConversation(conversationId);
  }

  async function loadConversations() {
    const { data, error } = await supabase
      .from("support_conversations")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setConversations(data || []);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: "#F5F5F2",
      }}
    >
      <h1>Заказы</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              padding: "16px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div>
              <strong>Заказ #{order.id}</strong>
            </div>

            <div>{order.full_name}</div>

            <div>{order.phone}</div>

            <div>
              Количество: {order.quantity}
            </div>

            <div>
              Сумма: {order.order_total} MDL
            </div>

            <div>
              Статус: {order.status}
            </div>
          </div>
        ))}
      </div>

      <h1
        style={{
          marginTop: "50px",
        }}
      >
        Поддержка
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              padding: "16px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div>
              <strong>
                Обращение #{conversation.id}
              </strong>
            </div>

            <div>
              Клиент: {conversation.client_name}
            </div>

            <div>
              Статус: {conversation.status}
            </div>

            <button
              onClick={() => loadMessages(conversation.id)}
              style={{
                marginTop: "12px",
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                background: "#7CA917",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Открыть чат
            </button>

          </div>
        ))}
      </div>
      {selectedConversation && (
        <div
          style={{
            marginTop: "30px",
            background: "#fff",
            borderRadius: "18px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Чат</h2>

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: "12px",
                padding: "12px",
                borderRadius: "12px",
                background:
                  msg.sender === "client"
                    ? "#f3f3f3"
                    : "#dff4d1",
              }}
            >
              <strong>{msg.sender}</strong>

              <div>
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}