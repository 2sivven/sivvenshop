import { Link } from "react-router-dom";

export default function TopMenu() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        marginBottom: "40px",
        flexWrap: "wrap",
      }}
    >
      <Link
        to="/delivery"
        style={{
          textDecoration: "none",
          color: "#111",
          textAlign: "center",
        }}
      >
        <img
          src="/delivery.svg"
          alt="Доставка"
          style={{
            width: "90px",
            height: "90px",
          }}
        />
        <div>Доставка</div>
      </Link>

      <Link
        to="/contacts"
        style={{
          textDecoration: "none",
          color: "#111",
          textAlign: "center",
        }}
      >
        <img
          src="/contact.svg"
          alt="Контакты"
          style={{
            width: "90px",
            height: "90px",
          }}
        />
        <div>Контакты</div>
      </Link>

      <Link
        to="/privacy"
        style={{
          textDecoration: "none",
          color: "#111",
          textAlign: "center",
        }}
      >
        <img
          src="/privacy.svg"
          alt="Политика"
          style={{
            width: "90px",
            height: "90px",
          }}
        />
        <div>Политика</div>
      </Link>
    </div>
  );
}