import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua",
  "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris",
  "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in",
  "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur",
  "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui",
  "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export function LoremIpsumGenerator() {
  const { toast } = useToast();
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState([3]);
  const [generatedText, setGeneratedText] = useState("");

  const generateWord = () => {
    return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
  };

  const generateSentence = (minWords = 5, maxWords = 15) => {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words = Array.from({ length: wordCount }, () => generateWord());
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  };

  const generateParagraph = (minSentences = 3, maxSentences = 7) => {
    const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
    return Array.from({ length: sentenceCount }, () => generateSentence()).join(" ");
  };

  const generate = () => {
    let result = "";
    const amount = count[0];

    switch (type) {
      case "paragraphs":
        result = Array.from({ length: amount }, () => generateParagraph()).join("\n\n");
        break;
      case "sentences":
        result = Array.from({ length: amount }, () => generateSentence()).join(" ");
        break;
      case "words":
        result = Array.from({ length: amount }, () => generateWord()).join(" ");
        break;
    }

    setGeneratedText(result);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      toast({
        title: "Copied!",
        description: "Lorem ipsum text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Lorem Ipsum Generator
        </CardTitle>
        <CardDescription>
          Generate placeholder text for your designs and mockups
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={type} onValueChange={(v) => setType(v as typeof type)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger data-testid="tab-paragraphs" value="paragraphs">Paragraphs</TabsTrigger>
            <TabsTrigger data-testid="tab-sentences" value="sentences">Sentences</TabsTrigger>
            <TabsTrigger data-testid="tab-words" value="words">Words</TabsTrigger>
          </TabsList>

          <TabsContent value={type} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>
                Number of {type}: {count[0]}
              </Label>
              <Slider
                data-testid="slider-count"
                value={count}
                onValueChange={setCount}
                min={1}
                max={type === "words" ? 100 : type === "sentences" ? 20 : 10}
                step={1}
              />
            </div>

            <Button
              data-testid="button-generate"
              onClick={generate}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Lorem Ipsum
            </Button>
          </TabsContent>
        </Tabs>

        {generatedText && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Generated Text</Label>
              <Button
                data-testid="button-copy"
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              data-testid="textarea-output"
              value={generatedText}
              readOnly
              className="min-h-[300px] font-mono text-sm"
            />
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Characters: {generatedText.length}</span>
              <span>Words: {generatedText.split(/\s+/).length}</span>
              <span>Sentences: {generatedText.split(/[.!?]+/).length - 1}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
