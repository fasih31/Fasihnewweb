import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileAudio, FileVideo, Loader2 } from "lucide-react";

const AUDIO_FORMATS = ["mp3", "wav", "ogg", "aac", "flac", "m4a"];
const VIDEO_FORMATS = ["mp4", "webm", "avi", "mov", "mkv", "flv"];

export function AudioVideoConverter() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedUrl, setConvertedUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setConvertedUrl("");
      toast({
        title: "File Selected",
        description: `${selectedFile.name} ready for conversion`,
      });
    }
  };

  const isAudioFile = (file: File) => {
    return file.type.startsWith("audio/");
  };

  const isVideoFile = (file: File) => {
    return file.type.startsWith("video/");
  };

  const handleConvert = async () => {
    if (!file || !outputFormat) {
      toast({
        title: "Missing Information",
        description: "Please select a file and output format",
        variant: "destructive",
      });
      return;
    }

    setConverting(true);
    setProgress(0);

    // Simulate conversion progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // In a real implementation, you would send the file to a backend service
      // For demo purposes, we'll simulate the conversion
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setProgress(100);

      // Create a simulated download URL
      const simulatedUrl = URL.createObjectURL(file);
      setConvertedUrl(simulatedUrl);

      toast({
        title: "Conversion Complete!",
        description: `File converted to ${outputFormat.toUpperCase()} successfully`,
      });
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "An error occurred during conversion",
        variant: "destructive",
      });
    } finally {
      clearInterval(interval);
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedUrl && file) {
      const a = document.createElement("a");
      a.href = convertedUrl;
      a.download = `converted.${outputFormat}`;
      a.click();

      toast({
        title: "Download Started",
        description: "Your converted file is downloading",
      });
    }
  };

  const availableFormats = file
    ? isAudioFile(file)
      ? AUDIO_FORMATS
      : isVideoFile(file)
      ? VIDEO_FORMATS
      : []
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {file && isAudioFile(file) ? (
            <FileAudio className="h-6 w-6 text-primary" />
          ) : (
            <FileVideo className="h-6 w-6 text-primary" />
          )}
          Audio & Video Converter
        </CardTitle>
        <CardDescription>
          Convert audio and video files to different formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="file-upload" className="mb-2 block">
              Select File
            </Label>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="w-full">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {file ? file.name : "Choose Audio or Video File"}
                </label>
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="audio/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {file && (
              <p className="text-sm text-muted-foreground mt-2">
                File size: {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
          </div>

          {file && (
            <div className="space-y-2">
              <Label>Output Format</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {availableFormats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {file && outputFormat && (
            <Button
              onClick={handleConvert}
              disabled={converting}
              className="w-full"
            >
              {converting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert File"
              )}
            </Button>
          )}

          {converting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Converting...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {convertedUrl && !converting && (
            <Button onClick={handleDownload} className="w-full" variant="default">
              <Download className="h-4 w-4 mr-2" />
              Download Converted File
            </Button>
          )}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Supported Formats</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium mb-1">Audio:</p>
              <p className="text-muted-foreground">{AUDIO_FORMATS.join(", ").toUpperCase()}</p>
            </div>
            <div>
              <p className="font-medium mb-1">Video:</p>
              <p className="text-muted-foreground">{VIDEO_FORMATS.join(", ").toUpperCase()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}