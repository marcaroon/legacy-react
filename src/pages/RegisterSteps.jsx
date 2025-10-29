import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Trash, ArrowLeft } from "lucide-react";
import PaymentMethodModal from "../components/PaymentMethodModal";

const steps = ["Data Peserta", "Rincian Program", "Pembayaran"];

const provincesAndCities = {
  Aceh: [
    "Banda Aceh",
    "Langsa",
    "Lhokseumawe",
    "Sabang",
    "Subulussalam",
    "Aceh Barat",
    "Aceh Barat Daya",
    "Aceh Besar",
    "Aceh Jaya",
    "Aceh Selatan",
    "Aceh Singkil",
    "Aceh Tamiang",
    "Aceh Tengah",
    "Aceh Tenggara",
    "Aceh Timur",
    "Aceh Utara",
    "Bener Meriah",
    "Bireuen",
    "Gayo Lues",
    "Nagan Raya",
    "Pidie",
    "Pidie Jaya",
    "Simeulue",
  ],
  "Sumatera Utara": [
    "Binjai",
    "Gunungsitoli",
    "Medan",
    "Padang Sidempuan",
    "Pematangsiantar",
    "Sibolga",
    "Tanjungbalai",
    "Tebing Tinggi",
    "Asahan",
    "Batubara",
    "Dairi",
    "Deli Serdang",
    "Humbang Hasundutan",
    "Karo",
    "Labuhanbatu",
    "Labuhanbatu Selatan",
    "Labuhanbatu Utara",
    "Langkat",
    "Mandailing Natal",
    "Nias",
    "Nias Barat",
    "Nias Selatan",
    "Nias Utara",
    "Padang Lawas",
    "Padang Lawas Utara",
    "Pakpak Bharat",
    "Samosir",
    "Serdang Bedagai",
    "Simalungun",
    "Tapanuli Selatan",
    "Tapanuli Tengah",
    "Tapanuli Utara",
    "Toba Samosir",
  ],
  "Sumatera Barat": [
    "Bukittinggi",
    "Padang",
    "Padang Panjang",
    "Pariaman",
    "Payakumbuh",
    "Sawahlunto",
    "Agam",
    "Dharmasraya",
    "Kepulauan Mentawai",
    "Lima Puluh Kota",
    "Padang Pariaman",
    "Pasaman",
    "Pasaman Barat",
    "Pesisir Selatan",
    "Sijunjung",
    "Solok",
    "Solok Selatan",
    "Tanah Datar",
  ],
  Riau: [
    "Dumai",
    "Pekanbaru",
    "Bengkalis",
    "Indragiri Hilir",
    "Indragiri Hulu",
    "Kampar",
    "Kepulauan Meranti",
    "Kuantan Singingi",
    "Pelalawan",
    "Rokan Hilir",
    "Rokan Hulu",
    "Siak",
  ],
  Jambi: [
    "Jambi",
    "Sungai Penuh",
    "Batang Hari",
    "Bungo",
    "Kerinci",
    "Merangin",
    "Muaro Jambi",
    "Sarolangun",
    "Tanjung Jabung Barat",
    "Tanjung Jabung Timur",
    "Tebo",
  ],
  "Sumatera Selatan": [
    "Lubuklinggau",
    "Pagar Alam",
    "Palembang",
    "Prabumulih",
    "Banyuasin",
    "Empat Lawang",
    "Lahat",
    "Muara Enim",
    "Musi Banyuasin",
    "Musi Rawas",
    "Musi Rawas Utara",
    "Ogan Ilir",
    "Ogan Komering Ilir",
    "Ogan Komering Ulu",
    "Ogan Komering Ulu Selatan",
    "Ogan Komering Ulu Timur",
    "Penukal Abab Lematang Ilir",
  ],
  Bengkulu: [
    "Bengkulu",
    "Bengkulu Selatan",
    "Bengkulu Tengah",
    "Bengkulu Utara",
    "Kaur",
    "Kepahiang",
    "Lebong",
    "Mukomuko",
    "Rejang Lebong",
    "Seluma",
  ],
  Lampung: [
    "Bandar Lampung",
    "Metro",
    "Lampung Barat",
    "Lampung Selatan",
    "Lampung Tengah",
    "Lampung Timur",
    "Lampung Utara",
    "Mesuji",
    "Pesawaran",
    "Pesisir Barat",
    "Pringsewu",
    "Tanggamus",
    "Tulang Bawang",
    "Tulang Bawang Barat",
    "Way Kanan",
  ],
  "Kepulauan Bangka Belitung": [
    "Pangkal Pinang",
    "Bangka",
    "Bangka Barat",
    "Bangka Selatan",
    "Bangka Tengah",
    "Belitung",
    "Belitung Timur",
  ],
  "Kepulauan Riau": [
    "Batam",
    "Tanjung Pinang",
    "Bintan",
    "Karimun",
    "Kepulauan Anambas",
    "Lingga",
    "Natuna",
  ],
  "DKI Jakarta": [
    "Jakarta Barat",
    "Jakarta Pusat",
    "Jakarta Selatan",
    "Jakarta Timur",
    "Jakarta Utara",
    "Kepulauan Seribu",
  ],
  "Jawa Barat": [
    "Bandung",
    "Banjar",
    "Bekasi",
    "Bogor",
    "Cimahi",
    "Cirebon",
    "Depok",
    "Sukabumi",
    "Tasikmalaya",
    "Ciamis",
    "Cianjur",
    "Garut",
    "Indramayu",
    "Karawang",
    "Kuningan",
    "Majalengka",
    "Pangandaran",
    "Purwakarta",
    "Subang",
    "Sumedang",
  ],
  "Jawa Tengah": [
    "Magelang",
    "Pekalongan",
    "Salatiga",
    "Semarang",
    "Surakarta",
    "Tegal",
    "Banjarnegara",
    "Banyumas",
    "Batang",
    "Blora",
    "Boyolali",
    "Brebes",
    "Cilacap",
    "Demak",
    "Grobogan",
    "Jepara",
    "Karanganyar",
    "Kebumen",
    "Kendal",
    "Klaten",
    "Kudus",
    "Pati",
    "Pemalang",
    "Purbalingga",
    "Purworejo",
    "Rembang",
    "Sragen",
    "Sukoharjo",
    "Temanggung",
    "Wonogiri",
    "Wonosobo",
  ],
  "DI Yogyakarta": [
    "Yogyakarta",
    "Bantul",
    "Gunung Kidul",
    "Kulon Progo",
    "Sleman",
  ],
  "Jawa Timur": [
    "Batu",
    "Blitar",
    "Kediri",
    "Madiun",
    "Malang",
    "Mojokerto",
    "Pasuruan",
    "Probolinggo",
    "Surabaya",
    "Bangkalan",
    "Banyuwangi",
    "Bojonegoro",
    "Bondowoso",
    "Gresik",
    "Jember",
    "Jombang",
    "Lamongan",
    "Lumajang",
    "Magetan",
    "Nganjuk",
    "Ngawi",
    "Pacitan",
    "Pamekasan",
    "Ponorogo",
    "Sampang",
    "Sidoarjo",
    "Situbondo",
    "Sumenep",
    "Trenggalek",
    "Tuban",
    "Tulungagung",
  ],
  Banten: [
    "Cilegon",
    "Serang",
    "Tangerang",
    "Tangerang Selatan",
    "Lebak",
    "Pandeglang",
  ],
  Bali: [
    "Denpasar",
    "Badung",
    "Bangli",
    "Buleleng",
    "Gianyar",
    "Jembrana",
    "Karangasem",
    "Klungkung",
    "Tabanan",
  ],
  "Nusa Tenggara Barat": [
    "Bima",
    "Mataram",
    "Dompu",
    "Lombok Barat",
    "Lombok Tengah",
    "Lombok Timur",
    "Lombok Utara",
    "Sumbawa",
    "Sumbawa Barat",
  ],
  "Nusa Tenggara Timur": [
    "Kupang",
    "Alor",
    "Belu",
    "Ende",
    "Flores Timur",
    "Lembata",
    "Manggarai",
    "Manggarai Barat",
    "Manggarai Timur",
    "Nagekeo",
    "Ngada",
    "Rote Ndao",
    "Sabu Raijua",
    "Sikka",
    "Sumba Barat",
    "Sumba Barat Daya",
    "Sumba Tengah",
    "Sumba Timur",
    "Timor Tengah Selatan",
    "Timor Tengah Utara",
  ],
  "Kalimantan Barat": [
    "Pontianak",
    "Singkawang",
    "Bengkayang",
    "Kapuas Hulu",
    "Kayong Utara",
    "Ketapang",
    "Kubu Raya",
    "Landak",
    "Melawi",
    "Mempawah",
    "Sambas",
    "Sanggau",
    "Sekadau",
    "Sintang",
  ],
  "Kalimantan Tengah": [
    "Palangka Raya",
    "Barito Selatan",
    "Barito Timur",
    "Barito Utara",
    "Gunung Mas",
    "Kapuas",
    "Katingan",
    "Kotawaringin Barat",
    "Kotawaringin Timur",
    "Lamandau",
    "Murung Raya",
    "Pulang Pisau",
    "Seruyan",
    "Sukamara",
  ],
  "Kalimantan Selatan": [
    "Banjarbaru",
    "Banjarmasin",
    "Balangan",
    "Banjar",
    "Barito Kuala",
    "Hulu Sungai Selatan",
    "Hulu Sungai Tengah",
    "Hulu Sungai Utara",
    "Kotabaru",
    "Tabalong",
    "Tanah Bumbu",
    "Tanah Laut",
    "Tapin",
  ],
  "Kalimantan Timur": [
    "Balikpapan",
    "Bontang",
    "Samarinda",
    "Berau",
    "Kutai Barat",
    "Kutai Kartanegara",
    "Kutai Timur",
    "Mahakam Ulu",
    "Paser",
    "Penajam Paser Utara",
  ],
  "Kalimantan Utara": [
    "Tarakan",
    "Bulungan",
    "Malinau",
    "Nunukan",
    "Tana Tidung",
  ],
  "Sulawesi Utara": [
    "Bitung",
    "Kotamobagu",
    "Manado",
    "Tomohon",
    "Bolaang Mongondow",
    "Bolaang Mongondow Selatan",
    "Bolaang Mongondow Timur",
    "Bolaang Mongondow Utara",
    "Kepulauan Sangihe",
    "Kepulauan Siau Tagulandang Biaro",
    "Kepulauan Talaud",
    "Minahasa",
    "Minahasa Selatan",
    "Minahasa Tenggara",
    "Minahasa Utara",
  ],
  "Sulawesi Tengah": [
    "Palu",
    "Banggai",
    "Banggai Kepulauan",
    "Banggai Laut",
    "Buol",
    "Donggala",
    "Morowali",
    "Morowali Utara",
    "Parigi Moutong",
    "Poso",
    "Sigi",
    "Tojo Una-Una",
    "Toli-Toli",
  ],
  "Sulawesi Selatan": [
    "Makassar",
    "Palopo",
    "Parepare",
    "Bantaeng",
    "Barru",
    "Bone",
    "Bulukumba",
    "Enrekang",
    "Gowa",
    "Jeneponto",
    "Kepulauan Selayar",
    "Luwu",
    "Luwu Timur",
    "Luwu Utara",
    "Maros",
    "Pangkajene dan Kepulauan",
    "Pinrang",
    "Sidenreng Rappang",
    "Sinjai",
    "Soppeng",
    "Takalar",
    "Tana Toraja",
    "Toraja Utara",
    "Wajo",
  ],
  "Sulawesi Tenggara": [
    "Baubau",
    "Kendari",
    "Bombana",
    "Buton",
    "Buton Selatan",
    "Buton Tengah",
    "Buton Utara",
    "Kolaka",
    "Kolaka Timur",
    "Kolaka Utara",
    "Konawe",
    "Konawe Kepulauan",
    "Konawe Selatan",
    "Konawe Utara",
    "Muna",
    "Muna Barat",
    "Wakatobi",
  ],
  Gorontalo: [
    "Gorontalo",
    "Boalemo",
    "Bone Bolango",
    "Gorontalo Utara",
    "Pohuwato",
  ],
  "Sulawesi Barat": [
    "Mamuju",
    "Majene",
    "Mamasa",
    "Mamuju Tengah",
    "Pasangkayu",
    "Polewali Mandar",
  ],
  Maluku: [
    "Ambon",
    "Tual",
    "Buru",
    "Buru Selatan",
    "Kepulauan Aru",
    "Maluku Barat Daya",
    "Maluku Tengah",
    "Maluku Tenggara",
    "Kepulauan Tanimbar",
    "Seram Bagian Barat",
    "Seram Bagian Timur",
  ],
  "Maluku Utara": [
    "Ternate",
    "Tidore Kepulauan",
    "Halmahera Barat",
    "Halmahera Selatan",
    "Halmahera Tengah",
    "Halmahera Timur",
    "Halmahera Utara",
    "Kepulauan Sula",
    "Pulau Morotai",
    "Pulau Taliabu",
  ],
  "Papua Barat": [
    "Fakfak",
    "Kaimana",
    "Manokwari",
    "Manokwari Selatan",
    "Maybrat",
    "Pegunungan Arfak",
    "Tambrauw",
    "Teluk Bintuni",
    "Teluk Wondama",
  ],
  Papua: [
    "Jayapura",
    "Biak Numfor",
    "Deiyai",
    "Dogiyai",
    "Intan Jaya",
    "Jayawijaya",
    "Keerom",
    "Kepulauan Yapen",
    "Lanny Jaya",
    "Mamberamo Raya",
    "Mamberamo Tengah",
    "Nabire",
    "Nduga",
    "Paniai",
    "Pegunungan Bintang",
    "Puncak",
    "Puncak Jaya",
    "Sarmi",
    "Supiori",
    "Tolikara",
    "Waropen",
    "Yahukimo",
    "Yalimo",
  ],
  "Papua Selatan": ["Merauke", "Asmat", "Boven Digoel", "Mappi"],
  "Papua Tengah": [
    "Nabire",
    "Deiyai",
    "Dogiyai",
    "Intan Jaya",
    "Mimika",
    "Paniai",
    "Puncak",
    "Puncak Jaya",
  ],
  "Papua Pegunungan": [
    "Jayawijaya",
    "Lanny Jaya",
    "Mamberamo Tengah",
    "Nduga",
    "Pegunungan Bintang",
    "Tolikara",
    "Yahukimo",
    "Yalimo",
  ],
  "Papua Barat Daya": [
    "Sorong",
    "Kota Sorong",
    "Raja Ampat",
    "Sorong Selatan",
    "Tambrauw",
    "Maybrat",
    "Fakfak",
    "Kaimana",
  ],
};

