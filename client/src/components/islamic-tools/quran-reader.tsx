
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}

interface QuranData {
  code: number;
  status: string;
  data: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
    ayahs: Ayah[];
  };
}

const surahs = Array.from({ length: 114 }, (_, i) => i + 1);

export function QuranReader() {
  const [selectedSurah, setSelectedSurah] = useState("1");

  const { data: quranData, isLoading, isError } = useQuery<QuranData>({
    queryKey: ['/api/quran', selectedSurah],
    retry: 2,
  });

  return (
    <Card className="border-emerald-200 dark:border-emerald-800">
      <CardHeader className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">Qur'an Reader</CardTitle>
            <CardDescription>Read the Holy Qur'an with English translation</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center gap-4">
          <Select value={selectedSurah} onValueChange={setSelectedSurah}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Surah" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {surahs.map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  Surah {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedSurah(String(Math.max(1, Number(selectedSurah) - 1)))}
              disabled={selectedSurah === "1"}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedSurah(String(Math.min(114, Number(selectedSurah) + 1)))}
              disabled={selectedSurah === "114"}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load Qur'an content. Please try again.</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : quranData?.data ? (
          <div className="space-y-4">
            <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {quranData.data.englishName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {quranData.data.englishNameTranslation} • {quranData.data.numberOfAyahs} Ayahs • {quranData.data.revelationType}
              </p>
            </div>

            <div className="space-y-4">
              {quranData.data.ayahs.map((ayah) => (
                <Card key={ayah.number} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                        {ayah.numberInSurah}
                      </div>
                      <p className="text-base leading-relaxed">{ayah.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
