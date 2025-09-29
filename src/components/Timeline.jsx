import { useState, useEffect, useRef } from "react";

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState({});
  // const [hoveredStep, setHoveredStep] = useState(null);
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);

  const timelineSteps = [
    {
      phase: "Phase 1",
      title: "Legacy Training Camp",
      duration: "3 Hari 2 Malam",
      date: "9 - 11 Januari 2026",
      description:
        "Legacy Training Camp merupakan program pelatihan intensif  yang berfokus pada pengembangan keterampilan, kepemimpinan, kolaborasi antar tim dan real life Business-Practice. Pelatihan ini akan menumbuhkan inner spirit dan potensi dari peserta untuk dapat menjadi generasi penerus yang memiliki semangat juang yang tinggi. Pelatihan akan diisi dengan mentor – mentor luar biasa dari para praktisi Family Business (baik dari Founder maupun dari Generasi Penerus), Ahli Psikologi , serta pembicara dari Total Quality yang telah mendampingi proses regenerasi ratusan perusahaan selama 20 tahun.",
      color: "#662C8F",
      gradient: "linear-gradient(135deg, #662C8F, #C59CDE)",
    },
    {
      phase: "Phase 2",
      title: "Coaching & Mentorship",
      duration: "8x Kelas Online, 90-120 Menit/Kelas",
      date: "Januari - Maret 2026",
      description:
        "Kelas lanjutan dari Camp yang berupa sesi coaching dan mentorship. Peserta akan diberi pembekalan secara hardskill untuk dapat memahami 4 pilar yang menopang perusahaan (HR, Marketing, Finance dan Operasional). Untuk setiap tema kelas akan diberikan pembekalan secara komprehensif dengan contoh-contoh kasus  yang sesuai dengan realita di lapangan. Pengisi kelas merupakan praktisi yang telah berkecimpung dan berpengalaman di 4 bidang tersebut (HR, Marketing, Finance dan Operasional). Peserta nantinya diharapkan akan mampu mengimplementasikan ilmu-ilmu yang telah diperoleh dari sesi Coaching & Mentorship ini dalam Family Business.",
      color: "#ED6335",
      gradient: "linear-gradient(135deg, #ED6335, #F7941D)",
    },
    {
      phase: "Phase 3",
      title: "Improvement & Development",
      duration: "3 Bulan, 2 Minggu Sekali",
      date: "April - Juni 2025",
      description:
        "Waktunya peserta untuk melakukan pengembangan dan perbaikan dengan mengimplementasikan ilmu yang didapat sebelumnya. Peserta akan melaksanakan Project Improvement & Development di bidang HR, Marketing, Finance atau Operasional (memilih salah 1 bidang) di Family Business masing-masing. Peserta akan memperoleh dukungan komunitas dan mentor berpengalaman yang akan mendampingi mereka dalam bentuk konsultasi setiap 2 minggu sekali. Proses Improvement & Development akan berlangsung selama 3 bulan dan di akhir Project peserta wajib mengumpulkan laporan Project untuk evaluasi hasil Improvement & Development di perusahaan masing-masing.",
      color: "#F7941D",
      gradient: "linear-gradient(135deg, #F7941D, #C59CDE)",
    },
    {
      phase: "Final",
      title: "Welcome to Our Family!",
      duration: "Selamanya",
      date: "Start from Juli 2025",
      description:
        "Peserta akan bergabung dalam komunitas LEGACY yang akan memberikan mereka akses penuh ke jaringan bisnis keluarga Indonesia untuk membangun networking sejak dini, melatih mereka untuk saling berkolaborasi dan saling berbagi ilmu. Komunitas ini akan diisi dengan berbagai kegiatan yang mensupport peserta untuk dapat tumbuh bersama menjadi generasi penerus yang tangguh, beretos kerja, bertanggung jawab, dan visioner.",
      color: "#C59CDE",
      gradient: "linear-gradient(135deg, #C59CDE, #E1CAF6)",
    },
  ];

  const toggleExpand = (index) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (!stepRefs.current.length) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      let newActiveStep = 0;

      stepRefs.current.forEach((stepRef, index) => {
        if (!stepRef) return;

        const rect = stepRef.getBoundingClientRect();
        const elementTop = rect.top + scrollPosition;
        const elementMiddle = elementTop + rect.height / 2;

        if (elementMiddle <= scrollPosition + windowHeight * 0.7) {
          newActiveStep = index;
        }
      });

      setActiveStep(newActiveStep);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="timeline"
      className="py-20 px-6 relative overflow-hidden min-h-screen"
      style={{ backgroundColor: "#FFFFFF" }}
      ref={timelineRef}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#662C8F",
            filter: "blur(100px)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#F7941D",
            filter: "blur(120px)",
            animationDelay: "2s",
          }}
        ></div>

        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-20 w-8 h-8 border-2 rotate-45 animate-spin"
          style={{ borderColor: "#C59CDE", animationDuration: "20s" }}
        ></div>
        <div
          className="absolute top-40 right-40 w-6 h-6 border-2 rounded-full animate-ping"
          style={{ borderColor: "#ED6335" }}
        ></div>
        <div
          className="absolute bottom-40 left-40 w-10 h-10 border-2 rotate-45 animate-pulse"
          style={{ borderColor: "#F7941D" }}
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
            className="text-4xl md:text-6xl font-light mb-8 leading-tight"
            style={{ color: "#662C8F" }}
          >
            Journey
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r font-semibold mt-2"
              style={{
                backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
              }}
            >
              Timeline
            </span>
          </h2>

          <p
            className="text-xl font-normal max-w-4xl mx-auto leading-relaxed"
            style={{ color: "#662C8F" }}
          >
            Perjalanan lengkap program LEGACY dari training camp hingga menjadi
            bagian keluarga besar komunitas bisnis keluarga Indonesia
          </p>
        </div>

        {/* Interactive Timeline Navigation */}
        {/* <div className="flex justify-center mb-16">
          <div
            className="flex space-x-4 backdrop-blur-lg rounded-2xl p-4 border"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderColor: "#E1CAF6",
            }}
          >
            {timelineSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveStep(index);
                  // Scroll to the specific step
                  if (stepRefs.current[index]) {
                    stepRefs.current[index].scrollIntoView({
                      // behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
                className={`transition-all duration-500 rounded-full ${
                  index === activeStep
                    ? "w-12 h-4 shadow-lg"
                    : "w-4 h-4 hover:scale-125"
                }`}
                style={{
                  backgroundColor: index === activeStep ? "#ED6335" : "#C59CDE",
                }}
              />
            ))}
          </div>
        </div> */}

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on large screens */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full hidden lg:block">
            <div
              className="w-full h-full rounded-full opacity-30"
              style={{
                background:
                  "linear-gradient(to bottom, #662C8F, #C59CDE, #F7941D, #ED6335)",
              }}
            ></div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-16">
            {timelineSteps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`flex flex-col lg:flex-row items-center gap-8 transition-all duration-1000 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } ${activeStep === index ? "scale-105" : "hover:scale-102"}`}
              >
                {/* Content Card */}
                <div
                  className="w-full lg:w-5/12 backdrop-blur-lg rounded-3xl p-10 border-2 transition-all duration-500"
                  style={{
                    backgroundColor:
                      activeStep === index
                        ? "rgba(255, 255, 255, 0.9)"
                        : "rgba(255, 255, 255, 0.8)",
                    borderColor: activeStep === index ? step.color : "#E1CAF6",
                    boxShadow:
                      activeStep === index
                        ? `0 20px 40px ${step.color}20`
                        : "none",
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span
                        className="text-sm font-medium px-4 py-2 rounded-full text-white"
                        style={{ background: step.gradient }}
                      >
                        {step.phase}
                      </span>
                    </div>

                    {/* Progress indicator */}
                    <div className="text-right">
                      <div
                        className="text-sm font-light"
                        style={{ color: "#662C8F" }}
                      >
                        {index + 1} / {timelineSteps.length}
                      </div>
                      <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            background: step.gradient,
                            width: activeStep >= index ? "100%" : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <h3
                    className="text-2xl md:text-3xl font-light mb-4"
                    style={{ color: "#662C8F" }}
                  >
                    {step.title}
                  </h3>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-medium"
                        style={{ color: step.color }}
                      >
                        ⏱️ {step.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-medium"
                        style={{ color: "#662C8F" }}
                      >
                        📅 {step.date}
                      </span>
                    </div>
                  </div>

                  <div
                    className="text-base leading-relaxed font-normal text-justify"
                    style={{ color: "#662C8F" }}
                  >
                    <p>
                      {expandedSteps[index]
                        ? step.description
                        : truncateText(step.description)}
                    </p>

                    {step.description.length > 150 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(index);
                        }}
                        className="mt-3 px-3 py-1 text-sm font-medium rounded-full border transition-all duration-200 hover:shadow-md hover:scale-100 flex items-center gap-1"
                        style={{
                          color: step.color,
                          borderColor: step.color + "40",
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        {expandedSteps[index] ? "Tutup" : "Selengkapnya"}
                      </button>
                    )}
                  </div>

                  {/* {activeStep === index && (
                    <div
                      className="mt-6 h-1 rounded-full transition-all duration-500"
                      style={{ background: step.gradient }}
                    ></div>
                  )} */}
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:flex w-2/12 justify-center relative z-20">
                  <div
                    className={`w-8 h-8 rounded-full border-4 border-white shadow-2xl transition-all duration-500 ${
                      activeStep >= index ? "scale-125" : "hover:scale-110"
                    }`}
                    style={{
                      background:
                        activeStep >= index ? step.gradient : "#C59CDE",
                      boxShadow:
                        activeStep >= index
                          ? `0 8px 32px ${step.color}40`
                          : "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  >
                    {activeStep >= index && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-30"
                        style={{ background: step.gradient }}
                      ></div>
                    )}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
