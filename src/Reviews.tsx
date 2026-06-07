import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "./supabase";
import {
  X,
  ArrowLeft,
  Image as ImageIcon,
  Send,
  User,
  MessageSquare,
  Calendar,
  Sparkles,
  Loader2,
} from "lucide-react";

interface ReviewItem {
  id: number;
  name: string;
  review: string;
  date: string;
  images: string[];
  approved: boolean;
}

export default function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );

  const handlePointerDown = (clientX: number, clientY: number) => {
    dragStartRef.current = { x: clientX, y: clientY, time: Date.now() };
  };

  const handlePointerUp = (clientX: number, clientY: number) => {
    if (!dragStartRef.current) return;
    const deltaX = Math.abs(clientX - dragStartRef.current.x);
    const deltaY = Math.abs(clientY - dragStartRef.current.y);
    const deltaTime = Date.now() - dragStartRef.current.time;

    // Close only on a quick, clean tap with minimal movement to not interrupt swiping
    if (deltaX < 12 && deltaY < 12 && deltaTime < 280) {
      setSelectedImages([]);
      setSelectedIndex(0);
    }
    dragStartRef.current = null;
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("id", { ascending: false });

    if (!error && data) {
      setReviews(data as ReviewItem[]);
    }
  }

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

        {/* Заголовок */}
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
            Отзывы
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
            <MessageSquare size={14} />
            МНЕНИЯ НАШИХ ПОКУПАТЕЛЕЙ
          </div>
        </div>

        {/* Форма для нового отзыва */}
        <div
          style={{
            background: "rgba(13, 20, 10, 0.70)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(158, 206, 82, 0.18)",
            padding: "24px 20px",
            marginBottom: "32px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: "18px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Sparkles size={18} style={{ color: "#9ECE52" }} />
            <span>Оставить отзыв</span>
          </div>

          {/* Имя */}
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            disabled={isUploading}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 18px",
              borderRadius: "16px",
              border: "1px solid rgba(158, 206, 82, 0.2)",
              background: "rgba(255, 255, 255, 0.04)",
              color: "#FFFFFF",
              marginBottom: "14px",
              fontSize: "15px",
              boxSizing: "border-box",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 0.2s, background-color 0.2s",
            }}
          />

          {/* Отзыв */}
          <textarea
            placeholder="Поделитесь вашим отзывом..."
            value={review}
            disabled={isUploading}
            onChange={(e) => setReview(e.target.value)}
            style={{
              width: "100%",
              minHeight: "110px",
              padding: "16px 18px",
              borderRadius: "16px",
              border: "1px solid rgba(158, 206, 82, 0.2)",
              background: "rgba(255, 255, 255, 0.04)",
              color: "#FFFFFF",
              marginBottom: "16px",
              fontSize: "15px",
              resize: "none",
              boxSizing: "border-box",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 0.2s, background-color 0.2s",
            }}
          />

          {/* Фотографии скрытые и стилизованный инпут */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            disabled={isUploading}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setImages(files);
            }}
            style={{
              display: "none",
            }}
          />

          <div
            onClick={() => {
              if (!isUploading) {
                fileInputRef.current?.click();
              }
            }}
            style={{
              border: "1px dashed rgba(158, 206, 82, 0.4)",
              borderRadius: "16px",
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
              background: "rgba(158, 206, 82, 0.03)",
              marginBottom: "20px",
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            <ImageIcon size={22} style={{ color: "#9ECE52" }} />
            <div
              style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}
            >
              {images.length > 0
                ? `Прикреплено файлов: ${images.length}`
                : "Добавить фотографии"}
            </div>
            {images.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                  marginTop: "4px",
                }}
              >
                {images.map((img, i) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(158,206,82,0.15)",
                      color: "#9ECE52",
                      padding: "2px 8px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {img.name.substring(0, 15)}...
                  </span>
                ))}
              </div>
            )}
            <div
              style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.45)" }}
            >
              Максимум 2 фотографии
            </div>
          </div>

          {/* Кнопка отправки */}
          <button
            onClick={async () => {
              if (!name.trim() || !review.trim()) {
                alert("Заполните имя и отзыв");
                return;
              }

              if (images.length > 2) {
                alert(
                  "Отзыв не может быть отправлен, так как прикреплено более двух фотографий"
                );
                return;
              }

              setIsUploading(true);

              try {
                const uploadedImages: string[] = [];

                for (const image of images) {
                  const fileName = `${Date.now()}-${Math.random()}-${image.name}`;

                  const { error: uploadError } = await supabase.storage
                    .from("reviews")
                    .upload(fileName, image);

                  if (!uploadError) {
                    const { data } = supabase.storage
                      .from("reviews")
                      .getPublicUrl(fileName);

                    if (data?.publicUrl) {
                      uploadedImages.push(data.publicUrl);
                    }
                  }
                }

                const today = new Date().toLocaleDateString("ru-RU");

                const { error } = await supabase.from("reviews").insert([
                  {
                    name,
                    review,
                    date: today,
                    images: uploadedImages,
                    approved: false,
                  },
                ]);

                if (!error) {
                  alert("Отзыв отправлен и ожидает модерации");
                  setName("");
                  setReview("");
                  setImages([]);

                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                } else {
                  alert("Произошла ошибка при отправке отзыва.");
                }
              } catch (err) {
                console.error(err);
                alert("Произошла неожиданная ошибка.");
              } finally {
                setIsUploading(false);
              }
            }}
            disabled={isUploading}
            style={{
              width: "100%",
              height: "56px",
              border: "none",
              borderRadius: "16px",
              background: isUploading ? "rgba(158, 206, 82, 0.5)" : "#9ECE52",
              color: "#000000",
              fontSize: "16px",
              fontWeight: 800,
              cursor: isUploading ? "not-allowed" : "pointer",
              boxShadow: "0 6px 20px rgba(158, 206, 82, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              transition: "transform 0.2s, background 0.2s",
            }}
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Отправка...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Отправить отзыв</span>
              </>
            )}
          </button>
        </div>

        {/* Заголовок ленты отзывов */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.5px",
            marginBottom: "18px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>💬</span> Отзывы покупателей ({reviews.length})
        </div>

        {/* Список отзывов */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {reviews.length === 0 ? (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "20px",
                padding: "36px 20px",
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "15px",
              }}
            >
              Отзывов пока нет. Будьте первыми, кто оставит свое мнение!
            </div>
          ) : (
            reviews.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "20px",
                  padding: "20px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Верх */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(158, 206, 82, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#9ECE52",
                      }}
                    >
                      <User size={15} />
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#FFFFFF",
                      }}
                    >
                      {item.name}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "13px",
                      color: "rgba(255, 255, 255, 0.45)",
                    }}
                  >
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Текст */}
                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "rgba(255, 255, 255, 0.85)",
                    marginBottom: item.images?.length > 0 ? "16px" : "0px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.review}
                </div>

                {/* Фото в отзыве */}
                {item.images?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      overflowX: "auto",
                      paddingBottom: "4px",
                    }}
                  >
                    {item.images.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedImages(item.images);
                          setSelectedIndex(index);
                        }}
                        style={{
                          position: "relative",
                          width: "110px",
                          height: "110px",
                          borderRadius: "14px",
                          overflow: "hidden",
                          flexShrink: 0,
                          cursor: "zoom-in",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <img
                          src={image}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedImages.length > 0 && (
        <>
          {/* Кнопка закрытия в верхнем правом углу */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImages([]);
              setSelectedIndex(0);
            }}
            style={{
              position: "fixed",
              top: "24px",
              right: "24px",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(20, 20, 20, 0.8)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10000,
              transition: "transform 0.2s ease, background-color 0.2s ease",
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)",
            }}
          >
            <X size={24} />
          </button>

          {/* Галерея слайдов */}
          <div
            onTouchStart={(e) => {
              if (e.touches && e.touches[0]) {
                handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchEnd={(e) => {
              if (e.changedTouches && e.changedTouches[0]) {
                handlePointerUp(
                  e.changedTouches[0].clientX,
                  e.changedTouches[0].clientY
                );
              }
            }}
            onMouseDown={(e) => {
              handlePointerDown(e.clientX, e.clientY);
            }}
            onMouseUp={(e) => {
              handlePointerUp(e.clientX, e.clientY);
            }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(8, 10, 8, 0.96)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              cursor: "zoom-out",
              userSelect: "none",
            }}
          >
            {selectedImages.map((img, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el && index === selectedIndex) {
                    el.scrollIntoView({
                      behavior: "auto",
                      inline: "center",
                    });
                  }
                }}
                style={{
                  minWidth: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  boxSizing: "border-box",
                  scrollSnapAlign: "center",
                }}
              >
                <img
                  src={img}
                  alt=""
                  draggable={false}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "85%",
                    borderRadius: "20px",
                    objectFit: "contain",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
