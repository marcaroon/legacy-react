import { ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RefundPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Umum",
      content:
        "Kebijakan Pengembalian Dana (Refund Policy) ini mengatur ketentuan terkait pengembalian biaya pendaftaran program LEGACY Training Camp yang diselenggarakan oleh LEGACY. Dengan melakukan pendaftaran dan pembayaran, peserta dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan dalam kebijakan ini.",
    },
    {
      title: "2. Ketentuan pengembalian dana",
      content:
        "Pengembalian dana hanya dapat dilakukan apabila program dibatalkan oleh pihak penyelenggara.",
      subsections: [
        {
          text: "Pembatalan dapat terjadi apabila jumlah peserta yang mendaftar tidak memenuhi kuota minimum dalam kurun waktu satu bulan sebelum tanggal pelaksanaan.",
        },
        {
          text: "Apabila kondisi tersebut terjadi:",
          list: [
            "Peserta berhak menerima pengembalian dana sebesar 100% dari total biaya pendaftaran yang telah dibayarkan.",
            "Proses pengembalian dana akan dilakukan maksimal 14 (empat belas) hari kerja setelah pengumuman resmi pembatalan program disampaikan kepada seluruh peserta.",
          ],
        },
      ],
    },
    {
      title: "3. Pembatalan oleh peserta",
      content:
        "Apabila pembatalan dilakukan oleh peserta atas alasan pribadi, seluruh biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan (non-refundable), karena biaya tersebut telah dialokasikan untuk kebutuhan operasional dan komitmen penyelenggaraan program.",
      isImportant: true,
    },
    {
      title: "4. Prosedur pengembalian dana",
      content:
        "Dalam hal program dibatalkan oleh penyelenggara, peserta akan dihubungi langsung oleh tim LEGACY melalui email resmi (legacy@tq-official.com) untuk proses verifikasi dan pengembalian dana.",
      subsections: [
        {
          text: "Peserta akan diminta untuk:",
          list: [
            "Menyertakan bukti pembayaran",
            "Menyampaikan informasi rekening pengembalian dana",
            "Melakukan konfirmasi identitas untuk keperluan validasi",
          ],
        },
      ],
    },
    {
      title: "5. Perubahan Kebijakan",
      content:
        "LEGACY berhak untuk memperbarui kebijakan ini sewaktu-waktu sesuai dengan ketentuan penyelenggaraan program. Setiap perubahan akan diinformasikan melalui situs resmi https://fromlegacy.tqpartner.com",
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
              Kebijakan Pengembalian Dana
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
              Ketentuan dan prosedur pengembalian biaya pendaftaran program
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

                {section.isImportant ? (
                  <div
                    className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2"
                    style={{
                      backgroundColor: "rgba(237, 99, 53, 0.05)",
                      borderColor: "#ED633550",
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <AlertCircle
                        className="flex-shrink-0 mt-1"
                        size={20}
                        style={{ color: "#ED6335" }}
                      />
                      <p
                        className="text-base sm:text-lg leading-relaxed"
                        style={{ color: "#662C8F" }}
                      >
                        <span className="font-semibold">Penting: </span>
                        {section.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p
                    className="text-base sm:text-lg leading-relaxed"
                    style={{ color: "#662C8F" }}
                  >
                    {section.content}
                  </p>
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

          {/* Important Notice */}
          <div
            className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t"
            style={{ borderColor: "#E1CAF6" }}
          >
            <div
              className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2"
              style={{
                backgroundColor: "rgba(251, 191, 36, 0.05)",
                borderColor: "#fbbf2450",
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
                Untuk pertanyaan terkait kebijakan pengembalian dana, silakan
                hubungi:
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

<style jsx>{`
  .peer:checked ~ label {
    animation: checkboxPulse 0.3s ease-out;
  }

  @keyframes checkboxPulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1.05);
    }
  }

  /* Hover effect untuk checkbox */
  label:hover {
    transform: scale(1.05);
  }
`}</style>;
