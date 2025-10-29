import { X, CreditCard, Building2 } from "lucide-react";

export default function PaymentMethodModal({
  isOpen,
  onClose,
  onSelectMethod,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-[fadeIn_0.3s_ease-out]"
        style={{
          animation: "slideUp 0.3s ease-out",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} style={{ color: "#662C8F" }} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light mb-3" style={{ color: "#662C8F" }}>
            Pilih Metode Pembayaran
          </h2>
          <p className="text-sm font-light" style={{ color: "#666" }}>
            Silakan pilih metode pembayaran yang Anda inginkan
          </p>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          {/* Virtual Account */}
          <button
            onClick={() => onSelectMethod("va")}
            className="w-full p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
            style={{
              borderColor: "#E1CAF6",
              background:
                "linear-gradient(135deg, rgba(102, 44, 143, 0.03), rgba(197, 156, 222, 0.05))",
            }}
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #662C8F, #C59CDE)",
                }}
              >
                <CreditCard size={24} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3
                  className="text-lg font-medium mb-1"
                  style={{ color: "#662C8F" }}
                >
                  Virtual Account
                </h3>
                <p className="text-sm font-light" style={{ color: "#666" }}>
                  BCA, BNI, BRI, Mandiri, Permata, dll
                </p>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "#F7941D20",
                  color: "#F7941D",
                }}
              >
                Instant
              </div>
            </div>
          </button>

          {/* Bank Transfer BCA */}
          <button
            onClick={() => onSelectMethod("bank_transfer")}
            className="w-full p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
            style={{
              borderColor: "#F7941D30",
              background:
                "linear-gradient(135deg, rgba(247, 148, 29, 0.03), rgba(237, 99, 53, 0.05))",
            }}
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #F7941D, #ED6335)",
                }}
              >
                <Building2 size={24} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3
                  className="text-lg font-medium mb-1"
                  style={{ color: "#662C8F" }}
                >
                  Transfer Bank BCA
                </h3>
                <p className="text-sm font-light" style={{ color: "#666" }}>
                  Transfer manual ke rekening BCA
                </p>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "#10b98120",
                  color: "#10b981",
                }}
              >
                Manual
              </div>
            </div>
          </button>
        </div>

        {/* Info */}
        <div
          className="mt-6 p-4 rounded-xl"
          style={{
            backgroundColor: "rgba(251, 191, 36, 0.1)",
          }}
        >
          <p
            className="text-xs font-light leading-relaxed"
            style={{ color: "#662C8F" }}
          >
            <strong>Catatan:</strong> Untuk Virtual Account, pembayaran akan
            diproses otomatis. Untuk Transfer Bank BCA, pembayaran akan
            diverifikasi manual dalam 1x24 jam.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
