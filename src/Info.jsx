import { useNavigate } from "react-router-dom";

export default function Info() {
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
            fontSize: "42px",
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1,
            marginBottom: "10px",
          }}
        >
          Инструкция
        </div>

        <div
          style={{
            fontSize: "18px",
            opacity: 0.62,
            lineHeight: 1.5,
          }}
        >
          Glifosat 480 g/l, sare
        </div>
      </div>

      {/* Карточка */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "28px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        {/* Назначение */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Назначение
          </div>

          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              opacity: 0.82,
            }}
          >
            Гербицид тотального действия для уничтожения
            однолетних и многолетних сорняков на участках,
            дорожках, вдоль заборов и перед посадкой культур.
          </div>
        </div>

        {/* Способ применения */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Способ применения
          </div>

          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              opacity: 0.82,
            }}
          >
            Развести препарат в воде согласно рекомендуемой
            дозировке. Наносить методом опрыскивания на листья
            активно растущих сорняков в сухую безветренную
            погоду.
          </div>
        </div>

        {/* Расход */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Расход
          </div>

          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              opacity: 0.82,
            }}
          >
            100–120 мл препарата на 10 литров воды.
          </div>
        </div>

        {/* Важно */}
        <div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Важно
          </div>

          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              opacity: 0.82,
            }}
          >
            Избегать попадания препарата на культурные растения.
            Использовать перчатки и средства индивидуальной
            защиты. Хранить в недоступном для детей месте.
          </div>
        </div>
      </div>
    </div>
  );
}