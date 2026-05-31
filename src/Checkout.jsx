import { useNavigate } from "react-router-dom";

export default function Checkout() {
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
                  marginBottom: "10px",
                  color: "#444",
                }}
              >
                <span>Количество</span>
                <span>1 шт.</span>
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
                <span>250 MDL</span>
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
                <span>250 MDL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}