import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919392898492?text=Hi%20Celebrity%20Superspeciality%20Dental,%20I%20would%20like%20to%20book%20an%20appointment."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 transition duration-300"
    >
      <FaWhatsapp size={35} />
    </a>
  );
}

export default WhatsAppButton;