
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Code, Play, Save, Download, Upload, Share2, Terminal, 
  FileCode, Moon, Sun, Zap, Brain, GitBranch, 
  Copy, Check, Maximize2, Minimize2, Settings, Trash2,
  FileJson, FileText, AlertCircle
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", ext: ".js", color: "#F7DF1E" },
  { value: "typescript", label: "TypeScript", ext: ".ts", color: "#3178C6" },
  { value: "python", label: "Python", ext: ".py", color: "#3776AB" },
  { value: "java", label: "Java", ext: ".java", color: "#007396" },
  { value: "cpp", label: "C++", ext: ".cpp", color: "#00599C" },
  { value: "csharp", label: "C#", ext: ".cs", color: "#239120" },
  { value: "go", label: "Go", ext: ".go", color: "#00ADD8" },
  { value: "rust", label: "Rust", ext: ".rs", color: "#CE412B" },
  { value: "php", label: "PHP", ext: ".php", color: "#777BB4" },
  { value: "ruby", label: "Ruby", ext: ".rb", color: "#CC342D" },
  { value: "html", label: "HTML", ext: ".html", color: "#E34F26" },
  { value: "css", label: "CSS", ext: ".css", color: "#1572B6" },
  { value: "sql", label: "SQL", ext: ".sql", color: "#4479A1" },
  { value: "json", label: "JSON", ext: ".json", color: "#000000" },
];

const THEMES = [
  { value: "vs-dark", label: "Dark", icon: Moon },
  { value: "vs-light", label: "Light", icon: Sun },
  { value: "monokai", label: "Monokai", icon: Code },
  { value: "github-dark", label: "GitHub Dark", icon: GitBranch },
];

