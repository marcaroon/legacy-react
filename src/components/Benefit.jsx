import { useState, useEffect } from "react";

export default function Benefit() {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const benefits = [
    {
      title: "Jejaring Strategis Nasional",
      image: "/images/benefits/benefits-1.jpeg",
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
      image: "/images/benefits/benefits-2.jpeg",
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
      image: "/images/benefits/benefits-3.jpeg",
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
      image: "/images/benefits/benefits-4.jpeg",
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
      image: "/images/benefits/benefits-5.jpeg",
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
      image: "/images/benefits/benefits-6.jpeg",
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

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  const handleNext = () => {
    setActiveBenefit((prev) => (prev + 1) % benefits.length);
  };

  const handlePrevious = () => {
    setActiveBenefit((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="benefit"
      className="py-20 px-6 relative overflow-hidden min-h-screen"
      style={{ backgroundColor: "#FFFFFF" }}
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
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-4xl md:text-6xl font-light mb-6 leading-tight"
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
            className="text-xl font-normal max-w-3xl mx-auto leading-relaxed"
            style={{ color: "#662C8F" }}
          >
            Investasi untuk masa depan yang memberikan value jangka panjang bagi
            perkembangan karier dan bisnis keluarga Anda
          </p>
        </div>

        {/* Interactive Featured Benefit Carousel */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-3xl transition-all duration-700"
            style={{
              background: `linear-gradient(to bottom right, ${benefits[activeBenefit].bgColor}, rgba(255,255,255,0.3))`,
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="grid lg:grid-cols-2 gap-0 items-stretch">
              {/* Featured Content */}
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div
                  className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6 w-fit"
                  style={{
                    background: benefits[activeBenefit].gradient,
                    color: "#FFFFFF",
                  }}
                >
                  Featured Benefit
                </div>

                <h3
                  className="text-3xl lg:text-4xl font-semibold mb-6 leading-tight"
                  style={{ color: "#662C8F" }}
                >
                  {benefits[activeBenefit].title}
                </h3>

                <p
                  className="text-lg leading-relaxed mb-8 opacity-90"
                  style={{ color: "#662C8F" }}
                >
                  {benefits[activeBenefit].description}
                </p>

                {/* Feature List */}
                <div className="space-y-4">
                  {benefits[activeBenefit].features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div
                        className="w-2 h-2 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"
                        style={{ backgroundColor: "#F7941D" }}
                      ></div>
                      <span
                        className="font-medium text-base"
                        style={{ color: "#662C8F" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative min-h-[400px] lg:min-h-[500px]">
                <img
                  src={benefits[activeBenefit].image}
                  alt={benefits[activeBenefit].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ background: benefits[activeBenefit].gradient }}
                ></div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {/* <button
              onClick={handlePrevious}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="#662C8F"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="#662C8F"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button> */}

            {/* Progress Indicator with Background Container */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div 
                className="flex space-x-2 px-4 py-3 rounded-full backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
                }}
              >
                {benefits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveBenefit(index)}
                    className={`transition-all duration-500 rounded-full ${
                      index === activeBenefit
                        ? "w-10 h-3"
                        : "w-3 h-3 hover:scale-125 opacity-50"
                    }`}
                    style={{
                      backgroundColor:
                        index === activeBenefit ? "#ED6335" : "#662C8F",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          {/* <div className="mt-8 flex justify-center gap-4 overflow-x-auto pb-4">
            {benefits.map((benefit, index) => (
              <button
                key={index}
                onClick={() => setActiveBenefit(index)}
                className={`flex-shrink-0 transition-all duration-300 ${
                  index === activeBenefit
                    ? "opacity-100 scale-105"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden"
                  style={{
                    border:
                      index === activeBenefit
                        ? "3px solid #ED6335"
                        : "2px solid transparent",
                  }}
                >
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}