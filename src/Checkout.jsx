import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const productPrice = 250;
  const deliveryPrice = 50;

  const productsTotal =
    productPrice * quantity;

  const orderTotal =
    productsTotal + deliveryPrice;

  const inputStyle = {
    width: "100%",
    padding: "16px",
    marginBottom: "14px",

    borderRadius: "16px",
    border: "1px solid #E7E7E7",

    fontSize: "15px",

    boxSizing: "border-box",

    outline: "none",
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

            <input
              placeholder="Имя и фамилия (латиницей)"
              style={inputStyle}
            />

            <input
              placeholder="Район"
              style={inputStyle}
            />

            <input
              placeholder="Населённый пункт"
              style={inputStyle}
            />

            <input
              placeholder="Улица"
              style={inputStyle}
            />

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <input
                placeholder="Дом"
                style={{
                  ...inputStyle,
                  flex: 1,
                  marginBottom: "0",
                }}
              />

              <input
                placeholder="Квартира"
                style={{
                  ...inputStyle,
                  flex: 1,
                  marginBottom: "0",
                }}
              />
            </div>

            <input
              placeholder="Телефон"
              style={inputStyle}
            />

            <textarea
              placeholder="Комментарий к заказу (необязательно)"
              style={{
                ...inputStyle,
                minHeight: "110px",
                resize: "none",
                marginBottom: "0",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}