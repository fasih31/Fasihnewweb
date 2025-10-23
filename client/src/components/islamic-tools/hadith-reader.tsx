
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookMarked, RefreshCw, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HadithData {
  data?: {
    hadith_english?: string;
    refno?: string;
  };
  hadith?: string;
  bookName?: string;
}

export function HadithReader() {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: hadithData, isLoading, isError } = useQuery<HadithData>({
    queryKey: ['/api/hadith/bukhari', refreshKey],
    retry: 2,
  });

  const hadithText = hadithData?.data?.hadith_english || hadithData?.hadith;
  const hadithRef = hadithData?.data?.refno || hadithData?.bookName || 'Sahih Bukhari';

  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <BookMarked className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">Hadith Collection</CardTitle>
            <CardDescription>Authentic sayings of Prophet Muhammad ﷺ</CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setRefreshKey(prev => prev + 1)}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load Hadith. Please try again.</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : hadithText ? (
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6 space-y-4">
              <p className="text-lg leading-relaxed italic">"{hadithText}"</p>
              <div className="flex justify-end">
                <Badge variant="secondary" className="text-xs">
                  {hadithRef}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            📖 <strong>Source:</strong> Sahih Bukhari - One of the most authentic collections of Hadith
            <br />✨ Click refresh to read another Hadith
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
