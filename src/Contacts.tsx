import { useNavigate } from "react-router-dom";

export default function Contacts() {
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
          Контакты
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#444",
          }}
        >
          Служба поддержки SIVVEN SHOP
        </div>

        <div
          style={{
            marginTop: "24px",
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#161616",
          }}
        >
          Email: support@sivvenshop.com
          <br />
          Telegram: в разработке
          <br />
          Чат поддержки: скоро доступен
        </div>
      </div>
    </div>
  );
}
