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
  FileJson, FileText, AlertCircle, ChevronRight, FolderOpen,
  File, Plus, X, MoreVertical, Search, RefreshCw, StopCircle,
  Layout, Sparkles, BookOpen, History, Eye, EyeOff, Palette
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", ext: ".js", color: "#F7DF1E", icon: "JS" },
  { value: "typescript", label: "TypeScript", ext: ".ts", color: "#3178C6", icon: "TS" },
  { value: "python", label: "Python", ext: ".py", color: "#3776AB", icon: "PY" },
  { value: "java", label: "Java", ext: ".java", color: "#007396", icon: "JV" },
  { value: "cpp", label: "C++", ext: ".cpp", color: "#00599C", icon: "C++" },
  { value: "csharp", label: "C#", ext: ".cs", color: "#239120", icon: "C#" },
  { value: "go", label: "Go", ext: ".go", color: "#00ADD8", icon: "GO" },
  { value: "rust", label: "Rust", ext: ".rs", color: "#CE412B", icon: "RS" },
  { value: "php", label: "PHP", ext: ".php", color: "#777BB4", icon: "PHP" },
  { value: "ruby", label: "Ruby", ext: ".rb", color: "#CC342D", icon: "RB" },
  { value: "html", label: "HTML", ext: ".html", color: "#E34F26", icon: "HTML" },
  { value: "css", label: "CSS", ext: ".css", color: "#1572B6", icon: "CSS" },
  { value: "sql", label: "SQL", ext: ".sql", color: "#4479A1", icon: "SQL" },
  { value: "json", label: "JSON", ext: ".json", color: "#000000", icon: "JSON" },
];

const THEMES = [
  { value: "vs-dark", label: "Dark", icon: Moon, bg: "#1e1e1e", text: "#d4d4d4" },
  { value: "dracula", label: "Dracula", icon: Palette, bg: "#282a36", text: "#f8f8f2" },
  { value: "monokai", label: "Monokai", icon: Code, bg: "#272822", text: "#f8f8f2" },
  { value: "nord", label: "Nord", icon: Sparkles, bg: "#2e3440", text: "#d8dee9" },
  { value: "vs-light", label: "Light", icon: Sun, bg: "#ffffff", text: "#000000" },
];

