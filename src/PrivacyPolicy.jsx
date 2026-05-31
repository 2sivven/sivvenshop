import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {

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
                    marginBottom: "20px",
                }}
            >
                ↶
            </button>
            
            <div
                style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    background: "#FFFFFF",
                    borderRadius: "28px",
                    padding: "24px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                }}
            >
                <h1
                    style={{
                        marginTop: 0,
                        color: "#161616",
                    }}
                >
                    Политика конфиденциальности
                </h1>

                <p>
                    Мы собираем только те персональные данные,
                    которые необходимы для оформления,
                    оплаты и доставки заказа.
                </p>

                <p>
                    К таким данным относятся:
                </p>

                <ul>
                    <li>Имя и фамилия</li>
                    <li>Номер телефона</li>
                    <li>Адрес доставки</li>
                    <li>Комментарий к заказу (если указан)</li>
                </ul>

                <p>
                    Данные используются исключительно для:
                </p>

                <ul>
                    <li>обработки заказа;</li>
                    <li>связи с покупателем;</li>
                    <li>организации доставки;</li>
                    <li>выполнения требований законодательства.</li>
                </ul>

                <p>
                    Мы не передаём персональные данные третьим лицам,
                    за исключением случаев, необходимых для доставки
                    товара или исполнения требований закона.
                </p>

                <p>
                    Нажимая кнопку «Оплатить заказ»,
                    пользователь подтверждает согласие
                    на обработку персональных данных,
                    необходимых для оформления заказа.
                </p>

                <p>
                    По вопросам обработки персональных данных
                    вы можете связаться с администрацией магазина.
                </p>
            </div>
        </div>
    );
}