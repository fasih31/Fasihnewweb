import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ArticleSearchProps {
  onSearch: (query: string) => void;
}

export function ArticleSearch({ onSearch }: ArticleSearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.toLowerCase());
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  );
}
