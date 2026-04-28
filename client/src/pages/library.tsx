
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Book, Search, ExternalLink, Download, Library as LibraryIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ArchiveBook {
  identifier: string;
  title: string;
  creator?: string[];
  year?: string;
  description?: string;
  subject?: string[];
  downloads?: number;
}

export default function Library() {
  const [books, setBooks] = useState<ArchiveBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("islamic-banking");
  const [selectedEmbedUrl, setSelectedEmbedUrl] = useState("https://archive.org/embed/islamic-banking-and-finance");
  const [selectedSource, setSelectedSource] = useState("archive");

  const categories = [
    { id: "islamic-banking", label: "Islamic Banking", query: "islamic banking OR islamic finance" },
    { id: "business", label: "Business & Economics", query: "business economics finance" },
    { id: "fintech", label: "FinTech", query: "financial technology fintech" },
    { id: "riba-free", label: "Riba-Free Finance", query: "riba interest-free islamic economy" },
  ];

  const openSources = [
    {
      id: "archive",
      label: "Internet Archive",
      url: "https://archive.org/details/texts",
      embedUrl: "https://archive.org/embed/islamic-banking-and-finance",
      description: "Millions of books, manuscripts, and historical collections.",
    },
    {
      id: "openlibrary",
      label: "Open Library",
      url: "https://openlibrary.org/subjects/finance",
      embedUrl: "https://openlibrary.org/subjects/finance",
      description: "Open, editable library catalog from the Internet Archive ecosystem.",
    },
    {
      id: "gutenberg",
      label: "Project Gutenberg",
      url: "https://www.gutenberg.org/ebooks/search/?query=economics",
      embedUrl: "https://www.gutenberg.org/ebooks/search/?query=economics",
      description: "Public domain classics and research books in open formats.",
    },
  ];

  useEffect(() => {
    fetchBooks(categories.find(c => c.id === activeCategory)?.query || "");
  }, [activeCategory]);

  const fetchBooks = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl[]=identifier,title,creator,year,description,subject,downloads&rows=20&page=1&output=json&mediatype=texts`
      );
      const data = await response.json();
      setBooks(data.response?.docs || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchBooks(searchQuery);
    }
  };

  return (
    <>
      <Helmet>
        <title>Digital Library - Free Books on Islamic Banking & Business</title>
        <meta
          name="description"
          content="Access free books on Islamic Banking, FinTech, Business, and Riba-free finance from the Internet Archive."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <LibraryIcon className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Digital Library
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Access thousands of free books on Islamic Banking, FinTech, Business, and Riba-free Finance
              from the Internet Archive
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">Search</Button>
              </div>
            </form>
          </div>
        </section>

        {/* Categories and Books */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Embedded Reader Window</CardTitle>
                <CardDescription>
                  Preview selected resources directly in-page without leaving the Digital Library.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full rounded-lg overflow-hidden border bg-muted/30">
                  <iframe
                    src={selectedEmbedUrl}
                    title="Digital Library Embedded Reader"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="mb-8 w-full md:w-auto overflow-x-auto flex-nowrap">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                          <CardHeader>
                            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-1/2"></div>
                          </CardHeader>
                          <CardContent>
                            <div className="h-20 bg-muted rounded"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : books.length === 0 ? (
                    <div className="text-center py-16">
                      <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-xl text-muted-foreground">No books found</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {books.map((book) => (
                        <Card key={book.identifier} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="line-clamp-2 text-lg">
                              {book.title}
                            </CardTitle>
                            <CardDescription>
                              {book.creator?.[0] && `by ${book.creator[0]}`}
                              {book.year && ` • ${book.year}`}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {book.description && (
                              <p className="text-sm text-muted-foreground line-clamp-3">
                                {book.description}
                              </p>
                            )}
                            
                            {book.subject && book.subject.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {book.subject.slice(0, 3).map((subject, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {subject}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {book.downloads !== undefined && (
                              <p className="text-xs text-muted-foreground">
                                {book.downloads.toLocaleString()} downloads
                              </p>
                            )}

                            <div className="flex gap-2 pt-2">
                              <Button
                                variant="default"
                                size="sm"
                                className="flex-1"
                                onClick={() => setSelectedEmbedUrl(`https://archive.org/embed/${book.identifier}`)}
                              >
                                <>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Embed
                                </>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                asChild
                              >
                                <a
                                  href={`https://archive.org/download/${book.identifier}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* About Internet Archive */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Open-Source Knowledge Sources (Embedded)</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {openSources.map((source) => (
                <Card
                  key={source.id}
                  className={`cursor-pointer transition-all ${selectedSource === source.id ? "border-primary shadow-md" : ""}`}
                  onClick={() => {
                    setSelectedSource(source.id);
                    setSelectedEmbedUrl(source.embedUrl);
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{source.label}</CardTitle>
                    <CardDescription>{source.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        Open in New Tab
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
