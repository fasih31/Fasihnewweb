
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { CodeIDE } from "@/components/tools/code-ide";

export default function CodePlaygroundTool() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Code Playground — Online IDE with 14+ Programming Languages"
        description="Professional online code editor with support for JavaScript, Python, TypeScript, Java, C++, and 9 more languages. Features AI assistance, syntax highlighting, and real-time execution."
      />
      <Navigation />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              Code Playground
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional online IDE with 14+ programming languages, AI assistance, and real-time code execution
            </p>
          </div>

          <CodeIDE />
        </div>
      </main>

      <Footer />
    </div>
  );
}
