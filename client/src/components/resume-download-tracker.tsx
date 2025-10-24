
import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ResumeDownloadButton() {
  const { toast } = useToast();
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem('resume_downloads') || '0';
    setDownloadCount(parseInt(count));
  }, []);

  const handleDownload = async () => {
    try {
      // Track download
      const newCount = downloadCount + 1;
      localStorage.setItem('resume_downloads', newCount.toString());
      setDownloadCount(newCount);

      // Optional: Send analytics to backend
      fetch('/api/track-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'resume',
          timestamp: new Date().toISOString()
        })
      }).catch(() => {});

      toast({
        title: "Resume Downloaded",
        description: "Thank you for your interest!",
      });
    } catch (error) {
      console.error('Download tracking error:', error);
    }
  };

  return (
    <Button
      size="lg"
      variant="default"
      className="gap-2 text-base"
      asChild
      onClick={handleDownload}
    >
      <a href="/attached_assets/Fasih ur Rehman - CV-1_1761140201663.pdf" download="Fasih_ur_Rehman_Resume.pdf">
        <Download className="h-5 w-5" />
        Download Resume
      </a>
    </Button>
  );
}
