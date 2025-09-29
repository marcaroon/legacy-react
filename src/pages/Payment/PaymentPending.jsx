import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPending() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

          // Auto redirect jika sudah paid
          if (result.data.paymentStatus === "paid") {
            navigate(`/payment/success?registration_id=${registrationId}`);
          } else if (
            result.data.paymentStatus === "failed" ||
            result.data.paymentStatus === "cancelled"
          ) {
            navigate(`/payment/error?registration_id=${registrationId}`);
          }
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
  }, [registrationId, navigate]);

  const handleRefreshStatus = async () => {
    if (!registrationId) return;

    setIsRefreshing(true);

    try {
      // Sync dengan Midtrans
      const syncResponse = await fetch(
        `${API_BASE_URL}/payment/check/${registrationId}`,
        {
          method: "POST",
        }
      );
      const syncResult = await syncResponse.json();

      if (syncResult.success) {
        // Fetch updated registration data
        const response = await fetch(
          `${API_BASE_URL}/registration/${registrationId}`
        );
        const result = await response.json();

        if (result.success && result.data) {
          setRegistration(result.data);

          // Redirect berdasarkan status
          if (result.data.paymentStatus === "paid") {
            navigate(`/payment/success?registration_id=${registrationId}`);
          } else if (
            result.data.paymentStatus === "failed" ||
            result.data.paymentStatus === "cancelled"
          ) {
            navigate(`/payment/error?registration_id=${registrationId}`);
          }
        }
      }
    } catch (error) {
      console.error("Error refreshing payment status:", error);
      alert("Gagal memperbarui status pembayaran. Silakan coba lagi.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleContinuePayment = () => {
    if (registration && registration.paymentUrl) {
      window.open(registration.paymentUrl, "_blank");
    }
  };

  const handleCancelRegistration = async () => {
    if (!registrationId) return;

    const confirmCancel = window.confirm(
      "Apakah Anda yakin ingin membatalkan registrasi ini? Data dan referral code usage akan dikembalikan."
    );

    if (!confirmCancel) return;

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
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
        {/* Pending Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pembayaran Menunggu Konfirmasi
          </h1>
          <p className="text-gray-600">
            Pembayaran Anda sedang diproses. Silakan selesaikan pembayaran atau
            tunggu konfirmasi dari bank.
          </p>
        </div>

        {/* Registration Details */}
        {registration && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="bg-yellow-600 px-6 py-4">
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
                    <span className="font-bold text-yellow-600">
                      Rp {registration.totalAmount?.toLocaleString("id-ID")}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Status:
                    <span className="inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Menunggu Pembayaran
                    </span>
                  </p>
                  <p className="text-gray-600 mt-2">
                    Waktu Registrasi:{" "}
                    <span className="font-medium">
                      {new Date(registration.createdAt).toLocaleString("id-ID")}
                    </span>
                  </p>
                  {registration.midtransTransactionId && (
                    <p className="text-gray-600 mt-1">
                      Transaction ID:{" "}
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {registration.midtransTransactionId}
                      </span>
                    </p>
                  )}
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
                            <p className="text-green-600 text-sm font-medium">
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
            onClick={handleRefreshStatus}
            disabled={isRefreshing}
            className={`px-6 py-3 text-white rounded-lg font-semibold ${
              isRefreshing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isRefreshing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Memperbarui...</span>
              </div>
            ) : (
              "Perbarui Status"
            )}
          </button>
          <button
            onClick={handleContinuePayment}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold"
          >
            Lanjutkan Pembayaran
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
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
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
              <p className="text-sm text-yellow-700">
                <strong>
                  Status Pembayaran Pending - Apa yang harus dilakukan:
                </strong>
              </p>
              <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
                <li>
                  Jika menggunakan Virtual Account, selesaikan transfer sesuai
                  nominal yang tertera
                </li>
                <li>
                  Jika menggunakan kartu kredit, tunggu konfirmasi dari bank
                  penerbit
                </li>
                <li>
                  Jika menggunakan e-wallet, periksa aplikasi untuk
                  menyelesaikan pembayaran
                </li>
                <li>
                  Status akan otomatis diperbarui setelah pembayaran
                  dikonfirmasi
                </li>
                <li>
                  Pembayaran akan otomatis dibatalkan jika tidak diselesaikan
                  dalam 1 jam
                </li>
              </ul>
              <p className="text-sm text-yellow-700 mt-3">
                <strong>Jika pembayaran sudah dilakukan:</strong>
              </p>
              <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
                <li>Klik tombol "Perbarui Status" untuk cek status terbaru</li>
                <li>Tunggu hingga 15 menit untuk konfirmasi otomatis</li>
                <li>Simpan bukti transfer untuk referensi</li>
                <li>
                  Hubungi customer service jika status tidak berubah setelah 30
                  menit
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Auto Refresh Indicator */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Status akan diperbarui otomatis setiap 30 detik
        </div>
      </div>
    </div>
  );
}