const CODE_TEMPLATES = {
  javascript: `// Modern JavaScript - Async Data Fetching
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

// Test with example
(async () => {
  try {
    const user = await fetchUserData(1);
    console.log('User data:', user);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();`,
  typescript: `// TypeScript - Type-safe API Client
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUser(id: number): Promise<User> {
    const response = await fetch(\`\${this.baseUrl}/users/\${id}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  }
}

const api = new ApiClient('https://api.example.com');
api.getUser(1).then(user => console.log('User:', user));`,
  python: `# Python - Data Processing with Classes
from datetime import datetime
from typing import List, Dict

class DataProcessor:
    def __init__(self, data: List[Dict]):
        self.data = data
        self.processed_at = datetime.now()

    def filter_by_key(self, key: str, value) -> List[Dict]:
        return [item for item in self.data if item.get(key) == value]

    def transform(self, func) -> List:
        return [func(item) for item in self.data]

    def summarize(self) -> Dict:
        return {
            'total_items': len(self.data),
            'processed_at': self.processed_at.isoformat()
        }

# Example usage
sample_data = [
    {'id': 1, 'name': 'Alice', 'age': 30},
    {'id': 2, 'name': 'Bob', 'age': 25}
]

processor = DataProcessor(sample_data)
print(processor.summarize())`,
  java: `// Java - Modern Stream API
import java.util.*;
import java.util.stream.*;

public class DataAnalyzer {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Filter, map, and reduce
        int sumOfSquares = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .reduce(0, Integer::sum);

        System.out.println("Sum of squares of even numbers: " + sumOfSquares);

        // Grouped statistics
        Map<Boolean, Long> evenOddCount = numbers.stream()
            .collect(Collectors.groupingBy(n -> n % 2 == 0, Collectors.counting()));

        System.out.println("Even count: " + evenOddCount.get(true));
        System.out.println("Odd count: " + evenOddCount.get(false));
    }
}`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            border-radius: 12px;
            color: white;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>📊 Analytics Dashboard</h1>
            <button>Refresh Data</button>
        </div>
        <div class="stats">
            <div class="stat-card">
                <h3>Total Users</h3>
                <p style="font-size: 32px; font-weight: bold;">12,543</p>
            </div>
            <div class="stat-card">
                <h3>Revenue</h3>
                <p style="font-size: 32px; font-weight: bold;">$45,231</p>
            </div>
        </div>
    </div>
</body>
</html>`,
};

interface FileTab {
  id: string;
  name: string;
  content: string;
  language: string;
  saved: boolean;
}

export function CodeIDE() {
  const [files, setFiles] = useState<FileTab[]>([
    { 
      id: "1", 
      name: "main.js", 
      content: CODE_TEMPLATES.javascript, 
      language: "javascript",
      saved: true 
    }
  ]);
  const [activeFileId, setActiveFileId] = useState("1");
  const [theme, setTheme] = useState(THEMES[0]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showMinimap, setShowMinimap] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const updateActiveFile = (updates: Partial<FileTab>) => {
    setFiles(files.map(f => 
      f.id === activeFileId 
        ? { ...f, ...updates, saved: false }
        : f
    ));
  };

  const createNewFile = () => {
    const newId = String(Date.now());
    const newFile: FileTab = {
      id: newId,
      name: `untitled-${files.length + 1}.js`,
      content: "",
      language: "javascript",
      saved: false
    };
    setFiles([...files, newFile]);
    setActiveFileId(newId);
  };

  const closeFile = (id: string) => {
    if (files.length === 1) {
      toast({
        title: "Cannot close",
        description: "At least one file must remain open",
        variant: "destructive"
      });
      return;
    }
    const index = files.findIndex(f => f.id === id);
    setFiles(files.filter(f => f.id !== id));
    if (activeFileId === id) {
      setActiveFileId(files[index - 1]?.id || files[index + 1]?.id);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("🚀 Executing code...\n\n");

    try {
      if (activeFile.language === "javascript" || activeFile.language === "typescript") {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const iframeWindow = iframe.contentWindow;
        if (!iframeWindow) throw new Error('Sandbox creation failed');

        let consoleOutput = '';

        iframeWindow.console = {
          log: (...args) => {
            consoleOutput += '📝 ' + args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') + '\n';
          },
          error: (...args) => {
            consoleOutput += '❌ ERROR: ' + args.join(' ') + '\n';
          },
          warn: (...args) => {
            consoleOutput += '⚠️  WARNING: ' + args.join(' ') + '\n';
          },
          info: (...args) => {
            consoleOutput += 'ℹ️  INFO: ' + args.join(' ') + '\n';
          },
        } as Console;

        try {
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('⏱️ Execution timeout (5s)')), 5000)
          );

          const executionPromise = new Promise((resolve) => {
            try {
              iframeWindow.eval(activeFile.content);
              resolve(true);
            } catch (err) {
              consoleOutput += `\n❌ Runtime Error: ${err instanceof Error ? err.message : String(err)}\n`;
              resolve(false);
            }
          });

          await Promise.race([executionPromise, timeoutPromise]);

          setOutput(consoleOutput || '✅ Code executed successfully\n\nNo console output generated.');
        } finally {
          document.body.removeChild(iframe);
        }
      } else if (activeFile.language === "html") {
        const blob = new Blob([activeFile.content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setOutput(`✅ HTML Preview Generated\n\nOpening in new tab...`);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } else {
        const response = await fetch('/api/execute-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: activeFile.content,
            language: activeFile.language,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setOutput(`✅ Execution Complete\n\n${result.output || 'No output generated'}`);
        } else {
          setOutput(`❌ Execution Failed\n\n${result.error || 'Unknown error occurred'}`);
        }
      }

      toast({
        title: "Execution Complete",
        description: "Check the terminal for output",
      });
    } catch (error) {
      setOutput(`❌ Execution Error\n\n${error instanceof Error ? error.message : String(error)}`);
      toast({
        title: "Execution Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = () => {
    updateActiveFile({ saved: true });
    localStorage.setItem(`ide-${activeFile.id}`, activeFile.content);

    toast({
      title: "Saved Successfully",
      description: `${activeFile.name} has been saved`,
    });
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentLang = LANGUAGES.find(l => l.value === activeFile.language);

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}>
      <Card className="h-full border-0 shadow-2xl overflow-hidden">
        {/* Top Toolbar */}
        <div className="border-b bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-3/10 backdrop-blur-xl">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-background/50 rounded-lg px-3 py-1.5 border">
                <Code className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">Professional IDE</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <Badge variant="secondary" className="gap-1.5">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentLang?.color }} />
                {currentLang?.icon}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={createNewFile}>
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
              <Button size="sm" onClick={handleRun} disabled={isRunning}>
                {isRunning ? (
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-1" />
                )}
                Run
              </Button>
              <Button size="sm" variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button size="sm" variant="ghost" onClick={() => setIsFullscreen(!isFullscreen)}>
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* File Tabs */}
          <ScrollArea className="w-full">
            <div className="flex items-center gap-1 px-2 pb-2">
              {files.map(file => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg cursor-pointer transition-all ${
                    file.id === activeFileId
                      ? 'bg-background border-t border-x shadow-lg'
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                  onClick={() => setActiveFileId(file.id)}
                >
                  <FileCode className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm font-medium">{file.name}</span>
                  {!file.saved && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                  {files.length > 1 && (
                    <X 
                      className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive ml-1" 
                      onClick={(e) => { e.stopPropagation(); closeFile(file.id); }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content Area */}
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-200px)]">
          {/* Editor Panel */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="h-full flex flex-col">
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
                <div className="flex items-center gap-2">
                  <Select 
                    value={activeFile.language} 
                    onValueChange={(lang) => {
                      const ext = LANGUAGES.find(l => l.value === lang)?.ext || '.txt';
                      updateActiveFile({ 
                        language: lang,
                        name: activeFile.name.replace(/\.[^.]+$/, ext)
                      });
                    }}
                  >
                    <SelectTrigger className="w-40 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                            {lang.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select 
                    value={theme.value} 
                    onValueChange={(val) => setTheme(THEMES.find(t => t.value === val) || THEMES[0])}
                  >
                    <SelectTrigger className="w-36 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {THEMES.map(t => (
                        <SelectItem key={t.value} value={t.value}>
                          <div className="flex items-center gap-2">
                            <t.icon className="h-3 w-3" />
                            {t.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowLineNumbers(!showLineNumbers)}
                    className="h-7 px-2"
                  >
                    {showLineNumbers ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                    Lines
                  </Button>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Ln {activeFile.content.split('\n').length}</span>
                  <span>Col {activeFile.content.length}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFontSize(prev => Math.max(prev - 1, 10))}
                    className="h-7 w-7 p-0"
                  >
                    -
                  </Button>
                  <span>{fontSize}px</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFontSize(prev => Math.min(prev + 1, 24))}
                    className="h-7 w-7 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 flex overflow-hidden">
                {showLineNumbers && (
                  <div 
                    className="select-none border-r px-3 py-4 font-mono text-right"
                    style={{ 
                      backgroundColor: theme.bg,
                      color: `${theme.text}60`,
                      fontSize: `${fontSize}px`,
                      lineHeight: '1.6'
                    }}
                  >
                    {activeFile.content.split('\n').map((_, i) => (
                      <div key={i} className="leading-relaxed">{i + 1}</div>
                    ))}
                  </div>
                )}
                <Textarea
                  ref={textareaRef}
                  value={activeFile.content}
                  onChange={(e) => updateActiveFile({ content: e.target.value })}
                  className="flex-1 font-mono resize-none border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  style={{ 
                    backgroundColor: theme.bg,
                    color: theme.text,
                    fontSize: `${fontSize}px`,
                    lineHeight: '1.6'
                  }}
                  placeholder="// Start coding..."
                  spellCheck={false}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Terminal/Output Panel */}
          <ResizablePanel defaultSize={40} minSize={20}>
            <Tabs defaultValue="terminal" className="h-full flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b h-10">
                <TabsTrigger value="terminal" className="gap-2">
                  <Terminal className="h-4 w-4" />
                  Terminal
                </TabsTrigger>
                <TabsTrigger value="problems" className="gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Problems
                </TabsTrigger>
                <TabsTrigger value="output" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Output
                </TabsTrigger>
              </TabsList>

              <TabsContent value="terminal" className="flex-1 m-0 p-0">
                <ScrollArea className="h-full">
                  <div 
                    className="p-4 font-mono text-sm min-h-full"
                    style={{ backgroundColor: '#1e1e1e', color: '#00ff00' }}
                  >
                    {isRunning ? (
                      <div className="flex items-center gap-2 animate-pulse">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Executing...</span>
                      </div>
                    ) : (
                      <pre className="whitespace-pre-wrap leading-relaxed">
                        {output || `$ Ready to execute code

▶ Press 'Run' to execute your code
▶ Supports: JavaScript, TypeScript, Python, Java, C++, and more
▶ Output will appear here in real-time

Type your code in the editor and click Run to see results...`}
                      </pre>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="problems" className="flex-1 m-0 p-4">
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>No problems detected</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="output" className="flex-1 m-0 p-0">
                <ScrollArea className="h-full">
                  <div className="p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-muted-foreground">
                      {output || 'No output yet. Run your code to see results here.'}
                    </pre>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Bottom Status Bar */}
        <div className="border-t bg-muted/50 px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Ready</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span>{currentLang?.label}</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={handleCopy} className="h-6 px-2">
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              Copy
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDownload} className="h-6 px-2">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}