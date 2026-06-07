import { useNavigate } from "react-router-dom";

export default function Delivery() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080C04",
        backgroundImage:
          "radial-gradient(circle at 50% 0%, #15220C 0%, #060904 100%)",
        padding: "20px",
        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#FFFFFF",
        boxSizing: "border-box",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
          maxWidth: "600px",
          margin: "0 auto 24px auto",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(10px)",
            color: "#FFFFFF",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          ↶
        </button>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: "#9ECE52",
          }}
        >
          SIVVEN SHOP
        </div>
        <div style={{ width: "44px" }} />
      </div>

      {/* Main Container */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(20, 28, 14, 0.7) 0%, rgba(10, 14, 7, 0.9) 100%)",
          backdropFilter: "blur(20px)",
          borderRadius: "32px",
          border: "1px solid rgba(138, 208, 0, 0.15)",
          padding: "30px 24px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          maxWidth: "600px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: "6px",
            color: "#FFFFFF",
            fontSize: "clamp(20px, 5.5vw, 26px)",
            fontWeight: 800,
            lineHeight: "1.3",
            letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #FFFFFF 60%, #9ECE52 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Оплата и доставка
        </h1>

        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.5",
            color: "rgba(255, 255, 255, 0.6)",
            marginBottom: "28px",
          }}
        >
          Доставка по всей территории Республики Молдова
        </p>

        {/* Section 1: Delivery */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.04)",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 12px 0",
              color: "#9ECE52",
              fontSize: "18px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>🚚</span> Доставка Nova Post
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            Доставка осуществляется по всей территории Республики Молдова через
            Nova Post.
            <br />
            <br />
            Средний срок доставки составляет <strong>1–2 рабочих дня</strong>{" "}
            после подтверждения заказа. В выходные и праздничные дни сроки
            доставки могут быть увеличены.
          </p>
        </div>

        {/* Section 2: Pricing */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(124, 169, 23, 0.1) 0%, rgba(85, 128, 20, 0.15) 100%)",
            border: "1px solid rgba(138, 208, 0, 0.25)",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 6px 0",
              color: "#9ECE52",
              fontSize: "18px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>🪙</span> Стоимость доставки
          </h3>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#FFFFFF",
              margin: "10px 0 6px 0",
            }}
          >
            50 MDL
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              lineHeight: "1.5",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            Стоимость доставки автоматически добавляется к сумме заказа при
            оформлении покупки.
          </p>
        </div>

        {/* Section 3: Payment */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.04)",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 12px 0",
              color: "#9ECE52",
              fontSize: "18px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>💳</span> Оплата заказа
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            Оплата производится во время оформления заказа через доступные
            платёжные методы. После успешной оплаты заказ передаётся на
            обработку и отправку.
          </p>
        </div>

        {/* Section 4: Important Info */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(239, 131, 0, 0.05) 0%, rgba(197, 106, 0, 0.08) 100%)",
            border: "1px solid rgba(239, 131, 0, 0.15)",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 12px 0",
              color: "#FFAA50",
              fontSize: "18px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>⚠️</span> Важная информация
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            После отправки заказа клиент получит номер для отслеживания посылки
            по SMS-сообщению.
            <br />
            <br />
            Если возникли вопросы по заказу, вы можете связаться со службой
            поддержки через раздел «Поддержка» и уточнить все интересующие вас
            вопросы, касающиеся товара, доставки, оплаты и возврата.
          </p>
        </div>

        {/* Footer info */}
        <div
          style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "12px",
            }}
          >
            SIVVEN SHOP © 2026
          </span>
        </div>
      </div>
    </div>
  );
}
