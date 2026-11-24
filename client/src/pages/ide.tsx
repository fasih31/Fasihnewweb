
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CodeIDE } from "@/components/tools/code-ide";

export default function IDEPage() {
  return (
    <div className="min-h-screen bg-background">
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
