import { useState } from "react";

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialMedias = [
    { name: "Instagram", handle: "@fromlegacy" },
    { name: "TikTok", handle: "@fromlegacy" },
  ];

  return (
    <footer
      className="py-16 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{
            backgroundColor: "#662C8F",
            filter: "blur(100px)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full opacity-15 animate-pulse"
          style={{
            backgroundColor: "#ED6335",
            filter: "blur(80px)",
            animationDelay: "2s",
          }}
        />

        {/* Floating elements */}
        <div
          className="absolute top-20 left-20 w-3 h-3 rounded-full animate-float"
          style={{ backgroundColor: "#C59CDE", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 right-20 w-4 h-4 rounded-full animate-float"
          style={{ backgroundColor: "#F7941D", animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 left-16 w-2 h-2 rounded-full animate-float"
          style={{ backgroundColor: "#ED6335", animationDelay: "5s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3
              className="text-4xl font-light mb-2"
              style={{ color: "#662C8F" }}
            >
              LEGACY
            </h3>
            <p
              className="italic text-sm mb-4 opacity-80"
              style={{ color: "#662C8F" }}
            >
              warisan yang dialihkan oleh generasi pendahulu kepada generasi
              penerusnya
            </p>
            <p className="leading-relaxed" style={{ color: "#662C8F" }}>
              Komunitas yang mewadahi kolaborasi, jejaring, dan pertukaran
              gagasan bagi generasi penerus bisnis keluarga di seluruh
              Indonesia.
            </p>
          </div>

          {/* Program Info */}
          <div>
            <h4
              className="text-xl font-light mb-6"
              style={{ color: "#ED6335" }}
            >
              Program Info
            </h4>
            <div className="space-y-2">
              <p style={{ color: "#662C8F" }}>
                <strong>Tanggal:</strong> 9-11 Januari 2025
              </p>
              <p style={{ color: "#662C8F" }}>
                <strong>Target:</strong> 17-29 tahun
              </p>
              <p style={{ color: "#662C8F" }}>
                <strong>Lokasi:</strong> Seluruh Indonesia
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xl font-light mb-6"
              style={{ color: "#F7941D" }}
            >
              Official Account
            </h4>
            <div className="space-y-3">
              {socialMedias.map((social, index) => (
                <div
                  key={index}
                  className="transition-all duration-300"
                  style={{ color: "#662C8F" }}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <strong
                    style={{
                      color: hoveredSocial === index ? "#ED6335" : "#662C8F",
                    }}
                  >
                    {social.name}:
                  </strong>{" "}
                  {social.handle}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="border-t pt-8 text-center"
          style={{ borderColor: "rgba(102, 44, 143, 0.2)" }}
        >
          <div className="mb-4">
            <p className="text-2xl font-light mb-2">
              <span style={{ color: "#662C8F" }}>From roots to greatness,</span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r ml-2"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
                }}
              >
                seed the future
              </span>
            </p>
          </div>
          <p className="font-light" style={{ color: "#662C8F" }}>
            © 2025 LEGACY Indonesia. All rights reserved.
          </p>
        </div>
      </div>

      {/* CSS Animation */}
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
    </footer>
  );
}
