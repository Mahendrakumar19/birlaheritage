export default function ChatWidget() {
  const phone = "917633800196"; // WhatsApp number (country code + number, no +)
  const message = encodeURIComponent("Hello! I'm interested in admissions at Birla Heritage International School Siwan.");
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 group"
      style={{ filter: "drop-shadow(0 4px 16px rgba(37,211,102,0.45))" }}
    >
      {/* Tooltip label — shows on hover */}
      <span className="hidden sm:flex items-center bg-white text-gray-800 text-[13px] font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap pointer-events-none border border-gray-100">
        +91 76338 00196
      </span>

      {/* WhatsApp Icon Button */}
      <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200">
        {/* Official WhatsApp SVG logo */}
        <svg
          className="w-8 h-8 text-white"
          viewBox="0 0 32 32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 2.667C8.64 2.667 2.667 8.637 2.667 16c0 2.347.63 4.64 1.827 6.645L2.667 29.333l6.875-1.796A13.28 13.28 0 0016.004 29.333C23.365 29.333 29.333 23.363 29.333 16c0-7.363-5.968-13.333-13.329-13.333zm0 2.222c6.128 0 11.107 4.977 11.107 11.111 0 6.136-4.979 11.111-11.107 11.111a11.07 11.07 0 01-5.621-1.527l-.403-.24-4.08 1.065 1.093-3.963-.265-.413A11.07 11.07 0 014.889 16c0-6.134 4.985-11.111 11.115-11.111zm-3.24 5.198c-.208 0-.543.078-.827.39-.284.312-1.083 1.058-1.083 2.58s1.109 2.995 1.263 3.203c.155.208 2.172 3.315 5.258 4.512.734.316 1.307.505 1.754.645.736.232 1.407.2 1.937.12.59-.088 1.817-.743 2.073-1.459.257-.718.257-1.333.18-1.462-.078-.13-.285-.207-.597-.362-.313-.156-1.82-.897-2.1-.999-.284-.104-.49-.156-.699.156-.208.311-.808 1-.989 1.207-.182.207-.362.233-.673.078-.312-.155-1.317-.486-2.51-1.55-.927-.827-1.553-1.85-1.734-2.161-.182-.311-.02-.48.135-.633.14-.14.312-.362.468-.543.155-.182.207-.312.311-.52.104-.207.052-.39-.026-.546-.078-.155-.699-1.687-.958-2.31-.25-.6-.506-.518-.699-.527-.181-.008-.39-.01-.599-.01z" />
        </svg>
      </div>
    </a>
  );
}
