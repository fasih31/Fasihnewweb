import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FileText, Copy, Check } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
  "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat",
  "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est"
];

export default function LoremIpsumPage() {
  const [count, setCount] = useState([3]);
  const [type, setType] = useState("paragraphs");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateText = () => {
    let result = "";
    const numItems = count[0];

    if (type === "words") {
      const words = [];
      for (let i = 0; i < numItems; i++) {
        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      result = words.join(" ") + ".";
    } else if (type === "sentences") {
      for (let i = 0; i < numItems; i++) {
        const sentenceLength = Math.floor(Math.random() * 10) + 8;
        const words = [];
        for (let j = 0; j < sentenceLength; j++) {
          words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
        }
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        result += words.join(" ") + ". ";
      }
    } else {
      for (let i = 0; i < numItems; i++) {
        const paragraph = [];
        const numSentences = Math.floor(Math.random() * 3) + 3;
        for (let j = 0; j < numSentences; j++) {
          const sentenceLength = Math.floor(Math.random() * 10) + 8;
          const words = [];
          for (let k = 0; k < sentenceLength; k++) {
            words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
          }
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
          paragraph.push(words.join(" "));
        }
        result += paragraph.join(". ") + ".\n\n";
      }
    }

    setText(result.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Lorem ipsum text copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Lorem Ipsum Generator - Placeholder Text Generator | Fasih ur Rehman</title>
        <meta name="description" content="Generate Lorem Ipsum placeholder text for your designs and mockups. Create paragraphs, sentences, or words of dummy text instantly." />
        <meta name="keywords" content="lorem ipsum generator, placeholder text, dummy text, lorem ipsum, text generator, filler text" />
        <meta property="og:title" content="Lorem Ipsum Generator - Placeholder Text Generator" />
        <meta property="og:description" content="Generate Lorem Ipsum placeholder text for designs, mockups, and layouts. Free and instant." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fasihurrehman.com/tools/lorem-ipsum" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Navigation />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Lorem Ipsum Generator
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Generate placeholder text for your designs, mockups, and layouts. Choose between paragraphs, sentences, or words.
              </p>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                  Generate Placeholder Text
                </CardTitle>
                <CardDescription>
                  Configure and generate Lorem Ipsum text
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger data-testid="select-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paragraphs">Paragraphs</SelectItem>
                        <SelectItem value="sentences">Sentences</SelectItem>
                        <SelectItem value="words">Words</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Count: {count[0]}</Label>
                    <Slider
                      value={count}
                      onValueChange={setCount}
                      max={type === "words" ? 200 : type === "sentences" ? 50 : 20}
                      min={1}
                      step={1}
                      data-testid="slider-count"
                    />
                  </div>
                </div>

                <Button 
                  onClick={generateText} 
                  className="w-full"
                  size="lg"
                  data-testid="button-generate"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Lorem Ipsum
                </Button>

                {text && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Generated Text</Label>
                      <Button 
                        onClick={copyToClipboard} 
                        variant="outline" 
                        size="sm"
                        data-testid="button-copy"
                      >
                        {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-h-96 overflow-y-auto">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed" data-testid="text-output">
                        {text}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-12 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">What is Lorem Ipsum?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Lorem Ipsum is simply dummy text used in the printing and typesetting industry since the 1500s. 
                It's commonly used as placeholder text in graphic design, web development, and publishing to 
                demonstrate the visual form of a document without relying on meaningful content.
              </p>
              <h3 className="font-semibold mb-2">Common Uses:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span>Website mockups and templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span>Print design and layout previews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                  <span>Testing typography and fonts</span>
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
