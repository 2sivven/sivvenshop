import { useNavigate } from "react-router-dom";

export default function Delivery() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F2",
        padding: "40px",
      }}
    >
      <button onClick={() => navigate(-1)}>
        Назад
      </button>

      <h1>Оплата и доставка</h1>

      <p>
        Оплата заказов производится после оформления заказа
        через доступные платежные методы.
      </p>

      <h2>Доставка</h2>

      <p>
        Доставка осуществляется по территории Республики Молдова.
      </p>

      <p>
        Срок доставки: 1–3 рабочих дня.
      </p>

      <h2>Возврат</h2>

      <p>
        Возврат товара осуществляется в соответствии
        с действующим законодательством Республики Молдова.
      </p>

      <h2>Контакты</h2>

      <p>
        support@sivvenshop.com
      </p>
    </div>
  );
}