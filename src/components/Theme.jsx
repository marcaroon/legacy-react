import { useState, useEffect } from "react";

export default function Theme() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredChallenge, setHoveredChallenge] = useState(null);

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
            Tema
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r font-semibold mt-2"
              style={{
                backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
              }}
            >
              Program
            </span>
          </h2>
        </div>

        {/* Main Theme Section */}
        <div className="text-center mb-20">
          <div
            className="backdrop-blur-lg rounded-3xl p-12 border max-w-5xl mx-auto"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderColor: "#E1CAF6",
            }}
          >
            <p
              className="text-2xl md:text-3xl font-light mb-8 leading-relaxed"
              style={{ color: "#662C8F" }}
            >
              Tema utama program ini adalah
            </p>

            <div
              className="inline-block rounded-3xl px-12 py-8 text-white text-2xl md:text-3xl font-medium shadow-2xl transform hover:scale-105 transition-all duration-500 mb-8"
              style={{
                background: "linear-gradient(135deg, #662C8F, #ED6335)",
              }}
            >
              "Belajar dengan Praktik Langsung"
            </div>

            <p
              className="text-lg font-light max-w-3xl mx-auto leading-relaxed"
              style={{ color: "#662C8F" }}
            >
              Peserta akan fokus pada skill praktis yang relevan dengan
              kebutuhan industri saat ini, membangun jembatan antara teori dan
              implementasi nyata dalam bisnis keluarga.
            </p>
          </div>
        </div>

        {/* Interactive Questions Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3
              className="text-3xl font-normal mb-8"
              style={{ color: "#662C8F" }}
            >
              Pertanyaan Fundamental
            </h3>

            {/* Question Display */}
            <div
              className="backdrop-blur-lg rounded-3xl p-10 border min-h-32 flex items-center justify-center"
              style={{
                backgroundColor: "rgba(237, 99, 53, 0.05)",
                borderColor: "#ED6335",
              }}
            >
              <p
                className="text-xl md:text-2xl font-light italic transition-all duration-1000 px-8 text-center"
                style={{ color: "#662C8F" }}
              >
                "{fundamentalQuestions[activeQuestion]}"
              </p>
            </div>

            {/* Question Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
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

        {/* Challenge Context Section */}
        <div
          className="backdrop-blur-lg rounded-3xl p-12 border"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#C59CDE",
          }}
        >
          <h3
            className="text-3xl font-light mb-12 text-center"
            style={{ color: "#662C8F" }}
          >
            Tantangan Generasi Penerus
          </h3>

          <div className="space-y-8">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="group backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-500 cursor-pointer hover:scale-105"
                style={{
                  backgroundColor:
                    hoveredChallenge === index
                      ? "rgba(255, 255, 255, 0.9)"
                      : "rgba(255, 255, 255, 0.7)",
                  borderColor:
                    hoveredChallenge === index ? "#ED6335" : "#E1CAF6",
                }}
                onMouseEnter={() => setHoveredChallenge(index)}
                onMouseLeave={() => setHoveredChallenge(null)}
              >
                <div className="flex items-start gap-8">
                  {/* Visual Element */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300"
                      style={{ background: challenge.gradient }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4
                      className="text-xl font-semibold mb-4 transition-all duration-300"
                      style={{
                        color:
                          hoveredChallenge === index ? "#ED6335" : "#662C8F",
                      }}
                    >
                      {challenge.title}
                    </h4>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "#662C8F" }}
                    >
                      {challenge.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Central Question */}
          <div className="text-center mt-12">
            <p className="text-2xl md:text-3xl font-light italic">
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
          </div>

          {/* Solution Preview */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div
              className="backdrop-blur-sm rounded-2xl p-8 border"
              style={{
                backgroundColor: "rgba(237, 99, 53, 0.05)",
                borderColor: "#ED6335",
              }}
            >
              <h4
                className="text-xl font-semibold mb-4"
                style={{ color: "#ED6335" }}
              >
                Solusi LEGACY
              </h4>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#662C8F" }}
              >
                Program yang menggabungkan pembelajaran praktis, networking
                strategis, dan mentorship berkelanjutan untuk mempersiapkan
                generasi penerus dalam menghadapi tantangan bisnis modern.
              </p>
            </div>

            <div
              className="backdrop-blur-sm rounded-2xl p-8 border"
              style={{
                backgroundColor: "rgba(247, 148, 29, 0.05)",
                borderColor: "#F7941D",
              }}
            >
              <h4
                className="text-xl font-semibold mb-4"
                style={{ color: "#F7941D" }}
              >
                Pendekatan Unik
              </h4>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#662C8F" }}
              >
                Belajar dengan praktik langsung melalui real-life business
                practice, studi kasus nyata, dan interaksi langsung dengan para
                pelaku bisnis sukses.
              </p>
            </div>
          </div>
        </div>
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
