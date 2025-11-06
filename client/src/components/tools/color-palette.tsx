import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, RefreshCw, Copy, Lock, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Color {
  hex: string;
  locked: boolean;
}

export function ColorPaletteGenerator() {
  const { toast } = useToast();
  const [colors, setColors] = useState<Color[]>(
    Array(5).fill(null).map(() => ({ hex: generateRandomColor(), locked: false }))
  );

  function generateRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  const generatePalette = () => {
    setColors(colors.map(color =>
      color.locked ? color : { ...color, hex: generateRandomColor() }
    ));
  };

  const toggleLock = (index: number) => {
    setColors(colors.map((color, i) =>
      i === index ? { ...color, locked: !color.locked } : color
    ));
  };

  const updateColor = (index: number, hex: string) => {
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      setColors(colors.map((color, i) =>
        i === index ? { ...color, hex } : color
      ));
    }
  };

  const copyColor = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      toast({
        title: "Copied!",
        description: `${hex} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const exportPalette = () => {
    const css = colors.map((color, i) => `--color-${i + 1}: ${color.hex};`).join('\n');
    const blob = new Blob([`:root {\n${css}\n}`], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'palette.css';
    link.click();
    URL.revokeObjectURL(url);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : '';
  };

  const getTextColor = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma < 140 ? '#ffffff' : '#000000';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary" />
          Color Palette Generator
        </CardTitle>
        <CardDescription>
          Generate beautiful color palettes for your designs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Button
            data-testid="button-generate"
            onClick={generatePalette}
            className="flex-1"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate New Palette
          </Button>
          <Button
            data-testid="button-export"
            variant="outline"
            onClick={exportPalette}
          >
            Export CSS
          </Button>
        </div>

        <div className="grid gap-4">
          {colors.map((color, index) => (
            <div key={index} className="relative">
              <div
                data-testid={`color-swatch-${index}`}
                className="h-32 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyColor(color.hex)}
              >
                <div
                  className="h-full flex flex-col items-center justify-center gap-2 p-4"
                  style={{ color: getTextColor(color.hex) }}
                >
                  <span className="text-2xl font-bold">{color.hex.toUpperCase()}</span>
                  <span className="text-sm opacity-80">{hexToRgb(color.hex)}</span>
                  <Button
                    data-testid={`button-lock-${index}`}
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    style={{
                      color: getTextColor(color.hex),
                      backgroundColor: `${color.hex}20`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLock(index);
                    }}
                  >
                    {color.locked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Unlock className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Input
                  data-testid={`input-color-${index}`}
                  type="text"
                  value={color.hex.toUpperCase()}
                  onChange={(e) => updateColor(index, e.target.value)}
                  className="flex-1 font-mono text-sm"
                  maxLength={7}
                />
                <Button
                  data-testid={`button-copy-${index}`}
                  variant="outline"
                  size="sm"
                  onClick={() => copyColor(color.hex)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">💡 Tips:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Click on a color to copy its hex code</li>
            <li>• Lock colors you like before generating a new palette</li>
            <li>• Edit hex codes directly in the input fields</li>
            <li>• Export your palette as CSS custom properties</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
