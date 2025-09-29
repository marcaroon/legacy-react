import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { Trash, ArrowLeft } from "lucide-react";

const steps = ["Data Peserta", "Rincian Program", "Pembayaran"];

export default function RegisterSteps() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const program = location.state?.program || "Tanpa Program";
  const programId = location.state?.programId || null;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

  const [currentStep, setCurrentStep] = useState(1);
  const [participants, setParticipants] = useState([
    {
      name: "",
      email: "",
      phone: "",
      referral_code: "",
      discount_amount: 0,
      discount_valid: false,
      discount_message: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [programData, setProgramData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", CLIENT_KEY);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [CLIENT_KEY]);

  // Fetch program data dari backend
  useEffect(() => {
    const fetchProgramData = async () => {
      if (programId) {
        try {
          const response = await fetch(`${API_BASE_URL}/programs/${programId}`);
          const result = await response.json();

          if (result.success) {
            setProgramData(result.data);
          } else {
            console.error("Program not found");
            // Optionally redirect or show an error message
            alert("Program tidak ditemukan. Silakan pilih program lain.");
            navigate("/registration"); // Redirect back to registration page
          }
        } catch (error) {
          console.error("Error fetching program:", error);
          alert("Terjadi kesalahan saat memuat data program.");
          navigate("/registration"); // Redirect back to registration page
        }
      } else {
        // If programId is null, redirect back to registration
        navigate("/registration");
      }
    };

    fetchProgramData();
  }, [programId, API_BASE_URL, navigate]); // Add navigate to dependency array

  const price = programData?.currentPrice || programData?.price || 0;
  const total = participants.length * price;

  // Validasi data peserta dengan error handling yang lebih baik
  const validateParticipants = () => {
    const newErrors = {};
    let isValid = true;

    participants.forEach((participant, index) => {
      const participantErrors = {};

      if (!participant.name.trim()) {
        participantErrors.name = "Nama harus diisi";
        isValid = false;
      }

      if (!participant.email.trim()) {
        participantErrors.email = "Email harus diisi";
        isValid = false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(participant.email)) {
          participantErrors.email = "Format email tidak valid";
          isValid = false;
        }
      }

      if (!participant.phone.trim()) {
        participantErrors.phone = "Nomor HP harus diisi";
        isValid = false;
      }

      if (Object.keys(participantErrors).length > 0) {
        newErrors[index] = participantErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Fungsi untuk cek kode referral
  const checkReferralCode = async (code, participantIndex) => {
    if (!code.trim()) {
      // Reset discount jika kode kosong
      updateParticipant(participantIndex, "discount_amount", 0);
      updateParticipant(participantIndex, "discount_valid", false);
      updateParticipant(participantIndex, "discount_message", ""); // Clear message
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/referral/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referral_code: code,
          program_id: programId,
        }),
      });

      const result = await response.json();

      if (result.success && result.data.discount_amount) {
        updateParticipant(
          participantIndex,
          "discount_amount",
          result.data.discount_amount
        );
        updateParticipant(participantIndex, "discount_valid", true);
        updateParticipant(
          participantIndex,
          "discount_message",
          `Potongan: Rp ${result.data.discount_amount.toLocaleString("id-ID")}`
        );
      } else {
        updateParticipant(participantIndex, "discount_amount", 0);
        updateParticipant(participantIndex, "discount_valid", false);
        updateParticipant(
          participantIndex,
          "discount_message",
          result.message || "Kode referral tidak valid"
        );
      }
    } catch (error) {
      console.error("Error checking referral:", error);
      updateParticipant(participantIndex, "discount_amount", 0);
      updateParticipant(participantIndex, "discount_valid", false);
      updateParticipant(
        participantIndex,
        "discount_message",
        "Error mengecek kode referral"
      );
    }
  };

  const addParticipant = () => {
    setParticipants([
      ...participants,
      {
        name: "",
        email: "",
        phone: "",
        referral_code: "",
        discount_amount: 0,
        discount_valid: false,
        discount_message: "",
      },
    ]);
  };

  const removeParticipant = (index) => {
    if (participants.length > 1) {
      const updated = participants.filter((_, i) => i !== index);
      setParticipants(updated);
      // Clear errors for removed participant
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const updateParticipant = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);

    if (errors[index]?.[field]) {
      const newErrors = { ...errors };
      delete newErrors[index][field];
      if (Object.keys(newErrors[index] || {}).length === 0) {
        delete newErrors[index];
      }
      setErrors(newErrors);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!validateParticipants()) {
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async () => {
    if (!programId) {
      alert("Program ID tidak ditemukan");
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = {
        program_id: programId,
        contact_name: participants[0].name,
        contact_email: participants[0].email,
        contact_phone: participants[0].phone,
        participants: participants,
      };

      console.log("Sending registration data:", registrationData);

      // Actual API call to backend
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();
      console.log("Registration response:", result);

      if (result.success && result.data.midtrans_token) {
        // Simpan registration ID
        localStorage.setItem("registration_id", result.data.registration_id);

        // panggil midtrans snap pop up
        if (window.snap) {
          window.snap.pay(result.data.midtrans_token, {
            onSuccess: function (result) {
              console.log("Payment success:", result);
              const registrationId = localStorage.getItem("registration_id");
              navigate(`/payment/status/${registrationId}`);
            },
            onPending: function (result) {
              console.log("Payment pending:", result);
              const registrationId = localStorage.getItem("registration_id");
              navigate(`/payment/status/${registrationId}`);
            },
            onError: function (result) {
              console.log("Payment error:", result);
              alert("Terjadi kesalahan saat pembayaran. Silakan coba lagi.");
            },
            onClose: function () {
              console.log("Payment popup closed");

              const registrationId = localStorage.getItem("registration_id");
              if (registrationId) {
                fetch(`${API_BASE_URL}/registration/${registrationId}`)
                  .then((response) => response.json())
                  .then((statusResult) => {
                    if (
                      statusResult.success &&
                      statusResult.data.paymentStatus === "pending"
                    ) {
                      return fetch(
                        `${API_BASE_URL}/registration/${registrationId}/cancel`,
                        {
                          method: "DELETE",
                        }
                      );
                    }
                    return null;
                  })
                  .then((response) => {
                    if (response) {
                      return response.json();
                    }
                    return null;
                  })
                  .then((result) => {
                    if (result) {
                      console.log("Registration cancelled:", result);
                      localStorage.removeItem("registration_id");

                      if (result.success) {
                        alert(
                          "Pendaftaran dibatalkan. Anda dapat mendaftar ulang kapan saja."
                        );
                      }
                    } else {
                      // Jika tidak di-cancel, arahkan ke status page
                      window.location.href = `/payment/status/${registrationId}`;
                      return;
                    }
                  })
                  .catch((error) => {
                    localStorage.removeItem("registration_id");
                    console.error("Error handling payment closure:", error);
                  });
              }

              // HAPUS alert ini jika tidak di-cancel
              // alert("Pendaftaran dibatalkan karena pembayaran tidak diselesaikan");
            },
          });
        } else {
          // fallback klo pop up snap belum loaded
          console.error("Midtrans Snap not loaded");
          alert(
            "Sedang memuat sistem pembayaran. Silakan coba lagi dalam beberapa detik."
          );

          setTimeout(() => {
            if (window.snap) {
              window.snap.pay(result.data.midtrans_token);
            } else {
              window.open(result.data.payment_url, "_blank");
            }
          }, 2000);
        }
      } else {
        alert(result.message || "Terjadi kesalahan saat mendaftar");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (programId && !programData) {
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
          <div
            className="absolute top-16 right-16 w-6 h-6 border-2 rounded rotate-45 animate-spin"
            style={{ borderColor: "#C59CDE", animationDuration: "15s" }}
          ></div>
          <div
            className="absolute bottom-16 left-16 w-4 h-4 rounded-full animate-ping"
            style={{ backgroundColor: "#ED6335" }}
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
              Memuat data program...
            </span>
          </div>
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            programData
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/");
            }}
            className="group flex items-center gap-3 mb-8 text-lg font-medium transition-all duration-300 hover:gap-4"
            style={{ color: "#ED6335" }}
          >
            <ArrowLeft
              size={20}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Kembali
          </button>

          <div className="text-center">
            <h1
              className="text-4xl md:text-6xl font-light mb-8 leading-tight"
              style={{ color: "#662C8F" }}
            >
              Pendaftaran Program
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r font-normal mt-2"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
                }}
              >
                {programData?.title || program}
              </span>
            </h1>
            <p
              className="text-xl font-light max-w-4xl mx-auto leading-relaxed"
              style={{ color: "#662C8F" }}
            >
              Lengkapi data Anda untuk melanjutkan pendaftaran program terbaik
              kami.
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-6">
            {steps.map((step, i) => {
              const stepNumber = i + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;

              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 ${
                        isActive
                          ? "text-white shadow-lg transform scale-110"
                          : isCompleted
                          ? "text-white shadow-md"
                          : "bg-white text-gray-400 border-2 border-gray-200"
                      }`}
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, #662C8F, #C59CDE)"
                          : isCompleted
                          ? "linear-gradient(135deg, #ED6335, #F7941D)"
                          : undefined,
                      }}
                    >
                      {isCompleted ? "✓" : stepNumber}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-purple-700"
                          : isCompleted
                          ? "text-orange-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-4 rounded-full transition-colors duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-r from-orange-400 to-orange-500"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Step */}
        <div
          className="max-w-5xl mx-auto backdrop-blur-lg rounded-3xl p-10 border-2 transition-all duration-500"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#E1CAF6",
            boxShadow: "0 20px 40px rgba(197, 156, 222, 0.1)",
          }}
        >
          {currentStep === 1 && (
            <div>
              <div className="mb-10">
                <h2
                  className="text-3xl font-light mb-4"
                  style={{ color: "#662C8F" }}
                >
                  Data Peserta
                </h2>
                <p
                  className="text-lg font-light leading-relaxed"
                  style={{ color: "#662C8F" }}
                >
                  Masukkan data lengkap untuk setiap peserta program
                </p>
              </div>

              <div className="space-y-8">
                {participants.map((p, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-lg rounded-2xl p-8 border-2 transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(237, 99, 53, 0.03)",
                      borderColor: "#F7941D30",
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3
                        className="text-xl font-normal"
                        style={{ color: "#662C8F" }}
                      >
                        Peserta {i + 1}
                      </h3>
                      {participants.length > 1 && (
                        <button
                          onClick={() => removeParticipant(i)}
                          className="px-4 py-2 text-white text-sm rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #f87171, #ef4444)", // merah semi pudar
                          }}
                        >
                          <Trash
                            className="w-4 h-4 text-white/80"
                            strokeWidth={1.5}
                          />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          className="block text-sm font-normal mb-3"
                          style={{ color: "#662C8F" }}
                        >
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          placeholder="Masukkan nama lengkap"
                          value={p.name}
                          onChange={(e) =>
                            updateParticipant(i, "name", e.target.value)
                          }
                          className={`w-full border-2 rounded-xl p-4 font-light transition-all duration-300 ${
                            errors[i]?.name
                              ? "border-red-400 bg-red-50 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          } focus:ring-4 focus:ring-purple-100 focus:outline-none`}
                          style={{ color: "#662C8F" }}
                        />
                        {errors[i]?.name && (
                          <p className="text-red-500 text-sm mt-2 font-medium">
                            {errors[i].name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-sm font-normal mb-3"
                          style={{ color: "#662C8F" }}
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          placeholder="contoh@email.com"
                          value={p.email}
                          onChange={(e) =>
                            updateParticipant(i, "email", e.target.value)
                          }
                          className={`w-full border-2 rounded-xl p-4 font-light transition-all duration-300 ${
                            errors[i]?.email
                              ? "border-red-400 bg-red-50 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          } focus:ring-4 focus:ring-purple-100 focus:outline-none`}
                          style={{ color: "#662C8F" }}
                        />
                        {errors[i]?.email && (
                          <p className="text-red-500 text-sm mt-2 font-medium">
                            {errors[i].email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-sm font-normal mb-3"
                          style={{ color: "#662C8F" }}
                        >
                          Nomor HP *
                        </label>
                        <input
                          type="text"
                          placeholder="08xxxxxxxxxx"
                          value={p.phone}
                          onChange={(e) =>
                            updateParticipant(i, "phone", e.target.value)
                          }
                          className={`w-full border-2 rounded-xl p-4 font-light transition-all duration-300 ${
                            errors[i]?.phone
                              ? "border-red-400 bg-red-50 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          } focus:ring-4 focus:ring-purple-100 focus:outline-none`}
                          style={{ color: "#662C8F" }}
                        />
                        {errors[i]?.phone && (
                          <p className="text-red-500 text-sm mt-2 font-medium">
                            {errors[i].phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-sm font-normal mb-3"
                          style={{ color: "#662C8F" }}
                        >
                          Kode Referral (Opsional)
                        </label>
                        <input
                          type="text"
                          placeholder="Masukkan kode referral"
                          value={p.referral_code}
                          onChange={(e) => {
                            updateParticipant(
                              i,
                              "referral_code",
                              e.target.value
                            );
                            // Debounce check referral code
                            clearTimeout(window.referralTimeout);
                            window.referralTimeout = setTimeout(() => {
                              checkReferralCode(e.target.value, i);
                            }, 500);
                          }}
                          className="w-full border-2 rounded-xl p-4 font-light transition-all duration-300 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                          style={{ color: "#662C8F" }}
                        />
                        {/* Tampilkan status referral */}
                        {p.referral_code && (
                          <div className="mt-3">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                p.discount_valid
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {p.discount_valid}
                              <span className="ml-1">
                                {p.discount_message ||
                                  "Mengecek kode referral..."}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={addParticipant}
                  className="px-6 py-3 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #F7941D, #ED6335)",
                  }}
                >
                  + Tambah Peserta
                </button>

                <button
                  onClick={nextStep}
                  className="px-8 py-4 text-white rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #662C8F, #C59CDE)",
                  }}
                >
                  Lanjut ke Rincian →
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="mb-10">
                <h2
                  className="text-3xl font-light mb-4"
                  style={{ color: "#662C8F" }}
                >
                  Rincian Program
                </h2>
                <p
                  className="text-lg font-light leading-relaxed"
                  style={{ color: "#662C8F" }}
                >
                  Periksa kembali detail program dan biaya pendaftaran
                </p>
              </div>

              {(() => {
                const discountTotal = participants.reduce(
                  (acc, p) => acc + (Number(p.discount_amount) || 0),
                  0
                );
                const grandTotal = total - discountTotal;

                return (
                  <>
                    <div
                      className="backdrop-blur-lg rounded-2xl p-8 border-2 mb-8"
                      style={{
                        backgroundColor: "rgba(102, 44, 143, 0.03)",
                        borderColor: "#C59CDE50",
                      }}
                    >
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <h3
                            className="text-xl font-light mb-6"
                            style={{ color: "#662C8F" }}
                          >
                            Detail Program
                          </h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span
                                className="font-light"
                                style={{ color: "#662C8F" }}
                              >
                                Nama Program:
                              </span>
                              <span
                                className="font-medium text-right max-w-xs"
                                style={{ color: "#662C8F" }}
                              >
                                {programData?.title || program}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span
                                className="font-light"
                                style={{ color: "#662C8F" }}
                              >
                                Durasi:
                              </span>
                              <span
                                className="font-medium"
                                style={{ color: "#F7941D" }}
                              >
                                {programData?.duration || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span
                                className="font-light"
                                style={{ color: "#662C8F" }}
                              >
                                Jumlah Peserta:
                              </span>
                              <span
                                className="font-medium"
                                style={{ color: "#F7941D" }}
                              >
                                {participants.length} orang
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3
                            className="text-xl font-light mb-6"
                            style={{ color: "#662C8F" }}
                          >
                            Rincian Biaya
                          </h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span
                                className="font-light"
                                style={{ color: "#662C8F" }}
                              >
                                Harga per Peserta:
                              </span>
                              <div className="text-right">
                                <span
                                  className="font-medium text-lg"
                                  style={{ color: "#662C8F" }}
                                >
                                  {formatPrice(price)}
                                </span>
                                {programData?.isEarlyBirdActive && (
                                  <div className="text-xs px-3 py-1 rounded-full text-white font-semibold mt-1 inline-block ml-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-[length:200%_200%] animate-[gradient-move_3s_linear_infinite]">
                                    Early Bird
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <span
                                className="font-light"
                                style={{ color: "#662C8F" }}
                              >
                                Jumlah Peserta:
                              </span>
                              <span
                                className="font-medium"
                                style={{ color: "#662C8F" }}
                              >
                                {participants.length} Peserta
                              </span>
                            </div>
                            {discountTotal > 0 && (
                              <div className="flex justify-between items-center">
                                <span
                                  className="font-medium"
                                  style={{ color: "#10b981" }}
                                >
                                  Potongan Referral:
                                </span>
                                <span
                                  className="font-medium"
                                  style={{ color: "#10b981" }}
                                >
                                  - {formatPrice(discountTotal)}
                                </span>
                              </div>
                            )}
                            <div className="border-t pt-4 mt-4">
                              <div className="flex justify-between items-center">
                                <span
                                  className="font-medium text-xl"
                                  style={{ color: "#662C8F" }}
                                >
                                  Total Biaya:
                                </span>
                                <span
                                  className="font-medium text-2xl"
                                  style={{ color: "#F7941D" }}
                                >
                                  {formatPrice(grandTotal)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Daftar Peserta */}
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
                        Daftar Peserta Terdaftar:
                      </h4>
                      <div className="space-y-4">
                        {participants.map((participant, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100"
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
                                    className="font-medium"
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
                              {participant.referral_code &&
                                participant.discount_valid && (
                                  <div className="mt-2 ml-11">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      ✓ {participant.referral_code} (-
                                      {formatPrice(
                                        participant.discount_amount || 0
                                      )}
                                      )
                                    </span>
                                  </div>
                                )}
                              {participant.referral_code &&
                                !participant.discount_valid && (
                                  <div className="mt-2 ml-11">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      ✗ {participant.referral_code} (tidak
                                      valid)
                                    </span>
                                  </div>
                                )}
                            </div>
                            <div className="text-right">
                              <div
                                className="font-medium"
                                style={{ color: "#662C8F" }}
                              >
                                {formatPrice(price)}
                              </div>
                              {participant.discount_amount > 0 && (
                                <div
                                  className="text-sm font-medium"
                                  style={{ color: "#10b981" }}
                                >
                                  - {formatPrice(participant.discount_amount)}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="px-6 py-3 bg-white border-2 text-gray-600 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                        style={{ borderColor: "#E5E7EB" }}
                      >
                        Kembali
                      </button>
                      <button
                        onClick={nextStep}
                        className="px-8 py-4 text-white rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #662C8F, #C59CDE)",
                        }}
                      >
                        Lanjut ke Pembayaran →
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div className="mb-10">
                <h2
                  className="text-3xl font-light mb-4"
                  style={{ color: "#662C8F" }}
                >
                  Pembayaran
                </h2>
                <p
                  className="text-lg font-light leading-relaxed"
                  style={{ color: "#662C8F" }}
                >
                  Selesaikan pembayaran untuk menyelesaikan pendaftaran Anda
                </p>
              </div>

              {(() => {
                const discountTotal = participants.reduce(
                  (acc, p) => acc + (Number(p.discount_amount) || 0),
                  0
                );
                const grandTotal = total - discountTotal;

                return (
                  <>
                    <div
                      className="backdrop-blur-lg rounded-2xl p-8 border-2 mb-8"
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.03)",
                        borderColor: "#22c55e50",
                      }}
                    >
                      <h3
                        className="text-xl font-light mb-6"
                        style={{ color: "#662C8F" }}
                      >
                        Ringkasan Pendaftaran
                      </h3>

                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <h4
                            className="font-medium mb-4"
                            style={{ color: "#662C8F" }}
                          >
                            Detail Program:
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span
                                className="font-light"
                                style={{ color: "#64748b" }}
                              >
                                Program:
                              </span>
                              <span
                                className="font-medium text-right max-w-xs"
                                style={{ color: "#662C8F" }}
                              >
                                {programData?.title || program}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span
                                className="font-light"
                                style={{ color: "#64748b" }}
                              >
                                Jumlah Peserta:
                              </span>
                              <span
                                className="font-medium"
                                style={{ color: "#662C8F" }}
                              >
                                {participants.length} orang
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span
                                className="font-light"
                                style={{ color: "#64748b" }}
                              >
                                Harga per Peserta:
                              </span>
                              <span
                                className="font-medium"
                                style={{ color: "#662C8F" }}
                              >
                                {formatPrice(price)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4
                            className="font-medium mb-4"
                            style={{ color: "#662C8F" }}
                          >
                            Data Peserta:
                          </h4>
                          <div className="space-y-3">
                            {participants.map((participant, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center text-sm"
                              >
                                <div className="flex items-center space-x-2">
                                  <span
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #662C8F, #C59CDE)",
                                    }}
                                  >
                                    {index + 1}
                                  </span>
                                  <span
                                    className="font-medium"
                                    style={{ color: "#662C8F" }}
                                  >
                                    {participant.name}
                                    {participant.referral_code &&
                                      participant.discount_valid && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                          {participant.referral_code}
                                        </span>
                                      )}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <div
                                    className="font-medium"
                                    style={{ color: "#662C8F" }}
                                  >
                                    {formatPrice(price)}
                                  </div>
                                  {participant.discount_amount > 0 && (
                                    <div
                                      className="text-xs font-medium"
                                      style={{ color: "#10b981" }}
                                    >
                                      -{" "}
                                      {formatPrice(participant.discount_amount)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6 mt-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span
                              className="font-light"
                              style={{ color: "#64748b" }}
                            >
                              Subtotal:
                            </span>
                            <span
                              className="font-medium"
                              style={{ color: "#662C8F" }}
                            >
                              {formatPrice(total)}
                            </span>
                          </div>
                          {discountTotal > 0 && (
                            <div className="flex justify-between items-center">
                              <span
                                className="font-medium"
                                style={{ color: "#10b981" }}
                              >
                                Potongan Referral:
                              </span>
                              <span
                                className="font-medium"
                                style={{ color: "#10b981" }}
                              >
                                - {formatPrice(discountTotal)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center pt-3 border-t">
                            <span
                              className="text-xl font-medium"
                              style={{ color: "#662C8F" }}
                            >
                              Total Pembayaran:
                            </span>
                            <span
                              className="text-2xl font-medium"
                              style={{ color: "#22c55e" }}
                            >
                              {formatPrice(grandTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="backdrop-blur-lg rounded-2xl p-6 border-2 mb-8"
                      style={{
                        backgroundColor: "rgba(251, 191, 36, 0.05)",
                        borderColor: "#fbbf2450",
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                          style={{ backgroundColor: "#fbbf24" }}
                        >
                          !
                        </div>
                        <div>
                          <p
                            className="font-light leading-relaxed"
                            style={{ color: "#662C8F" }}
                          >
                            <span className="font-medium">Catatan:</span>{" "}
                            Setelah mengklik tombol "Bayar Sekarang", Anda akan
                            diarahkan ke halaman pembayaran yang aman. Pastikan
                            data yang Anda masukkan sudah benar sebelum
                            melanjutkan.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="px-6 py-3 bg-white border-2 text-gray-600 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                        style={{ borderColor: "#E5E7EB" }}
                      >
                        Kembali
                      </button>
                      <button
                        onClick={handlePayment}
                        disabled={isLoading}
                        className={`px-10 py-4 rounded-full text-white font-medium text-lg transition-all duration-300 transform hover:scale-105 ${
                          isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "hover:shadow-xl"
                        }`}
                        style={
                          !isLoading
                            ? {
                                background:
                                  "linear-gradient(135deg, #22c55e, #16a34a)",
                                boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
                              }
                            : {}
                        }
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Memproses Pembayaran...</span>
                          </div>
                        ) : (
                          "Bayar Sekarang"
                        )}
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
