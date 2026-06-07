import { Routes, Route, useNavigate } from "react-router-dom";
import Product from "./Product";
import Info from "./Info";
import Reviews from "./Reviews";
import Checkout from "./Checkout";
import PrivacyPolicy from "./PrivacyPolicy";
import Contacts from "./Contacts";
import Delivery from "./Delivery";
import Support from "./Support";

export default function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            style={{
              width: "calc(100% - 20px)",
              height: "calc(100vh - 20px)",
              backgroundColor: "#000",
              backgroundImage: "url('/grass.png')",
              borderRadius: "32px",
              margin: "10px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              overflow: "hidden",
              fontFamily: "SF Pro Display, sans-serif",
            }}
          >
            {/* Градиент */}
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                minHeight: "100%",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.96) 100%)",
              }}
            />

            {/* Контент */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                padding: "0 20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {/* Логотип бренда в виде премиальной плашки */}
              <div
                style={{
                  position: "absolute",
                  top: "38px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 24px",
                  borderRadius: "20px",
                  background: "rgba(8, 12, 6, 0.75)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(158, 206, 82, 0.25)",
                  boxShadow:
                    "0 10px 30px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
                  zIndex: 10,
                }}
              >
                <img
                  src="/logo.svg"
                  alt="SIVVEN"
                  style={{
                    width: "120px",
                    height: "auto",
                    objectFit: "contain",
                    filter:
                      "brightness(0) saturate(100%) invert(84%) sepia(34%) saturate(541%) hue-rotate(39deg) brightness(98%) contrast(92%)",
                  }}
                />
              </div>

              {/* Информационный и интерактивный блок */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                {/* Заголовок */}
                <div
                  style={{
                    maxWidth: "520px",
                    width: "100%",
                    fontFamily: "SF Pro Display, sans-serif",
                    fontSize: "clamp(36px, 8vw, 64px)",
                    fontWeight: 700,
                    lineHeight: "0.95",
                    letterSpacing: "-2px",
                    color: "#FFFFFF",
                  }}
                >
                  Чистый участок
                </div>

                <div
                  style={{
                    maxWidth: "520px",
                    width: "100%",
                    marginTop: "2px",
                    fontFamily: "SF Pro Display, sans-serif",
                    fontSize: "clamp(36px, 8vw, 64px)",
                    fontWeight: 400,
                    lineHeight: "0.95",
                    letterSpacing: "-2px",
                    color: "#9ECE52",
                  }}
                >
                  без сорняков
                </div>

                {/* Подзаголовок */}
                <div
                  style={{
                    marginTop: "22px",
                    maxWidth: "320px",
                    width: "100%",
                    textAlign: "center",
                    color: "#ffffffcc",
                    fontFamily: "SF Pro Display, sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: "1.35",
                    letterSpacing: "0px",
                    fontStretch: "condensed" as any,
                  }}
                >
                  Средство для
                  <br />
                  борьбы с нежелательной
                  <br />
                  растительностью
                </div>

                {/* Кнопка */}
                <button
                  onClick={() => navigate("/product")}
                  style={{
                    marginTop: "40px",
                    width: "100%",
                    maxWidth: "334px",
                    height: "74px",
                    borderRadius: "37px",
                    border: "none",
                    background:
                      "linear-gradient(180deg, #7CA917 0%, #558014 52%, #7CA917 100%)",
                    color: "#FFFFFF",
                    fontSize: "26px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0px 0px 26px rgba(124, 169, 23, 0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      transform: "translateY(-1px)",
                    }}
                  >
                    Перейти к товару
                  </span>

                  <span
                    style={{
                      fontSize: "38px",
                      fontWeight: 300,
                      transform: "translateY(-2px)",
                    }}
                  >
                    ›
                  </span>
                </button>
              </div>

              {/* Нижние блоки */}
              <div
                style={{
                  marginBottom: "16px",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "12px",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                {[
                  {
                    top: "Против",
                    bottom: "сорняков",
                  },
                  {
                    top: "Для плитки",
                    bottom: "и дорожек",
                  },
                  {
                    top: "Для дома",
                    bottom: "и участка",
                  },
                  {
                    top: "Для теплиц",
                    bottom: "и огорода",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Круг + иконка */}
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: "#11190D",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={
                          [
                            "/sprout.svg",
                            "/path.svg",
                            "/home.svg",
                            "/greenhouse.svg",
                          ][index]
                        }
                        alt=""
                        style={{
                          width: [
                            "42px", // sprout
                            "29px", // path
                            "28px", // home
                            "35px", // greenhouse
                          ][index],
                          height: [
                            "25px", // sprout
                            "31px", // path
                            "28px", // home
                            "29px", // greenhouse
                          ][index],
                          objectFit: "contain",
                          filter:
                            "brightness(0) saturate(100%) invert(78%) sepia(29%) saturate(851%) hue-rotate(36deg) brightness(96%) contrast(88%)",
                        }}
                      />
                    </div>

                    {/* Текст */}
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        lineHeight: "14px",
                        fontWeight: 400,
                      }}
                    >
                      <div style={{ color: "#FFFFFF" }}>{item.top}</div>
                      <div style={{ color: "#9ECE52" }}>{item.bottom}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <Route path="/product" element={<Product />} />
      <Route path="/info" element={<Info />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}
