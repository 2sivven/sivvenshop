import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F2",
        padding: "24px",
        fontFamily: "SF Pro Display, sans-serif",
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
          color: "#161616",
          fontSize: "28px",
          cursor: "pointer",
        }}
      >
        ↶
      </button>

      <div
        style={{
          marginTop: "24px",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            fontWeight: 800,
            color: "#161616",
          }}
        >
          Оформление заказа
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          Заполните данные получателя
        </div>
      </div>
    </div>
  );
}