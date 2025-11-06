import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Image, Download, Upload, X, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ImageCompressor() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please select a valid image file.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressedImage(null);
    }
  };

  const compressImage = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  setCompressedSize(blob.size);
                  const url = URL.createObjectURL(blob);
                  setCompressedImage(url);
                  toast({
                    title: "Image Compressed",
                    description: `Reduced by ${((1 - blob.size / originalSize) * 100).toFixed(1)}%`,
                  });
                }
                setIsCompressing(false);
              },
              selectedFile.type,
              quality[0] / 100
            );
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      toast({
        title: "Compression Failed",
        description: "An error occurred while compressing the image.",
        variant: "destructive",
      });
      setIsCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-${selectedFile?.name || 'image.jpg'}`;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-6 w-6 text-primary" />
          Image Compressor
        </CardTitle>
        <CardDescription>
          Compress images to reduce file size while maintaining quality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
          <input
            data-testid="input-image-file"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="imageInput"
          />
          <label htmlFor="imageInput" className="cursor-pointer">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-2">Click to upload an image</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
          </label>
        </div>

        {selectedFile && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Image className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatSize(originalSize)}</p>
                  </div>
                </div>
                <Button
                  data-testid="button-remove-image"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedFile(null);
                    setCompressedImage(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Compression Quality: {quality[0]}%</Label>
                <Slider
                  data-testid="slider-quality"
                  value={quality}
                  onValueChange={setQuality}
                  min={1}
                  max={100}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  Lower quality = smaller file size
                </p>
              </div>

              <Button
                data-testid="button-compress"
                onClick={compressImage}
                disabled={isCompressing}
                className="w-full"
              >
                {isCompressing ? "Compressing..." : "Compress Image"}
              </Button>
            </div>

            {compressedImage && (
              <div className="space-y-4">
                <Alert className="border-green-500/50 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertDescription>
                    Image compressed successfully! Reduced from {formatSize(originalSize)} to{' '}
                    {formatSize(compressedSize)} ({((1 - compressedSize / originalSize) * 100).toFixed(1)}% reduction)
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Original</Label>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Original"
                      className="w-full rounded border"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Compressed</Label>
                    <img
                      src={compressedImage}
                      alt="Compressed"
                      className="w-full rounded border"
                    />
                  </div>
                </div>

                <Button
                  data-testid="button-download-compressed"
                  onClick={downloadCompressed}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Compressed Image
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
