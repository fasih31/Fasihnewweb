
import { Clock } from "lucide-react";

interface ReadingTimeProps {
  content: string;
  className?: string;
}

export function ReadingTime({ content, className = "" }: ReadingTimeProps) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Clock className="h-4 w-4" />
      <span>{readingTime} min read</span>
    </div>
  );
}
