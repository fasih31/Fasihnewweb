import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, Download, Link as LinkIcon } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function QRGeneratorPage() {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  const generateQR = async () => {
    if (!text) return;
    
    // Using QR code API
    const size = 300;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    setQrDataUrl(url);
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>QR Code Generator - Create Free QR Codes Online | Fasih ur Rehman</title>
        <meta name="description" content="Generate free QR codes instantly for URLs, text, contact info, and more. Download high-quality QR codes for business cards, marketing materials, and websites." />
        <meta name="keywords" content="QR code generator, create QR code, free QR code, QR code maker, generate QR code online" />
        <meta property="og:title" content="QR Code Generator - Create Free QR Codes Online" />
        <meta property="og:description" content="Generate custom QR codes for URLs, text, and more. Free, fast, and easy to use." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fasihurrehman.com/tools/qr-generator" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Navigation />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                QR Code Generator
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Create custom QR codes for URLs, text, contact information, and more. Free and instant generation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-6 w-6 text-purple-600" />
                    Enter Content
                  </CardTitle>
                  <CardDescription>
                    Enter URL, text, or any content to generate QR code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qr-text">Content</Label>
                    <Textarea
                      id="qr-text"
                      data-testid="input-qr-text"
                      placeholder="Enter URL, text, or content..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    onClick={generateQR} 
                    className="w-full"
                    data-testid="button-generate"
                    disabled={!text}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Code
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-6 w-6 text-purple-600" />
                    Your QR Code
                  </CardTitle>
                  <CardDescription>
                    Generated QR code will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center">
                  {qrDataUrl ? (
                    <div className="space-y-4 w-full">
                      <div className="flex justify-center bg-white p-4 rounded-lg">
                        <img 
                          src={qrDataUrl} 
                          alt="Generated QR Code" 
                          data-testid="img-qr-code"
                          className="w-full max-w-[300px] h-auto"
                        />
                      </div>
                      <Button 
                        onClick={downloadQR} 
                        variant="outline" 
                        className="w-full"
                        data-testid="button-download"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download QR Code
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-12">
                      <QrCode className="h-24 w-24 mx-auto mb-4 opacity-20" />
                      <p>Your QR code will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">How to Use QR Codes</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span><strong>Business Cards:</strong> Add QR codes linking to your website or contact information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span><strong>Marketing Materials:</strong> Direct customers to promotions, product pages, or special offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span><strong>Event Registration:</strong> Simplify check-ins and registrations with scannable codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span><strong>Product Information:</strong> Link to manuals, specifications, or product details</span>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
