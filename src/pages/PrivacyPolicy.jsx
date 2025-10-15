import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Pengantar",
      content:
        "Kebijakan Privasi ini menjelaskan bagaimana LEGACY mengumpulkan, menggunakan, dan melindungi data pribadi yang diberikan oleh peserta selama proses pendaftaran dan pelaksanaan program.",
    },
    {
      title: "2. Data yang kami kumpulkan",
      content: "Kami dapat mengumpulkan data pribadi berikut:",
      list: [
        "Nama lengkap",
        "Nomor telepon, alamat email, dan daerah domisili",
        "Informasi pembayaran (rekening, bukti transfer, atau metode pembayaran digital)",
      ],
    },
    {
      title: "3. Tujuan penggunaan data",
      content: "Data digunakan untuk:",
      list: [
        "Proses administrasi dan verifikasi pendaftaran",
        "Pengiriman informasi program (jadwal, lokasi, invoice, dan pengumuman)",
        "Analisis internal untuk peningkatan layanan",
        "Komunikasi pasca-program, seperti undangan networking atau follow-up mentorship",
      ],
    },
    {
      title: "4. Keamanan Data",
      content:
        "Kami berkomitmen melindungi data pribadi peserta menggunakan sistem keamanan digital yang sesuai standar industri. Akses terhadap data hanya diberikan kepada pihak internal yang berwenang dan mitra yang terlibat langsung dalam pelaksanaan program.",
    },
    {
      title: "5. Pembagian data ke pihak ketiga",
      content:
        "Data peserta tidak akan dijual atau dibagikan kepada pihak ketiga di luar ekosistem LEGACY tanpa persetujuan peserta, kecuali:",
      list: [
        "Diperlukan oleh hukum atau lembaga berwenang, atau",
        "Diperlukan untuk kelancaran pelaksanaan program (misalnya penginapan, transportasi, atau penyedia layanan pembayaran).",
      ],
    },
    {
      title: "6. Hak peserta",
      content: "Peserta berhak untuk:",
      list: [
        "Meminta salinan data pribadi mereka",
        "Meminta perbaikan atau pembaruan data pribadi yang tidak akurat, sesuai dengan ketentuan dan konsekuensi yang berlaku",
        "Mengajukan permintaan pencabutan atau pembatasan penggunaan data pribadi dengan mengirimkan permintaan melalui email ke legacy@tq-official.com",
      ],
      additionalNote:
        "Apabila peserta memilih untuk membatasi atau mencabut izin penggunaan data, maka peserta memahami dan menyetujui bahwa hal tersebut dapat memengaruhi layanan yang diberikan, termasuk tidak menerima pembaruan informasi mengenai program LEGACY.",
    },
    {
      title: "7. Perubahan Kebijakan",
      content:
        "LEGACY Indonesia dapat memperbarui kebijakan ini sewaktu-waktu. Setiap perubahan akan diumumkan melalui situs resmi https://fromlegacy.tqpartner.com",
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
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate(-1);
            }}
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
              Kebijakan Privasi
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
              Perlindungan dan keamanan data pribadi Anda adalah prioritas kami
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
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: "#662C8F" }}
                >
                  {section.content}
                </p>
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
                {section.additionalNote && (
                  <div
                    className="mt-4 p-4 rounded-lg border-l-4"
                    style={{
                      backgroundColor: "rgba(251, 191, 36, 0.05)",
                      borderColor: "#F7941D",
                    }}
                  >
                    <p
                      className="text-sm sm:text-base leading-relaxed italic"
                      style={{ color: "#662C8F" }}
                    >
                      <strong>Catatan:</strong> {section.additionalNote}
                    </p>
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
                Hubungi Kami
              </h3>
              <p
                className="text-base sm:text-lg leading-relaxed mb-2"
                style={{ color: "#662C8F" }}
              >
                Untuk pertanyaan terkait kebijakan privasi, silakan hubungi:
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
            Terakhir diperbarui: Oktober 2024
          </p>
        </div>
      </div>
    </div>
  );
}
