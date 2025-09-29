import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentError() {
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

    const statusInterval = setInterval(async () => {
      if (!registrationId) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/registration/${registrationId}`
        );
        const result = await response.json();

        if (result.success && result.data) {
          if (result.data.paymentStatus === "paid") {
            navigate(`/payment/success?registration_id=${registrationId}`, {
              replace: true,
            });
          } else if (
            result.data.paymentStatus === "failed" ||
            result.data.paymentStatus === "cancelled" ||
            result.data.paymentStatus === "expired"
          ) {
            navigate(`/payment/error?registration_id=${registrationId}`, {
              replace: true,
            });
          }
        }
      } catch (error) {
        console.error("Auto status check error:", error);
      }
    }, 30000); // 30 seconds

    fetchRegistrationDetails();

    return () => {
      clearInterval(statusInterval);
    };
  }, [registrationId]);

  const handleRetryPayment = () => {
    if (registration && registration.paymentUrl) {
      window.open(registration.paymentUrl, "_blank");
    } else {
      // Redirect ke halaman registrasi ulang
      navigate("/registration");
    }
  };

  const handleCancelRegistration = async () => {
    if (!registrationId) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/registration/${registrationId}/cancel`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (result.success) {
        alert(
          "Registrasi telah dibatalkan. Data dan referral code usage telah dikembalikan."
        );
        localStorage.removeItem("registration_id");
        navigate("/");
      } else {
        alert(
          "Gagal membatalkan registrasi. Silakan hubungi customer service."
        );
      }
    } catch (error) {
      console.error("Error cancelling registration:", error);
      alert("Terjadi kesalahan saat membatalkan registrasi.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail pembayaran...</p>
        </div>
      </div>
    );
  }

  if (!registrationId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Data Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-6">
            ID registrasi tidak ditemukan atau tidak valid.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Error Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-600"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pembayaran Gagal
          </h1>
          <p className="text-gray-600">
            Terjadi kesalahan saat memproses pembayaran Anda. Silakan coba lagi
            atau hubungi customer service.
          </p>
        </div>

        {/* Registration Details */}
        {registration && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="bg-red-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                Detail Registrasi
              </h2>
            </div>

            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Informasi Program
                  </h3>
                  <p className="text-gray-600">
                    Program:{" "}
                    <span className="font-medium">
                      {registration.program?.title ||
                        registration.program_title}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Durasi:{" "}
                    <span className="font-medium">
                      {registration.program?.duration || registration.duration}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Total Peserta:{" "}
                    <span className="font-medium">
                      {registration.totalParticipants}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    ID Registrasi:{" "}
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {registration.registrationId}
                    </span>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Status Pembayaran
                  </h3>
                  <p className="text-gray-600">
                    Total Pembayaran:{" "}
                    <span className="font-bold text-gray-900">
                      Rp {registration.totalAmount?.toLocaleString("id-ID")}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Status:
                    <span className="inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Gagal
                    </span>
                  </p>
                  <p className="text-gray-600 mt-2">
                    Waktu Registrasi:{" "}
                    <span className="font-medium">
                      {new Date(registration.createdAt).toLocaleString("id-ID")}
                    </span>
                  </p>
                </div>
              </div>

              {/* Participants List */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Daftar Peserta
                </h3>
                <div className="space-y-3">
                  {registration.participants?.map((participant, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {index + 1}. {participant.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Email: {participant.email}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Telepon: {participant.phone}
                          </p>
                          {participant.referralCode && (
                            <p className="text-orange-600 text-sm font-medium">
                              Kode Referral: {participant.referralCode}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            Rp{" "}
                            {registration.program?.price?.toLocaleString(
                              "id-ID"
                            )}
                          </p>
                          {participant.discountAmount > 0 && (
                            <p className="text-green-600 text-sm">
                              Diskon: -Rp{" "}
                              {participant.discountAmount.toLocaleString(
                                "id-ID"
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleRetryPayment}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Coba Lagi Pembayaran
          </button>
          <button
            onClick={handleCancelRegistration}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
          >
            Batalkan Registrasi
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Kembali ke Beranda
          </button>
        </div>

        {/* Important Notes */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Kemungkinan Penyebab Kegagalan:</strong>
              </p>
              <ul className="text-sm text-red-700 mt-2 list-disc list-inside space-y-1">
                <li>Saldo rekening atau kartu kredit tidak mencukupi</li>
                <li>Koneksi internet terputus saat proses pembayaran</li>
                <li>Bank atau penerbit kartu menolak transaksi</li>
                <li>Waktu pembayaran telah habis (expired)</li>
                <li>Data pembayaran yang dimasukkan tidak sesuai</li>
              </ul>
              <p className="text-sm text-red-700 mt-3">
                <strong>Apa yang dapat Anda lakukan:</strong>
              </p>
              <ul className="text-sm text-red-700 mt-2 list-disc list-inside space-y-1">
                <li>Periksa kembali saldo rekening atau limit kartu kredit</li>
                <li>Pastikan koneksi internet stabil</li>
                <li>Hubungi bank Anda jika diperlukan</li>
                <li>Coba lagi dengan metode pembayaran yang berbeda</li>
                <li>Hubungi customer service kami jika masalah berlanjut</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
