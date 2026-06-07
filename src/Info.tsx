import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sprout,
  Home,
  MapPin,
  Fence,
  Trees,
  Sparkles,
  AlertTriangle,
  Sun,
  Wind,
  CloudRain,
  Thermometer,
  Droplet,
  CheckCircle2,
  Check,
  Compass,
} from "lucide-react";

export default function Info() {
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
        overflowY: "auto",
        color: "white",
        fontFamily: "SF Pro Display, sans-serif",
        padding: "24px 20px 40px 20px",
        boxSizing: "border-box",
      }}
    >
      {/* Полное фоновое затемнение для идеального контраста текстов */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, rgba(8, 12, 6, 0.82) 0%, rgba(6, 9, 5, 0.96) 100%)",
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: "36px",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Верхняя панель */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "28px",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "1px solid rgba(158, 206, 82, 0.3)",
              background: "rgba(17, 25, 13, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "#9ECE52",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
          >
            <ArrowLeft size={22} style={{ color: "#9ECE52" }} />
          </button>
          <div />
        </div>

        {/* Заголовок со светящимся акцентом */}
        <div
          style={{
            marginBottom: "30px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "clamp(34px, 8vw, 44px)",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: "8px",
              background: "linear-gradient(180deg, #FFFFFF 40%, #E4E4E7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              textShadow: "0 4px 15px rgba(0,0,0,0.5)",
            }}
          >
            Информация
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(158, 206, 82, 0.15)",
              border: "1px solid rgba(158, 206, 82, 0.45)",
              borderRadius: "30px",
              padding: "4px 16px 4px 12px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#9ECE52",
              letterSpacing: "1px",
              boxShadow: "0 4px 15px rgba(158, 206, 82, 0.15)",
            }}
          >
            <Sparkles size={14} />
            GLIFOSAT 480 G/L, SARE
          </div>
        </div>

        {/* Сводный блок описания препарата */}
        <div
          style={{
            background: "rgba(13, 20, 10, 0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "24px",
            border: "1px solid rgba(158, 206, 82, 0.18)",
            padding: "24px 20px",
            marginBottom: "24px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.65,
              color: "rgba(255, 255, 255, 0.92)",
              fontWeight: 400,
            }}
          >
            Глифосат — системный гербицид тотального действия, предназначенный
            для уничтожения большинства видов однолетних и многолетних сорняков.
            <br />
            <br />
            Препарат проникает через листья и стебли растений, после чего
            распространяется по корневой системе, полностью останавливая рост
            нежелательной растительности.
          </div>
        </div>

        {/* Бытовое применение */}
        <div
          style={{
            background: "rgba(13, 20, 10, 0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "24px",
            border: "1px solid rgba(158, 206, 82, 0.15)",
            padding: "24px 20px",
            marginBottom: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "24px",
              fontWeight: 800,
              marginBottom: "20px",
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
            }}
          >
            <Home size={22} style={{ color: "#9ECE52" }} />
            <span>Применение в быту</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {[
              {
                text: "тротуарная плитка и дорожки",
                icon: <MapPin size={16} />,
              },
              { text: "придомовые территории", icon: <Home size={16} /> },
              { text: "дачные участки", icon: <Sprout size={16} /> },
              { text: "вдоль заборов и построек", icon: <Fence size={16} /> },
              { text: "заброшенные территории", icon: <Trees size={16} /> },
              {
                text: "участки перед подготовкой к посадке",
                icon: <Sparkles size={16} />,
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  fontSize: "15px",
                  lineHeight: "1.4",
                  color: "rgba(255, 255, 255, 0.88)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(158, 206, 82, 0.12)",
                    color: "#9ECE52",
                  }}
                >
                  {item.icon}
                </div>
                <span>• {item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Аграрное применение */}
        <div
          style={{
            background: "rgba(13, 20, 10, 0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "24px",
            border: "1px solid rgba(158, 206, 82, 0.15)",
            padding: "24px 20px",
            marginBottom: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "24px",
              fontWeight: 800,
              marginBottom: "16px",
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
            }}
          >
            <Sprout size={24} style={{ color: "#9ECE52" }} />
            <span>Аграрное применение</span>
          </div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.85)",
              marginBottom: "20px",
              background: "rgba(255,255,255,0.02)",
              padding: "16px",
              borderRadius: "16px",
              borderLeft: "3px solid #9ECE52",
            }}
          >
            Препарат зарегистрирован для борьбы с однолетними и многолетними
            злаковыми и двудольными сорняками путём опрыскивания в период
            активного роста.
          </div>

          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "12px",
              opacity: 0.9,
            }}
          >
            Используется на:
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {[
              "яблоневых садах",
              "виноградниках",
              "сельскохозяйственных полях",
              "территориях после уборки урожая",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(158, 206, 82, 0.04)",
                  border: "1px solid rgba(158, 206, 82, 0.15)",
                  borderRadius: "16px",
                  padding: "12px 18px",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "1.4",
                  color: "rgba(255, 255, 255, 0.95)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    color: "#9ECE52",
                    background: "rgba(158, 206, 82, 0.12)",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(158, 206, 82, 0.1)",
                  }}
                >
                  <CheckCircle2 size={16} />
                </div>
                <span>• {item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ВНИМАНИЕ */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(220, 38, 38, 0.06) 100%)",
            borderRadius: "24px",
            padding: "24px 20px",
            marginBottom: "24px",
            border: "1px solid rgba(249, 115, 22, 0.35)",
            boxShadow: "0 8px 24px rgba(249, 115, 22, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "22px",
              fontWeight: 900,
              color: "#F97316",
              marginBottom: "16px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            <AlertTriangle
              size={24}
              style={{ fill: "rgba(249, 115, 22, 0.1)" }}
            />
            ВНИМАНИЕ
          </div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(255, 237, 213, 0.92)",
            }}
          >
            <strong>Препарат относится к IV классу опасности.</strong>
            <br />
            <br />
            Во время обработки рекомендуется использовать:
            <div
              style={{
                marginTop: "16px",
                marginBottom: "20px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {[
                "Респиратор",
                "Защитные перчатки",
                "Защитные очки",
                "Закрытая одежда",
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                    background: "rgba(249, 115, 22, 0.04)",
                    borderLeft: "3px solid #F97316",
                    borderTop: "1px solid rgba(249, 115, 22, 0.1)",
                    borderRight: "1px solid rgba(249, 115, 22, 0.1)",
                    borderBottom: "1px solid rgba(249, 115, 22, 0.1)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    color: "rgba(255, 255, 255, 0.95)",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{
                  color: "#FCA5A5",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                <span>•</span>
                <span>
                  Не допускайте попадания раствора на культурные растения и
                  деревья.
                </span>
              </span>
              <span
                style={{
                  color: "#FCA5A5",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                <span>•</span>
                <span>
                  Категорически не допускайте попадания химического раствора в
                  реки, озера, пруды или любые другие водоемы.
                </span>
              </span>
              <span
                style={{
                  color: "#FCA5A5",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                <span>•</span>
                <span>
                  Пустую тару от препарата запрещается выбрасывать в
                  непредназначенных для этого местах; она подлежит обязательной
                  утилизации строго в соответствии с действующим
                  законодательством.
                </span>
              </span>
            </div>
            <br />
            <em>
              Перед использованием обязательно ознакомьтесь с инструкцией
              производителя на этикетке товара.
            </em>
          </div>
        </div>

        {/* Условия обработки */}
        <div
          style={{
            background: "rgba(13, 20, 10, 0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "24px",
            border: "1px solid rgba(158, 206, 82, 0.15)",
            padding: "24px 20px",
            marginBottom: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "24px",
              fontWeight: 800,
              marginBottom: "20px",
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
            }}
          >
            <Compass size={22} style={{ color: "#9ECE52" }} />
            <span>Условия обработки</span>
          </div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            <div
              style={{
                marginBottom: "16px",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Не рекомендуется проводить обработку:
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {[
                { label: "перед дождём", icon: <CloudRain size={16} /> },
                { label: "при сильном ветре", icon: <Wind size={16} /> },
                { label: "под палящим солнцем", icon: <Sun size={16} /> },
                { label: "в жаркую погоду", icon: <Thermometer size={16} /> },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(239, 68, 68, 0.05)",
                    border: "1px solid rgba(239, 68, 68, 0.15)",
                    borderRadius: "14px",
                    padding: "12px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <div style={{ color: "#EF4444" }}>{item.icon}</div>
                  <span>• {item.label}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "rgba(158, 206, 82, 0.08)",
                border: "1px solid rgba(158, 206, 82, 0.35)",
                padding: "14px 16px",
                borderRadius: "16px",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "16px" }}>🌅</span>
              <span>
                Лучшее время для обработки — вечерние часы после 18:00.
              </span>
            </div>
          </div>
        </div>

        {/* Рабочий раствор */}
        <div
          style={{
            background: "rgba(13, 20, 10, 0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "24px",
            border: "1px solid rgba(158, 206, 82, 0.15)",
            padding: "24px 20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "24px",
              fontWeight: 800,
              marginBottom: "12px",
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
            }}
          >
            <Droplet size={22} style={{ color: "#9ECE52" }} />
            <span>Рабочий раствор</span>
          </div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: "24px",
              opacity: 0.9,
            }}
          >
            В бытовых условиях рекомендуется использовать 150 мл препарата на 10
            литров воды.
          </div>

          {/* Шаги */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginBottom: "24px",
            }}
          >
            {[
              "Наберите в ёмкость 10 литров воды",
              "Добавьте 150 мл препарата",
              "Тщательно перемешайте раствор",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "18px",
                  padding: "16px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    minWidth: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#9ECE52",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "15px",
                    boxShadow: "0 0 12px rgba(158, 206, 82, 0.4)",
                  }}
                >
                  {index + 1}
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: "rgba(255, 255, 255, 0.95)",
                  }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>

          {/* Результат */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "24px",
            }}
          >
            {[
              "Для лучшего эффекта добавьте около 50 мл обычного жидкого мыла.",
              "Первые признаки воздействия препарата появляются через 5–7 дней.",
              "Гербицид уничтожает практически всю растительность, на которую попадает раствор, поэтому избегайте контакта with культурными растениями.",
              "На обработанном участке рекомендуется полностью исключить механическое воздействие на почву в течение 3 дней и любой ручной (мануальный) контакт в течение 7 дней.",
            ].map((tip, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "14px",
                  lineHeight: 1.5,
                  color: "rgba(255, 255, 255, 0.8)",
                  background: "rgba(255,255,255,0.01)",
                  padding: "12px 14px",
                  borderRadius: "12px",
                }}
              >
                <div style={{ color: "#9ECE52" }}>
                  <Check size={16} />
                </div>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
