import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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
            marginBottom: "20px",
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
          Политика конфиденциальности
        </h1>

        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.6",
            color: "rgba(255, 255, 255, 0.75)",
            marginBottom: "28px",
          }}
        >
          Мы уважаем право каждого клиента на защиту персональных данных и
          используем предоставленную информацию исключительно для обработки,
          оплаты и доставки заказа.
        </p>

        {/* Section 1 */}
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
              margin: "0 0 14px 0",
              color: "#9ECE52",
              fontSize: "18px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "18px" }}>📊</span> Какие данные мы
            собираем
          </h3>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyleType: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {[
              "Имя и фамилия",
              "Номер телефона",
              "Адрес доставки",
              "Комментарий к заказу (при наличии)",
            ].map((text, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.85)",
                }}
              >
                <span style={{ color: "#7CA917", fontWeight: "bold" }}>✓</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2 */}
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
              margin: "0 0 14px 0",
              color: "#9ECE52",
              fontSize: "18px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "18px" }}>⚙️</span> Для чего используются
            данные
          </h3>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyleType: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {[
              "Оформление заказа",
              "Связь с покупателем",
              "Организация доставки через Nova Post",
              "Исполнение требований законодательства",
            ].map((text, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.85)",
                }}
              >
                <span style={{ color: "#7CA917", fontWeight: "bold" }}>✓</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Text Area Blocks */}
        {[
          {
            title: "🤝 Передача данных третьим лицам",
            desc: "Мы не продаём и не передаём персональные данные третьим лицам, за исключением случаев, когда это необходимо для доставки товара либо требуется законодательством Республики Молдова.",
          },
          {
            title: "⏳ Срок хранения данных",
            desc: "Персональные данные хранятся только в течение периода, необходимого для выполнения заказа и соблюдения требований законодательства.",
          },
          {
            title: "✍️ Согласие пользователя",
            desc: "Нажимая кнопку «Оплатить заказ», пользователь подтверждает своё согласие на обработку персональных данных в объёме, необходимом для оформления и доставки заказа.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                color: "#9ECE52",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                lineHeight: "1.6",
                color: "rgba(255, 255, 255, 0.75)",
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}

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
            Последнее обновление: май 2026 г.
          </span>
          <span
            style={{
              color: "#7CA917",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Secured SSL
          </span>
        </div>
      </div>
    </div>
  );
}
