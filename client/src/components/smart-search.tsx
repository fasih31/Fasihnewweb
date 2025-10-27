
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  type: 'article' | 'project' | 'service';
  url: string;
}

export function SmartSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchContent = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      
      // Simulate search delay for better UX
      const timer = setTimeout(async () => {
        try {
          const response = await fetch(
            `/api/search?q=${encodeURIComponent(query)}&category=${category}`
          );
          const data = await response.json();
          setResults(data.results || []);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsSearching(false);
        }
      }, 300);

      return () => clearTimeout(timer);
    };

    searchContent();
  }, [query, category]);

  return (
    <div className="relative">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles, projects, services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Content</SelectItem>
            <SelectItem value="articles">Articles</SelectItem>
            <SelectItem value="projects">Projects</SelectItem>
            <SelectItem value="services">Services</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {query.length >= 2 && (
        <Card className="absolute top-full mt-2 w-full max-h-[400px] overflow-y-auto z-50 shadow-lg">
          <CardContent className="p-4">
            {isSearching ? (
              <div className="text-center py-8 text-muted-foreground">
                Searching...
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No results found for "{query}"
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((result) => (
                  <Link key={result.id} href={result.url}>
                    <div className="p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold">{result.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {result.excerpt}
                          </p>
                        </div>
                        <Badge variant="secondary">{result.type}</Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
