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
  const [errors, setErrors] = useState<any>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const productPrice = 250;
  const deliveryPrice = 50;
  const productsTotal = productPrice * quantity;
  const orderTotal = productsTotal + deliveryPrice;

  const validateForm = () => {
    const newErrors: any = {};

    if (!fullName.trim()) newErrors.fullName = true;
    if (!district.trim()) newErrors.district = true;
    if (!city.trim()) newErrors.city = true;
    if (!street.trim()) newErrors.street = true;
    if (!house.trim()) newErrors.house = true;
    if (phone.replace(/\D/g, "").length !== 8) newErrors.phone = true;
    if (!privacyAccepted) newErrors.privacy = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    padding: "16px",
    marginBottom: "14px",
    borderRadius: "16px",
    border: hasError
      ? "1px solid rgba(239, 68, 68, 0.8)"
      : "1px solid rgba(255, 255, 255, 0.12)",
    fontSize: "15px",
    boxSizing: "border-box" as const,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    color: "#FFFFFF",
    caretColor: "#9ECE52",
    outline: "none",
    transition: "all 0.2s ease",
  });

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: 600,
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.85)",
    letterSpacing: "0.3px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/dead-grass.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "36px",
        border: "1px solid rgba(255,255,255,0.05)",
        margin: "10px",
        backgroundSize: "cover",
        position: "relative",
        overflowX: "hidden",
        color: "white",
        fontFamily: "SF Pro Display, sans-serif",
        padding: "22px",
        boxSizing: "border-box",
      }}
    >
      {/* Верхняя панель */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            color: "white",
            fontSize: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ↶
        </button>

        <div style={{ width: "46px" }} />
      </div>

      {/* Заголовок */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 6vw, 42px)",
            fontWeight: 800,
            lineHeight: "1.0",
            letterSpacing: "1px",
            color: "#ffffff",
            margin: "0 0 8px 0",
            textShadow: "0 4px 18px rgba(0,0,0,0.45)",
          }}
        >
          Оформление заказа
        </h1>
        <div
          style={{
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.72)",
            fontWeight: 500,
          }}
        >
          Заполните данные для экспресс-доставки
        </div>
      </div>

      {/* Главный блок заказа */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(108,94,72,0.58) 0%, rgba(74,64,48,0.72) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.04)",
          borderRadius: "32px",
          padding: "20px",
          boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
          marginBottom: "32px",
        }}
      >
        {/* Карточка товара */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.22)",
            padding: "12px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <img
            src="/bottle.png"
            alt="Glifosat"
            style={{
              width: "75px",
              height: "75px",
              objectFit: "contain",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.05)",
              padding: "6px",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "4px",
              }}
            >
              Glifosat 480 g/l
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.55)",
                fontWeight: 500,
              }}
            >
              1 литр | Гербицид
            </div>
          </div>
        </div>

        {/* Калькуляция */}
        <div
          style={{
            marginTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "16px",
          }}
        >
          {/* Количество */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            <span>Количество</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")
                }
              >
                −
              </button>
              <span
                style={{
                  minWidth: "24px",
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: "16px",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")
                }
              >
                +
              </button>
            </div>
          </div>

          {/* Цена */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            <span>Цена</span>
            <span style={{ fontWeight: 600 }}>{productsTotal} MDL</span>
          </div>

          {/* Доставка */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            <span>Доставка Nova Post</span>
            <span style={{ fontWeight: 600 }}>{deliveryPrice} MDL</span>
          </div>

          {/* Итого */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: "16px",
              paddingBottom: "4px",
              fontSize: "20px",
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            <span>Итого</span>
            <span style={{ fontSize: "28px", color: "white" }}>
              {orderTotal}{" "}
              <span
                style={{ fontSize: "16px", color: "#9ECE52", fontWeight: 700 }}
              >
                MDL
              </span>
            </span>
          </div>
        </div>

        {/* Форма получателя */}
        <div
          style={{
            marginTop: "24px",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "24px",
            padding: "18px",
            border: "1px solid rgba(255, 255, 255, 0.03)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: "18px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              paddingBottom: "8px",
            }}
          >
            Получатель
          </div>

          {/* Имя */}
          <div>
            <label style={labelStyle}>
              Имя и фамилия
              <span style={{ color: "rgba(239, 68, 68, 0.9)" }}> *</span>
            </label>
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
              style={inputStyle(!!errors.fullName)}
            />
          </div>

          {/* Город - Район */}
          <div>
            <label style={labelStyle}>
              Город - Район
              <span style={{ color: "rgba(239, 68, 68, 0.9)" }}> *</span>
            </label>
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
              style={inputStyle(!!errors.district)}
            />
          </div>

          {/* Населенный пункт */}
          <div>
            <label style={labelStyle}>
              Населённый пункт
              <span style={{ color: "rgba(239, 68, 68, 0.9)" }}> *</span>
            </label>
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
              style={inputStyle(!!errors.city)}
            />
          </div>

          {/* Улица */}
          <div>
            <label style={labelStyle}>
              Улица
              <span style={{ color: "rgba(239, 68, 68, 0.9)" }}> *</span>
            </label>
            <input
              className="checkout-input"
              placeholder="bd. Moscovei"
              value={street}
              onChange={(e) => {
                const value = e.target.value.replace(
                  /[^A-Za-z0-9ĂÂÎȘȚăâîșț\s'-.]/g,
                  ""
                );
                setStreet(value);
              }}
              style={inputStyle(!!errors.street)}
            />
          </div>

          {/* Дом / Квартира */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>
                Дом
                <span style={{ color: "rgba(239, 68, 68, 0.9)" }}> *</span>
              </label>
              <input
                className="checkout-input"
                placeholder="12"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                style={inputStyle(!!errors.house)}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Квартира</label>
              <input
                className="checkout-input"
                placeholder="45"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                style={inputStyle(false)}
              />
            </div>
          </div>

          {/* Мобильный телефон */}
          <div>
            <label style={labelStyle}>
              Телефон
              <span style={{ color: "rgba(239, 68, 68, 0.9)" }}> *</span>
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: errors.phone
                  ? "1px solid rgba(239, 68, 68, 0.82)"
                  : "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",
                padding: "0 16px",
                marginBottom: "14px",
                background: "rgba(0, 0, 0, 0.35)",
              }}
            >
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  marginRight: "8px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  fontSize: "15px",
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
                    value = value.slice(0, 2) + " " + value.slice(2);
                  }

                  setPhone(value);
                }}
                style={{
                  ...inputStyle(false),
                  border: "none",
                  background: "transparent",
                  marginBottom: "0",
                  paddingLeft: "0",
                }}
              />
            </div>
          </div>

          {/* Комментарий */}
          <div>
            <label style={labelStyle}>Комментарий к заказу</label>
            <textarea
              className="checkout-input"
              placeholder="Примечания к доставке или деталям дома..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                ...inputStyle(false),
                minHeight: "100px",
                resize: "none",
              }}
            />
          </div>

          {/* Чекбокс согласия */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginTop: "14px",
              marginBottom: "14px",
            }}
          >
            <input
              type="checkbox"
              id="privacyAccepted"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              style={{
                marginTop: "4px",
                width: "18px",
                height: "18px",
                accentColor: "#7CA917",
                cursor: "pointer",
              }}
            />
            <label
              htmlFor="privacyAccepted"
              style={{
                fontSize: "13px",
                lineHeight: "1.45",
                color: errors.privacy
                  ? "rgba(239, 68, 68, 0.9)"
                  : "rgba(255, 255, 255, 0.72)",
                cursor: "pointer",
              }}
            >
              Я согласен с обработкой персональных данных, необходимых для
              оформления и доставки заказа.
            </label>
          </div>

          {/* Ссылка на политику */}
          <div style={{ marginTop: "4px", marginBottom: "16px" }}>
            <span
              onClick={() => navigate("/privacy")}
              style={{
                color: "#9ECE52",
                fontSize: "13px",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Политика конфиденциальности
            </span>
          </div>

          {/* Кнопка отправки */}
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

                const { error } = await supabase.from("orders").insert([
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

                // Send Telegram Notification about the new order
                try {
                  const orderText = `📦 Новый заказ на SIVVEN!\n\n` +
                    `👤 Получатель: ${fullName}\n` +
                    `📞 Телефон: +373 ${phone}\n\n` +
                    `📍 Адрес доставки (Nova Post):\n` +
                    `• Район/Город: ${district}\n` +
                    `• Населенный пункт: ${city}\n` +
                    `• Улица: ${street}\n` +
                    `• Дом: ${house}${apartment ? `, кв. ${apartment}` : ""}\n\n` +
                    `🛒 Товар: Glifosat 480 g/l\n` +
                    `• Количество: ${quantity} шт.\n` +
                    `• Стоимость товаров: ${productsTotal} MDL\n` +
                    `• Стоимость доставки: ${deliveryPrice} MDL\n` +
                    `• ИТОГО К ОПЛАТЕ: ${orderTotal} MDL\n` +
                    (comment.trim() ? `\n💬 Комментарий: ${comment}` : "");

                  await fetch("/api/sendTelegram", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: orderText }),
                  });
                } catch (tgErr) {
                  console.error("Failed to sending order notice to Telegram:", tgErr);
                }

                setLoading(false);
                alert("Заказ успешно оформлен!");
              }
            }}
            style={{
              width: "100%",
              height: "60px",
              borderRadius: "30px",
              border: "none",
              background:
                "linear-gradient(180deg, #7CA917 0%, #558014 52%, #7CA917 100%)",
              color: "white",
              fontSize: "18px",
              fontWeight: 700,
              boxShadow: "0px 0px 24px rgba(124, 169, 23, 0.45)",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.98)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Оплатить заказ
          </button>
        </div>
      </div>

      {/* Лоадер при отправке */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 15, 8, 0.8)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "5px solid rgba(255,255,255,0.1)",
              borderTop: "5px solid #9ECE52",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />

          <style>
            {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
          </style>

          <div
            style={{
              marginTop: "24px",
              color: "#FFFFFF",
              fontSize: "19px",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            Подготавливаем заказ...
          </div>

          <div
            style={{
              marginTop: "8px",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "14px",
            }}
          >
            Пожалуйста, не закрывайте страницу
          </div>
        </div>
      )}
    </div>
  );
}
