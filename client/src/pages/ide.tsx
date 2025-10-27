
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { CodeIDE } from "@/components/tools/code-ide";

export default function IDEPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Advanced Code IDE - Online Code Editor | Fasih ur Rehman"
        description="Full-featured online code editor supporting 14+ programming languages with AI assistance, syntax highlighting, and real-time execution. Built by Fasih ur Rehman."
        keywords="online code editor, web IDE, code playground, JavaScript editor, Python editor, multi-language IDE, AI code assistant"
      />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <CodeIDE />
        </div>
      </main>

      <Footer />
    </div>
  );
}
