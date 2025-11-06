import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Eye, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MarkdownConverter() {
  const { toast } = useToast();
  const [markdown, setMarkdown] = useState("# Hello World\n\nThis is **bold** and this is *italic*.\n\n## List Example\n- Item 1\n- Item 2\n- Item 3\n\n[Link Example](https://example.com)");
  const [activeTab, setActiveTab] = useState("edit");

  const convertMarkdownToHtml = (md: string): string => {
    let html = md;

    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    html = html.replace(/`(.+?)`/g, '<code>$1</code>');

    html = html.replace(/^> (.+)/gim, '<blockquote>$1</blockquote>');

    html = html.replace(/^\* (.+)/gim, '<li>$1</li>');
    html = html.replace(/^- (.+)/gim, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*<\/li>)/g, '<ul>$1</ul>');

    html = html.replace(/^\d+\. (.+)/gim, '<li>$1</li>');

    html = html.replace(/\n\n/g, '</p><p>');
    html = `<p>${html}</p>`;
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');
    html = html.replace(/<p>(<blockquote>)/g, '$1');
    html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

    return html;
  };

  const html = convertMarkdownToHtml(markdown);

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      toast({
        title: "Copied!",
        description: "HTML copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-6 w-6 text-primary" />
          Markdown to HTML Converter
        </CardTitle>
        <CardDescription>
          Convert Markdown to HTML with live preview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger data-testid="tab-edit" value="edit">
              <FileCode className="h-4 w-4 mr-2" />
              Markdown
            </TabsTrigger>
            <TabsTrigger data-testid="tab-preview" value="preview">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger data-testid="tab-html" value="html">
              HTML
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            <Textarea
              data-testid="textarea-markdown"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter Markdown here..."
              className="min-h-[400px] font-mono text-sm"
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div
              data-testid="div-preview"
              className="min-h-[400px] p-6 border rounded-lg prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </TabsContent>

          <TabsContent value="html" className="space-y-4">
            <Textarea
              data-testid="textarea-html"
              value={html}
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button
                data-testid="button-copy-html"
                variant="outline"
                onClick={copyHtml}
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy HTML
              </Button>
              <Button
                data-testid="button-download-html"
                variant="outline"
                onClick={downloadHtml}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download HTML
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Markdown: {markdown.length} chars</span>
          <span>HTML: {html.length} chars</span>
        </div>
      </CardContent>
    </Card>
  );
}
