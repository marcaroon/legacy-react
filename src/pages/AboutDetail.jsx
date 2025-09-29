import { useState, useEffect } from "react";
import { ArrowLeft, Users, Target, Lightbulb, Heart } from "lucide-react";

export default function AboutDetail({ onBack }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredValue, setHoveredValue] = useState(null);

  const values = [
    {
      title: "Stewardship",
      description:
        "Tanggung jawab generasi penerus untuk menjaga, merawat, dan mengembangkan warisan keluarga dengan bijak",
      longDescription:
        "Stewardship adalah tentang menjadi penjaga yang bertanggung jawab atas warisan yang telah dipercayakan kepada kita. Ini bukan hanya tentang mempertahankan apa yang sudah ada, tetapi juga mengembangkannya dengan wisdom dan kehati-hatian untuk generasi mendatang.",
      image: "core-values.svg",
    },
    {
      title: "Continuity",
      description:
        "Menjamin kesinambungan nilai, identitas, dan visi lintas generasi agar tetap relevan dan berkelanjutan",
      longDescription:
        "Continuity memastikan bahwa identitas dan nilai-nilai fundamental tetap terjaga sambil beradaptasi dengan perubahan zaman. Seperti sungai yang terus mengalir, bisnis keluarga harus mempertahankan esensinya sambil menyesuaikan jalurnya.",
      image: "core-values.svg",
    },
    {
      title: "Transformative",
      description:
        "Kemampuan untuk membawa warisan ke arah baru melalui inovasi, adaptasi, dan perubahan yang bermakna",
      longDescription:
        "Transformative adalah keberanian untuk membawa perubahan positif yang bermakna. Ini tentang menghormati masa lalu sambil menciptakan masa depan yang lebih baik, dengan inovasi yang sejalan dengan nilai-nilai keluarga.",
      image: "core-values.svg",
    },
  ];

  const keyPoints = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Jejaring Strategis",
      description:
        "Membangun hubungan lintas daerah dan sektor yang memperkuat ekosistem bisnis keluarga",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Kolaborasi Bermakna",
      description:
        "Menciptakan kemitraan dan proyek yang memberikan nilai tambah bagi semua pihak",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Inovasi Berkelanjutan",
      description:
        "Mendorong pembaruan yang selaras dengan tradisi dan relevan dengan perkembangan zaman",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Solidaritas Keluarga",
      description:
        "Membangun rasa kebersamaan dalam menghadapi tantangan dan merayakan pencapaian bersama",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#C59CDE",
            filter: "blur(80px)",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-15 animate-pulse"
          style={{ backgroundColor: "#E1CAF6", filter: "blur(60px)" }}
        />
        <div
          className="absolute top-20 left-20 w-4 h-4 rounded-full animate-float"
          style={{ backgroundColor: "#ED6335", animationDelay: "0s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full animate-float"
          style={{ backgroundColor: "#F7941D", animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full animate-float"
          style={{ backgroundColor: "#C59CDE", animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back Button */}
          <div
            className={`mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={() => {
                // Scroll to top first
                window.scrollTo({ top: 0, behavior: "smooth" });
                if (onBack) {
                  onBack();
                } else {
                  window.location.href = "/";
                }
              }}
              className="group flex items-center gap-3 mb-8 text-lg font-medium transition-all duration-300 hover:gap-4"
              style={{ color: "#ED6335" }}
            >
              <ArrowLeft
                size={20}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Kembali
            </button>

            <div className="text-center">
              <h1
                className="text-4xl md:text-6xl font-light mb-8 leading-tight"
                style={{ color: "#662C8F" }}
              >
                Tentang
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r font-semibold mt-2"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #ED6335, #F7941D)",
                  }}
                >
                  LEGACY
                </span>
              </h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-20">
            {/* Vision & Mission Section */}
            <section>
              <div
                className="backdrop-blur-lg rounded-3xl p-12 border"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderColor: "#E1CAF6",
                }}
              >
                <h2
                  className="text-3xl font-semibold mb-8 text-center"
                  style={{ color: "#662C8F" }}
                >
                  Mengapa LEGACY Ada?
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ color: "#662C8F" }}
                    >
                      Tantangan Generasi Penerus
                    </h3>
                    <p
                      className="text-lg leading-relaxed mb-6"
                      style={{ color: "#662C8F" }}
                    >
                      Banyak penerus merasa berjalan sendirian dalam memikul
                      harapan besar tanpa memiliki ruang aman untuk berbagi
                      cerita, belajar, dan saling menguatkan. Keberlanjutan
                      family business bukan hanya soal angka, melainkan tentang
                      keberanian generasi muda untuk merawat akar sambil
                      menumbuhkan cabang baru.
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ color: "#662C8F" }}
                    >
                      Solusi LEGACY
                    </h3>
                    <p
                      className="text-lg leading-relaxed"
                      style={{ color: "#662C8F" }}
                    >
                      LEGACY hadir sebagai wadah strategis untuk memperkuat
                      peran generasi baru dalam menghadapi perubahan zaman,
                      tanpa kehilangan jati diri yang diwariskan. Komunitas ini
                      menciptakan ekosistem yang inklusif dan progresif.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Points Section */}
            <section>
              <h2
                className="text-3xl font-semibold mb-12 text-center"
                style={{ color: "#662C8F" }}
              >
                Yang Kami Tawarkan
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-lg rounded-3xl p-8 border text-center hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderColor: "#E1CAF6",
                    }}
                  >
                    <div
                      className="flex justify-center mb-4"
                      style={{ color: "#ED6335" }}
                    >
                      {point.icon}
                    </div>
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{ color: "#662C8F" }}
                    >
                      {point.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#662C8F" }}
                    >
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Core Values Section */}
            <section>
              <div className="text-center mb-12">
                <h2
                  className="text-3xl font-semibold mb-4"
                  style={{ color: "#662C8F" }}
                >
                  Nilai-Nilai Inti LEGACY
                </h2>
                <p
                  className="text-lg max-w-3xl mx-auto"
                  style={{ color: "#662C8F" }}
                >
                  Tiga pilar fundamental yang menjadi landasan setiap kegiatan
                  dan inisiatif komunitas kami
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-500 backdrop-blur-lg border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderColor: "#E1CAF6",
                    }}
                    onMouseEnter={() => setHoveredValue(index)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    {/* Content */}
                    <div className="relative z-10 p-8 text-center">
                      <h4
                        className="text-2xl font-bold mb-4"
                        style={{ color: "#662C8F" }}
                      >
                        {value.title}
                      </h4>
                      <p
                        className="text-base leading-relaxed mb-4"
                        style={{ color: "#662C8F" }}
                      >
                        {value.description}
                      </p>
                      <p
                        className="text-sm leading-relaxed opacity-80"
                        style={{ color: "#662C8F" }}
                      >
                        {value.longDescription}
                      </p>
                    </div>

                    {/* Hover effect indicator */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
                        hoveredValue === index ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ backgroundColor: "#F7941D" }}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Impact Section */}
            <section>
              <div
                className="backdrop-blur-lg rounded-3xl p-12 border text-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderColor: "#E1CAF6",
                }}
              >
                <h2
                  className="text-3xl font-semibold mb-8"
                  style={{ color: "#662C8F" }}
                >
                  Dampak yang Kami Ciptakan
                </h2>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h3
                      className="text-4xl font-bold mb-2"
                      style={{ color: "#ED6335" }}
                    >
                      Jejaring
                    </h3>
                    <p style={{ color: "#662C8F" }}>
                      Lintas daerah dan sektor untuk memperluas peluang
                      kolaborasi bisnis
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-4xl font-bold mb-2"
                      style={{ color: "#F7941D" }}
                    >
                      Kolaborasi
                    </h3>
                    <p style={{ color: "#662C8F" }}>
                      Proyek dan inisiatif yang memberikan manfaat melampaui
                      kepentingan individu
                    </p>
                  </div>

                  <div>
                    <h3
                      className="text-4xl font-bold mb-2"
                      style={{ color: "#C59CDE" }}
                    >
                      Transformasi
                    </h3>
                    <p style={{ color: "#662C8F" }}>
                      Bisnis keluarga yang relevan, adaptif, dan berdaya saing
                      global
                    </p>
                  </div>
                </div>
              </div>
            </section>
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
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
