import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

export default function Checkout() {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const [errors, setErrors] = useState({});

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const productPrice = 250;
  const deliveryPrice = 50;

  const productsTotal =
    productPrice * quantity;

  const orderTotal =
    productsTotal + deliveryPrice;

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim())
      newErrors.fullName = true;

    if (!district.trim())
      newErrors.district = true;

    if (!city.trim())
      newErrors.city = true;

    if (!street.trim())
      newErrors.street = true;

    if (!house.trim())
      newErrors.house = true;

    if (phone.replace(/\D/g, "").length !== 8)
      newErrors.phone = true;

    if (!privacyAccepted)
      newErrors.privacy = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const inputStyle = {
    width: "100%",
    padding: "16px",
    marginBottom: "14px",

    borderRadius: "16px",
    border: "1px solid #E7E7E7",

    fontSize: "15px",

    boxSizing: "border-box",

    backgroundColor: "#FFFFFF",
    color: "#161616",

    caretColor: "#161616",

  };

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
          Оформление заказа
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          Заполните данные получателя
        </div>

        <div
          style={{
            marginTop: "28px",
            background: "#FFFFFF",
            borderRadius: "28px",
            padding: "18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <img
              src="/bottle.png"
              alt="Glifosat"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "contain",
                borderRadius: "18px",
                background: "#F7F7F7",
                padding: "6px",
              }}
            />

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#161616",
                  marginBottom: "6px",
                }}
              >
                Glifosat 480 g/l
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                1 литр
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "18px",
              borderTop: "1px solid #ECECEC",
              paddingTop: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                color: "#444",
              }}
            >
              <span>Количество</span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    background: "#EFEFEF",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  −
                </button>

                <span
                  style={{
                    minWidth: "24px",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    background: "#EFEFEF",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                color: "#444",
              }}
            >
              <span>Цена</span>
              <span>{productsTotal} MDL</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                color: "#444",
              }}
            >
              <span>Доставка Nova Post</span>
              <span>{deliveryPrice} MDL</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
                fontWeight: 700,
                color: "#161616",
              }}
            >
              <span>Итого</span>
              <span>{orderTotal} MDL</span>
            </div>
          </div>

          <div
            style={{
              marginTop: "18px",
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#161616",
                marginBottom: "18px",
              }}
            >
              Получатель
            </div>

            <div
              style={{
                marginBottom: "8px",
                fontWeight: 600,
                color: "#161616",
              }}
            >
              Имя и фамилия
              <span style={{ color: "#E53935" }}>
                {" "}*
              </span>
            </div>

            <input
              className="checkout-input"
              placeholder="Ivanov Ivan"
              value={fullName}
              onChange={(e) => {
                const value = e.target.value.replace(
                  /[^A-Za-zĂÂÎȘȚăâîșț\s'-]/g,
                  ""
                );

                setFullName(value);
              }}
              style={{
                ...inputStyle,
                border: errors.fullName
                  ? "1px solid #E53935"
                  : "1px solid #E7E7E7",
              }}
            />

            <div
              style={{
                marginBottom: "8px",
                fontWeight: 600,
                color: "#161616",
              }}
            >
              Город - Район
              <span style={{ color: "#E53935" }}>
                {" "}*
              </span>
            </div>

            <input
              className="checkout-input"
              placeholder="mun. Chișinău"
              value={district}
              onChange={(e) => {
                const value = e.target.value.replace(
                  /[^A-Za-zĂÂÎȘȚăâîșț\s'-.]/g,
                  ""
                );

                setDistrict(value);
              }}
              style={{
                ...inputStyle,
                border: errors.district
                  ? "1px solid #E53935"
                  : "1px solid #E7E7E7",
              }}
            />

            <div
              style={{
                marginBottom: "8px",
                fontWeight: 600,
                color: "#161616",
              }}
            >
              Населённый пункт
              <span style={{ color: "#E53935" }}>
                {" "}*
              </span>
            </div>

            <input
              className="checkout-input"
              placeholder="or. Chișinău"
              value={city}
              onChange={(e) => {
                const value = e.target.value.replace(
                  /[^A-Za-zĂÂÎȘȚăâîșț\s'-.]/g,
                  ""
                );

                setCity(value);
              }}
              style={{
                ...inputStyle,
                border: errors.city
                  ? "1px solid #E53935"
                  : "1px solid #E7E7E7",
              }}
            />

            <div
              style={{
                marginBottom: "8px",
                fontWeight: 600,
                color: "#161616",
              }}
            >
              Улица
              <span style={{ color: "#E53935" }}>
                {" "}*
              </span>
            </div>

            <input
              className="checkout-input"
              placeholder="bd.Moscovei"
              value={street}
              onChange={(e) => {
                const value = e.target.value.replace(
                  /[^A-Za-z0-9ĂÂÎȘȚăâîșț\s'-.]/g,
                  ""
                );

                setStreet(value);
              }}
              style={{
                ...inputStyle,
                border: errors.street
                  ? "1px solid #E53935"
                  : "1px solid #E7E7E7",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <input
                className="checkout-input"
                placeholder="Дом"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                style={{
                  ...inputStyle,
                  flex: 1,
                  marginBottom: "0",
                  border: errors.house
                    ? "1px solid #E53935"
                    : "1px solid #E7E7E7",
                }}
              />

              <input
                className="checkout-input"
                placeholder="Квартира"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                style={{
                  ...inputStyle,
                  flex: 1,
                  marginBottom: "0",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: errors.phone
                  ? "1px solid #E53935"
                  : "1px solid #E7E7E7",
                borderRadius: "16px",
                padding: "0 16px",
                marginBottom: "14px",
                background: "#FFFFFF",
              }}
            >
              <span
                style={{
                  color: "#666",
                  marginRight: "10px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                +373
              </span>

              <input
                className="checkout-input"
                placeholder="79 111 111"
                value={phone}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");

                  value = value.slice(0, 8);

                  if (value.length > 5) {
                    value =
                      value.slice(0, 2) +
                      " " +
                      value.slice(2, 5) +
                      " " +
                      value.slice(5);
                  } else if (value.length > 2) {
                    value =
                      value.slice(0, 2) +
                      " " +
                      value.slice(2);
                  }

                  setPhone(value);
                }}
                style={{
                  ...inputStyle,
                  border: "none",
                  marginBottom: "0",
                  paddingLeft: "0",
                }}
              />
            </div>

            <textarea
              className="checkout-input"
              placeholder="Комментарий к заказу (необязательно)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                ...inputStyle,
                minHeight: "110px",
                resize: "none",
                marginBottom: "0",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                marginTop: "18px",
                marginBottom: "18px",
              }}
            >
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) =>
                  setPrivacyAccepted(e.target.checked)
                }
                style={{
                  marginTop: "3px",
                  transform: "scale(1.2)",
                }}
              />

              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "1.5",
                  color: errors.privacy
                    ? "#E53935"
                    : "#666",
                }}
              >
                Я согласен с обработкой персональных данных,
                необходимых для оформления и доставки заказа.
              </div>
            </div>

            <div
              style={{
                marginTop: "6px",
              }}
            >
              <span
                onClick={() => navigate("/privacy")}
                style={{
                  color: "#8ad000",
                  fontSize: "14px",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Политика конфиденциальности
              </span>
            </div>

            <button
              onClick={async () => {
                if (validateForm()) {
                  setLoading(true);
                  const order = {
                    fullName,
                    district,
                    city,
                    street,
                    house,
                    apartment,
                    phone,
                    comment,
                    quantity,
                    productsTotal,
                    deliveryPrice,
                    orderTotal,
                  };

                  console.log(order);

                  const { error } = await supabase
                    .from("orders")
                    .insert([
                      {
                        full_name: fullName,
                        district,
                        city,
                        street,
                        house,
                        apartment,
                        phone,
                        comment,
                        quantity,
                        products_total: productsTotal,
                        delivery_price: deliveryPrice,
                        order_total: orderTotal,
                        status: "new",
                        payment_status: "pending",
                      },
                    ]);

                  if (error) {
                    console.error(error);

                    setLoading(false);

                    alert("Ошибка сохранения заказа");
                    return;
                  }

                  setLoading(false);

                }
              }}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "16px",

                border: "none",
                borderRadius: "18px",

                background: "#8ad000",
                color: "#fff",

                fontSize: "17px",
                fontWeight: 700,

                cursor: "pointer",
              }}
            >
              Оплатить заказ
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",

              border: "6px solid rgba(255,255,255,0.3)",
              borderTop: "6px solid #8AD000",

              borderRadius: "50%",

              animation: "spin 1s linear infinite",
            }}
          />

          <div
            style={{
              marginTop: "20px",
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            Подготавливаем заказ...
          </div>

          <div
            style={{
              marginTop: "8px",
              color: "#FFFFFF",
              opacity: 0.85,
            }}
          >
            Пожалуйста, не закрывайте приложение
          </div>
        </div>
      )}

    </div>
  );
}