import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Download } from "lucide-react";

export function QRGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState("256");
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [qrUrl, setQrUrl] = useState("");

  const generateQR = () => {
    if (!text) return;
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&ecc=${errorCorrection}`;
    setQrUrl(url);
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <Card data-testid="card-qr-generator">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="text-qr-title">
          <QrCode className="h-6 w-6 text-primary" />
          QR Code Generator
        </CardTitle>
        <CardDescription data-testid="text-qr-description">
          Generate QR codes for URLs, text, contact info, and more
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-text" data-testid="label-qr-text">Text or URL</Label>
            <Textarea
              id="qr-text"
              data-testid="input-qr-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, or data to encode"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="qr-size" data-testid="label-qr-size">Size (pixels)</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger id="qr-size" data-testid="select-qr-size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="128" data-testid="option-size-128">128x128</SelectItem>
                  <SelectItem value="256" data-testid="option-size-256">256x256</SelectItem>
                  <SelectItem value="512" data-testid="option-size-512">512x512</SelectItem>
                  <SelectItem value="1024" data-testid="option-size-1024">1024x1024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qr-error" data-testid="label-qr-error">Error Correction</Label>
              <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                <SelectTrigger id="qr-error" data-testid="select-qr-error">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L" data-testid="option-error-low">Low (7%)</SelectItem>
                  <SelectItem value="M" data-testid="option-error-medium">Medium (15%)</SelectItem>
                  <SelectItem value="Q" data-testid="option-error-quartile">Quartile (25%)</SelectItem>
                  <SelectItem value="H" data-testid="option-error-high">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateQR} 
            disabled={!text}
            className="w-full"
            data-testid="button-generate-qr"
          >
            <QrCode className="h-4 w-4 mr-2" />
            Generate QR Code
          </Button>
        </div>

        {qrUrl && (
          <div className="space-y-4 border-t pt-6">
            <div className="flex flex-col items-center gap-4">
              <img 
                src={qrUrl} 
                alt="Generated QR Code" 
                className="border rounded-lg shadow-lg"
                data-testid="img-qr-result"
              />
              <Button 
                onClick={downloadQR}
                variant="outline"
                className="w-full md:w-auto"
                data-testid="button-download-qr"
              >
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
