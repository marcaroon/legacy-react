import { useState, useEffect } from "react";

export default function Benefit() {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const benefits = [
    {
      title: "Jejaring Strategis Nasional",
      icon: "🌐",
      description:
        "Bergabung dengan komunitas eksklusif generasi penerus bisnis keluarga di seluruh Indonesia untuk membuka peluang kolaborasi lintas sektor dan daerah.",
      features: [
        "Koneksi dengan komunitas terpilih",
        "Forum diskusi eksklusif",
        "Peluang kemitraan strategis",
      ],
      gradient: "linear-gradient(135deg, #662C8F, #C59CDE)",
      bgColor: "rgba(102, 44, 143, 0.05)",
    },
    {
      title: "Program Pelatihan Komprehensif",
      icon: "📚",
      description:
        "Akses ke program pelatihan yang dirancang khusus untuk mengembangkan kemampuan kepemimpinan dan manajemen bisnis keluarga.",
      features: [
        "Training camp intensif 3D2N",
        "Workshop praktis dan interaktif",
        "Materi pembelajaran terkini",
      ],
      gradient: "linear-gradient(135deg, #ED6335, #F7941D)",
      bgColor: "rgba(237, 99, 53, 0.05)",
    },
    {
      title: "Mentorship Berkelanjutan",
      icon: "🎯",
      description:
        "Bimbingan langsung dari para ahli dan praktisi berpengalaman untuk pengembangan personal dan profesional yang berkelanjutan.",
      features: [
        "Coaching berkelanjutan",
        "Mentorship jangka panjang",
        "Konsultasi bisnis strategis",
      ],
      gradient: "linear-gradient(135deg, #F7941D, #ED6335)",
      bgColor: "rgba(247, 148, 29, 0.05)",
    },
    {
      title: "Platform Kolaborasi Digital",
      icon: "💻",
      description:
        "Akses ke platform digital yang memfasilitasi komunikasi, sharing knowledge, dan kolaborasi project antar anggota komunitas.",
      features: [
        "Learning management system",
        "Digital collaboration tools",
        "Knowledge sharing platform",
      ],
      gradient: "linear-gradient(135deg, #C59CDE, #E1CAF6)",
      bgColor: "rgba(197, 156, 222, 0.05)",
    },
    {
      title: "Business Development Support",
      icon: "📈",
      description:
        "Dukungan komprehensif untuk pengembangan bisnis melalui analisis strategis, market insight, dan akses ke peluang investasi.",
      features: [
        "Analisis strategis bisnis",
        "Market research support",
        "Investment opportunity access",
      ],
      gradient: "linear-gradient(135deg, #662C8F, #ED6335)",
      bgColor: "rgba(102, 44, 143, 0.1)",
    },
    {
      title: "Leadership Development",
      icon: "🏆",
      description:
        "Program pengembangan kepemimpinan yang fokus pada membangun personal branding dan thought leadership di industri.",
      features: [
        "Leadership skills training",
        "Personal branding workshop",
        "Public speaking opportunities",
      ],
      gradient: "linear-gradient(135deg, #ED6335, #C59CDE)",
      bgColor: "rgba(237, 99, 53, 0.1)",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % benefits.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="benefit"
      className="py-20 px-6 relative overflow-hidden min-h-screen"
      style={{ backgroundColor: "#F5F4F2" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-15 animate-pulse"
          style={{
            backgroundColor: "#662C8F",
            filter: "blur(80px)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full opacity-15 animate-pulse"
          style={{
            backgroundColor: "#ED6335",
            filter: "blur(60px)",
            animationDelay: "2s",
          }}
        ></div>

        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-20 w-6 h-6 border-2 rounded rotate-45 animate-spin"
          style={{ borderColor: "#C59CDE", animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-8 h-8 border-2 rounded-full animate-pulse"
          style={{ borderColor: "#F7941D", animationDelay: "3s" }}
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
            Manfaat Bergabung
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r font-semibold mt-2"
              style={{
                backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
              }}
            >
              dengan LEGACY
            </span>
          </h2>

          <p
            className="text-xl font-normal max-w-4xl mx-auto leading-relaxed"
            style={{ color: "#662C8F" }}
          >
            Investasi untuk masa depan yang memberikan value jangka panjang bagi
            perkembangan karier dan bisnis keluarga Anda
          </p>
        </div>

        {/* Featured Benefit Showcase */}
        <div className="mb-16">
          <div
            className="backdrop-blur-lg rounded-3xl p-12 border transition-all duration-500 hover:scale-105"
            style={{
              backgroundColor: benefits[activeBenefit].bgColor,
              borderColor: benefits[activeBenefit].gradient.includes("#662C8F")
                ? "#C59CDE"
                : "#F7941D",
            }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Featured Content */}
              <div className="text-center lg:text-left">
                <h3
                  className="text-3xl font-semibold mb-6"
                  style={{ color: "#662C8F" }}
                >
                  {benefits[activeBenefit].title}
                </h3>
                <p
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: "#662C8F" }}
                >
                  {benefits[activeBenefit].description}
                </p>

                {/* Feature List */}
                <div className="space-y-3">
                  {benefits[activeBenefit].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#F7941D" }}
                      ></div>
                      <span
                        className="font-medium"
                        style={{ color: "#662C8F" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <div
                  className="w-full h-64 rounded-2xl flex items-center justify-center text-8xl transition-all duration-500"
                  style={{ background: benefits[activeBenefit].gradient }}
                >
                  {benefits[activeBenefit].icon}
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveBenefit(index)}
                  className={`transition-all duration-500 rounded-full ${
                    index === activeBenefit
                      ? "w-8 h-3"
                      : "w-3 h-3 hover:scale-125"
                  }`}
                  style={{
                    backgroundColor:
                      index === activeBenefit ? "#ED6335" : "#C59CDE",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* All Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group backdrop-blur-lg rounded-3xl p-8 border transition-all duration-500 cursor-pointer hover:scale-105"
              style={{
                backgroundColor:
                  hoveredCard === index
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(255, 255, 255, 0.7)",
                borderColor: activeBenefit === index ? "#ED6335" : "#E1CAF6",
                borderWidth: activeBenefit === index ? "2px" : "1px",
              }}
              onMouseEnter={() => {
                setHoveredCard(index);
                setActiveBenefit(index);
              }}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="text-center">
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#662C8F" }}
                >
                  {benefit.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#662C8F" }}
                >
                  {benefit.description}
                </p>

                {/* Mini Features */}
                <div className="space-y-2">
                  {benefit.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: "#662C8F" }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "#F7941D" }}
                      ></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active indicator */}
              {/* {activeBenefit === index && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                  style={{ background: benefit.gradient }}
                ></div>
              )} */}
            </div>
          ))}
        </div>

        {/* Call to Action
        <div className="text-center mt-16">
          <div
            className="backdrop-blur-lg rounded-3xl p-12 border max-w-4xl mx-auto"
            style={{
              backgroundColor: "rgba(102, 44, 143, 0.05)",
              borderColor: "#C59CDE",
            }}
          >
            <h3
              className="text-3xl font-semibold mb-6"
              style={{ color: "#662C8F" }}
            >
              Siap Memulai Transformasi?
            </h3>

            <p
              className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
              style={{ color: "#662C8F" }}
            >
              Bergabunglah dengan komunitas eksklusif generasi penerus bisnis
              keluarga dan mulai perjalanan transformasi Anda bersama LEGACY.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-10 py-4 rounded-full font-medium text-white text-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #662C8F, #C59CDE)",
                }}
              >
                Daftar Sekarang
              </button>
              <button
                className="px-10 py-4 rounded-full font-medium text-lg border-2 transition-all duration-300 hover:scale-105"
                style={{
                  color: "#ED6335",
                  borderColor: "#ED6335",
                  backgroundColor: "rgba(237, 99, 53, 0.1)",
                }}
              >
                Pelajari Program
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
