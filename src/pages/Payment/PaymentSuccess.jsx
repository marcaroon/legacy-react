import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Get registration ID from URL params or state
  const urlParams = new URLSearchParams(location.search);
  const registrationId =
    location.state?.registrationId ||
    urlParams.get("registration_id") ||
    localStorage.getItem("registration_id");

  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      if (!registrationId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/registration/${registrationId}`
        );
        const result = await response.json();

        if (result.success && result.data) {
          setRegistration(result.data);
          localStorage.removeItem("registration_id");
        } else {
          console.error("Failed to fetch registration:", result.message);
          setRegistration(null);
        }
      } catch (error) {
        console.error("Error fetching registration:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrationDetails();
  }, [registrationId]);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
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
              style={{ borderColor: "#22c55e" }}
            ></div>
            <span className="text-lg font-light" style={{ color: "#662C8F" }}>
              Memuat detail pembayaran...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!registrationId) {
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

        <div
          className="backdrop-blur-lg rounded-3xl p-10 border-2 text-center max-w-md mx-auto"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#E1CAF6",
            boxShadow: "0 20px 40px rgba(197, 156, 222, 0.1)",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#fef2f2" }}
          >
            <svg
              className="w-10 h-10"
              style={{ color: "#ef4444" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-light mb-4" style={{ color: "#662C8F" }}>
            Data Tidak Ditemukan
          </h2>
          <p
            className="text-lg font-light mb-8 leading-relaxed"
            style={{ color: "#662C8F" }}
          >
            ID registrasi tidak ditemukan atau tidak valid.
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
    );
  }

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

          {/* Success Header */}
          <div className="text-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
              }}
            >
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
            <h1
              className="text-4xl md:text-6xl font-light mb-8 leading-tight"
              style={{ color: "#662C8F" }}
            >
              Pembayaran
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r font-normal mt-2"
                style={{
                  backgroundImage: "linear-gradient(135deg, #22c55e, #16a34a)",
                }}
              >
                Berhasil!
              </span>
            </h1>
            <p
              className="text-xl font-light max-w-4xl mx-auto leading-relaxed"
              style={{ color: "#662C8F" }}
            >
              Terima kasih atas pendaftaran Anda. Registrasi telah berhasil
              dikonfirmasi dan Anda akan segera menerima email konfirmasi.
            </p>
          </div>
        </div>

        {/* Registration Details */}
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
              background:
                "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05))",
              borderColor: "#22c55e30",
            }}
          >
            <h2
              className="text-2xl font-light mb-6"
              style={{ color: "#662C8F" }}
            >
              Detail Registrasi
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
                    Informasi Program
                  </h3>
                  <div className="space-y-4">
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
                        Durasi:
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "#F7941D" }}
                      >
                        {registration.program?.duration ||
                          registration.duration}
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
                        Total Pembayaran:
                      </span>
                      <span
                        className="font-medium text-xl"
                        style={{ color: "#22c55e" }}
                      >
                        {formatPrice(
                          registration.grand_total || registration.totalAmount
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-light" style={{ color: "#64748b" }}>
                        Status:
                      </span>
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Lunas
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
                            "id-ID"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Participants List */}
              <div
                className="backdrop-blur-lg rounded-2xl p-6 border-2 mb-8"
                style={{
                  backgroundColor: "rgba(247, 148, 29, 0.03)",
                  borderColor: "#F7941D30",
                }}
              >
                <h4
                  className="text-lg font-light mb-6"
                  style={{ color: "#662C8F" }}
                >
                  Daftar Peserta:
                </h4>
                <div className="space-y-4">
                  {registration.participants?.map((participant, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white rounded-xl p-6 border border-gray-100"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                            style={{
                              background:
                                "linear-gradient(135deg, #662C8F, #C59CDE)",
                            }}
                          >
                            {index + 1}
                          </span>
                          <div>
                            <span
                              className="font-medium text-lg"
                              style={{ color: "#662C8F" }}
                            >
                              {participant.name}
                            </span>
                            <div
                              className="text-sm"
                              style={{ color: "#64748b" }}
                            >
                              {participant.email} • {participant.phone}
                            </div>
                          </div>
                        </div>
                        {participant.referralCode && (
                          <div className="mt-3 ml-11">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Kode Referral: {participant.referralCode}
                              {participant.discountAmount > 0 &&
                                ` (-${formatPrice(
                                  participant.discountAmount
                                )})`}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Di bagian daftar peserta, UBAH bagian harga */}
                      <div className="text-right">
                        <div
                          className="font-medium text-lg"
                          style={{ color: "#662C8F" }}
                        >
                          {formatPrice(
                            registration.actual_price_per_participant ||
                              registration.program?.price ||
                              0
                          )}
                        </div>
                        {participant.discountAmount > 0 && (
                          <div
                            className="text-sm font-medium"
                            style={{ color: "#22c55e" }}
                          >
                            - {formatPrice(participant.discountAmount)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Summary */}
              <div
                className="backdrop-blur-lg rounded-2xl p-6 border-2"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.05)",
                  borderColor: "#22c55e30",
                }}
              >
                <h3
                  className="text-lg font-light mb-6"
                  style={{ color: "#662C8F" }}
                >
                  Ringkasan Biaya
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-light" style={{ color: "#64748b" }}>
                      Subtotal ({registration.totalParticipants} peserta):
                    </span>
                    <span className="font-medium" style={{ color: "#662C8F" }}>
                      {formatPrice(
                        registration.totalParticipants *
                          (registration.actual_price_per_participant ||
                            registration.program?.price ||
                            0)
                      )}
                    </span>
                  </div>
                  {registration.discount_total > 0 && (
                    <div className="flex justify-between items-center">
                      <span
                        className="font-medium"
                        style={{ color: "#22c55e" }}
                      >
                        Total Diskon:
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "#22c55e" }}
                      >
                        - {formatPrice(registration.discount_total)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span
                      className="font-medium text-xl"
                      style={{ color: "#662C8F" }}
                    >
                      Total Dibayar:
                    </span>
                    <span
                      className="font-medium text-2xl"
                      style={{ color: "#22c55e" }}
                    >
                      {formatPrice(
                        registration.grand_total || registration.totalAmount
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {registration && registration.paymentStatus === "paid" && (
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
                <li>
                  • Simpan ID registrasi Anda untuk referensi di masa mendatang
                </li>
                <li>
                  • Email konfirmasi akan dikirim dalam 24 jam ke alamat
                  terdaftar
                </li>
                <li>• Download dan simpan invoice sebagai bukti pembayaran</li>
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
