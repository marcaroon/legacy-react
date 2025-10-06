import { useState, useEffect } from "react";

export default function Theme() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredChallenge, setHoveredChallenge] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  const fundamentalQuestions = [
    "Bagaimana caranya agar bisnis keluarga tidak sekadar bertahan?",
    "Bagaimana tumbuh dengan identitas yang relevan?",
    "Bagaimana menyeimbangkan tradisi dengan modernisasi?",
    "Bagaimana menghubungkan nilai lama dengan kebutuhan zaman baru?",
  ];

  const challenges = [
    {
      title: "Warisan Pendiri",
      content:
        "Di balik setiap family business, ada kisah tentang keberanian seorang pendiri yang memulai dari nol dengan keringat, doa, dan mimpi sederhana agar usahanya bisa menjadi warisan bagi generasi berikutnya.",
      gradient: "linear-gradient(135deg, #662C8F, #C59CDE)",
    },
    {
      title: "Persimpangan Jalan",
      content:
        "Generasi penerus seringkali berada di persimpangan jalan, di satu sisi ada tanggung jawab untuk menjaga akar dan batang yang sudah kokoh, di sisi lain ada dorongan untuk menumbuhkan cabang serta tunas baru yang lebih sesuai dengan era mereka.",
      gradient: "linear-gradient(135deg, #ED6335, #F7941D)",
    },
    {
      title: "Benturan Nilai",
      content:
        "Tidak jarang muncul benturan antara tradisi dan modernisasi, antara rasa hormat kepada pendiri dan keinginan untuk melakukan pembaruan.",
      gradient: "linear-gradient(135deg, #F7941D, #C59CDE)",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveQuestion((prev) => (prev + 1) % fundamentalQuestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="theme"
      className="py-20 px-6 relative overflow-hidden min-h-screen"
      style={{ backgroundColor: "#F5F4F2" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#662C8F",
            filter: "blur(100px)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full opacity-15 animate-pulse"
          style={{
            backgroundColor: "#ED6335",
            filter: "blur(80px)",
            animationDelay: "2s",
          }}
        ></div>

        {/* Floating elements */}
        <div
          className="absolute top-20 left-20 w-3 h-3 rounded-full animate-float"
          style={{ backgroundColor: "#C59CDE", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-4 h-4 rounded-full animate-float"
          style={{ backgroundColor: "#F7941D", animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-16 w-2 h-2 rounded-full animate-float"
          style={{ backgroundColor: "#ED6335", animationDelay: "5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-4xl md:text-6xl font-light mb-8 leading-tight"
            style={{ color: "#662C8F" }}
          >
            Program
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r font-semibold mt-2"
              style={{
                backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
              }}
            >
              Tagline
            </span>
          </h2>
        </div>

        {/* Main Theme Section - Redesigned */}
        <div className="text-center mb-24 relative">
          <div className="max-w-6xl mx-auto">
            {/* <p
              className="text-lg md:text-xl font-light mb-8 opacity-80"
              style={{ color: "#662C8F" }}
            >
              Tema utama program ini adalah
            </p> */}

            {/* Large Centered Quote */}
            <div className="relative mb-12">
              <div
                className="absolute -top-8 -left-4 md:-left-12 text-8xl md:text-9xl opacity-10 font-serif"
                style={{ color: "#ED6335" }}
              >
                "
              </div>
              <h3
                className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight px-8 md:px-16 py-8 relative"
                style={{
                  background:
                    "linear-gradient(135deg, #662C8F 0%, #ED6335 50%, #F7941D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                From roots to greatness, seed the future
              </h3>
              <div
                className="absolute -bottom-4 -right-4 md:-right-12 text-8xl md:text-9xl opacity-10 font-serif"
                style={{ color: "#F7941D" }}
              >
                "
              </div>
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div
                className="h-px w-20 md:w-40"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #ED6335, transparent)",
                }}
              ></div>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#ED6335" }}
              ></div>
              <div
                className="h-px w-20 md:w-40"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #ED6335, transparent)",
                }}
              ></div>
            </div>

            <p
              className="text-lg md:text-xl font-light max-w-4xl mx-auto leading-relaxed"
              style={{ color: "#662C8F" }}
            >
              Rooted in legacy, growing with innovation — peserta membangun
              jembatan dari nilai keluarga menuju masa depan bisnis yang
              relevan.
            </p>
          </div>
        </div>

        {/* Interactive Questions Section - Redesigned */}
        <div className="mb-24">
          <div className="text-center mb-12">
            {/* <h3
              className="text-3xl md:text-4xl font-light mb-12"
              style={{ color: "#662C8F" }}
            >
              Pertanyaan Fundamental
            </h3> */}

            {/* Question Display - Minimal Design */}
            <div
              className="relative py-16 px-8"
              onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchStartX === null) return;
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 50) {
                  if (diff > 0) {
                    setActiveQuestion(
                      (prev) => (prev + 1) % fundamentalQuestions.length
                    );
                  } else {
                    setActiveQuestion(
                      (prev) =>
                        (prev - 1 + fundamentalQuestions.length) %
                        fundamentalQuestions.length
                    );
                  }
                }
                setTouchStartX(null);
              }}
            >
              {/* Left Quote */}
              <div
                className="absolute top-8 left-4 md:left-12 text-6xl opacity-20 font-serif"
                style={{ color: "#ED6335" }}
              >
                "
              </div>

              <p
                className="text-xl md:text-3xl font-regular italic transition-all duration-1000 max-w-4xl mx-auto"
                style={{ color: "#662C8F" }}
              >
                {fundamentalQuestions[activeQuestion]}
              </p>

              {/* Right Quote */}
              <div
                className="absolute bottom-8 right-4 md:right-12 text-6xl opacity-20 font-serif"
                style={{ color: "#F7941D" }}
              >
                "
              </div>
            </div>

            {/* Question Indicators */}
            <div className="flex justify-center space-x-3">
              {fundamentalQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveQuestion(index)}
                  className={`transition-all duration-500 rounded-full ${
                    index === activeQuestion
                      ? "w-12 h-3"
                      : "w-3 h-3 hover:scale-125"
                  }`}
                  style={{
                    backgroundColor:
                      index === activeQuestion ? "#ED6335" : "#C59CDE",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Challenge Context Section - Redesigned */}
        <div className="mb-20">
          <h3
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
            style={{ color: "#662C8F" }}
          >
            Tantangan Generasi Penerus
          </h3>

          <div className="space-y-16 max-w-5xl mx-auto">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="relative transition-all duration-500"
                onMouseEnter={() => setHoveredChallenge(index)}
                onMouseLeave={() => setHoveredChallenge(null)}
              >
                {/* Number Badge - Floating */}
                <div
                  className="absolute -left-2 md:-left-20 top-0 transition-all duration-500"
                  style={{
                    transform:
                      hoveredChallenge === index ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  <div
                    className="w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-base md:text-2xl"
                    style={{
                      background: challenge.gradient,
                      boxShadow:
                        hoveredChallenge === index
                          ? "0 8px 20px rgba(0,0,0,0.2)"
                          : "0 3px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="pl-12 md:pl-4">
                  <h4
                    className="text-lg md:text-3xl font-semibold mb-3 transition-all duration-300"
                    style={{
                      color: hoveredChallenge === index ? "#ED6335" : "#662C8F",
                    }}
                  >
                    {challenge.title}
                  </h4>
                  <p
                    className="text-sm md:text-lg leading-relaxed opacity-90"
                    style={{ color: "#662C8F" }}
                  >
                    {challenge.content}
                  </p>
                </div>

                {/* Connecting Line */}
                {index < challenges.length - 1 && (
                  <div
                    className="absolute left-2 md:left-[-44px] top-16 md:top-20 w-px h-16 md:h-20 opacity-20"
                    style={{ backgroundColor: "#662C8F" }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Central Question - Redesigned */}
        {/* <div className="text-center mb-20 relative py-12">
          <p className="text-2xl md:text-4xl font-light italic leading-relaxed max-w-5xl mx-auto">
            <span style={{ color: "#662C8F" }}>
              "Bagaimana caranya agar bisnis keluarga tidak sekadar bertahan,
            </span>
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r font-normal mt-2"
              style={{
                backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
              }}
            >
              tetapi juga tumbuh dengan identitas yang relevan?"
            </span>
          </p>
        </div> */}

        {/* Solution Preview - Redesigned */}
        {/* <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="relative group">
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, #ED6335, #F7941D)",
                filter: "blur(20px)",
              }}
            ></div>
            <div className="relative p-8 md:p-10">
              <div
                className="inline-block px-6 py-2 rounded-full mb-6"
                style={{
                  background: "linear-gradient(135deg, #ED6335, #F7941D)",
                }}
              >
                <h4 className="text-lg md:text-xl font-semibold text-white">
                  Solusi LEGACY
                </h4>
              </div>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "#662C8F" }}
              >
                Program yang menggabungkan pembelajaran praktis, networking
                strategis, dan mentorship berkelanjutan untuk mempersiapkan
                generasi penerus dalam menghadapi tantangan bisnis modern.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, #F7941D, #C59CDE)",
                filter: "blur(20px)",
              }}
            ></div>
            <div className="relative p-8 md:p-10">
              <div
                className="inline-block px-6 py-2 rounded-full mb-6"
                style={{
                  background: "linear-gradient(135deg, #F7941D, #C59CDE)",
                }}
              >
                <h4 className="text-lg md:text-xl font-semibold text-white">
                  Pendekatan Unik
                </h4>
              </div>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "#662C8F" }}
              >
                Belajar dengan praktik langsung melalui real-life business
                practice, studi kasus nyata, dan interaksi langsung dengan para
                pelaku bisnis sukses.
              </p>
            </div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
