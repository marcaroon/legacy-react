import { useState, useEffect } from "react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      title: "From roots to greatness",
      subtitle: "seed the future",
      description:
        "Program pelatihan interaktif untuk mempersiapkan calon penerus bisnis keluarga di seluruh Indonesia",
      highlight: "Generasi Baru, Visi Masa Depan",
    },
    {
      title: "Warisan Berkelanjutan",
      subtitle: "untuk Indonesia",
      description:
        "Membangun jembatan antara tradisi keluarga dan inovasi modern dalam bisnis keluarga",
      highlight: "Tradisi & Modernitas",
    },
    {
      title: "Komunitas Pemimpin",
      subtitle: "Masa Depan",
      description:
        "Bergabung dengan ekosistem kolaboratif generasi penerus bisnis keluarga Indonesia",
      highlight: "Kolaborasi Strategis",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#F5F4F2" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20 animate-pulse"
          style={{ backgroundColor: "#662C8F", filter: "blur(60px)" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-20 animate-pulse"
          style={{
            backgroundColor: "#ED6335",
            filter: "blur(40px)",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-15 animate-ping"
          style={{ backgroundColor: "#F7941D", animationDuration: "4s" }}
        ></div>

        {/* Geometric shapes */}
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-bounce"
          style={{ backgroundColor: "#C59CDE", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-3 h-3 rounded-full animate-bounce"
          style={{ backgroundColor: "#ED6335", animationDelay: "3s" }}
        ></div>
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-10 text-center px-6 max-w-6xl mx-auto transition-opacity duration-1000 ease-out
        ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight">
          <span style={{ color: "#662C8F" }}>
            {heroSlides[currentSlide].title}
          </span>
          <br />
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r font-normal"
            style={{
              backgroundImage: `linear-gradient(135deg, #ED6335, #F7941D)`,
            }}
          >
            {heroSlides[currentSlide].subtitle}
          </span>
        </h1>

        {/* Description */}
        <p
          className="text-xl md:text-2xl font-   mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{ color: "#662C8F" }}
        >
          {heroSlides[currentSlide].description}
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            className="px-10 py-4 rounded-full font-medium text-white text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #662C8F, #C59CDE)" }}
            onClick={() => {
              document
                .getElementById("registration")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Daftar Sekarang
          </button>
          <button
            className="px-10 py-4 rounded-full font-medium text-lg border-2 transition-all duration-300 hover:shadow-lg"
            style={{
              color: "#662C8F",
              borderColor: "#C59CDE",
              backgroundColor: "rgba(197, 156, 222, 0.1)",
            }}
            onClick={() => {
              document
                .getElementById("about")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Pelajari Lebih Lanjut
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide ? "w-8 h-3" : "w-3 h-3 hover:scale-125"
              }`}
              style={{
                backgroundColor: index === currentSlide ? "#ED6335" : "#C59CDE",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
