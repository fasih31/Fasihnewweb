
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  children: ReactNode;
  borderColor?: string;
}

export function CalculatorCard({
  title,
  description,
  icon: Icon,
  gradientFrom,
  gradientTo,
  children,
  borderColor = "border-primary/20"
}: CalculatorCardProps) {
  return (
    <Card className={`${borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <CardHeader className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-t-xl`}>
        <div className="flex items-center gap-3 flex-wrap">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-md flex-shrink-0`}>
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl md:text-2xl leading-tight">{title}</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
        {children}
      </CardContent>
    </Card>
  );
}