export default function RegisterSteps() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const program = location.state?.program || "Tanpa Program";
  const programId = location.state?.programId || null;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePolicyLinkClick = (e, path) => {
    e.preventDefault();
    window.open(path, "_blank");
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [participants, setParticipants] = useState([
    {
      name: "",
      email: "",
      phone: "",
      city: "",
      referral_code: "",
      discount_amount: 0,
      discount_valid: false,
      discount_message: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [programData, setProgramData] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedProvinces, setSelectedProvinces] = useState({});

  useEffect(() => {
    const script = document.createElement("script");
    // script.src = "https://app.midtrans.com/snap/snap.js";
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", CLIENT_KEY);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [CLIENT_KEY]);

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
            alert("Program tidak ditemukan. Silakan pilih program lain.");
            navigate("/registration");
          }
        } catch (error) {
          console.error("Error fetching program:", error);
          alert("Terjadi kesalahan saat memuat data program.");
          navigate("/registration");
        }
      } else {
        navigate("/registration");
      }
    };

    fetchProgramData();
  }, [programId, API_BASE_URL, navigate]);

  const price = programData?.currentPrice || programData?.price || 0;
  const total = participants.length * price;

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

      if (!participant.city.trim()) {
        participantErrors.city = "Kota asal harus diisi";
        isValid = false;
      }

      if (Object.keys(participantErrors).length > 0) {
        newErrors[index] = participantErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const checkReferralCode = async (code, participantIndex) => {
    if (!code.trim()) {
      updateParticipant(participantIndex, "discount_amount", 0);
      updateParticipant(participantIndex, "discount_valid", false);
      updateParticipant(participantIndex, "discount_message", "");
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
        city: "",
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

  const calculatePPN = (subtotal) => {
    return Math.round(subtotal * 0.11);
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      // Tampilkan modal untuk memilih metode pembayaran
      setShowPaymentMethodModal(true);
      return;
    }

    if (selectedPaymentMethod === "bank_transfer") {
      // Proses pendaftaran untuk bank transfer
      await handleBankTransferRegistration();
    } else {
      // Proses pendaftaran untuk VA (existing flow)
      await handleVARegistration();
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethodModal(false);

    // Trigger payment setelah metode dipilih
    if (method === "bank_transfer") {
      handleBankTransferRegistration();
    } else {
      handleVARegistration();
    }
  };

  const handleBankTransferRegistration = async () => {
    if (window.fbq) {
      window.fbq("trackCustom", "InitiateCheckout", {
        program_id: programId,
        total_amount: total,
        participants_count: participants.length,
        payment_method: "bank_transfer",
      });
    }

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

      const response = await fetch(`${API_BASE_URL}/register/bank-transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("registration_id", result.data.registration_id);
        // Redirect ke halaman bank transfer
        navigate(`/payment/bank-transfer/${result.data.registration_id}`);
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

  const handleVARegistration = async () => {
    if (window.fbq) {
      window.fbq("trackCustom", "InitiateCheckout", {
        program_id: programId,
        total_amount: total,
        participants_count: participants.length,
        payment_method: "va",
      });
    }

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
        localStorage.setItem("registration_id", result.data.registration_id);

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
                      window.location.href = `/payment/status/${registrationId}`;
                      return;
                    }
                  })
                  .catch((error) => {
                    localStorage.removeItem("registration_id");
                    console.error("Error handling payment closure:", error);
                  });
              }
            },
          });
        } else {
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
      className="min-h-screen relative overflow-hidden py-10 px-4 sm:px-6 md:px-8 lg:px-10" // Adjusted padding for responsiveness
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
          className={`mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            // Adjusted margin-bottom
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
            className="group flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-base sm:text-lg font-medium transition-all duration-300 hover:gap-4" // Adjusted font size and gap
            style={{ color: "#ED6335" }}
          >
            <ArrowLeft
              size={18} // Adjusted icon size
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Kembali
          </button>

          <div className="text-center">
            <h1
              className="text-3xl sm:text-4xl md:text-6xl font-light mb-4 sm:mb-6 md:mb-8 leading-tight" // Adjusted font sizes
              style={{ color: "#662C8F" }}
            >
              Pendaftaran Program
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r font-normal mt-1 sm:mt-2" // Adjusted margin-top
                style={{
                  backgroundImage: "linear-gradient(135deg, #ED6335, #F7941D)",
                }}
              >
                {programData?.title || program}
              </span>
            </h1>
            <p
              className="text-base sm:text-lg font-light max-w-full sm:max-w-4xl mx-auto leading-relaxed px-2" // Adjusted font size and max-width
              style={{ color: "#662C8F" }}
            >
              Lengkapi data Anda untuk melanjutkan pendaftaran program terbaik
              kami.
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          {" "}
          {/* Adjusted margin-bottom */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 flex-wrap justify-center">
            {" "}
            {/* Added flex-wrap and justify-center */}
            {steps.map((step, i) => {
              const stepNumber = i + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;

              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center text-center">
                    {" "}
                    {/* Added text-center */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-medium text-xs sm:text-sm transition-all duration-300 ${
                        // Adjusted sizes and font size
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
                      className={`mt-1 sm:mt-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${
                        // Adjusted margin-top and font size
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
                      className={`w-8 sm:w-12 md:w-16 h-1 mx-2 sm:mx-3 md:mx-4 rounded-full transition-colors duration-300 ${
                        // Adjusted width and margin
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
          className="max-w-full sm:max-w-3xl lg:max-w-5xl mx-auto backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border-2 transition-all duration-500" // Adjusted max-width and padding
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#E1CAF6",
            boxShadow: "0 20px 40px rgba(197, 156, 222, 0.1)",
          }}
        >
          {currentStep === 1 && (
            <div>
              <div className="mb-8 sm:mb-10">
                {" "}
                {/* Adjusted margin-bottom */}
                <h2
                  className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4" // Adjusted font sizes
                  style={{ color: "#662C8F" }}
                >
                  Data Peserta
                </h2>
                <p
                  className="text-base sm:text-lg font-light leading-relaxed" // Adjusted font sizes
                  style={{ color: "#662C8F" }}
                >
                  Masukkan data lengkap untuk setiap peserta program
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {" "}
                {/* Adjusted space-y */}
                {participants.map((p, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300" // Adjusted padding and border-radius
                    style={{
                      backgroundColor: "rgba(237, 99, 53, 0.03)",
                      borderColor: "#F7941D30",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      {" "}
                      {/* Adjusted margin-bottom */}
                      <h3
                        className="text-lg sm:text-xl font-normal" // Adjusted font sizes
                        style={{ color: "#662C8F" }}
                      >
                        Peserta {i + 1}
                      </h3>
                      {participants.length > 1 && (
                        <button
                          onClick={() => removeParticipant(i)}
                          className="px-3 py-1 sm:px-4 sm:py-2 text-white text-sm rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center" // Adjusted padding and font size
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      {" "}
                      {/* Changed to 1 column on mobile, 2 on md */}
                      <div>
                        <label
                          className="block text-sm font-normal mb-2 sm:mb-3" // Adjusted margin-bottom
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
                          className={`w-full border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 font-light transition-all duration-300 ${
                            // Adjusted padding and border-radius
                            errors[i]?.name
                              ? "border-red-400 bg-red-50 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          } focus:ring-4 focus:ring-purple-100 focus:outline-none`}
                          style={{ color: "#662C8F" }}
                        />
                        {errors[i]?.name && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
                            {" "}
                            {/* Adjusted font size and margin-top */}
                            {errors[i].name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-sm font-normal mb-2 sm:mb-3" // Adjusted margin-bottom
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
                          className={`w-full border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 font-light transition-all duration-300 ${
                            // Adjusted padding and border-radius
                            errors[i]?.email
                              ? "border-red-400 bg-red-50 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          } focus:ring-4 focus:ring-purple-100 focus:outline-none`}
                          style={{ color: "#662C8F" }}
                        />
                        {errors[i]?.email && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
                            {" "}
                            {/* Adjusted font size and margin-top */}
                            {errors[i].email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-sm font-normal mb-2 sm:mb-3" // Adjusted margin-bottom
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
                          className={`w-full border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 font-light transition-all duration-300 ${
                            // Adjusted padding and border-radius
                            errors[i]?.phone
                              ? "border-red-400 bg-red-50 focus:border-red-500"
                              : "border-gray-200 focus:border-purple-400"
                          } focus:ring-4 focus:ring-purple-100 focus:outline-none`}
                          style={{ color: "#662C8F" }}
                        />
                        {errors[i]?.phone && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
                            {" "}
                            {/* Adjusted font size and margin-top */}
                            {errors[i].phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-sm font-normal mb-2 sm:mb-3" // Adjusted margin-bottom
                          style={{ color: "#662C8F" }}
                        >
                          Kota Asal *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                          {" "}
                          {/* Changed to 1 column on mobile, 2 on sm */}
                          {/* Dropdown Provinsi */}
                          <select
                            value={selectedProvinces[i] || ""}
                            onChange={(e) => {
                              const newProvinces = { ...selectedProvinces };
                              newProvinces[i] = e.target.value;
                              setSelectedProvinces(newProvinces);
                              // Reset city ketika provinsi berubah
                              updateParticipant(i, "city", "");
                            }}
                            className="w-full border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 font-light transition-all duration-300 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none" // Adjusted padding and border-radius
                            style={{ color: "#662C8F" }}
                          >
                            <option value="">Pilih Provinsi</option>
                            {Object.keys(provincesAndCities).map((province) => (
                              <option key={province} value={province}>
                                {province}
                              </option>
                            ))}
                          </select>
                          {/* Dropdown Kota */}
                          <select
                            value={p.city}
                            onChange={(e) =>
                              updateParticipant(i, "city", e.target.value)
                            }
                            disabled={!selectedProvinces[i]}
                            className={`w-full border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 font-light transition-all duration-300 ${
                              // Adjusted padding and border-radius
                              errors[i]?.city
                                ? "border-red-400 bg-red-50 focus:border-red-500"
                                : "border-gray-200 focus:border-purple-400"
                            } focus:ring-4 focus:ring-purple-100 focus:outline-none ${
                              !selectedProvinces[i]
                                ? "bg-gray-100 cursor-not-allowed"
                                : ""
                            }`}
                            style={{ color: "#662C8F" }}
                          >
                            <option value="">Pilih Kota/Kabupaten</option>
                            {selectedProvinces[i] &&
                              provincesAndCities[selectedProvinces[i]].map(
                                (city) => (
                                  <option key={city} value={city}>
                                    {city}
                                  </option>
                                )
                              )}
                          </select>
                        </div>
                        {errors[i]?.city && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
                            {" "}
                            {/* Adjusted font size and margin-top */}
                            {errors[i].city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          className="block text-sm font-normal mb-2 sm:mb-3" // Adjusted margin-bottom
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
                          className="w-full border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 font-light transition-all duration-300 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none" // Adjusted padding and border-radius
                          style={{ color: "#662C8F" }}
                        />
                        {/* Tampilkan status referral */}
                        {p.referral_code && (
                          <div className="mt-2 sm:mt-3">
                            {" "}
                            {/* Adjusted margin-top */}
                            <div
                              className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                                // Adjusted padding and font size
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

              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200 space-y-4 sm:space-y-0">
                {" "}
                {/* Added flex-col for mobile, space-y */}
                <button
                  type="button"
                  onClick={addParticipant}
                  className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base" // Adjusted width, padding, and font size
                  style={{
                    background: "linear-gradient(135deg, #F7941D, #ED6335)",
                  }}
                >
                  + Tambah Peserta
                </button>
                <button
                  onClick={nextStep}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-white rounded-full font-medium text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg" // Adjusted width, padding, and font size
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
              <div className="mb-8 sm:mb-10">
                {" "}
                {/* Adjusted margin-bottom */}
                <h2
                  className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4" // Adjusted font sizes
                  style={{ color: "#662C8F" }}
                >
                  Rincian Program
                </h2>
                <p
                  className="text-base sm:text-lg font-light leading-relaxed" // Adjusted font sizes
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
                const subtotal = total - discountTotal;
                const ppn = calculatePPN(subtotal);
                const grandTotal = subtotal + ppn;

                return (
                  <>
                    <div
                      className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 mb-6 sm:mb-8" // Adjusted padding and border-radius
                      style={{
                        backgroundColor: "rgba(102, 44, 143, 0.03)",
                        borderColor: "#C59CDE50",
                      }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {" "}
                        {/* Changed to 1 column on mobile/tablet, 2 on lg */}
                        <div>
                          <h3
                            className="text-xl font-light mb-4 sm:mb-6" // Adjusted font size and margin-bottom
                            style={{ color: "#662C8F" }}
                          >
                            Detail Program
                          </h3>
                          <div className="space-y-3 sm:space-y-4">
                            {" "}
                            {/* Adjusted space-y */}
                            <div className="flex justify-between items-center">
                              <span
                                className="font-light text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#662C8F" }}
                              >
                                Nama Program:
                              </span>
                              <span
                                className="font-medium text-sm sm:text-base text-right max-w-[60%] sm:max-w-xs" // Adjusted font size and max-width
                                style={{ color: "#662C8F" }}
                              >
                                {programData?.title || program}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span
                                className="font-light text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#662C8F" }}
                              >
                                Durasi:
                              </span>
                              <span
                                className="font-medium text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#F7941D" }}
                              >
                                {programData?.duration || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span
                                className="font-light text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#662C8F" }}
                              >
                                Jumlah Peserta:
                              </span>
                              <span
                                className="font-medium text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#F7941D" }}
                              >
                                {participants.length} orang
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3
                            className="text-xl font-light mb-4 sm:mb-6 mt-6 lg:mt-0" // Adjusted font size and margin-top
                            style={{ color: "#662C8F" }}
                          >
                            Rincian Biaya
                          </h3>
                          <div className="space-y-3 sm:space-y-4">
                            {" "}
                            {/* Adjusted space-y */}
                            <div className="flex justify-between items-center">
                              <span
                                className="font-light text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#662C8F" }}
                              >
                                Harga per Peserta:
                              </span>
                              <div className="text-right">
                                <span
                                  className="font-medium text-base sm:text-lg" // Adjusted font size
                                  style={{ color: "#662C8F" }}
                                >
                                  {formatPrice(price)}
                                </span>
                                {programData?.isEarlyBirdActive && (
                                  <div className="text-xs px-2 py-0.5 rounded-full text-white font-semibold mt-1 inline-block ml-1 sm:ml-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-[length:200%_200%] animate-[gradient-move_3s_linear_infinite]">
                                    Early Bird
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span
                                className="font-light text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#662C8F" }}
                              >
                                Jumlah Peserta:
                              </span>
                              <span
                                className="font-medium text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#662C8F" }}
                              >
                                {participants.length} Peserta
                              </span>
                            </div>
                            {discountTotal > 0 && (
                              <div className="flex justify-between items-center">
                                <span
                                  className="font-medium text-sm sm:text-base" // Adjusted font size
                                  style={{ color: "#10b981" }}
                                >
                                  Potongan Referral:
                                </span>
                                <span
                                  className="font-medium text-sm sm:text-base" // Adjusted font size
                                  style={{ color: "#10b981" }}
                                >
                                  - {formatPrice(discountTotal)}
                                </span>
                              </div>
                            )}
                            <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
                              {" "}
                              {/* Adjusted padding and margin-top */}
                              <div className="flex justify-between items-center mb-1 sm:mb-2">
                                {" "}
                                {/* Adjusted margin-bottom */}
                                <span
                                  className="font-light text-sm sm:text-base" // Adjusted font size
                                  style={{ color: "#662C8F" }}
                                >
                                  Subtotal:
                                </span>
                                <span
                                  className="font-medium text-sm sm:text-base" // Adjusted font size
                                  style={{ color: "#662C8F" }}
                                >
                                  {formatPrice(subtotal)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center mb-1 sm:mb-2">
                                {" "}
                                {/* Adjusted margin-bottom */}
                                <span
                                  className="font-light text-sm sm:text-base" // Adjusted font size
                                  style={{ color: "#662C8F" }}
                                >
                                  PPN 11%:
                                </span>
                                <span
                                  className="font-medium text-sm sm:text-base" // Adjusted font size
                                  style={{ color: "#662C8F" }}
                                >
                                  {formatPrice(ppn)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center pt-2 sm:pt-3 border-t">
                                {" "}
                                {/* Adjusted padding-top */}
                                <span
                                  className="font-medium text-base sm:text-xl" // Adjusted font size
                                  style={{ color: "#662C8F" }}
                                >
                                  Total Biaya:
                                </span>
                                <span
                                  className="font-medium text-xl sm:text-2xl" // Adjusted font size
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
                      className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 mb-6 sm:mb-8" // Adjusted padding and border-radius
                      style={{
                        backgroundColor: "rgba(247, 148, 29, 0.03)",
                        borderColor: "#F7941D30",
                      }}
                    >
                      <h4
                        className="text-lg font-light mb-4 sm:mb-6" // Adjusted font size and margin-bottom
                        style={{ color: "#662C8F" }}
                      >
                        Daftar Peserta Terdaftar:
                      </h4>
                      <div className="space-y-3 sm:space-y-4">
                        {" "}
                        {/* Adjusted space-y */}
                        {participants.map((participant, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100 space-y-2 sm:space-y-0" // Added flex-col for mobile, space-y
                          >
                            <div className="flex-1 w-full">
                              {" "}
                              {/* Added w-full */}
                              <div className="flex items-start space-x-2 sm:space-x-3">
                                {" "}
                                {/* Adjusted space-x */}
                                <span
                                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-white flex-shrink-0" // Adjusted sizes and font size, added flex-shrink-0
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #662C8F, #C59CDE)",
                                  }}
                                >
                                  {index + 1}
                                </span>
                                <div className="flex-1">
                                  {" "}
                                  {/* Added flex-1 */}
                                  <span
                                    className="font-medium text-sm sm:text-base block" // Adjusted font size, added block
                                    style={{ color: "#662C8F" }}
                                  >
                                    {participant.name}
                                  </span>
                                  <div
                                    className="text-xs sm:text-sm break-words" // Adjusted font size, added break-words
                                    style={{ color: "#64748b" }}
                                  >
                                    {participant.email} • {participant.phone} •{" "}
                                    {participant.city}
                                  </div>
                                </div>
                              </div>
                              {participant.referral_code &&
                                participant.discount_valid && (
                                  <div className="mt-2 ml-9 sm:ml-11">
                                    {" "}
                                    {/* Adjusted margin-left */}
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
                                  <div className="mt-2 ml-9 sm:ml-11">
                                    {" "}
                                    {/* Adjusted margin-left */}
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      ✗ {participant.referral_code} (tidak
                                      valid)
                                    </span>
                                  </div>
                                )}
                            </div>
                            <div className="text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 sm:border-none">
                              {" "}
                              {/* Added w-full, pt, border-t for mobile */}
                              <div
                                className="font-medium text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#662C8F" }}
                              >
                                {formatPrice(price)}
                              </div>
                              {participant.discount_amount > 0 && (
                                <div
                                  className="text-xs sm:text-sm font-medium" // Adjusted font size
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

                    <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-gray-200 space-y-4 sm:space-y-0">
                      {" "}
                      {/* Added flex-col for mobile, space-y */}
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 bg-white border-2 text-gray-600 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base" // Adjusted width, padding, and font size
                        style={{ borderColor: "#E5E7EB" }}
                      >
                        Kembali
                      </button>
                      <button
                        onClick={nextStep}
                        className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-white rounded-full font-medium text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg" // Adjusted width, padding, and font size
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
              <div className="mb-8 sm:mb-10">
                {" "}
                {/* Adjusted margin-bottom */}
                <h2
                  className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4" // Adjusted font sizes
                  style={{ color: "#662C8F" }}
                >
                  Pembayaran
                </h2>
                <p
                  className="text-base sm:text-lg font-light leading-relaxed" // Adjusted font sizes
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
                const subtotal = total - discountTotal;
                const ppn = calculatePPN(subtotal);
                const grandTotal = subtotal + ppn;

                return (
                  <>
                    <div
                      className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 mb-6 sm:mb-8" // Adjusted padding and border-radius
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.03)",
                        borderColor: "#22c55e50",
                      }}
                    >
                      <h3
                        className="text-xl font-light mb-4 sm:mb-6" // Adjusted font size and margin-bottom
                        style={{ color: "#662C8F" }}
                      >
                        Ringkasan Pendaftaran
                      </h3>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {" "}
                        {/* Changed to 1 column on mobile/tablet, 2 on lg */}
                        <div>
                          <h4
                            className="font-medium mb-3 sm:mb-4" // Adjusted margin-bottom
                            style={{ color: "#662C8F" }}
                          >
                            Detail Program:
                          </h4>
                          <div className="space-y-2 sm:space-y-3">
                            {" "}
                            {/* Adjusted space-y */}
                            <div className="flex justify-between">
                              <span
                                className="font-light text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#64748b" }}
                              >
                                Program:
                              </span>
                              <span
                                className="font-medium text-sm sm:text-base text-right max-w-[60%] sm:max-w-xs" // Adjusted font size and max-width
                                style={{ color: "#662C8F" }}
                              >
                                {programData?.title || program}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span
                                className="font-light text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#64748b" }}
                              >
                                Jumlah Peserta:
                              </span>
                              <span
                                className="font-medium text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#662C8F" }}
                              >
                                {participants.length} orang
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span
                                className="font-light text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#64748b" }}
                              >
                                Harga per Peserta:
                              </span>
                              <span
                                className="font-medium text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#662C8F" }}
                              >
                                {formatPrice(price)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4
                            className="font-medium mb-3 sm:mb-4 mt-6 lg:mt-0" // Adjusted margin-bottom and margin-top
                            style={{ color: "#662C8F" }}
                          >
                            Data Peserta:
                          </h4>
                          <div className="space-y-2 sm:space-y-3">
                            {" "}
                            {/* Adjusted space-y */}
                            {participants.map((participant, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center text-xs sm:text-sm" // Adjusted font size
                              >
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                  {" "}
                                  {/* Adjusted space-x */}
                                  <span
                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0" // Adjusted sizes and font size, added flex-shrink-0
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #662C8F, #C59CDE)",
                                    }}
                                  >
                                    {index + 1}
                                  </span>
                                  <span
                                    className="font-medium text-sm sm:text-base" // Adjusted font size
                                    style={{ color: "#662C8F" }}
                                  >
                                    {participant.name}
                                    {participant.referral_code &&
                                      participant.discount_valid && (
                                        <span className="ml-1 sm:ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                          {" "}
                                          {/* Adjusted margin-left and padding */}
                                          {participant.referral_code}
                                        </span>
                                      )}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <div
                                    className="font-medium text-sm sm:text-base" // Adjusted font size
                                    style={{ color: "#662C8F" }}
                                  >
                                    {formatPrice(price)}
                                  </div>
                                  {participant.discount_amount > 0 && (
                                    <div
                                      className="text-xs font-medium" // Adjusted font size
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

                      <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6">
                        {" "}
                        {/* Adjusted padding and margin-top */}
                        <div className="space-y-2 sm:space-y-3">
                          {" "}
                          {/* Adjusted space-y */}
                          <div className="flex justify-between items-center">
                            <span
                              className="font-light text-sm sm:text-base" // Adjusted font size
                              style={{ color: "#64748b" }}
                            >
                              Subtotal:
                            </span>
                            <span
                              className="font-medium text-sm sm:text-base" // Adjusted font size
                              style={{ color: "#662C8F" }}
                            >
                              {formatPrice(subtotal)}
                            </span>
                          </div>
                          {discountTotal > 0 && (
                            <div className="flex justify-between items-center">
                              <span
                                className="font-medium text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#10b981" }}
                              >
                                Potongan Referral:
                              </span>
                              <span
                                className="font-medium text-sm sm:text-base" // Adjusted font size
                                style={{ color: "#10b981" }}
                              >
                                - {formatPrice(discountTotal)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span
                              className="font-light text-sm sm:text-base" // Adjusted font size
                              style={{ color: "#64748b" }}
                            >
                              PPN 11%:
                            </span>
                            <span
                              className="font-medium text-sm sm:text-base" // Adjusted font size
                              style={{ color: "#662C8F" }}
                            >
                              {formatPrice(ppn)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 sm:pt-3 border-t">
                            {" "}
                            {/* Adjusted padding-top */}
                            <span
                              className="text-base sm:text-xl font-medium" // Adjusted font size
                              style={{ color: "#662C8F" }}
                            >
                              Total Pembayaran:
                            </span>
                            <span
                              className="text-xl sm:text-2xl font-medium" // Adjusted font size
                              style={{ color: "#22c55e" }}
                            >
                              {formatPrice(grandTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 mb-6 sm:mb-8" // Adjusted padding and border-radius
                      style={{
                        backgroundColor: "rgba(251, 191, 36, 0.05)",
                        borderColor: "#fbbf2450",
                      }}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        {" "}
                        {/* Adjusted space-x */}
                        <div
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5 flex-shrink-0" // Adjusted sizes and added flex-shrink-0
                          style={{ backgroundColor: "#fbbf24" }}
                        >
                          !
                        </div>
                        <div>
                          <p
                            className="font-light leading-relaxed text-sm sm:text-base" // Adjusted font size
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

                    <div
                      className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 mb-6 sm:mb-8 transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(102, 44, 143, 0.03)",
                        borderColor: agreedToPolicy ? "#C59CDE" : "#E1CAF6",
                      }}
                    >
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        {/* Custom Checkbox */}
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            id="policy-agreement"
                            checked={agreedToPolicy}
                            onChange={(e) =>
                              setAgreedToPolicy(e.target.checked)
                            }
                            className="peer sr-only"
                          />
                          <label
                            htmlFor="policy-agreement"
                            className="block w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 cursor-pointer transition-all duration-300 ease-out peer-checked:border-transparent"
                            style={{
                              borderColor: agreedToPolicy
                                ? "#662C8F"
                                : "#C59CDE",
                              backgroundColor: agreedToPolicy
                                ? "#662C8F"
                                : "transparent",
                              transform: agreedToPolicy
                                ? "scale(1.05)"
                                : "scale(1)",
                            }}
                          >
                            {/* Checkmark Icon */}
                            <svg
                              className={`w-full h-full p-0.5 transition-all duration-300 ${
                                agreedToPolicy
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-50"
                              }`}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 10L9 13L14 7"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                  strokeDasharray: agreedToPolicy ? "20" : "0",
                                  strokeDashoffset: agreedToPolicy ? "0" : "20",
                                  transition: "stroke-dashoffset 0.3s ease-out",
                                }}
                              />
                            </svg>
                          </label>
                        </div>

                        <label
                          htmlFor="policy-agreement"
                          className="text-sm sm:text-base leading-relaxed cursor-pointer select-none"
                          style={{ color: "#662C8F" }}
                        >
                          Saya telah membaca dan menyetujui{" "}
                          <button
                            onClick={(e) =>
                              handlePolicyLinkClick(e, "/privacy-policy")
                            }
                            className="underline hover:underline transition-all duration-200 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
                            style={{
                              color: "#662C8F",
                            }}
                          >
                            Kebijakan Privasi
                          </button>{" "}
                          dan{" "}
                          <button
                            onClick={(e) =>
                              handlePolicyLinkClick(e, "/refund-policy")
                            }
                            className="underline hover:underline transition-all duration-200 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
                            style={{
                              color: "#662C8F",
                            }}
                          >
                            Kebijakan Pengembalian Dana
                          </button>{" "}
                          dari LEGACY.
                        </label>
                      </div>

                      {/* Error Message dengan animasi slide down */}
                      <div
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{
                          maxHeight: !agreedToPolicy ? "100px" : "0",
                          opacity: !agreedToPolicy ? "1" : "0",
                        }}
                      >
                        <div className="mt-3 ml-8 sm:ml-10 flex items-start space-x-2">
                          <svg
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            style={{ color: "#EF4444" }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p
                            className="text-xs sm:text-sm font-medium"
                            style={{ color: "#EF4444" }}
                          >
                            Anda harus menyetujui kebijakan untuk melanjutkan
                            pembayaran
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-gray-200 space-y-4 sm:space-y-0">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 bg-white border-2 text-gray-600 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                        style={{ borderColor: "#E5E7EB" }}
                      >
                        Kembali
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPaymentMethod(null); // Reset metode pembayaran
                          handlePayment();
                        }}
                        disabled={isLoading || !agreedToPolicy}
                        className={`w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 rounded-full text-white font-medium text-base sm:text-lg transition-all duration-300 transform ${
                          isLoading || !agreedToPolicy
                            ? "bg-gray-400 cursor-not-allowed opacity-60"
                            : "hover:scale-105 hover:shadow-xl"
                        }`}
                        style={
                          !isLoading && agreedToPolicy
                            ? {
                                background:
                                  "linear-gradient(135deg, #22c55e, #16a34a)",
                                boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
                              }
                            : {}
                        }
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                            <span>Memproses...</span>
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
      <PaymentMethodModal
        isOpen={showPaymentMethodModal}
        onClose={() => setShowPaymentMethodModal(false)}
        onSelectMethod={handlePaymentMethodSelect}
      />
    </div>
  );
}
