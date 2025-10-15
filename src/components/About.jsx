import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function About({ onNavigateToDetail }) {
  const [currentStory, setCurrentStory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const instagramRef = useRef(null);

  const storySlides = [
    {
      title: "Warisan Pendiri",
      content:
        "Di balik setiap family business, ada kisah tentang keberanian seorang pendiri yang memulai dari nol dengan keringat, doa, dan mimpi sederhana agar usahanya bisa menjadi warisan bagi generasi berikutnya.",
      visual: "🌱",
    },
    {
      title: "Persimpangan Jalan",
      content:
        "Generasi penerus seringkali berada di persimpangan jalan - ada tanggung jawab untuk menjaga akar yang sudah kokoh, namun juga ada dorongan untuk menumbuhkan cabang baru yang sesuai dengan era mereka.",
      visual: "🛤️",
    },
    {
      title: "Jembatan Masa Depan",
      content:
        "LEGACY hadir sebagai jembatan yang menghubungkan nilai lama dengan kebutuhan zaman baru, menciptakan ekosistem berkelanjutan untuk transformasi bisnis keluarga Indonesia.",
      visual: "🌉",
    },
  ];

  // Load Instagram embed script
  useEffect(() => {
    const loadInstagramScript = () => {
      return new Promise((resolve) => {
        // Check if script already exists
        if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
          // If script exists, just process embeds
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
          resolve();
          return;
        }

        // Create and load Instagram script
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          console.log("Instagram script failed to load");
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    loadInstagramScript().then(() => {
      // Process Instagram embeds after script loads
      setTimeout(() => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      }, 1000);
    });
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % storySlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [storySlides.length]);

  // Re-process Instagram embeds when component updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <section
      id="about"
      className="py-20 px-6 relative overflow-hidden min-h-screen"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#C59CDE",
            filter: "blur(80px)",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-15 animate-pulse"
          style={{ backgroundColor: "#E1CAF6", filter: "blur(60px)" }}
        ></div>

        {/* Floating Elements */}
        <div
          className="absolute top-20 left-20 w-4 h-4 rounded-full animate-float"
          style={{ backgroundColor: "#ED6335", animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full animate-float"
          style={{ backgroundColor: "#F7941D", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full animate-float"
          style={{ backgroundColor: "#C59CDE", animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hook Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-4xl md:text-6xl font-light mb-6 leading-tight"
            style={{ color: "#662C8F" }}
          >
            Komunitas untuk
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r font-semibold mt-2"
              style={{
                backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
              }}
            >
              Generasi Penerus
            </span>
          </h2>

          <p
            className="text-xl font-normal max-w-3xl mx-auto leading-relaxed"
            style={{ color: "#662C8F" }}
          >
            LEGACY hadir untuk membekali generasi baru bisnis keluarga dengan
            jejaring, kolaborasi, dan pertukaran gagasan yang relevan dengan
            zaman. Sebuah komunitas yang membantu Anda menjaga warisan,
            sekaligus menumbuhkan inovasi.
          </p>
        </div>

        {/* Interactive Story Section - More Seamless Layout */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            {/* Story Slider - Takes 3 columns */}
            <div className="lg:col-span-3">
              <div
                className="relative overflow-hidden rounded-3xl transition-all duration-700 h-full flex flex-col justify-between p-10 lg:p-12"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(225,202,246,0.2))",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(102, 44, 143, 0.08)",
                }}
              >
                {/* Story Content */}
                <div className="text-center flex-grow flex flex-col justify-center">
                  <div className="text-7xl mb-6 transition-all duration-500 hover:scale-110 inline-block">
                    {storySlides[currentStory].visual}
                  </div>
                  <h3
                    className="text-3xl font-semibold mb-6"
                    style={{ color: "#662C8F" }}
                  >
                    {storySlides[currentStory].title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed max-w-2xl mx-auto"
                    style={{ color: "#662C8F", opacity: 0.85 }}
                  >
                    {storySlides[currentStory].content}
                  </p>
                </div>

                {/* Story Navigation */}
                <div className="flex justify-center space-x-3 mt-8">
                  {storySlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStory(index)}
                      className={`transition-all duration-500 rounded-full ${
                        index === currentStory
                          ? "w-10 h-3"
                          : "w-3 h-3 hover:scale-125 opacity-50"
                      }`}
                      style={{
                        backgroundColor:
                          index === currentStory ? "#ED6335" : "#C59CDE",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mission Statement - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div
                className="relative overflow-hidden rounded-3xl h-full flex flex-col justify-center p-10 lg:p-12"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(237,99,53,0.08), rgba(255,255,255,0.95))",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(237, 99, 53, 0.08)",
                }}
              >
                {/* Accent decoration */}
                <div
                  className="w-16 h-1 rounded-full mb-8"
                  style={{
                    background: "linear-gradient(135deg, #ED6335, #F7941D)",
                  }}
                ></div>

                <h3
                  className="text-2xl lg:text-3xl font-semibold mb-6"
                  style={{ color: "#662C8F" }}
                >
                  Visi Komunitas
                </h3>

                <p
                  className="text-base lg:text-lg leading-relaxed mb-10"
                  style={{ color: "#662C8F", opacity: 0.85 }}
                >
                  Menjadi ekosistem berkelanjutan yang menumbuhkan kebersamaan,
                  memperkuat jaringan strategis, dan mempersiapkan generasi baru
                  untuk mengemban tanggung jawab yang lebih besar.
                </p>

                {/* Learn More Button */}
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    if (onNavigateToDetail) {
                      onNavigateToDetail();
                    } else {
                      window.location.href = "/about-detail";
                    }
                  }}
                  className="group inline-flex items-center gap-2 text-lg font-semibold transition-all duration-300 self-start"
                  style={{ color: "#ED6335" }}
                >
                  Selengkapnya
                  <ArrowRight
                    size={20}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                  <div
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: "#ED6335" }}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Embed Section - More Integrated */}
        <div className="flex justify-center">
          <div
            ref={instagramRef}
            className="w-full max-w-lg mx-auto rounded-3xl overflow-hidden"
            style={{
              boxShadow: "0 8px 32px rgba(102, 44, 143, 0.1)",
            }}
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/reel/DPdpNFhkY5T/?utm_source=ig_embed&utm_campaign=loading"
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: "24px",
                boxShadow: "none",
                margin: 0,
                maxWidth: "540px",
                minWidth: "326px",
                padding: 0,
                width: "100%",
              }}
            >
              <div style={{ padding: "16px" }}>
                <a
                  href="https://www.instagram.com/reel/DPdpNFhkY5T/?utm_source=ig_embed&utm_campaign=loading"
                  style={{
                    background: "#FFFFFF",
                    lineHeight: 0,
                    padding: "0 0",
                    textAlign: "center",
                    textDecoration: "none",
                    width: "100%",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#F4F4F4",
                        borderRadius: "50%",
                        flexGrow: 0,
                        height: "40px",
                        marginRight: "14px",
                        width: "40px",
                      }}
                    ></div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "4px",
                          flexGrow: 0,
                          height: "14px",
                          marginBottom: "6px",
                          width: "100px",
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "4px",
                          flexGrow: 0,
                          height: "14px",
                          width: "60px",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div style={{ padding: "19% 0" }}></div>
                  <div
                    style={{
                      display: "block",
                      height: "50px",
                      margin: "0 auto 12px",
                      width: "50px",
                    }}
                  >
                    <svg
                      width="50px"
                      height="50px"
                      viewBox="0 0 60 60"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-511.000000, -20.000000)"
                          fill="#000000"
                        >
                          <g>
                            <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div style={{ paddingTop: "8px" }}>
                    <div
                      style={{
                        color: "#3897f0",
                        fontFamily: "Arial,sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 550,
                        lineHeight: "18px",
                      }}
                    >
                      View this post on Instagram
                    </div>
                  </div>
                </a>
              </div>
            </blockquote>
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
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
