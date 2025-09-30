import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = [
        "hero",
        "about",
        "benefit",
        "overview",
        "theme",
        "timeline",
        "registration",
        "speakers",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Tentang", href: "#about", id: "about" },
    { name: "Manfaat", href: "#benefit", id: "benefit" },
    { name: "Overview", href: "#overview", id: "overview" },
    { name: "Tema", href: "#theme", id: "theme" },
    { name: "Timeline", href: "#timeline", id: "timeline" },
    { name: "Program", href: "#registration", id: "registration" },
    // { name: "Speakers", href: "#speakers", id: "speakers" },
  ];

  const handleNavClick = (href) => {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-purple-100"
            : "bg-transparent"
        }`}
      >
        {/* Subtle gradient overlay when scrolled */}
        {scrolled && (
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #662C8F, #C59CDE)",
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo with enhanced hover effect */}
            <div className="flex items-center">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.querySelector("#hero");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group"
              >
                <div className="relative">
                  {/* Subtle glow effect behind logo */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                    style={{ backgroundColor: "#662C8F" }}
                  />
                  <img
                    src="legacy-logo.png"
                    alt="Legacy Logo"
                    className="h-9 w-auto transition-all duration-500 cursor-pointer relative z-10 group-hover:scale-105"
                  />
                </div>
              </a>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative px-1 py-2 font-medium transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-[#662C8F]"
                      : "text-[#662C8F] hover:text-[#4B1E6A]"
                  }`}
                >
                  <span className="relative z-10 text-sm">{item.name}</span>

                  {/* Animated underline */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out ${
                      activeSection === item.id
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                    style={{
                      background: "linear-gradient(135deg, #ED6335, #F7941D)",
                    }}
                  />

                  {/* Subtle glow effect for active state */}
                  {activeSection === item.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 opacity-40 blur-sm"
                      style={{ backgroundColor: "#ED6335" }}
                    />
                  )}
                </a>
              ))}

              {/* Desktop CTA Button */}
              <div className="ml-6 pl-6 border-l border-purple-200">
                <a
                  href="#registration"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#registration");
                  }}
                  className="group relative px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #662C8F, #C59CDE)",
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  <span className="relative z-10 text-sm">Daftar Sekarang</span>

                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-xl"
                    style={{ backgroundColor: "#ED6335" }}
                  />
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`relative p-3 rounded-2xl transition-all duration-300 group z-    border ${
                  mobileMenuOpen ? "shadow-lg" : "hover:shadow-md"
                }`}
                style={{
                  backgroundColor: mobileMenuOpen
                    ? "rgba(255, 255, 255, 0.95)"
                    : scrolled
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(255, 255, 255, 0.1)",
                  borderColor: mobileMenuOpen ? "#E1CAF6" : "transparent",
                  color: "#662C8F",
                }}
              >
                {/* Hover background effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderColor: "#E1CAF6",
                  }}
                />

                <svg
                  className={`w-5 h-5 relative z-10 transition-all duration-300 group-hover:scale-110 ${
                    mobileMenuOpen ? "rotate-90" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 backdrop-blur-lg transition-opacity duration-300"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] transform transition-transform duration-500 ease-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Background with glass effect like About.jsx */}
            <div
              className="absolute inset-0 backdrop-blur-lg border-l"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#E1CAF6",
              }}
            />

            {/* Animated background elements similar to About.jsx */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-10 animate-pulse"
                style={{
                  backgroundColor: "#C59CDE",
                  filter: "blur(40px)",
                  animationDelay: "1s",
                }}
              />
              <div
                className="absolute bottom-1/3 left-8 w-24 h-24 rounded-full opacity-15 animate-pulse"
                style={{ backgroundColor: "#E1CAF6", filter: "blur(30px)" }}
              />
            </div>

            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div
                className="flex items-center justify-between p-6"
                style={{ borderBottom: "1px solid #E1CAF6" }}
              >
                <div className="flex items-center space-x-3">
                  {/* <img
                    src="legacy-logo.png"
                    alt="Legacy Logo"
                    className="h-9 w-auto"
                  /> */}
                  <span
                    className="font-semibold text-lg"
                    style={{ color: "#662C8F" }}
                  >
                    Menu
                  </span>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 px-6 py-8 overflow-y-auto">
                <div className="space-y-3">
                  {navItems.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`block relative py-4 px-5 rounded-2xl font-medium transition-all duration-300 group ${
                        activeSection === item.id ? "shadow-lg" : ""
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: mobileMenuOpen
                          ? "slideInFromRight 0.5s ease-out forwards"
                          : "none",
                        backgroundColor:
                          activeSection === item.id
                            ? "rgba(255, 255, 255, 0.9)"
                            : "transparent",
                        color: "#662C8F",
                        border:
                          activeSection === item.id
                            ? "1px solid #E1CAF6"
                            : "1px solid transparent",
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-between">
                        <span className="font-medium text-lg">{item.name}</span>
                        {/* Arrow indicator with orange accent */}
                        <svg
                          className={`w-5 h-5 transition-all duration-300 ${
                            activeSection === item.id
                              ? "translate-x-1"
                              : "group-hover:translate-x-1 opacity-60 group-hover:opacity-100"
                          }`}
                          fill="none"
                          stroke={
                            activeSection === item.id
                              ? "#ED6335"
                              : "currentColor"
                          }
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>

                      {/* Hover effect background with glass effect */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderColor: "#E1CAF6",
                        }}
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Section */}
              <div className="p-6" style={{ borderTop: "1px solid #E1CAF6" }}>
                <a
                  href="#registration"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#registration");
                  }}
                  className="group relative block w-full text-center py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 overflow-hidden border"
                  style={{
                    background: "linear-gradient(135deg, #ED6335, #F7941D)",
                    borderColor: "transparent",
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span className="text-lg">Daftar Sekarang</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>

                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
                    style={{ backgroundColor: "#ED6335" }}
                  />
                </a>

                {/* Contact info with purple text */}
                <div
                  className="mt-6 text-center text-sm"
                  style={{ color: "#662C8F" }}
                >
                  <p className="opacity-70">Ada pertanyaan? Hubungi kami</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
