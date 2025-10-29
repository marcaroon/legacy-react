import { ArrowLeft, Info } from "lucide-react";

export default function DeliveryPolicy() {
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.back();
  };

  const sections = [
    {
      title: "1. Pengantar",
      content:
        "Setelah pembayaran berhasil diverifikasi, peserta akan menerima email konfirmasi resmi berisi detail program, jadwal, dan informasi kegiatan. Pastikan alamat email dan nomor telepon yang digunakan saat pendaftaran sudah benar.",
    },
    {
      title: "2. Konfirmasi Pendaftaran",
      list: [
        "Setelah proses pembayaran berhasil diverifikasi, peserta akan menerima email konfirmasi resmi dari LEGACY Indonesia berisi detail pendaftaran, jadwal kegiatan, dan informasi lanjutan terkait program.",
        "Peserta diharapkan memastikan data yang diberikan (terutama email dan nomor telepon) sudah benar untuk kelancaran komunikasi.",
      ],
    },
    {
      title: "3. Pelaksanaan Program",
      content:
        "Program LEGACY Training Camp akan dilaksanakan sesuai jadwal yang telah diumumkan, yaitu pada 9–11 Januari 2026 di Lembah Indah, Malang, Jawa Timur, kecuali terdapat perubahan yang diinformasikan secara resmi oleh penyelenggara.",
    },
    {
      title: "4. Keterlambatan atau Ketidakhadiran Peserta",
      content:
        "Keterlambatan atau ketidakhadiran peserta dalam kegiatan tidak menjadi tanggung jawab penyelenggara, dan biaya pendaftaran tidak dapat dikembalikan atau diganti.",
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden py-10 px-4 sm:px-6 md:px-8 lg:px-10"
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
        <div
          className="absolute top-16 right-16 w-6 h-6 border-2 rounded rotate-45 animate-spin"
          style={{ borderColor: "#C59CDE", animationDuration: "15s" }}
        ></div>
        <div
          className="absolute bottom-16 left-16 w-4 h-4 rounded-full animate-ping"
          style={{ backgroundColor: "#ED6335" }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-base sm:text-lg font-medium transition-all duration-300 hover:gap-4"
            style={{ color: "#ED6335" }}
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Kembali
          </button>

          <div className="text-center">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 leading-tight"
              style={{ color: "#662C8F" }}
            >
              Kebijakan Pelaksanaan Program
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r font-normal mt-1 sm:mt-2"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
                }}
              >
                LEGACY
              </span>
            </h1>
            <p
              className="text-base sm:text-lg font-light max-w-3xl mx-auto leading-relaxed px-2"
              style={{ color: "#662C8F" }}
            >
              Tata cara penyelenggaraan dan pemenuhan layanan program
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          className="backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#E1CAF6",
            boxShadow: "0 20px 40px rgba(197, 156, 222, 0.1)",
          }}
        >
          <div className="space-y-8 sm:space-y-10">
            {sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2
                  className="text-xl sm:text-2xl font-semibold"
                  style={{ color: "#662C8F" }}
                >
                  {section.title}
                </h2>

                {section.isInfo ? (
                  <div
                    className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2"
                    style={{
                      backgroundColor: "rgba(247, 148, 29, 0.05)",
                      borderColor: "#F7941D50",
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <Info
                        className="flex-shrink-0 mt-1"
                        size={20}
                        style={{ color: "#F7941D" }}
                      />
                      <p
                        className="text-base sm:text-lg leading-relaxed"
                        style={{ color: "#662C8F" }}
                      >
                        <span className="font-semibold">Informasi: </span>
                        {section.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  section.content && (
                    <p
                      className="text-base sm:text-lg leading-relaxed"
                      style={{ color: "#662C8F" }}
                    >
                      {section.content}
                    </p>
                  )
                )}

                {section.list && (
                  <ul className="space-y-2 ml-6">
                    {section.list.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-base sm:text-lg leading-relaxed flex items-start"
                        style={{ color: "#662C8F" }}
                      >
                        <span
                          className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: "#F7941D" }}
                        ></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections && (
                  <div className="space-y-4 ml-0 sm:ml-4">
                    {section.subsections.map((subsection, subIdx) => (
                      <div key={subIdx} className="space-y-2">
                        <p
                          className="text-base sm:text-lg leading-relaxed"
                          style={{ color: "#662C8F" }}
                        >
                          {subsection.text}
                        </p>
                        {subsection.list && (
                          <ul className="space-y-2 ml-6">
                            {subsection.list.map((item, itemIdx) => (
                              <li
                                key={itemIdx}
                                className="text-base sm:text-lg leading-relaxed flex items-start"
                                style={{ color: "#662C8F" }}
                              >
                                <span
                                  className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: "#F7941D" }}
                                ></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div
            className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t"
            style={{ borderColor: "#E1CAF6" }}
          >
            <div
              className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2"
              style={{
                backgroundColor: "rgba(102, 44, 143, 0.03)",
                borderColor: "#C59CDE50",
              }}
            >
              <h3
                className="text-lg sm:text-xl font-semibold mb-4"
                style={{ color: "#662C8F" }}
              >
                Kontak dan Bantuan
              </h3>
              <p
                className="text-base sm:text-lg leading-relaxed mb-2"
                style={{ color: "#662C8F" }}
              >
                Untuk pertanyaan atau kendala terkait pelaksanaan program,
                silakan hubungi:
              </p>
              <a
                href="mailto:legacy@tq-official.com"
                className="text-base sm:text-lg font-medium hover:underline transition-all duration-300"
                style={{ color: "#F7941D" }}
              >
                legacy@tq-official.com
              </a>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p
            className="text-sm sm:text-base font-light"
            style={{ color: "#662C8F" }}
          >
            Terakhir diperbarui: Oktober 2025
          </p>
        </div>
      </div>
    </div>
  );
}
