import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Download, Copy, Check, Maximize2, Minimize2, Trash2, Code2, Terminal, FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LANGUAGE_CONFIGS = {
  javascript: { name: "JavaScript", icon: "JS", extension: "js", monaco: "javascript" },
  typescript: { name: "TypeScript", icon: "TS", extension: "ts", monaco: "typescript" },
  python: { name: "Python", icon: "PY", extension: "py", monaco: "python" },
  java: { name: "Java", icon: "JAVA", extension: "java", monaco: "java" },
  cpp: { name: "C++", icon: "C++", extension: "cpp", monaco: "cpp" },
  c: { name: "C", icon: "C", extension: "c", monaco: "c" },
  go: { name: "Go", icon: "GO", extension: "go", monaco: "go" },
  rust: { name: "Rust", icon: "RS", extension: "rs", monaco: "rust" },
  ruby: { name: "Ruby", icon: "RB", extension: "rb", monaco: "ruby" },
  php: { name: "PHP", icon: "PHP", extension: "php", monaco: "php" },
  swift: { name: "Swift", icon: "SWIFT", extension: "swift", monaco: "swift" },
  kotlin: { name: "Kotlin", icon: "KT", extension: "kt", monaco: "kotlin" },
  csharp: { name: "C#", icon: "C#", extension: "cs", monaco: "csharp" },
  sql: { name: "SQL", icon: "SQL", extension: "sql", monaco: "sql" },
  html: { name: "HTML", icon: "HTML", extension: "html", monaco: "html" },
};

const DEFAULT_CODE: Record<string, string> = {
  javascript: `// JavaScript Example\nconst greet = (name) => {\n  return \`Hello, \${name}!\`;\n};\n\nconsole.log(greet('World'));\nconsole.log('Sum:', 5 + 3);`,
  typescript: `// TypeScript Example\ninterface User {\n  name: string;\n  age: number;\n}\n\nconst greet = (user: User): string => {\n  return \`Hello, \${user.name}!\`;\n};\n\nconsole.log(greet({ name: 'Alice', age: 30 }));`,
  python: `# Python Example\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))\nprint("Sum:", 5 + 3)`,
  java: `// Java Example\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.println("Sum: " + (5 + 3));\n    }\n}`,
  cpp: `// C++ Example\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    cout << "Sum: " << (5 + 3) << endl;\n    return 0;\n}`,
  c: `// C Example\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    printf("Sum: %d\\n", 5 + 3);\n    return 0;\n}`,
  go: `// Go Example\npackage main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    fmt.Println("Sum:", 5 + 3)\n}`,
  rust: `// Rust Example\nfn main() {\n    println!("Hello, World!");\n    println!("Sum: {}", 5 + 3);\n}`,
  ruby: `# Ruby Example\ndef greet(name)\n  "Hello, #{name}!"\nend\n\nputs greet("World")\nputs "Sum: #{5 + 3}"`,
  php: `<?php\n// PHP Example\nfunction greet($name) {\n    return "Hello, $name!";\n}\n\necho greet("World") . "\\n";\necho "Sum: " . (5 + 3) . "\\n";`,
  swift: `// Swift Example\nfunc greet(name: String) -> String {\n    return "Hello, \\(name)!"\n}\n\nprint(greet(name: "World"))\nprint("Sum:", 5 + 3)`,
  kotlin: `// Kotlin Example\nfun greet(name: String): String {\n    return "Hello, $name!"\n}\n\nfun main() {\n    println(greet("World"))\n    println("Sum: ${5 + 3}")\n}`,
  csharp: `// C# Example\nusing System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n        Console.WriteLine($"Sum: {5 + 3}");\n    }\n}`,
  sql: `-- SQL Example\nSELECT 'Hello, World!' as greeting;\nSELECT 5 + 3 as sum;`,
  html: `<!-- HTML Example -->\n<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>This is a simple HTML page.</p>\n</body>\n</html>`,
};

export function CodeIDE() {
  const [language, setLanguage] = useState<keyof typeof LANGUAGE_CONFIGS>("javascript");
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCode(DEFAULT_CODE[language] || "");
    setOutput("");
  }, [language]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running code...\n");

    try {
      const response = await fetch("/api/execute-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output || "Execution completed with no output");
      } else {
        setOutput(`Error: ${data.error || "Execution failed"}`);
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Failed to execute code"}`);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Code copied to clipboard" });
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${LANGUAGE_CONFIGS[language].extension}`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Code downloaded successfully" });
  };

  const clearCode = () => {
    setCode(DEFAULT_CODE[language] || "");
    setOutput("");
  };

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
      <Card className={`border-0 shadow-none ${isFullscreen ? "h-full rounded-none" : ""}`}>
        {/* Professional IDE Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-3 gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Code2 className="h-5 w-5 text-primary flex-shrink-0" />
              <h2 className="text-lg font-semibold truncate">Professional Code IDE</h2>
              <Badge variant="outline" className="hidden sm:inline-flex">14+ Languages</Badge>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Select value={language} onValueChange={(val) => setLanguage(val as keyof typeof LANGUAGE_CONFIGS)}>
                <SelectTrigger className="w-[140px] sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LANGUAGE_CONFIGS).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{config.icon}</Badge>
                        <span className="hidden sm:inline">{config.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => setIsFullscreen(!isFullscreen)}
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - Split View Editor */}
        <div className={`grid lg:grid-cols-2 gap-0 ${isFullscreen ? "h-[calc(100vh-69px)]" : "h-[600px]"}`}>
          {/* Editor Panel */}
          <div className="flex flex-col border-r">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between p-2 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">main.{LANGUAGE_CONFIGS[language].extension}</span>
              </div>
              <div className="flex gap-1">
                <Button onClick={copyCode} variant="ghost" size="sm">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="hidden sm:inline ml-2">Copy</span>
                </Button>
                <Button onClick={downloadCode} variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Download</span>
                </Button>
                <Button onClick={clearCode} variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Clear</span>
                </Button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 bg-background font-mono text-sm resize-none focus:outline-none border-0"
                style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  lineHeight: "1.6",
                  tabSize: 2
                }}
                spellCheck={false}
              />
            </div>

            {/* Run Button - Fixed at bottom on mobile */}
            <div className="p-3 border-t bg-muted/20 lg:hidden">
              <Button
                onClick={runCode}
                disabled={isRunning}
                className="w-full"
                size="lg"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col">
            {/* Output Toolbar */}
            <div className="flex items-center justify-between p-2 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Console Output</span>
              </div>
              <Button
                onClick={runCode}
                disabled={isRunning}
                size="sm"
                className="hidden lg:inline-flex"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Run"}
              </Button>
            </div>

            {/* Output Area */}
            <div className="flex-1 overflow-auto bg-black/5 dark:bg-black/20">
              <pre className="p-4 font-mono text-sm whitespace-pre-wrap break-words min-h-full">
                {output || "// Output will appear here...\n// Click 'Run Code' to execute"}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t p-3 bg-muted/10">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Language: <strong>{LANGUAGE_CONFIGS[language].name}</strong></span>
              <span className="hidden sm:inline">Lines: <strong>{code.split('\n').length}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Real-time Execution</Badge>
              <Badge variant="outline" className="text-xs hidden sm:inline-flex">Syntax Highlighting</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}