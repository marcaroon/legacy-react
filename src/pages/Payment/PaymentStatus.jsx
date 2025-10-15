import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Download,
} from "lucide-react";

export default function PaymentStatus() {
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchStatus = async () => {
      if (!registrationId) {
        setError("Registration ID tidak ditemukan");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/registration/${registrationId}`
        );
        const result = await response.json();

        if (result.success) {
          setRegistration(result.data);
        } else {
          setError(result.message || "Registrasi tidak ditemukan");
        }
      } catch (err) {
        console.error("Error fetching registration status:", err);
        setError("Terjadi kesalahan saat memuat status pembayaran");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    // Auto refresh setiap 5 detik jika status pending
    const interval =
      registration?.paymentStatus === "pending"
        ? setInterval(fetchStatus, 5000)
        : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [registrationId, API_BASE_URL, registration?.paymentStatus]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleDownloadInvoice = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/registration/${registrationId}/invoice`
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${registrationId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
      alert("Gagal mengunduh invoice. Silakan coba lagi.");
    }
  };

  const getStatusIcon = (status) => {
    const iconProps = { strokeWidth: 1.5 };
    switch (status) {
      case "paid":
        return <CheckCircle className="w-12 h-12 text-white" {...iconProps} />;
      case "pending":
        return <Clock className="w-12 h-12 text-white" {...iconProps} />;
      case "failed":
      case "cancelled":
      case "expired":
        return <XCircle className="w-12 h-12 text-white" {...iconProps} />;
      default:
        return (
          <AlertTriangle className="w-12 h-12 text-white" {...iconProps} />
        );
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "paid":
        return {
          headerTitle: "Pembayaran Berhasil",
          title: "Pembayaran Berhasil!",
          message:
            "Terima kasih! Pembayaran Anda telah berhasil diproses dan registrasi dikonfirmasi.",
          bgGradient: "linear-gradient(135deg, #22c55e, #16a34a)",
          textGradient: "linear-gradient(135deg, #22c55e, #16a34a)",
          shadowColor: "rgba(34, 197, 94, 0.3)",
        };
      case "pending":
        return {
          headerTitle: "Pembayaran Tertunda",
          title: "Pembayaran Sedang Diproses",
          message:
            "Pembayaran Anda sedang dalam proses. Mohon tunggu konfirmasi dari sistem pembayaran.",
          bgGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
          textGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
          shadowColor: "rgba(245, 158, 11, 0.3)",
        };
      case "failed":
        return {
          headerTitle: "Pembayaran Gagal",
          title: "Pembayaran Gagal",
          message:
            "Pembayaran tidak dapat diproses. Silakan coba lagi atau hubungi customer service.",
          bgGradient: "linear-gradient(135deg, #ef4444, #dc2626)",
          textGradient: "linear-gradient(135deg, #ef4444, #dc2626)",
          shadowColor: "rgba(239, 68, 68, 0.3)",
        };
      case "cancelled":
        return {
          headerTitle: "Pembayaran Dibatalkan",
          title: "Pembayaran Dibatalkan",
          message:
            "Pembayaran telah dibatalkan. Anda dapat mendaftar ulang kapan saja.",
          bgGradient: "linear-gradient(135deg, #6b7280, #4b5563)",
          textGradient: "linear-gradient(135deg, #6b7280, #4b5563)",
          shadowColor: "rgba(107, 114, 128, 0.3)",
        };
      case "expired":
        return {
          headerTitle: "Pembayaran Kedaluwarsa",
          title: "Pembayaran Kedaluwarsa",
          message:
            "Waktu pembayaran telah habis. Silakan daftar ulang untuk melanjutkan.",
          bgGradient: "linear-gradient(135deg, #ef4444, #dc2626)",
          textGradient: "linear-gradient(135deg, #ef4444, #dc2626)",
          shadowColor: "rgba(239, 68, 68, 0.3)",
        };
      default:
        return {
          headerTitle: "Status Pembayaran",
          title: "Status Tidak Diketahui",
          message:
            "Status pembayaran tidak dapat ditentukan. Hubungi customer service untuk bantuan.",
          bgGradient: "linear-gradient(135deg, #6b7280, #4b5563)",
          textGradient: "linear-gradient(135deg, #6b7280, #4b5563)",
          shadowColor: "rgba(107, 114, 128, 0.3)",
        };
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
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
        </div>

        <div
          className="backdrop-blur-lg rounded-3xl p-8 border-2"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#E1CAF6",
            boxShadow: "0 20px 40px rgba(197, 156, 222, 0.1)",
          }}
        >
          <div className="flex items-center justify-center space-x-3">
            <div
              className="animate-spin rounded-full h-6 w-6 border-b-2"
              style={{ borderColor: "#662C8F" }}
            ></div>
            <span className="text-lg font-light" style={{ color: "#662C8F" }}>
              Memuat status pembayaran...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen relative overflow-hidden py-20 px-6"
        style={{ backgroundColor: "#F5F4F2" }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse"
            style={{
              backgroundColor: "#662C8F",
              filter: "blur(120px)",
            }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 animate-pulse"
            style={{
              backgroundColor: "#F7941D",
              filter: "blur(100px)",
            }}
          ></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 mb-8 text-lg font-medium transition-all duration-300 hover:gap-4"
            style={{ color: "#ED6335" }}
          >
            <ArrowLeft
              size={20}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Kembali ke Beranda
          </button>

          <div
            className="backdrop-blur-lg rounded-3xl p-10 border-2 text-center max-w-2xl mx-auto"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#E1CAF6",
              boxShadow: "0 20px 40px rgba(197, 156, 222, 0.1)",
            }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)",
              }}
            >
              <XCircle className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
            <h1
              className="text-4xl md:text-5xl font-light mb-8 leading-tight"
              style={{ color: "#662C8F" }}
            >
              Terjadi
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r font-normal mt-2"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ef4444, #dc2626)",
                }}
              >
                Kesalahan
              </span>
            </h1>
            <p
              className="text-xl font-light mb-8 leading-relaxed"
              style={{ color: "#662C8F" }}
            >
              {error}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 text-white rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #662C8F, #C59CDE)",
              }}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(registration?.paymentStatus);

  return (
    <div
      className="min-h-screen relative overflow-hidden py-20 px-6"
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
        <div className="mb-16">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 mb-8 text-lg font-medium transition-all duration-300 hover:gap-4"
            style={{ color: "#ED6335" }}
          >
            <ArrowLeft
              size={20}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Kembali ke Beranda
          </button>

          {/* Status Header */}
          <div className="text-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 animate-[fadeIn_0.5s_ease-out]"
              style={{
                background: statusConfig.bgGradient,
                boxShadow: `0 20px 40px ${statusConfig.shadowColor}`,
              }}
            >
              {getStatusIcon(registration?.paymentStatus)}
            </div>

            <h1
              className="text-4xl md:text-6xl font-light mb-4 leading-tight transition-all duration-500"
              style={{ color: "#662C8F" }}
            >
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r font-normal animate-[slideDown_0.6s_ease-out]"
                style={{
                  backgroundImage: statusConfig.textGradient,
                }}
              >
                {statusConfig.headerTitle}
              </span>
            </h1>

            <p
              className="text-xl font-light max-w-4xl mx-auto leading-relaxed mt-6 animate-[fadeIn_0.8s_ease-out]"
              style={{ color: "#662C8F" }}
            >
              {statusConfig.message}
            </p>
          </div>
        </div>

        {/* Status Details */}
        <div
          className="backdrop-blur-lg rounded-3xl p-10 border-2 mb-8"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#E1CAF6",
            boxShadow: "0 20px 40px rgba(197, 156, 222, 0.1)",
          }}
        >
          <div
            className="backdrop-blur-lg rounded-2xl p-6 mb-8 border-2"
            style={{
              background: `${statusConfig.bgGradient
                .replace("135deg", "135deg")
                .replace(")", ", 0.1)")}, ${statusConfig.bgGradient
                .replace("135deg", "135deg")
                .replace(")", ", 0.05)")}`,
              borderColor:
                registration?.paymentStatus === "paid"
                  ? "#22c55e30"
                  : registration?.paymentStatus === "pending"
                  ? "#f59e0b30"
                  : "#ef444430",
            }}
          >
            <h2
              className="text-3xl font-light mb-4"
              style={{ color: "#662C8F" }}
            >
              {statusConfig.title}
            </h2>
          </div>

          {registration && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3
                    className="text-xl font-light mb-6"
                    style={{ color: "#662C8F" }}
                  >
                    Informasi Registrasi
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-light" style={{ color: "#64748b" }}>
                        ID Registrasi:
                      </span>
                      <span
                        className="font-mono text-sm px-3 py-2 rounded-full"
                        style={{
                          backgroundColor: "rgba(102, 44, 143, 0.1)",
                          color: "#662C8F",
                        }}
                      >
                        {registration.registrationId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-light" style={{ color: "#64748b" }}>
                        Program:
                      </span>
                      <span
                        className="font-medium text-right max-w-xs"
                        style={{ color: "#662C8F" }}
                      >
                        {registration.program?.title ||
                          registration.program_title}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-light" style={{ color: "#64748b" }}>
                        Total Peserta:
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "#F7941D" }}
                      >
                        {registration.totalParticipants} orang
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-light" style={{ color: "#64748b" }}>
                        Nama Kontak:
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "#662C8F" }}
                      >
                        {registration.contactName}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    className="text-xl font-light mb-6"
                    style={{ color: "#662C8F" }}
                  >
                    Status Pembayaran
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-light" style={{ color: "#64748b" }}>
                        Total Biaya:
                      </span>
                      <span
                        className="font-medium text-xl"
                        style={{ color: "#662C8F" }}
                      >
                        {formatPrice(registration.totalAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-light" style={{ color: "#64748b" }}>
                        Status:
                      </span>
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                          registration.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : registration.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {registration.paymentStatus === "paid"
                          ? "Lunas"
                          : registration.paymentStatus === "pending"
                          ? "Menunggu"
                          : registration.paymentStatus === "failed"
                          ? "Gagal"
                          : registration.paymentStatus === "cancelled"
                          ? "Dibatalkan"
                          : registration.paymentStatus === "expired"
                          ? "Kedaluwarsa"
                          : "Tidak Diketahui"}
                      </span>
                    </div>
                    {registration.paidAt && (
                      <div className="flex justify-between items-center">
                        <span
                          className="font-light"
                          style={{ color: "#64748b" }}
                        >
                          Dibayar pada:
                        </span>
                        <span
                          className="font-medium"
                          style={{ color: "#662C8F" }}
                        >
                          {new Date(registration.paidAt).toLocaleString(
                            "id-ID",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="font-light" style={{ color: "#64748b" }}>
                        Tanggal Daftar:
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "#662C8F" }}
                      >
                        {new Date(registration.createdAt).toLocaleString(
                          "id-ID",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-refresh indicator for pending status */}
              {registration.paymentStatus === "pending" && (
                <div
                  className="backdrop-blur-lg rounded-2xl p-4 mb-8 border-2"
                  style={{
                    backgroundColor: "rgba(251, 191, 36, 0.05)",
                    borderColor: "#fbbf2450",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: "#f59e0b" }}
                    ></div>
                    <p
                      className="font-light text-sm"
                      style={{ color: "#662C8F" }}
                    >
                      Status akan diperbarui otomatis setiap 5 detik. Jika
                      pembayaran sudah selesai, halaman akan menampilkan status
                      terbaru.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {registration?.paymentStatus === "paid" && (
            <button
              onClick={handleDownloadInvoice}
              className="px-8 py-4 text-white rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
              }}
            >
              <Download size={20} strokeWidth={1.5} />
              <span>Download Invoice</span>
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 text-white rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #662C8F, #C59CDE)",
            }}
          >
            Kembali ke Beranda
          </button>

          {(registration?.paymentStatus === "failed" ||
            registration?.paymentStatus === "expired" ||
            registration?.paymentStatus === "cancelled") && (
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 text-white rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #F7941D, #ED6335)",
              }}
            >
              Daftar Ulang
            </button>
          )}
        </div>

        {/* Important Notes */}
        <div
          className="backdrop-blur-lg rounded-2xl p-6 border-2"
          style={{
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            borderColor: "#3b82f650",
          }}
        >
          <div className="flex items-start space-x-4">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-1"
              style={{ backgroundColor: "#3b82f6" }}
            >
              i
            </div>
            <div>
              <p className="font-medium mb-3" style={{ color: "#662C8F" }}>
                Informasi Penting:
              </p>
              <ul
                className="space-y-2 font-light leading-relaxed"
                style={{ color: "#662C8F" }}
              >
                {registration?.paymentStatus === "paid" && (
                  <>
                    <li>
                      • Simpan ID registrasi Anda untuk referensi di masa
                      mendatang
                    </li>
                    <li>
                      • Email konfirmasi akan dikirim dalam 24 jam ke alamat
                      terdaftar
                    </li>
                    <li>
                      • Download dan simpan invoice sebagai bukti pembayaran
                    </li>
                  </>
                )}
                {registration?.paymentStatus === "pending" && (
                  <>
                    <li>
                      • Halaman ini akan diperbarui otomatis ketika pembayaran
                      dikonfirmasi
                    </li>
                    <li>
                      • Anda dapat menutup halaman ini dan kembali lagi nanti
                    </li>
                    <li>
                      • Jika pembayaran tidak berhasil dalam 1 jam, silakan
                      daftar ulang
                    </li>
                  </>
                )}
                {(registration?.paymentStatus === "failed" ||
                  registration?.paymentStatus === "expired" ||
                  registration?.paymentStatus === "cancelled") && (
                  <>
                    <li>
                      • Anda dapat mendaftar ulang dengan mengklik tombol
                      "Daftar Ulang"
                    </li>
                    <li>• Pastikan informasi pembayaran Anda benar</li>
                    <li>• Jika masalah berlanjut, hubungi customer service</li>
                  </>
                )}
                <li>
                  • Hubungi customer service jika ada pertanyaan lebih lanjut
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>;
