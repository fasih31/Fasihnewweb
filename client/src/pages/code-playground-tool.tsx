
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

      <main className="pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 leading-tight">
              Code Playground
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
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