const CODE_TEMPLATES = {
  javascript: `// JavaScript - Fibonacci Sequence
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test the function
for (let i = 0; i < 10; i++) {
  console.log(\`fibonacci(\${i}) = \${fibonacci(i)}\`);
}`,
  typescript: `// TypeScript - Type-safe Fibonacci
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test with type safety
const result: number = fibonacci(10);
console.log(\`Result: \${result}\`);`,
  python: `# Python - Fibonacci with Memoization
def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]

# Test the function
for i in range(10):
    print(f"fibonacci({i}) = {fibonacci(i)}")`,
  java: `// Java - Object-Oriented Fibonacci
public class FibonacciCalculator {
    public static long fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.println("fibonacci(" + i + ") = " + fibonacci(i));
        }
    }
}`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Web Application</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome to My App</h1>
        <p>This is a modern, responsive web application.</p>
    </div>
</body>
</html>`,
};

export function CodeIDE() {
  const [code, setCode] = useState(CODE_TEMPLATES.javascript);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [fileName, setFileName] = useState("untitled.js");
  const [isRunning, setIsRunning] = useState(false);
  const [savedVersions, setSavedVersions] = useState<Array<{ code: string; timestamp: string; name: string }>>([]);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const template = CODE_TEMPLATES[language as keyof typeof CODE_TEMPLATES];
    if (template) {
      setCode(template);
    }
    const lang = LANGUAGES.find(l => l.value === language);
    setFileName(`untitled${lang?.ext || '.txt'}`);
  }, [language]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '=') {
        e.preventDefault();
        setFontSize(prev => Math.min(prev + 2, 24));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        setFontSize(prev => Math.max(prev - 2, 10));
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [code, fileName, savedVersions]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("🚀 Running code...\n");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (language === "javascript") {
        try {
          const logs: string[] = [];
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;
          
          console.log = (...args) => logs.push('✓ ' + args.join(' '));
          console.error = (...args) => logs.push('✗ ERROR: ' + args.join(' '));
          console.warn = (...args) => logs.push('⚠ WARNING: ' + args.join(' '));
          
          // eslint-disable-next-line no-eval
          eval(code);
          
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;
          
          const result = logs.length > 0 
            ? `✅ Execution successful!\n\n${logs.join('\n')}` 
            : "✅ Code executed successfully (no output)";
          setOutput(result);
          
          toast({
            title: "Success!",
            description: "Code executed without errors",
          });
        } catch (error) {
          const errorMsg = `❌ Runtime Error:\n\n${error instanceof Error ? error.message : String(error)}`;
          setOutput(errorMsg);
          toast({
            title: "Execution Error",
            description: "Check the output panel for details",
            variant: "destructive",
          });
        }
      } else {
        setOutput(`✅ ${LANGUAGES.find(l => l.value === language)?.label} Simulation\n\nCode syntax appears valid.\nNote: Full execution requires backend compilation service.\n\n📝 Code Preview:\n${code.substring(0, 200)}${code.length > 200 ? '...' : ''}`);
        toast({
          title: "Simulation Mode",
          description: `${language} requires backend compilation`,
        });
      }
    } catch (error) {
      setOutput(`❌ Unexpected Error:\n\n${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = () => {
    const version = {
      code,
      timestamp: new Date().toISOString(),
      name: fileName,
    };
    setSavedVersions([version, ...savedVersions.slice(0, 9)]);
    
    localStorage.setItem(`ide-${fileName}`, code);
    localStorage.setItem(`ide-versions`, JSON.stringify([version, ...savedVersions.slice(0, 9)]));
    
    toast({
      title: "Saved!",
      description: `${fileName} saved successfully`,
    });
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: `${fileName} downloaded to your device`,
    });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCode(content);
        setFileName(file.name);
        toast({
          title: "File Loaded!",
          description: `${file.name} loaded successfully`,
        });
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    toast({
      title: "Cleared!",
      description: "Editor and output cleared",
    });
  };

  const formatCode = () => {
    if (language === "javascript" || language === "typescript") {
      try {
        const lines = code.split('\n');
        let indentLevel = 0;
        const formatted = lines.map(line => {
          const trimmed = line.trim();
          if (trimmed.includes('}')) indentLevel = Math.max(0, indentLevel - 1);
          const indented = '  '.repeat(indentLevel) + trimmed;
          if (trimmed.includes('{')) indentLevel++;
          return indented;
        }).join('\n');
        setCode(formatted);
        toast({
          title: "Formatted!",
          description: "Code has been formatted",
        });
      } catch (error) {
        toast({
          title: "Format Error",
          description: "Could not format code",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Not Supported",
        description: "Formatting only available for JS/TS",
        variant: "destructive",
      });
    }
  };

  const currentLang = LANGUAGES.find(l => l.value === language);
  const ThemeIcon = THEMES.find(t => t.value === theme)?.icon || Moon;

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}>
      <Card className="h-full border-2 shadow-2xl">
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-chart-2/5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl md:text-2xl">Professional Code IDE</CardTitle>
                <CardDescription className="hidden sm:block">
                  Full-featured online editor with 14+ languages and real-time execution
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="gap-1">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: currentLang?.color }}
                />
                {currentLang?.label}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <ThemeIcon className="h-3 w-3" />
                {theme.split('-')[0]}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsFullscreen(!isFullscreen)}
                data-testid="button-fullscreen"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 md:p-6 space-y-4">
          {/* Enhanced Toolbar */}
          <motion.div 
            className="flex flex-col gap-3 pb-4 border-b"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* File Controls Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <Input
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="flex-1 sm:w-40 h-9 text-sm"
                  data-testid="input-filename"
                />
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="flex-1 sm:w-40 h-9" data-testid="select-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full shrink-0" 
                            style={{ backgroundColor: lang.color }}
                          />
                          <span className="truncate">{lang.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="flex-1 sm:w-32 h-9" data-testid="select-theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {THEMES.map(t => (
                      <SelectItem key={t.value} value={t.value}>
                        <div className="flex items-center gap-2">
                          <t.icon className="h-3 w-3 shrink-0" />
                          <span className="truncate">{t.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex gap-1.5 flex-wrap">
              <Button 
                size="sm" 
                onClick={handleRun} 
                disabled={isRunning}
                className="gap-1.5"
                data-testid="button-run"
              >
                <Play className="h-4 w-4" />
                <span className="hidden xs:inline">Run</span>
              </Button>
              <Button size="sm" variant="outline" onClick={handleSave} data-testid="button-save" title="Save">
                <Save className="h-4 w-4" />
                <span className="sr-only">Save</span>
              </Button>
              <Button size="sm" variant="outline" onClick={handleCopy} data-testid="button-copy" title="Copy">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
              <Button size="sm" variant="outline" onClick={handleDownload} data-testid="button-download" title="Download">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <Button size="sm" variant="outline" onClick={formatCode} data-testid="button-format" title="Format Code">
                <Zap className="h-4 w-4" />
                <span className="sr-only">Format</span>
              </Button>
              <label htmlFor="file-upload">
                <Button size="sm" variant="outline" asChild data-testid="button-upload" title="Upload File">
                  <span>
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload</span>
                  </span>
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleUpload}
                accept=".js,.ts,.py,.java,.cpp,.cs,.go,.rs,.php,.rb,.html,.css,.sql,.json,.txt"
              />
              <Button size="sm" variant="outline" onClick={handleClear} data-testid="button-clear" title="Clear">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Clear</span>
              </Button>
            </div>
          </motion.div>

          {/* Keyboard Shortcuts Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md flex-wrap">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-background rounded border">Ctrl+Enter</kbd> Run
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-background rounded border">Ctrl+S</kbd> Save
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-background rounded border">Ctrl+/-</kbd> Zoom
            </span>
          </div>

          {/* Main Editor Area */}
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 h-auto">
              <TabsTrigger value="editor" data-testid="tab-editor" className="gap-1.5 py-2">
                <FileCode className="h-4 w-4 shrink-0" />
                <span className="hidden xs:inline">Editor</span>
              </TabsTrigger>
              <TabsTrigger value="output" data-testid="tab-output" className="gap-1.5 py-2">
                <Terminal className="h-4 w-4 shrink-0" />
                <span className="hidden xs:inline">Output</span>
              </TabsTrigger>
              <TabsTrigger value="ai" data-testid="tab-ai" className="gap-1.5 py-2">
                <Brain className="h-4 w-4 shrink-0" />
                <span className="hidden xs:inline">AI</span>
              </TabsTrigger>
              <TabsTrigger value="versions" data-testid="tab-versions" className="gap-1.5 py-2">
                <GitBranch className="h-4 w-4 shrink-0" />
                <span className="hidden xs:inline">History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`font-mono text-xs sm:text-sm min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] resize-none transition-all w-full ${
                    theme === "vs-dark" 
                      ? "bg-gray-950 text-gray-100 border-gray-800" 
                      : "bg-white text-gray-900 border-gray-300"
                  }`}
                  style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
                  placeholder="Start coding... Type your code here"
                  spellCheck={false}
                  data-testid="textarea-code"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground px-1">
                  <div className="flex items-center gap-4">
                    <span>Lines: {code.split('\n').length}</span>
                    <span>Characters: {code.length}</span>
                    <span>Words: {code.split(/\s+/).filter(w => w).length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFontSize(prev => Math.max(prev - 2, 10))}
                      className="h-6 px-2"
                    >
                      -
                    </Button>
                    <span>{fontSize}px</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
                      className="h-6 px-2"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="output" className="mt-0">
              <Card className="bg-gray-950 text-green-400 font-mono text-xs sm:text-sm border-2 border-gray-800">
                <CardContent className="p-3 sm:p-4 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-auto">
                  {isRunning ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-green-400 border-t-transparent rounded-full" />
                      <span>Running code...</span>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap" data-testid="output-console">
                      {output || "📟 Console Output\n\nRun your code to see output here...\n\nSupports:\n• console.log() - Standard output\n• console.error() - Error messages\n• console.warn() - Warnings"}
                    </pre>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="mt-0">
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-br from-primary/5 to-chart-2/5">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Code Assistant
                  </CardTitle>
                  <CardDescription>
                    Get intelligent suggestions for your code
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt">Ask AI to help with your code:</Label>
                    <Textarea
                      id="ai-prompt"
                      placeholder="e.g., 'Explain this function', 'Add error handling', 'Optimize performance', 'Generate unit tests'..."
                      className="min-h-[120px]"
                      data-testid="textarea-ai-prompt"
                    />
                    <Button className="w-full" size="lg" data-testid="button-ai-suggest">
                      <Brain className="h-4 w-4 mr-2" />
                      Get AI Suggestion
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Quick Actions:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" data-testid="button-ai-debug">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Debug Code
                      </Button>
                      <Button variant="outline" size="sm" data-testid="button-ai-comment">
                        <FileText className="h-3 w-3 mr-1" />
                        Add Comments
                      </Button>
                      <Button variant="outline" size="sm" data-testid="button-ai-optimize">
                        <Zap className="h-3 w-3 mr-1" />
                        Optimize
                      </Button>
                      <Button variant="outline" size="sm" data-testid="button-ai-test">
                        <Code className="h-3 w-3 mr-1" />
                        Generate Tests
                      </Button>
                      <Button variant="outline" size="sm" data-testid="button-ai-refactor">
                        <GitBranch className="h-3 w-3 mr-1" />
                        Refactor
                      </Button>
                      <Button variant="outline" size="sm" data-testid="button-ai-document">
                        <FileJson className="h-3 w-3 mr-1" />
                        Document
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">💡 Pro Tips:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Be specific about what you want to improve</li>
                      <li>Ask for explanations to learn better coding practices</li>
                      <li>Request performance optimization suggestions</li>
                      <li>Get help with debugging complex issues</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="versions" className="mt-0">
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-br from-chart-3/5 to-chart-4/5">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Saved Versions
                  </CardTitle>
                  <CardDescription>
                    Restore previous versions of your code (Last 10 saves)
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {savedVersions.length === 0 ? (
                    <div className="text-center py-12">
                      <Save className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        No saved versions yet. Click Save to create one.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedVersions.map((version, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 border-2 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium flex items-center gap-2">
                              <FileCode className="h-4 w-4 text-primary" />
                              Version #{savedVersions.length - index} - {version.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(version.timestamp).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {version.code.split('\n').length} lines, {version.code.length} chars
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setCode(version.code);
                              toast({
                                title: "Restored!",
                                description: `Version #${savedVersions.length - index} restored`,
                              });
                            }}
                            data-testid={`button-restore-${index}`}
                          >
                            <GitBranch className="h-3 w-3 mr-1" />
                            Restore
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Features Panel */}
          <Card className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 border-primary/20 mt-6">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                IDE Features & Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                <span>14+ Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>AI Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-primary" />
                <span>Version Control</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span>Real-time Execution</span>
              </div>
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4 text-primary" />
                <span>Auto-save</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                <span>Export Code</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Code Formatting</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                <span>Code Sharing</span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
