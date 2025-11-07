
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971506184687', '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-slow"
      size="icon"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  );
}
