
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users, Award, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: 9,
    suffix: "+",
    label: "Years Experience",
    color: "text-primary",
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    color: "text-chart-2",
  },
  {
    icon: Award,
    value: 80,
    suffix: "%",
    label: "Revenue Growth",
    color: "text-chart-1",
  },
  {
    icon: TrendingUp,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    color: "text-chart-5",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold">
      {count}{suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-card-border hover-elevate">
              <CardContent className="p-8 text-center space-y-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${stat.color}/10`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
