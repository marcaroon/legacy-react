import { useState, useEffect } from "react";

export default function Speakers() {
  const [activeSpeaker, setActiveSpeaker] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSpeaker, setHoveredSpeaker] = useState(null);

  const speakers = [
    {
      name: "Dr. Tanri Abeng",
      role: "Former CEO Bakrie Group",
      quote:
        "LEGACY adalah platform yang tepat untuk mempersiapkan generasi penerus bisnis keluarga Indonesia menuju era transformasi digital.",
      expertise: "Strategic Leadership",
      experience: "30+ Years",
      gradient: "linear-gradient(135deg, #662C8F, #C59CDE)",
      bgColor: "rgba(102, 44, 143, 0.05)",
    },
    {
      name: "Ibu Shinta Kamdani",
      role: "CEO Sintesa Group",
      quote:
        "Program ini memberikan foundation yang kuat bagi sustainability bisnis keluarga di Indonesia dengan pendekatan yang komprehensif dan praktis.",
      expertise: "Family Business",
      experience: "25+ Years",
      gradient: "linear-gradient(135deg, #ED6335, #F7941D)",
      bgColor: "rgba(237, 99, 53, 0.05)",
    },
    {
      name: "Bapak Sandiaga Uno",
      role: "Entrepreneur & Former Minister",
      quote:
        "LEGACY menciptakan ekosistem yang mendukung transformasi bisnis keluarga menuju era digital dengan tetap menjaga nilai-nilai tradisional.",
      expertise: "Digital Transformation",
      experience: "20+ Years",
      gradient: "linear-gradient(135deg, #F7941D, #C59CDE)",
      bgColor: "rgba(247, 148, 29, 0.05)",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSpeaker((prev) => (prev + 1) % speakers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="speakers"
      className="py-20 px-6 relative overflow-hidden min-h-screen"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-20 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#C59CDE",
            filter: "blur(100px)",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-10 animate-pulse"
          style={{ backgroundColor: "#F7941D", filter: "blur(120px)" }}
        ></div>

        {/* Quote marks decoration */}
        <div
          className="absolute top-1/4 right-1/4 text-6xl opacity-10 font-serif"
          style={{ color: "#C59CDE" }}
        >
          "
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 text-6xl opacity-10 font-serif rotate-180"
          style={{ color: "#ED6335" }}
        >
          "
        </div>

        {/* Floating elements */}
        <div
          className="absolute top-32 right-32 w-3 h-3 rounded-full animate-bounce"
          style={{ backgroundColor: "#662C8F", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-32 w-4 h-4 rounded-full animate-bounce"
          style={{ backgroundColor: "#F7941D", animationDelay: "4s" }}
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
            Kata Para
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r font-normal mt-2"
              style={{
                backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
              }}
            >
              Ahli & Pembicara
            </span>
          </h2>

          <p
            className="text-xl font-light max-w-4xl mx-auto leading-relaxed"
            style={{ color: "#662C8F" }}
          >
            Dengarkan perspektif dari para ahli dan pembicara terkemuka yang
            mendukung visi dan misi LEGACY
          </p>
        </div>

        {/* Featured Speaker */}
        <div className="mb-16">
          <div
            className="backdrop-blur-lg rounded-3xl p-12 border transition-all duration-500"
            style={{
              backgroundColor: speakers[activeSpeaker].bgColor,
              borderColor: speakers[activeSpeaker].gradient.includes("#662C8F")
                ? "#C59CDE"
                : "#F7941D",
            }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Quote Content */}
              <div className="text-center lg:text-left">
                <div
                  className="text-6xl mb-8 opacity-20"
                  style={{ color: "#662C8F" }}
                >
                  "
                </div>

                <blockquote
                  className="text-2xl md:text-3xl font-light leading-relaxed italic mb-8"
                  style={{ color: "#662C8F" }}
                >
                  {speakers[activeSpeaker].quote}
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <h4
                      className="text-xl font-semibold mb-2"
                      style={{ color: "#662C8F" }}
                    >
                      {speakers[activeSpeaker].name}
                    </h4>
                    <p
                      className="font-medium mb-4"
                      style={{
                        color: speakers[activeSpeaker].gradient.includes(
                          "#662C8F"
                        )
                          ? "#C59CDE"
                          : "#ED6335",
                      }}
                    >
                      {speakers[activeSpeaker].role}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div
                      className="text-center px-4 py-2 rounded-xl border"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderColor: "#E1CAF6",
                      }}
                    >
                      <div
                        className="text-sm font-medium"
                        style={{ color: "#662C8F" }}
                      >
                        {speakers[activeSpeaker].expertise}
                      </div>
                    </div>
                    <div
                      className="text-center px-4 py-2 rounded-xl border"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderColor: "#E1CAF6",
                      }}
                    >
                      <div
                        className="text-sm font-medium"
                        style={{ color: "#662C8F" }}
                      >
                        {speakers[activeSpeaker].experience}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <div
                  className="w-full h-80 rounded-2xl flex items-center justify-center text-9xl font-light text-white"
                  style={{ background: speakers[activeSpeaker].gradient }}
                >
                  {speakers[activeSpeaker].name.charAt(0)}
                </div>

                {/* Animated border */}
                <div
                  className="absolute inset-0 rounded-2xl border-4 border-transparent animate-pulse"
                  style={{
                    background: `linear-gradient(white, white) padding-box, ${speakers[activeSpeaker].gradient} border-box`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* All Speakers Grid */}
        <div
          className="backdrop-blur-lg rounded-3xl p-12 border"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#E1CAF6",
          }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="group backdrop-blur-sm rounded-2xl p-8 border-2 text-center transition-all duration-500 cursor-pointer hover:scale-105"
                style={{
                  backgroundColor:
                    hoveredSpeaker === index
                      ? "rgba(255, 255, 255, 0.9)"
                      : "rgba(255, 255, 255, 0.7)",
                  borderColor:
                    activeSpeaker === index
                      ? speaker.gradient.includes("#662C8F")
                        ? "#C59CDE"
                        : "#ED6335"
                      : "#E1CAF6",
                }}
                onClick={() => setActiveSpeaker(index)}
                onMouseEnter={() => setHoveredSpeaker(index)}
                onMouseLeave={() => setHoveredSpeaker(null)}
              >
                {/* Speaker Avatar */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-semibold text-white mx-auto mb-6 transition-transform duration-300 ${
                    activeSpeaker === index
                      ? "scale-110"
                      : "group-hover:scale-110"
                  }`}
                  style={{ background: speaker.gradient }}
                >
                  {speaker.name.charAt(0)}
                </div>

                <h4
                  className={`font-semibold text-xl mb-3 transition-all duration-300 ${
                    activeSpeaker === index
                      ? "text-transparent bg-clip-text bg-gradient-to-r"
                      : "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r"
                  }`}
                  style={{
                    color: activeSpeaker === index ? "transparent" : "#662C8F",
                    backgroundImage:
                      activeSpeaker === index || hoveredSpeaker === index
                        ? speaker.gradient
                        : "none",
                  }}
                >
                  {speaker.name}
                </h4>

                <p
                  className="text-sm font-medium mb-6"
                  style={{
                    color: speaker.gradient.includes("#662C8F")
                      ? "#C59CDE"
                      : "#ED6335",
                  }}
                >
                  {speaker.role}
                </p>

                {/* Mini Expertise Tags */}
                <div className="flex justify-center gap-2 mb-6">
                  <div
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: speaker.bgColor,
                      borderColor: "#E1CAF6",
                      color: "#662C8F",
                    }}
                  >
                    {speaker.expertise}
                  </div>
                  <div
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: speaker.bgColor,
                      borderColor: "#E1CAF6",
                      color: "#662C8F",
                    }}
                  >
                    {speaker.experience}
                  </div>
                </div>

                <p
                  className="text-sm italic leading-relaxed font-light group-hover:font-normal transition-all duration-300"
                  style={{ color: "#662C8F" }}
                >
                  "{speaker.quote.substring(0, 100)}..."
                </p>
              </div>
            ))}
          </div>

          {/* Speaker Navigation */}
          <div className="flex justify-center space-x-3 mt-12">
            {speakers.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSpeaker(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === activeSpeaker
                    ? "w-12 h-4"
                    : "w-4 h-4 hover:scale-125"
                }`}
                style={{
                  backgroundColor:
                    index === activeSpeaker ? "#ED6335" : "#C59CDE",
                }}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <div
            className="backdrop-blur-lg rounded-3xl p-12 border max-w-4xl mx-auto"
            style={{
              backgroundColor: "rgba(102, 44, 143, 0.05)",
              borderColor: "#C59CDE",
            }}
          >
            <h3
              className="text-3xl font-light mb-6"
              style={{ color: "#662C8F" }}
            >
              Bergabunglah dengan Komunitas Terpilih
            </h3>

            <p
              className="text-lg font-light leading-relaxed mb-8"
              style={{ color: "#662C8F" }}
            >
              Dapatkan akses langsung ke para ahli, praktisi berpengalaman, dan
              komunitas generasi penerus bisnis keluarga terbaik di Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-10 py-4 rounded-full font-medium text-white text-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #662C8F, #ED6335)",
                }}
              >
                Daftar Program
              </button>
              <button
                className="px-10 py-4 rounded-full font-medium text-lg border-2 transition-all duration-300 hover:scale-105"
                style={{
                  color: "#C59CDE",
                  borderColor: "#C59CDE",
                  backgroundColor: "rgba(197, 156, 222, 0.1)",
                }}
              >
                Lihat Timeline
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
