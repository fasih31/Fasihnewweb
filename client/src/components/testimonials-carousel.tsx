
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Al Mansouri",
    role: "CEO",
    company: "FinTech Solutions UAE",
    content: "Fasih delivered our Islamic BNPL platform ahead of schedule. His expertise in Shariah compliance and technical execution is unmatched.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12"
  },
  {
    name: "Sarah Johnson",
    role: "VP Product",
    company: "EdTech Innovations",
    content: "Working with Fasih transformed our learning platform. His product management skills and AI integration expertise drove 40% user growth.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=45"
  },
  {
    name: "Mohammed bin Rashid",
    role: "CTO",
    company: "Dubai Blockchain Inc",
    content: "Fasih's Web3 knowledge is exceptional. He architected our DeFi platform with security and scalability as top priorities.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=33"
  }
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardContent className="p-8 md:p-12">
          <Quote className="h-12 w-12 text-primary/20 mb-6" />
          
          <div className="mb-6">
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg md:text-xl text-foreground italic leading-relaxed mb-6">
              "{testimonials[current].content}"
            </p>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-14 h-14 rounded-full border-2 border-primary"
            />
            <div>
              <div className="font-bold text-foreground">{testimonials[current].name}</div>
              <div className="text-sm text-muted-foreground">
                {testimonials[current].role} at {testimonials[current].company}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2 mt-6">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current ? "bg-primary w-8" : "bg-muted-foreground/30"
            }`}
          />
        ))}
        <Button variant="outline" size="icon" onClick={next} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
