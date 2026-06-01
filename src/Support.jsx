import { useNavigate } from "react-router-dom";

export default function Support() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F2",
        padding: "24px",
      }}
    >
      <button onClick={() => navigate(-1)}>
        ←
      </button>

      <h1>Поддержка</h1>

      <p>
        Скоро здесь появится онлайн-чат.
      </p>
    </div>
  );
}