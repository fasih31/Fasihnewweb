
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DailyContent {
  ayah: {
    text: string;
    surah: string;
    number: number;
    reference: string;
  };
  hadith: {
    text: string;
    reference: string;
  };
}

export function DailyIslamic() {
  const { data, isLoading, isError } = useQuery<DailyContent>({
    queryKey: ['/api/islamic/daily'],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 2,
  });

  return (
    <Card className="border-purple-200 dark:border-purple-800">
      <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Daily Wisdom</CardTitle>
            <CardDescription>Ayah & Hadith of the Day</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load daily content. Please try again.</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : data ? (
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-6 space-y-3">
                <Badge variant="secondary" className="mb-2">Ayah of the Day</Badge>
                <p className="text-base leading-relaxed italic">"{data.ayah.text}"</p>
                <p className="text-sm text-muted-foreground text-right">
                  — {data.ayah.reference}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
              <CardContent className="p-6 space-y-3">
                <Badge variant="secondary" className="mb-2">Hadith of the Day</Badge>
                <p className="text-base leading-relaxed italic">"{data.hadith.text}"</p>
                <p className="text-sm text-muted-foreground text-right">
                  — {data.hadith.reference}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
