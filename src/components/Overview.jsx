import { useState, useEffect } from "react";

export default function Overview() {
  const [selectedProgram, setSelectedProgram] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCriteria, setHoveredCriteria] = useState(null);

  const programs = [
    {
      name: "Training Camp",
      description: "Program pelatihan interaktif intensif",
      detail:
        "3 hari 2 malam program immersive untuk membangun fondasi kepemimpinan",
    },
    {
      name: "Coaching & Mentorship",
      description: "Bimbingan personal berkelanjutan",
      detail: "Pendampingan untuk pengembangan personal dan profesional",
    },
    {
      name: "Business Trip",
      description: "Kunjungan bisnis strategis",
      detail:
        "Eksplorasi langsung ke perusahaan terkemuka untuk learning experience",
    },
    {
      name: "Study Tour",
      description: "Pembelajaran lapangan terpandu",
      detail: "Kunjungan edukatif ke berbagai industri dan ekosistem bisnis",
    },
    {
      name: "Company Visit",
      description: "Kunjungan ke perusahaan terkemuka",
      detail: "Behind-the-scenes access ke operasional perusahaan sukses",
    },
    {
      name: "Business Speed Dating",
      description: "Networking cepat antar pelaku bisnis",
      detail: "Platform efektif untuk membangun koneksi bisnis strategis",
    },
    {
      name: "Parents Gathering",
      description: "Pertemuan orang tua dan keluarga",
      detail: "Membangun sinergi antar keluarga dalam ekosistem bisnis",
    },
    {
      name: "Connect Meeting",
      description: "Sesi networking dan kolaborasi",
      detail: "Forum reguler untuk berbagi ide dan mencari peluang kerjasama",
    },
    {
      name: "Talkshow & Seminar",
      description: "Diskusi dengan ahli industri",
      detail: "Insight dari thought leaders dan praktisi berpengalaman",
    },
  ];

  const criteria = [
    {
      title: "Usia 17-29 tahun di seluruh Indonesia",
      description:
        "Target generasi muda yang siap mengambil peran kepemimpinan dalam bisnis keluarga",
      color: "#662C8F",
    },
    {
      title:
        "Individu yang ingin membangun jejaring di ekosistem bisnis keluarga",
      description:
        "Fokus pada pengembangan jaringan strategis untuk pertumbuhan bisnis berkelanjutan",
      color: "#ED6335",
    },
    {
      title:
        "Generasi baru yang ingin meneruskan dan mengembangkan bisnis keluarga",
      description:
        "Komitmen untuk keberlanjutan dan transformasi warisan keluarga",
      color: "#F7941D",
    },
    {
      title: "Pemimpin muda yang siap berinovasi dan membawa pembaruan",
      description: "Visi untuk adaptasi dan transformasi sesuai tuntutan zaman",
      color: "#C59CDE",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="overview"
      className="py-20 px-6 relative overflow-hidden min-h-screen"
      style={{ backgroundColor: "#F5F4F2" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#C59CDE",
            filter: "blur(100px)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#F7941D",
            filter: "blur(80px)",
            animationDelay: "2s",
          }}
        ></div>

        {/* Floating shapes */}
        <div
          className="absolute top-16 right-16 w-4 h-4 rounded-full animate-bounce"
          style={{ backgroundColor: "#ED6335", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-16 left-16 w-3 h-3 rounded-full animate-bounce"
          style={{ backgroundColor: "#662C8F", animationDelay: "3s" }}
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
              Overview
            </span>
          </h2>

          <p
            className="text-xl font-normal max-w-4xl mx-auto leading-relaxed"
            style={{ color: "#662C8F" }}
          >
            Rangkaian program terpadu yang dirancang untuk mengembangkan
            kemampuan kepemimpinan dan memperluas jaringan strategis
          </p>
        </div>

        {/* Seamless Programs Flow Layout */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group backdrop-blur-lg rounded-2xl p-6 md:p-8 border-2 transition-all duration-500 cursor-pointer hover:scale-105 flex-grow"
                style={{
                  backgroundColor:
                    selectedProgram === index
                      ? "rgba(102, 44, 143, 0.1)"
                      : "rgba(255, 255, 255, 0.8)",
                  borderColor:
                    selectedProgram === index ? "#662C8F" : "#E1CAF6",
                  boxShadow:
                    selectedProgram === index
                      ? "0 20px 40px rgba(102, 44, 143, 0.1)"
                      : "none",
                  minWidth: "280px",
                  maxWidth: "340px",
                }}
                onMouseEnter={() => setSelectedProgram(index)}
              >
                <div className="text-center">
                  <h3
                    className="text-lg font-semibold mb-3 transition-all duration-300"
                    style={{
                      color: selectedProgram === index ? "#662C8F" : "#662C8F",
                    }}
                  >
                    {program.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "#662C8F" }}>
                    {program.description}
                  </p>
                  <p
                    className="text-xs font-normal leading-relaxed"
                    style={{ color: "#662C8F" }}
                  >
                    {program.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legacy Training Camp Highlight */}
        <div className="mb-20 relative">
          <div className="text-center mb-16">
            <h3
              className="text-5xl md:text-6xl font-light mb-6"
              style={{ color: "#662C8F" }}
            >
              Legacy Training Camp
            </h3>

            <div className="max-w-4xl mx-auto mb-12">
              <p
                className="text-xl md:text-2xl font-light leading-relaxed"
                style={{ color: "#662C8F" }}
              >
                Program pelatihan interaktif untuk mempersiapkan calon penerus
                bisnis keluarga di seluruh Indonesia. Fokus pada pengembangan
                keterampilan kepemimpinan, kolaborasi tim, dan real-life
                business practice.
              </p>
            </div>

            {/* Event Details - Flowing Design */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-center">
              <div className="flex flex-col items-center">
                <div
                  className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300"
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(237, 99, 53, 0.2))",
                  }}
                >
                  📅
                </div>
                <p
                  className="text-3xl md:text-4xl font-medium mb-2"
                  style={{
                    background: "linear-gradient(135deg, #ED6335, #F7941D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  9-11 Januari 2026
                </p>
                <p className="text-sm font-light" style={{ color: "#662C8F" }}>
                  Tanggal Pelaksanaan
                </p>
              </div>

              <div
                className="hidden md:block w-px h-24 opacity-30"
                style={{ backgroundColor: "#662C8F" }}
              ></div>

              <div className="flex flex-col items-center">
                <div
                  className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300"
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(237, 99, 53, 0.2))",
                  }}
                >
                  ⏱️
                </div>
                <p
                  className="text-3xl md:text-4xl font-medium mb-2"
                  style={{
                    background: "linear-gradient(135deg, #ED6335, #F7941D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  3 Hari 2 Malam
                </p>
                <p className="text-sm font-light" style={{ color: "#662C8F" }}>
                  Durasi Program
                </p>
              </div>

              <div
                className="hidden md:block w-px h-24 opacity-30"
                style={{ backgroundColor: "#662C8F" }}
              ></div>

              <div className="flex flex-col items-center">
                <div
                  className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300"
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(237, 99, 53, 0.2))",
                  }}
                >
                  📍
                </div>
                <p
                  className="text-3xl md:text-4xl font-medium mb-2"
                  style={{
                    background: "linear-gradient(135deg, #ED6335, #F7941D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Lembah Indah
                </p>
                <p className="text-sm font-light" style={{ color: "#662C8F" }}>
                  Malang, Jawa Timur
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who Can Join Section */}
        <div className="relative">
          <h3
            className="text-4xl md:text-5xl font-light mb-16 text-center"
            style={{ color: "#662C8F" }}
          >
            Who can join this program?
          </h3>

          <div className="space-y-12 max-w-5xl mx-auto">
            {criteria.map((item, index) => (
              <div
                key={index}
                className="group transition-all duration-500 cursor-pointer hover:translate-x-4"
                onMouseEnter={() => setHoveredCriteria(index)}
                onMouseLeave={() => setHoveredCriteria(null)}
              >
                <div className="flex items-start gap-6">
                  {/* Animated Bullet */}
                  <div className="relative flex-shrink-0 mt-1">
                    <div
                      className="w-8 h-8 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: item.color,
                        transform:
                          hoveredCriteria === index ? "scale(1.3)" : "scale(1)",
                        boxShadow:
                          hoveredCriteria === index
                            ? `0 0 20px ${item.color}60`
                            : "none",
                      }}
                    ></div>
                    {index < criteria.length - 1 && (
                      <div
                        className="absolute left-1/2 top-8 w-0.5 h-12 -translate-x-1/2 opacity-20"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h4
                      className="text-xl md:text-2xl font-semibold mb-3 leading-relaxed transition-colors duration-300"
                      style={{
                        color:
                          hoveredCriteria === index ? item.color : "#662C8F",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-base md:text-lg leading-relaxed opacity-90"
                      style={{ color: "#662C8F" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
