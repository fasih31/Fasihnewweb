
import { useEffect } from 'react';

export function LiveChat() {
  useEffect(() => {
    // Tawk.to chat widget (free live chat)
    // Sign up at https://www.tawk.to/ and replace with your property ID
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
