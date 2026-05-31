import { useNavigate } from "react-router-dom";
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export default function Product() {
  const navigate = useNavigate();

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
        overflowY: "hidden",
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
        {/* Назад */}
        <button
          onClick={() => navigate("/")}
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
          }}
        >
          ↶
        </button>

        <div />
      </div>

      {/* Название */}
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            fontSize: "clamp(36px, 7vw, 54px)",
            fontWeight: 800,
            lineHeight: "0.95",
            letterSpacing: "2px",
            color: "#ffffff",
            textShadow: "0 4px 18px rgba(0,0,0,0.45)",

            transform: "translateY(-15px)",
          }}
        >
          Glifosat 480 g/l
        </div>
      </div>

      {/* Бутылка */}
      <div
        style={{
          marginTop: "34px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "32px",
            overflow: "hidden",
            backgroundClip: "padding-box",

            background:
              "linear-gradient(180deg, rgba(108,94,72,0.58) 0%, rgba(74,64,48,0.72) 100%)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.04)",

            padding: "18px 18px 52px 18px",

            boxShadow:
              "0 10px 24px rgba(0,0,0,0.16)",
          }}
        >
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={2.5}
            centerOnInit
            limitToBounds
            panning={{ disabled: true }}
            pinch={{ step: 5 }}
            doubleClick={{ disabled: true }}
            wheel={{ disabled: true }}
          >
            {({ resetTransform }) => (
              <div
                onTouchEnd={() => {
                  setTimeout(() => {
                    resetTransform(200);
                  }, 120);
                }}
              >
                <TransformComponent>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      maxWidth: "260px",
                    }}
                  >
                    <img
                      src="/bottle.png"
                      alt="Glifosat"
                      style={{
                        width: "100%",
                        objectFit: "contain",
                        borderRadius: "22px",
                        display: "block",

                        transition: "transform 0.25s ease",

                        filter:
                          "drop-shadow(0 8px 14px rgba(0, 0, 0, 0.01))",

                      }}
                    />
                  </div>
                </TransformComponent>
              </div>
            )}
          </TransformWrapper>

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "22px",
              right: "22px",

              textAlign: "center",

              fontSize: "10.5px",
              lineHeight: 1.35,

              color: "rgba(255,255,255,0.72)",

              fontWeight: 500,
            }}
          >
            *Изображение носит ознакомительный характер.
            Упаковка и производитель могут отличаться.

          </div>

        </div>
      </div>

      {/* Инструкция / Отзывы */}
      <div
        style={{
          marginTop: "28px",

          width: "100%",
          height: "68px",

          display: "flex",
          alignItems: "center",

          gap: "12px",
        }}
      >

        {/* Инструкция */}
        <button
          onClick={() => navigate("/info")}
          style={{
            flex: 1,
            height: "100%",

            border: "1px solid rgba(255,255,255,0.04)",

            background:
              "linear-gradient(180deg, rgba(108,94,72,0.58) 0%, rgba(74,64,48,0.72) 100%)",

            color: "#FFFFFF",

            fontSize: "17px",
            fontWeight: 600,

            cursor: "pointer",

            boxShadow:
              "0 8px 22px rgba(0,0,0,0.12)",

            borderRadius: "22px",
            margin: "6px",
            backdropFilter: "blur(12px)",
          }}
        >
          Информация
        </button>

        {/* Отзывы */}
        <button
          onClick={() => navigate("/reviews")}
          style={{
            flex: 1,
            height: "100%",

            border: "1px solid rgba(255,255,255,0.04)",

            background:
              "linear-gradient(180deg, rgba(108,94,72,0.58) 0%, rgba(74,64,48,0.72) 100%)",
            color: "#F3F4F6",

            fontSize: "17px",
            fontWeight: 600,

            boxShadow:
              "0 8px 22px rgba(0,0,0,0.12)",

            borderRadius: "22px",
            margin: "6px",
            backdropFilter: "blur(12px)",

            cursor: "pointer",
          }}
        >
          Отзывы
        </button>
      </div>

      {/* Цена + кнопка */}
      <div
        style={{
          marginTop: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "18px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "15px",
              opacity: 0.65,
              marginBottom: "4px",
            }}
          >
            Цена
          </div>

          <div
            style={{
              fontSize: "42px",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            250 MDL
          </div>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          style={{
            flex: 1,
            height: "68px",
            borderRadius: "34px",
            border: "none",
            background:
              "linear-gradient(180deg, #7CA917 0%, #558014 52%, #7CA917 100%)",
            color: "white",
            fontSize: "20px",
            fontWeight: 600,
            boxShadow:
              "0px 0px 26px rgba(124, 169, 23, 0.45)",
            cursor: "pointer",
          }}
        >
          Купить
        </button>
      </div>
    </div>
  );
}