
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Linkedin, FileText, Tags, Upload, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  publishedAt?: string;
  readTime: number;
  views: number;
  createdAt: string;
  featuredImage?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

const CATEGORIES = [
  { id: "islamic-fintech", name: "Islamic FinTech Insights", color: "bg-green-500" },
  { id: "bnpl", name: "BNPL & Digital Lending", color: "bg-purple-500" },
  { id: "compliance", name: "Shariah Compliance", color: "bg-emerald-500" },
  { id: "ecommerce", name: "E-commerce Best Practices", color: "bg-orange-500" },
  { id: "edtech", name: "EdTech Innovation", color: "bg-cyan-500" },
  { id: "ai", name: "AI in Financial Services", color: "bg-pink-500" },
  { id: "crypto", name: "Crypto & Blockchain", color: "bg-yellow-500" },
  { id: "telecom", name: "5G & Telecom Transformation", color: "bg-indigo-500" },
  { id: "technology", name: "Technology & Innovation", color: "bg-blue-500" },
  { id: "business", name: "Business Strategy", color: "bg-red-500" },
];

export function ArticleManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: articlesResponse, isLoading } = useQuery<{ success: boolean; data: Article[] }>({
    queryKey: ["/api/articles?published=false"],
  });

  const articles = articlesResponse?.data || [];

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Success", description: "Article created successfully" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Success", description: "Article updated successfully" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Success", description: "Article deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const importLinkedInMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await fetch("/api/articles/import-linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Success", description: "LinkedIn article imported successfully" });
      setLinkedInUrl("");
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setIsDialogOpen(false);
    setEditingArticle(null);
    setTags([]);
    setSelectedCategory("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const slug = (formData.get("slug") as string) || 
      (formData.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const data = {
      title: formData.get("title") as string,
      slug,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      readTime: parseInt(formData.get("readTime") as string) || 5,
      published: formData.get("published") === "on",
      publishedAt: formData.get("published") === "on" ? new Date().toISOString() : null,
      featuredImage: formData.get("featuredImage") as string || null,
      tags: tags,
      metaTitle: formData.get("metaTitle") as string || formData.get("title") as string,
      metaDescription: formData.get("metaDescription") as string || formData.get("excerpt") as string,
      metaKeywords: formData.get("metaKeywords") as string || tags.join(", "),
    };

    if (editingArticle) {
      updateMutation.mutate({ id: editingArticle.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleImportLinkedIn = () => {
    if (!linkedInUrl.trim()) {
      toast({ title: "Error", description: "Please enter a LinkedIn article URL", variant: "destructive" });
      return;
    }
    importLinkedInMutation.mutate(linkedInUrl);
  };

  const openDialog = (article?: Article) => {
    setEditingArticle(article || null);
    setTags(article?.tags || []);
    setSelectedCategory(article?.category || "");
    setIsDialogOpen(true);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const filteredArticles = selectedCategory 
    ? articles.filter(a => a.category === selectedCategory)
    : articles;

  if (isLoading) {
    return <div>Loading articles...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Content Management System</h2>
          <p className="text-muted-foreground">Create, manage, and import articles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingArticle ? "Edit Article" : "Create New Article"}</DialogTitle>
              <DialogDescription>
                Fill in the details below to {editingArticle ? "update" : "create"} your article
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={editingArticle?.title}
                      required
                      placeholder="Enter article title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      defaultValue={editingArticle?.slug}
                      placeholder="article-url-slug (auto-generated if empty)"
                      pattern="[a-z0-9-]*"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      name="category" 
                      defaultValue={editingArticle?.category}
                      onValueChange={setSelectedCategory}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                              {cat.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      defaultValue={editingArticle?.excerpt}
                      required
                      placeholder="A brief summary (150-160 characters recommended)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content (Markdown) *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      defaultValue={editingArticle?.content}
                      required
                      placeholder="Write your article content in markdown format..."
                      rows={12}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featuredImage">Featured Image URL</Label>
                    <Input
                      id="featuredImage"
                      name="featuredImage"
                      defaultValue={editingArticle?.featuredImage}
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder="Add a tag"
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Tags className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      name="metaTitle"
                      defaultValue={editingArticle?.metaTitle}
                      placeholder="SEO title (defaults to article title)"
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      name="metaDescription"
                      defaultValue={editingArticle?.metaDescription}
                      placeholder="SEO description (defaults to excerpt)"
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaKeywords">Meta Keywords</Label>
                    <Input
                      id="metaKeywords"
                      name="metaKeywords"
                      defaultValue={editingArticle?.metaKeywords}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                    <p className="text-xs text-muted-foreground">Comma-separated keywords (defaults to tags)</p>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="readTime">Read Time (minutes)</Label>
                    <Input
                      id="readTime"
                      name="readTime"
                      type="number"
                      defaultValue={editingArticle?.readTime || 5}
                      min="1"
                      max="60"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      name="published"
                      defaultChecked={editingArticle?.published}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Article Statistics</p>
                    {editingArticle && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Created</p>
                          <p className="font-medium">{format(new Date(editingArticle.createdAt), "PPP")}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Views</p>
                          <p className="font-medium">{editingArticle.views || 0}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <div className="flex gap-2 justify-end mt-6 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <FileText className="h-4 w-4 mr-2" />
                    {editingArticle ? "Update" : "Create"} Article
                  </Button>
                </div>
              </form>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* LinkedIn Import Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-[#0077b5]" />
            Import from LinkedIn
          </CardTitle>
          <CardDescription>
            Import articles directly from your LinkedIn posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Paste LinkedIn article URL"
              value={linkedInUrl}
              onChange={(e) => setLinkedInUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleImportLinkedIn}
              disabled={importLinkedInMutation.isPending}
            >
              <Upload className="h-4 w-4 mr-2" />
              {importLinkedInMutation.isPending ? "Importing..." : "Import"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Note: LinkedIn article content will be imported and converted to markdown format
          </p>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("")}
        >
          All ({articles.length})
        </Button>
        {CATEGORIES.map(cat => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
          >
            <div className={`w-2 h-2 rounded-full ${cat.color} mr-2`} />
            {cat.name} ({articles.filter(a => a.category === cat.id).length})
          </Button>
        ))}
      </div>

      {/* Articles List */}
      <div className="grid gap-4">
        {filteredArticles.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {selectedCategory 
                ? `No articles in this category yet.`
                : `No articles yet. Create your first article to get started!`
              }
            </CardContent>
          </Card>
        ) : (
          filteredArticles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle>{article.title}</CardTitle>
                      {article.published ? (
                        <Badge className="bg-green-500">Published</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                      <Badge variant="outline">
                        {CATEGORIES.find(c => c.id === article.category)?.name || article.category}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">
                      {article.readTime} min read • {article.views || 0} views
                    </CardDescription>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                      title="View article"
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDialog(article)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this article?")) {
                          deleteMutation.mutate(article.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Created {format(new Date(article.createdAt), "MMM d, yyyy")}
                  {article.publishedAt && ` • Published ${format(new Date(article.publishedAt), "MMM d, yyyy")}`}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
