import { useNavigate } from "react-router-dom";

export default function Delivery() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F2",
        color: "#161616",
        fontFamily: "SF Pro Display, sans-serif",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* Верхняя панель */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "34px",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          ↶
        </button>

        <div />
      </div>

      {/* Заголовок */}
      <div
        style={{
          marginBottom: "26px",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1,
            marginBottom: "10px",
          }}
        >
          Оплата и доставка
        </div>

        <div
          style={{
            fontSize: "18px",
            opacity: 0.62,
            lineHeight: 1.5,
          }}
        >
          Доставка по всей территории Республики Молдова
        </div>
      </div>

      {/* Основная карточка */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "28px",
          padding: "28px 24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "18px",
            color: "#161616",
          }}
        >
          Доставка
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#333",
            marginBottom: "36px",
          }}
        >
          Доставка осуществляется по всей территории
          Республики Молдова через Nova Post.

          <br />
          <br />

          Средний срок доставки составляет
          1–2 рабочих дня после подтверждения заказа.

          <br />
          <br />

          В выходные и праздничные дни сроки доставки
          могут быть увеличены.
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "18px",
            color: "#161616",
          }}
        >
          Стоимость доставки
        </div>

        <div
          style={{
            background: "#F6F6F3",
            borderRadius: "24px",
            padding: "22px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#161616",
              marginBottom: "8px",
            }}
          >
            50 MDL
          </div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "#555",
            }}
          >
            Стоимость доставки автоматически
            добавляется к сумме заказа
            при оформлении покупки.
          </div>
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "18px",
            color: "#161616",
          }}
        >
          Оплата
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#333",
            marginBottom: "36px",
          }}
        >
          Оплата производится во время оформления
          заказа через доступные платёжные методы.

          <br />
          <br />

          После успешной оплаты заказ передаётся
          на обработку и отправку.
        </div>

        <div
          style={{
            background:
              "linear-gradient(180deg, #EEF8DF 0%, #E3F2CD 100%)",
            borderRadius: "24px",
            padding: "22px",
            border: "1px solid rgba(126,187,19,0.20)",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#5E8F0E",
              marginBottom: "14px",
            }}
          >
            Важно
          </div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#436608",
            }}
          >
            После отправки заказа клиент получает
            информацию для отслеживания доставки.

            <br />
            <br />

            Если возникли вопросы по заказу,
            вы можете связаться со службой поддержки
            через раздел «Поддержка».
          </div>
        </div>
      </div>
    </div>
  );
}