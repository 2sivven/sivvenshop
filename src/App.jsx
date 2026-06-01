import { Routes, Route, useNavigate } from "react-router-dom";
import Product from "./Product";
import Info from "./Info";
import Reviews from "./Reviews";
import Checkout from "./Checkout";
import PrivacyPolicy from "./PrivacyPolicy";
import Admin from "./Admin";
import Contacts from "./Contacts";
import Delivery from "./Delivery";

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
              minHeight: "100vh",
              backgroundColor: "#000",
              backgroundImage: "url('/grass.png')",
              borderRadius: "32px",
              margin: "10px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              overflowX: "hidden",
              overflowY: "auto",
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
                minHeight: "100vh",
                padding: "0 20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >

              {/* Логотип */}
              <img
                src="/logo.svg"
                alt="SIVVEN"
                style={{
                  width: "130px",
                  position: "absolute",
                  top: "120px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  objectFit: "contain",
                  filter:
                    "brightness(0) saturate(100%) invert(84%) sepia(6%) saturate(243%) hue-rotate(182deg) brightness(92%) contrast(88%)",
                }}
              />
              {/* Заголовок */}
              <div
                style={{
                  marginTop: "313px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "520px",
                    height: "64px",
                    marginLeft: "0px",
                    fontFamily: "SF Pro Display, sans-serif",
                    fontSize: "clamp(42px, 8vw, 64px)",
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
                    width: "520px",
                    height: "74px",
                    marginLeft: "0px",
                    marginTop: "0px",
                    fontFamily: "SF Pro Display, sans-serif",
                    fontSize: "clamp(42px, 8vw, 64px)",
                    fontWeight: 400,
                    lineHeight: "0.95",
                    letterSpacing: "-2px",
                    color: "#9ECE52",
                  }}
                >
                  без сорняков
                </div>
              </div>

              {/* Подзаголовок */}
              <div
                style={{
                  marginTop: "28px",
                  maxWidth: "320px",
                  width: "100%",
                  textAlign: "center",
                  color: "#ffffffcc",
                  fontFamily: "SF Pro Display, sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "1.35",
                  letterSpacing: "0px",
                  fontStretch: "condensed",
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
                  marginTop: "52px",
                  width: "100%",
                  maxWidth: "334px",
                  height: "74px",
                  borderRadius: "35px",
                  border: "none",
                  background:
                    "linear-gradient(180deg, #7CA917 0%, #558014 52%, #7CA917 100%)",
                  color: "#FFFFFF",
                  fontSize: "26px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow:
                    "0px 0px 26px rgba(124, 169, 23, 0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  position: "relative",
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

              {/* Нижние блоки */}
              <div
                style={{
                  marginTop: "40px",
                  paddingBottom: "34px",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "18px",
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
                          width:
                            [
                              "42px", // sprout
                              "29px", // path
                              "28px", // home
                              "35px", // greenhouse
                            ][index],

                          height:
                            [
                              "25px", // sprout
                              "31px", // path
                              "28px", // home
                              "29px", // greenhouse
                            ][index],

                          objectFit: "contain",

                          filter:
                            [
                              "brightness(0) saturate(100%) invert(78%) sepia(29%) saturate(851%) hue-rotate(36deg) brightness(96%) contrast(88%)",
                            ][index],
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
                      <div style={{ color: "#FFFFFF" }}>
                        {item.top}
                      </div>

                      <div style={{ color: "#9ECE52" }}>
                        {item.bottom}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <Route
        path="/product"
        element={<Product />}
      />

      <Route
        path="/info"
        element={<Info />}
      />

      <Route
        path="/reviews"
        element={<Reviews />}
      />

      <Route
        path="/checkout"
        element={<Checkout />}
      />

      <Route
        path="/privacy"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/contacts"
        element={<Contacts />}
      />

      <Route
        path="/delivery"
        element={<Delivery />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />
    </Routes>
  );
}