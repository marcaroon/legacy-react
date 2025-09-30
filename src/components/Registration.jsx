import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [isEarlyBird, setIsEarlyBird] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [expandedPrograms, setExpandedPrograms] = useState({});

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/programs`);
        const result = await response.json();
        if (result.success) {
          const enrichedPrograms = result.data.map((program, index) => ({
            ...program,
            subtitle:
              index === 0 ? "Foundation Builder" : "Complete Transformation",
            features:
              program.features ||
              (index === 0
                ? [
                    "Legacy Training Camp (Seminar Kit, Akomodasi 3D2N, Transportasi, Meals, Snack & Coffee Break, Sertifikat Camp)",
                    "Welcome to Our Family! (Akses penuh ke komunitas LEGACY & jaringan bisnis keluarga Indonesia)",
                  ]
                : [
                    "Legacy Training Camp (Seminar Kit, Akomodasi 3D2N, Transportasi, Meals, Snack & Coffee Break, Sertifikat Camp)",
                    "Coaching & Mentorship (2 bulan, 8x kelas: HR, Marketing, Finance, Operasional)",
                    "Improvement & Development (3 bulan, Project implementasi di perusahaan peserta)",
                    "Welcome to Our Family! (Akses penuh ke komunitas LEGACY & jaringan bisnis keluarga Indonesia)",
                    "Sertifikat Kelulusan Legacy",
                  ]),
            gradient:
              index === 0
                ? "linear-gradient(135deg, #662C8F, #C59CDE)"
                : "linear-gradient(135deg, #ED6335, #F7941D)",
            bgColor:
              index === 0
                ? "rgba(102, 44, 143, 0.05)"
                : "rgba(237, 99, 53, 0.05)",
            borderColor: index === 0 ? "#C59CDE" : "#ED6335",
          }));
          setPackages(enrichedPrograms);

          const initialExpanded = {};
          enrichedPrograms.forEach((_, index) => {
            initialExpanded[index] = false;
          });
          setExpandedPrograms(initialExpanded);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRegister = (packageData) => {
    navigate("/register", {
      state: {
        programId: packageData.id,
        program: packageData.title,
      },
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleExpand = (index) => {
    setExpandedPrograms((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section
      id="registration"
      className="py-20 px-6 relative overflow-hidden min-h-screen"
      style={{ backgroundColor: "#F5F4F2" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#662C8F",
            filter: "blur(120px)",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 animate-pulse"
          style={{
            backgroundColor: "#F7941D",
            filter: "blur(100px)",
            animationDelay: "2s",
          }}
        ></div>

        {/* Floating elements */}
        <div
          className="absolute top-16 right-16 w-6 h-6 border-2 rounded rotate-45 animate-spin"
          style={{ borderColor: "#C59CDE", animationDuration: "15s" }}
        ></div>
        <div
          className="absolute bottom-16 left-16 w-4 h-4 rounded-full animate-ping"
          style={{ backgroundColor: "#ED6335" }}
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
            Pilih Program
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r font-normal mt-2"
              style={{
                backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
              }}
            >
              Terbaik
            </span>
          </h2>

          <p
            className="text-xl font-light max-w-4xl mx-auto leading-relaxed"
            style={{ color: "#662C8F" }}
          >
            Investasi terbaik untuk masa depan adalah pendidikan. Pilih program
            yang sesuai dengan tujuan dan visi Anda.
          </p>
        </div>

        {/* Early Bird Toggle */}
        {/* <div className="flex justify-center mb-12">
          <div
            className="backdrop-blur-lg rounded-2xl p-6 border"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderColor: "#C59CDE",
            }}
          >
            <div className="flex items-center space-x-6">
              <span
                className={`font-medium text-lg transition-colors duration-300 ${
                  !isEarlyBird ? "text-black" : "opacity-60"
                }`}
                style={{ color: "#662C8F" }}
              >
                Normal Price
              </span>

              <button
                onClick={() => setIsEarlyBird(!isEarlyBird)}
                className="relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none"
                style={{ backgroundColor: isEarlyBird ? "#ED6335" : "#C59CDE" }}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 transform ${
                    isEarlyBird ? "translate-x-8" : "translate-x-1"
                  }`}
                ></div>
              </button>

              <div className="flex items-center space-x-2">
                <span
                  className={`font-medium text-lg transition-colors duration-300 ${
                    isEarlyBird ? "text-black" : "opacity-60"
                  }`}
                  style={{ color: "#662C8F" }}
                >
                  Early Bird
                </span>
                {isEarlyBird && (
                  <div
                    className="text-xs px-3 py-1 rounded-full text-white animate-pulse"
                    style={{ backgroundColor: "#F7941D" }}
                  >
                    SAVE UP TO 2.5M!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> */}

        {/* Package Cards */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative backdrop-blur-lg rounded-3xl p-10 border-2 transition-all duration-500 cursor-pointer hover:scale-105 min-h-[650px] h-auto`}
              style={{
                backgroundColor:
                  selectedPackage === index
                    ? "rgba(255, 255, 255, 0.95)"
                    : "rgba(255, 255, 255, 0.85)",
                borderColor:
                  selectedPackage === index ? pkg.borderColor : "#E1CAF6",
                boxShadow:
                  selectedPackage === index
                    ? `0 20px 40px ${pkg.borderColor}20`
                    : "none",
              }}
              onMouseEnter={() => {
                setHoveredPackage(index);
                setSelectedPackage(index);
              }}
              onMouseLeave={() => setHoveredPackage(null)}
              onClick={() => setSelectedPackage(index)}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div
                    className="text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse"
                    style={{ background: pkg.gradient }}
                  >
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3
                      className="text-3xl font-light mb-2"
                      style={{ color: "#662C8F" }}
                    >
                      {pkg.title}
                    </h3>
                    <p
                      className="text-sm font-medium"
                      style={{ color: pkg.borderColor }}
                    >
                      {pkg.subtitle}
                    </p>
                  </div>
                  {/* 
                  {selectedPackage === index && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                      style={{ background: pkg.gradient }}
                    >
                      ✓
                    </div>
                  )} */}
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  {!isEarlyBird && (
                    <div
                      className="text-lg opacity-60 line-through mb-2"
                      style={{ color: "#662C8F" }}
                    >
                      {formatPrice(pkg.normalPrice)}
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span
                          className="text-2xl sm:text-4xl font-light"
                          style={{ color: pkg.borderColor }}
                        >
                          {formatPrice(pkg.currentPrice)}
                        </span>
                        {pkg.isEarlyBirdActive && (
                          <div
                            className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-white font-semibold
         bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500
         bg-[length:200%_200%] animate-[gradient-move_3s_linear_infinite]"
                          >
                            Early Bird
                          </div>
                        )}
                      </div>

                      {pkg.isEarlyBirdActive && (
                        <span className="text-lg text-gray-500 line-through mt-1">
                          {formatPrice(pkg.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p
                  className="text-lg font-light mb-4"
                  style={{ color: "#662C8F" }}
                >
                  {pkg.duration}
                </p>
              </div>

              {/* Description + Features with Expand */}
              <div
                className="text-base font-normal leading-relaxed mb-8 text-justify"
                style={{ color: "#662C8F" }}
              >
                <p>
                  {expandedPrograms[index]
                    ? pkg.description
                    : truncateText(pkg.description)}
                </p>

                {expandedPrograms[index] && (
                  <div className="mt-6">
                    <h4
                      className="font-semibold text-base mb-4"
                      style={{ color: "#662C8F" }}
                    >
                      Yang Akan Anda Dapatkan:
                    </h4>
                    <div
                      className={`space-y-3 transition-all duration-300 ${
                        expandedPrograms[index] ? "opacity-100" : "opacity-70"
                      }`}
                    >
                      {pkg.features &&
                        pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-4">
                            <div
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: pkg.borderColor }}
                            ></div>
                            <span
                              className="font-light leading-relaxed text-base"
                              style={{ color: "#662C8F" }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {pkg.description && pkg.description.length > 150 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(index);
                    }}
                    className="mt-3 px-3 py-1 text-sm font-medium rounded-full border transition-all duration-200 hover:shadow-md hover:scale-100 flex items-center gap-1"
                    style={{
                      color: pkg.borderColor,
                      borderColor: pkg.borderColor + "40",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {expandedPrograms[index] ? "Tutup" : "Selengkapnya"}
                  </button>
                )}
              </div>

              {/* Savings Display */}
              {isEarlyBird && (
                <div
                  className="rounded-full p-4 mb-8 border"
                  style={{
                    backgroundColor: "rgba(247, 148, 29, 0.1)",
                    borderColor: "#F7941D",
                  }}
                >
                  <div className="text-center" style={{ color: "#F7941D" }}>
                    <div className="text-sm font-light">Anda hemat</div>
                    <div className="text-xl font-semibold">
                      {formatPrice(pkg.normalPrice - pkg.earlyBirdPrice)}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <button
                onClick={() => handleRegister(pkg)}
                className="w-full py-5 px-8 rounded-full font-medium text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{ background: pkg.gradient }}
              >
                {pkg.popular ? "Pilih Paket Terpopuler" : "Daftar Sekarang"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
