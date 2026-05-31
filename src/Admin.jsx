import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
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

            <div>
              {order.full_name}
            </div>

            <div>
              {order.phone}
            </div>

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
    </div>
  );
}