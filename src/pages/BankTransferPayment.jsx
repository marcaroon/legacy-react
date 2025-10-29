import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Copy,
  CheckCircle,
  Upload,
  AlertCircle,
  Clock,
  ArrowLeft,
  Building2,
  CreditCard,
  User,
  FileText,
  X,
} from "lucide-react";

export default function BankTransferPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { registrationId } = useParams();

  const [copied, setCopied] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Bank account details - GANTI DENGAN DATA REKENING SEBENARNYA
  const bankDetails = {
    bankName: "BCA (Bank Central Asia)",
    accountNumber: "4292069999",
    accountName: "TOTAL QUALITY INDONESIA",
  };

  useEffect(() => {
    const fetchRegistrationData = async () => {
      if (!registrationId) {
        navigate("/registration");
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/registration/${registrationId}`
        );
        const result = await response.json();

        if (result.success) {
          setRegistrationData(result.data);
          if (result.data.bankTransferProof) {
            setUploadedFile({ name: "Bukti transfer sudah diunggah" });
          }
        } else {
          alert("Data registrasi tidak ditemukan");
          navigate("/registration");
        }
      } catch (error) {
        console.error("Error fetching registration:", error);
        alert("Terjadi kesalahan saat memuat data");
        navigate("/registration");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrationData();
  }, [registrationId, API_BASE_URL, navigate]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadError(null);

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!validTypes.includes(file.type)) {
      setUploadError("Format file tidak valid. Gunakan JPG, PNG, atau PDF");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Ukuran file terlalu besar. Maksimal 5MB");
      return;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }

    setUploadedFile(file);
  };

  const handleSubmitProof = async () => {
    if (!uploadedFile) {
      alert("Silakan unggah bukti transfer terlebih dahulu.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch(
        `${API_BASE_URL}/registration/${registrationId}/upload-proof`,
        {
          method: "POST",
          body: formData,
        }
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();
      if (result.success) {
        alert(
          "Bukti pembayaran berhasil dikirim! Pembayaran Anda akan diverifikasi dalam 1x24 jam."
        );
        navigate(`/payment/status/${registrationId}`);
      } else {
        throw new Error(result.message || "Upload gagal");
      }
    } catch (error) {
      console.error(error);
      setUploadError(
        error.message || "Gagal mengirim bukti transfer. Silakan coba lagi."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    setUploadProgress(0);
    // Reset file input
    const fileInput = document.getElementById("proof-upload");
    if (fileInput) {
      fileInput.value = "";
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
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F5F4F2" }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#662C8F" }}
          ></div>
          <p style={{ color: "#662C8F" }}>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden py-10 px-4"
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
            animationDelay: "2s",
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 mb-8 text-lg font-medium transition-all duration-300 hover:gap-4"
          style={{ color: "#ED6335" }}
        >
          <ArrowLeft
            size={20}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Kembali
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light mb-4" style={{ color: "#662C8F" }}>
            Transfer Bank BCA
          </h1>
          <p className="text-lg font-light" style={{ color: "#666" }}>
            Silakan transfer sesuai nominal dan unggah bukti pembayaran
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bank Details Card */}
          <div
            className="backdrop-blur-lg rounded-2xl p-8 border-2"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#E1CAF6",
              boxShadow: "0 20px 40px rgba(197, 156, 222, 0.1)",
            }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #662C8F, #C59CDE)",
                }}
              >
                <Building2 size={24} className="text-white" />
              </div>
              <h2 className="text-xl font-medium" style={{ color: "#662C8F" }}>
                Informasi Rekening
              </h2>
            </div>

            <div className="space-y-6">
              {/* Bank Name */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#666" }}
                >
                  Nama Bank
                </label>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <span className="font-medium" style={{ color: "#662C8F" }}>
                    {bankDetails.bankName}
                  </span>
                </div>
              </div>

              {/* Account Number */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#666" }}
                >
                  Nomor Rekening
                </label>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <span
                    className="text-2xl font-bold tracking-wider"
                    style={{ color: "#662C8F" }}
                  >
                    {bankDetails.accountNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(bankDetails.accountNumber)}
                    className="p-2 rounded-lg transition-all hover:bg-white"
                    style={{ color: copied ? "#10b981" : "#F7941D" }}
                  >
                    {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              {/* Account Name */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#666" }}
                >
                  Atas Nama
                </label>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <span className="font-medium" style={{ color: "#662C8F" }}>
                    {bankDetails.accountName}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#666" }}
                >
                  Jumlah Transfer
                </label>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #F7941D20, #ED633520)",
                  }}
                >
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "#F7941D" }}
                  >
                    {registrationData
                      ? formatPrice(registrationData.totalAmount)
                      : "Rp 0"}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div
              className="mt-6 p-4 rounded-xl flex items-start space-x-3"
              style={{ backgroundColor: "rgba(251, 191, 36, 0.1)" }}
            >
              <AlertCircle
                size={20}
                className="flex-shrink-0 mt-0.5"
                style={{ color: "#F7941D" }}
              />
              <p
                className="text-sm font-light leading-relaxed"
                style={{ color: "#662C8F" }}
              >
                <strong>Penting:</strong> Pastikan nominal transfer sesuai
                dengan jumlah yang tertera. Pembayaran akan diverifikasi dalam
                waktu 1x24 jam setelah bukti transfer diunggah.
              </p>
            </div>
          </div>

          {/* Upload Proof Card */}
          <div
            className="backdrop-blur-lg rounded-2xl p-8 border-2"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#F7941D30",
              boxShadow: "0 20px 40px rgba(247, 148, 29, 0.1)",
            }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #F7941D, #ED6335)",
                }}
              >
                <Upload size={24} className="text-white" />
              </div>
              <h2 className="text-xl font-medium" style={{ color: "#662C8F" }}>
                Upload Bukti Transfer
              </h2>
            </div>

            {/* Upload Area */}
            <div className="space-y-6">
              <label
                htmlFor="proof-upload"
                className={`
                  relative block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
                  transition-all duration-300 hover:scale-[1.02]
                  ${
                    uploadedFile
                      ? "border-green-400 bg-green-50"
                      : uploadError
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/30"
                  }
                  ${
                    (isUploading ||
                      (uploadedFile && registrationData?.bankTransferProof)) &&
                    "pointer-events-none opacity-60"
                  }
                `}
              >
                <input
                  id="proof-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,application/pdf"
                  onChange={handleFileUpload}
                  disabled={
                    isUploading ||
                    (uploadedFile && registrationData?.bankTransferProof)
                  }
                  className="hidden"
                />

                {uploadedFile ? (
                  <div className="space-y-3">
                    <CheckCircle size={48} className="mx-auto text-green-500" />
                    <div>
                      <p className="font-medium text-green-700">
                        File Berhasil Diunggah
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {uploadedFile.name}
                      </p>
                    </div>
                    {previewUrl && (
                      <div className="mt-4">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-40 mx-auto rounded-lg"
                        />
                      </div>
                    )}
                    {!registrationData?.bankTransferProof && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveFile();
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-700 flex items-center justify-center gap-1 mx-auto"
                      >
                        <X size={16} />
                        Hapus File
                      </button>
                    )}
                  </div>
                ) : uploadError ? (
                  <div className="space-y-3">
                    <AlertCircle size={48} className="mx-auto text-red-500" />
                    <div>
                      <p className="font-medium text-red-700">Error</p>
                      <p className="text-sm text-red-600 mt-1">{uploadError}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload
                      size={48}
                      className="mx-auto"
                      style={{ color: "#662C8F" }}
                    />
                    <div>
                      <p className="font-medium" style={{ color: "#662C8F" }}>
                        {isUploading
                          ? "Mengunggah..."
                          : "Klik untuk upload bukti"}
                      </p>
                      <p className="text-sm mt-1" style={{ color: "#666" }}>
                        JPG atau PNG (Max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </label>

              {uploadedFile && !registrationData?.bankTransferProof && (
                <button
                  onClick={handleSubmitProof}
                  disabled={isUploading}
                  className="w-full mt-4 py-2 rounded-lg text-white font-medium transition-all"
                  style={{
                    background: "linear-gradient(135deg, #F7941D, #ED6335)",
                    opacity: isUploading ? 0.7 : 1,
                  }}
                >
                  {isUploading ? "Mengirim..." : "Kirim Bukti Bayar"}
                </button>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "#662C8F" }}>Uploading...</span>
                    <span style={{ color: "#662C8F" }}>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${uploadProgress}%`,
                        background: "linear-gradient(90deg, #662C8F, #C59CDE)",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="space-y-3">
                <h3
                  className="font-medium text-sm"
                  style={{ color: "#662C8F" }}
                >
                  Panduan Upload:
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: "#666" }}>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-500 font-bold">1.</span>
                    <span>Pastikan detail transaksi terlihat jelas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-500 font-bold">2.</span>
                    <span>Upload file bukti transfer di form ini</span>
                  </li>
                </ul>
              </div>

              {/* Info Box */}
              <div
                className="p-4 rounded-xl flex items-start space-x-3"
                style={{ backgroundColor: "rgba(102, 44, 143, 0.05)" }}
              >
                <Clock
                  size={20}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#662C8F" }}
                />
                <div
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "#662C8F" }}
                >
                  <strong>Waktu Verifikasi:</strong> Tim kami akan memverifikasi
                  pembayaran Anda dalam waktu 1x24 jam (hari kerja). Anda akan
                  menerima email konfirmasi setelah pembayaran diverifikasi.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Summary */}
        {registrationData && (
          <div
            className="mt-8 backdrop-blur-lg rounded-2xl p-8 border-2"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#E1CAF6",
              boxShadow: "0 20px 40px rgba(197, 156, 222, 0.1)",
            }}
          >
            <h3
              className="text-xl font-medium mb-6"
              style={{ color: "#662C8F" }}
            >
              Ringkasan Pendaftaran
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#662C8F20" }}
                >
                  <FileText size={20} style={{ color: "#662C8F" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#666" }}>
                    Program
                  </p>
                  <p className="font-medium" style={{ color: "#662C8F" }}>
                    {registrationData.program_title}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#F7941D20" }}
                >
                  <User size={20} style={{ color: "#F7941D" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#666" }}>
                    Jumlah Peserta
                  </p>
                  <p className="font-medium" style={{ color: "#662C8F" }}>
                    {registrationData.totalParticipants} orang
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#10b98120" }}
                >
                  <CreditCard size={20} style={{ color: "#10b981" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#666" }}>
                    Total Pembayaran
                  </p>
                  <p
                    className="font-medium text-lg"
                    style={{ color: "#F7941D" }}
                  >
                    {formatPrice(registrationData.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-sm font-light" style={{ color: "#666" }}>
            Mengalami kesulitan? Hubungi kami di{" "}
            <a
              href="mailto:legacy@tq-official.com"
              className="font-medium hover:underline"
              style={{ color: "#F7941D" }}
            >
              legacy@tq-official.com
            </a>{" "}
            atau WhatsApp{" "}
            <a
              href="https://wa.me/6281515300511"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: "#F7941D" }}
            >
              +62 815 1530 0511
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
