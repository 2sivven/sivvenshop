import { useNavigate } from "react-router-dom";

export default function Delivery() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/dead-grass.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "22px",
        color: "white",
        fontFamily: "SF Pro Display, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Верхняя панель */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "28px",
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
          }}
        >
          ↶
        </button>
      </div>

      {/* Карточка */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(108,94,72,0.58) 0%, rgba(74,64,48,0.72) 100%)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.04)",
          borderRadius: "32px",
          padding: "28px",
          boxShadow:
            "0 10px 24px rgba(0,0,0,0.16)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: "24px",
            fontSize: "32px",
            fontWeight: 700,
          }}
        >
          Оплата и доставка
        </h1>

        <p
          style={{
            lineHeight: 1.8,
            opacity: 0.92,
            marginBottom: "18px",
          }}
        >
          Доставка осуществляется по всей территории
          Республики Молдова через Nova Post.
        </p>

        <p
          style={{
            lineHeight: 1.8,
            opacity: 0.92,
            marginBottom: "18px",
          }}
        >
          Стоимость доставки составляет
          <strong> 50 MDL </strong>
          и автоматически добавляется к стоимости заказа
          при оформлении.
        </p>

        <p
          style={{
            lineHeight: 1.8,
            opacity: 0.92,
            marginBottom: "18px",
          }}
        >
          Средний срок доставки составляет
          <strong> 1–2 рабочих дня </strong>
          после подтверждения заказа.
        </p>

        <p
          style={{
            lineHeight: 1.8,
            opacity: 0.92,
            marginBottom: "18px",
          }}
        >
          В выходные и праздничные дни сроки доставки
          могут быть увеличены.
        </p>

        <p
          style={{
            lineHeight: 1.8,
            opacity: 0.92,
            marginBottom: 0,
          }}
        >
          После отправки заказа клиент получает
          информацию для отслеживания доставки.
        </p>
      </div>
    </div>
  );
}