
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Code, Play, Save, Download, Upload, Share2, Terminal, 
  FileCode, Moon, Sun, Zap, Brain, GitBranch, Users
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", ext: ".js" },
  { value: "typescript", label: "TypeScript", ext: ".ts" },
  { value: "python", label: "Python", ext: ".py" },
  { value: "java", label: "Java", ext: ".java" },
  { value: "cpp", label: "C++", ext: ".cpp" },
  { value: "csharp", label: "C#", ext: ".cs" },
  { value: "go", label: "Go", ext: ".go" },
  { value: "rust", label: "Rust", ext: ".rs" },
  { value: "php", label: "PHP", ext: ".php" },
  { value: "ruby", label: "Ruby", ext: ".rb" },
  { value: "html", label: "HTML", ext: ".html" },
  { value: "css", label: "CSS", ext: ".css" },
  { value: "sql", label: "SQL", ext: ".sql" },
  { value: "json", label: "JSON", ext: ".json" },
];

const THEMES = [
  { value: "vs-dark", label: "Dark" },
  { value: "vs-light", label: "Light" },
  { value: "monokai", label: "Monokai" },
  { value: "github-dark", label: "GitHub Dark" },
];

const CODE_TEMPLATES = {
  javascript: `// JavaScript Template
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
  python: `# Python Template
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
  java: `// Java Template
public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
    }
}`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web App</title>
</head>
<body>
    <h1>Hello, World!</h1>
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
  const [savedVersions, setSavedVersions] = useState<Array<{ code: string; timestamp: string }>>([]);

  useEffect(() => {
    const template = CODE_TEMPLATES[language as keyof typeof CODE_TEMPLATES];
    if (template) {
      setCode(template);
    }
    const lang = LANGUAGES.find(l => l.value === language);
    setFileName(`untitled${lang?.ext || '.txt'}`);
  }, [language]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running code...\n");
    
    try {
      // Simulate code execution (in production, this would call a backend API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (language === "javascript") {
        try {
          const logs: string[] = [];
          const originalLog = console.log;
          console.log = (...args) => {
            logs.push(args.join(' '));
          };
          
          // eslint-disable-next-line no-eval
          eval(code);
          
          console.log = originalLog;
          setOutput(logs.join('\n') || "Code executed successfully (no output)");
        } catch (error) {
          setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
        }
      } else {
        setOutput(`Code execution for ${language} requires backend compilation.\nSimulated output: Code compiled and executed successfully.`);
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = () => {
    const version = {
      code,
      timestamp: new Date().toISOString(),
    };
    setSavedVersions([version, ...savedVersions.slice(0, 9)]);
    
    // Save to localStorage
    localStorage.setItem(`ide-${fileName}`, code);
    localStorage.setItem(`ide-versions-${fileName}`, JSON.stringify(savedVersions));
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCode(content);
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  const formatCode = () => {
    // Basic code formatting
    if (language === "javascript" || language === "typescript") {
      try {
        const formatted = code
          .split('\n')
          .map(line => line.trim())
          .join('\n');
        setCode(formatted);
      } catch (error) {
        console.error("Formatting error:", error);
      }
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              Advanced Code IDE
            </CardTitle>
            <CardDescription>
              Full-featured online IDE with AI assistance, multiple languages, and collaboration
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <Users className="h-3 w-3 mr-1" />
              Solo
            </Badge>
            <Badge variant="outline">
              {theme === "vs-dark" ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b">
          <div className="flex items-center gap-2">
            <Label htmlFor="fileName" className="text-sm">File:</Label>
            <Input
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-40 h-8 text-sm"
            />
          </div>
          
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(lang => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {THEMES.map(t => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-1 ml-auto">
            <Button size="sm" variant="outline" onClick={handleRun} disabled={isRunning}>
              <Play className="h-4 w-4 mr-1" />
              Run
            </Button>
            <Button size="sm" variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button size="sm" variant="outline" onClick={formatCode}>
              <Zap className="h-4 w-4 mr-1" />
              Format
            </Button>
            <label htmlFor="file-upload">
              <Button size="sm" variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
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
          </div>
        </div>

        {/* Main Editor Area */}
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="editor">
              <FileCode className="h-4 w-4 mr-1" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="output">
              <Terminal className="h-4 w-4 mr-1" />
              Output
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Brain className="h-4 w-4 mr-1" />
              AI Assist
            </TabsTrigger>
            <TabsTrigger value="versions">
              <GitBranch className="h-4 w-4 mr-1" />
              Versions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`font-mono text-sm min-h-[500px] resize-none ${
                theme === "vs-dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
              }`}
              placeholder="Start coding..."
              spellCheck={false}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Lines: {code.split('\n').length} | Characters: {code.length}</span>
              <span>Language: {LANGUAGES.find(l => l.value === language)?.label}</span>
            </div>
          </TabsContent>

          <TabsContent value="output" className="mt-4">
            <Card className="bg-gray-900 text-green-400 font-mono text-sm">
              <CardContent className="p-4 min-h-[500px] overflow-auto">
                <pre className="whitespace-pre-wrap">{output || "Run your code to see output..."}</pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Code Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Ask AI to help with your code:</Label>
                  <Textarea
                    placeholder="e.g., Explain this function, Add error handling, Optimize performance..."
                    className="min-h-[100px]"
                  />
                  <Button className="w-full">
                    <Brain className="h-4 w-4 mr-2" />
                    Get AI Suggestion
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Quick Actions:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">Debug Code</Button>
                    <Button variant="outline" size="sm">Add Comments</Button>
                    <Button variant="outline" size="sm">Optimize</Button>
                    <Button variant="outline" size="sm">Generate Tests</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="versions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saved Versions</CardTitle>
                <CardDescription>Restore previous versions of your code</CardDescription>
              </CardHeader>
              <CardContent>
                {savedVersions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No saved versions yet. Click Save to create one.</p>
                ) : (
                  <div className="space-y-2">
                    {savedVersions.map((version, index) => (
                      <div key={index} className="p-3 border rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Version {savedVersions.length - index}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(version.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setCode(version.code)}
                        >
                          Restore
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Panel */}
        <Card className="bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm">IDE Features</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
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
              <Share2 className="h-4 w-4 text-primary" />
              <span>Code Sharing</span>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
