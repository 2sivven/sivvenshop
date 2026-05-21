import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "./supabase";

export default function Reviews() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] =
  useState(null);

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
          Отзывы
        </div>

      </div>

      {/* Основная карточка */}

      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "28px",
          padding: "28px 24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        {/* Имя */}

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

        {/* Отзыв */}

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

        {/* Фото */}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(
              e.target.files
            ).slice(0, 2);

            setImages(files);
          }}
          style={{
            marginBottom: "20px",
          }}
        />

        {/* Кнопка */}

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

                uploadedImages.push(
                  data.publicUrl
                );
              }
            }

            const today =
              new Date().toLocaleDateString(
                "ru-RU"
              );

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
                fileInputRef.current.value =
                  "";
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

        {/* Список отзывов */}

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
                  justifyContent:
                    "space-between",

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
                  {item.images.map(
                    (image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt=""
                        onClick={() => setSelectedImage(image)}
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                          borderRadius: "16px",
                          flexShrink: 0,
                          cursor: "zoom-in",
                        }}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
            onClick={() => setSelectedImage(null)}
            style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            padding: "20px",

            cursor: "pointer",
            }}
        >
            <img
            src={selectedImage}
            alt=""
            style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "20px",
                objectFit: "contain",
            }}
            />
        </div>
        )}
    </div>
  );
}