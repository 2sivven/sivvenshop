import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "./supabase";

export default function Info() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("id", { ascending: false });

    if (!error) {
      setReviews(data);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F2",
        color: "#161616",
        fontFamily: "SF Pro Display, sans-serif",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* Верхняя панель */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "34px",
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

      {/* Заголовок */}
      <div
        style={{
          marginBottom: "26px",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1,
            marginBottom: "10px",
          }}
        >
          Информация
        </div>

        <div
          style={{
            fontSize: "18px",
            opacity: 0.62,
            lineHeight: 1.5,
          }}
        >
          Glifosat 480 g/l, sare
        </div>
      </div>

      {/* Основная карточка */}

      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "28px",
          padding: "28px 24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          marginBottom: "0px",
        }}
      >
        {/* Форма отзывов */}

        <div
          style={{
            marginBottom: "40px",
          }}
        >

        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "20px",
            color: "#161616",
          }}
        >
          Отзывы
        </div>

        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "1px solid #E5E5E5",
            marginBottom: "16px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <textarea
          placeholder="Ваш отзыв"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{
            width: "100%",
            minHeight: "140px",
            padding: "18px",
            borderRadius: "18px",
            border: "1px solid #E5E5E5",
            marginBottom: "16px",
            fontSize: "16px",
            resize: "none",
            boxSizing: "border-box",
          }}
        />

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files).slice(0, 2);
            setImages(files);
          }}
          style={{
            marginBottom: "20px",
          }}
        />

        <button
          onClick={async () => {
            if (!name || !review) {
              alert("Заполните имя и отзыв");
              return;
            }

            const uploadedImages = [];

            for (const image of images) {
              const fileName =
                `${Date.now()}-${image.name}`;

              const { error: uploadError } =
                await supabase.storage
                  .from("reviews")
                  .upload(fileName, image);

              if (!uploadError) {
                const { data } = supabase.storage
                  .from("reviews")
                  .getPublicUrl(fileName);

                uploadedImages.push(data.publicUrl);
              }
            }

            const today =
              new Date().toLocaleDateString("ru-RU");

            const { error } = await supabase
              .from("reviews")
              .insert([
                {
                  name,
                  review,
                  date: today,
                  images: uploadedImages,
                  approved: false,
                },
              ]);

            if (!error) {
              alert(
                "Отзыв отправлен и ожидает модерации"
              );

              setName("");
              setReview("");
              setImages([]);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }
          }}
          style={{
            width: "100%",
            height: "60px",
            border: "none",
            borderRadius: "20px",

            background:
              "linear-gradient(180deg,#8ED61A 0%,#6FAE08 100%)",

            color: "#fff",

            fontSize: "18px",
            fontWeight: 700,

            cursor: "pointer",
          }}
        >
          Отправить отзыв
        </button>

        <div
          style={{
            marginTop: "34px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {reviews.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#F7F7F4",
                borderRadius: "22px",
                padding: "18px",
              }}
            >
              {/* Верх */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "17px",
                    color: "#161616",
                  }}
                >
                  {item.name}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    opacity: 0.55,
                  }}
                >
                  {item.date}
                </div>
              </div>

              {/* Текст */}

              <div
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "#333",
                  marginBottom:
                    item.images?.length > 0
                      ? "14px"
                      : "0px",
                }}
              >
                {item.review}
              </div>

              {/* Фото */}

              {item.images?.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    overflowX: "auto",
                  }}
                >
                  {item.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt=""
                      style={{
                        width: "110px",
                        height: "110px",
                        objectFit: "cover",
                        borderRadius: "16px",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>     

        {/* Описание */}
        <div
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#2A2A2A",
            marginBottom: "34px",
          }}
        >
          Глифосат — системный гербицид тотального действия,
          предназначенный для уничтожения большинства видов
          однолетних и многолетних сорняков.

          <br />
          <br />

          Препарат проникает через листья и стебли растений,
          после чего распространяется по корневой системе,
          полностью останавливая рост нежелательной растительности.
        </div>

        {/* Бытовое применение */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "18px",
            color: "#161616",
          }}
        >
          Применение в быту
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#333",
            marginBottom: "36px",
          }}
        >
          • тротуарная плитка и дорожки
          <br />
          • придомовые территории
          <br />
          • дачные участки
          <br />
          • вдоль заборов и построек
          <br />
          • заброшенные территории
          <br />
          • участки перед подготовкой к посадке
        </div>

        {/* Аграрное применение */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "18px",
            color: "#161616",
          }}
        >
          Аграрное применение
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#333",
            marginBottom: "38px",
          }}
        >
          Препарат зарегистрирован для борьбы
          с однолетними и многолетними
          злаковыми и двудольными сорняками
          путём опрыскивания в период активного роста.

          <br />
          <br />

          Используется на:
          <br />
          • яблоневых садах
          <br />
          • виноградниках
          <br />
          • сельскохозяйственных полях
          <br />
          • территориях после уборки урожая
        </div>

        {/* ВНИМАНИЕ */}
        <div
          style={{
            background:
              "linear-gradient(180deg, #FFF4E4 0%, #FFE8CC 100%)",

            borderRadius: "24px",

            padding: "22px",

            marginBottom: "36px",

            border: "1px solid rgba(255,170,80,0.25)",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#C56A00",
              marginBottom: "16px",
            }}
          >
            ВНИМАНИЕ
          </div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#5C3A00",
            }}
          >
            Препарат относится к IV классу опасности.

            <br />
            <br />

            Во время обработки рекомендуется использовать:
            <br />
            • респиратор
            <br />
            • защитные перчатки
            <br />
            • защитные очки
            <br />
            • закрытую одежду

            <br />
            <br />

            Не допускайте попадания раствора
            на культурные растения и деревья.

            <br />
            <br />

            Перед использованием обязательно ознакомьтесь
            с инструкцией производителя на этикетке товара.
          </div>
        </div>

        {/* Условия обработки */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "18px",
            color: "#161616",
          }}
        >
          Условия обработки
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#333",
            marginBottom: "38px",
          }}
        >
          Не рекомендуется проводить обработку:

          <br />
          <br />

          • перед дождём
          <br />
          • при сильном ветре
          <br />
          • под палящим солнцем
          <br />
          • в жаркую погоду

          <br />
          <br />

          Лучшее время для обработки —
          вечерние часы после 18:00.
        </div>

        {/* Раствор */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "18px",
            color: "#161616",
          }}
        >
          Рабочий раствор
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#333",
            marginBottom: "24px",
          }}
        >
          В бытовых условиях рекомендуется использовать
          150 мл препарата на 10 литров воды.
        </div>

        {/* Шаги */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
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
                background: "#F6F6F3",
                borderRadius: "20px",
                padding: "18px",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "#7EBB13",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                {index + 1}
              </div>

              <div
                style={{
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "#222",
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
            marginTop: "40px",
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#333",
          }}
        >
          Для лучшего эффекта добавьте около 50 мл обычного жидкого мыла.

          <br />
          <br />

          Первые признаки воздействия препарата
          появляются через 5–7 дней.

          <br />
          <br />

          Гербицид уничтожает практически всю растительность,
          на которую попадает раствор,
          поэтому избегайте контакта
          с культурными растениями.
        </div>
      </div>
    </div>
  );
}