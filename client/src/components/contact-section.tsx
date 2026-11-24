import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Send, MessageCircle, Send as TelegramIcon, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [notice,setNotice]=useState("");
  const [mode,setMode]=useState<"checking"|"direct"|"compose"|"legacy">("checking");
  useEffect(()=>{
    const controller=new AbortController();
    fetch("/contact/delivery",{signal:controller.signal}).then(async response=>{
      if(!response.ok || !response.headers.get("content-type")?.includes("application/json")) return "legacy";
      const data=await response.json();
      return data.mode==="direct" ? "direct" : "compose";
    }).then(value=>{if(!controller.signal.aborted)setMode(value as "direct"|"compose"|"legacy")})
      .catch(()=>{if(!controller.signal.aborted)setMode("compose")});
    return ()=>controller.abort();
  },[]);
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const fields=form.watch();
  const compose=new URLSearchParams({view:"cm",fs:"1",to:"fasih31@gmail.com",su:"Portfolio enquiry"+(fields.name?" from "+fields.name:""),body:[fields.message,fields.name,fields.email].filter(Boolean).join("\n\n")});
  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await fetch(mode==="direct"?"/contact/delivery":"/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      const notice=data.delivered===true?"Your message was sent to Fasih’s inbox.":"Your message was saved in the portfolio inbox.";
      setNotice(notice);
      toast({
        title: "Message received",
        description: notice,
      });
      if(data.delivered===true)form.reset();
    },
    onError: (error: any) => {
      setNotice("Delivery could not be confirmed. Your details are still here. Continue in Gmail to send them.");
      setMode("compose");
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    setNotice("");
    if(mode==="compose"){
      window.location.assign("https://mail.google.com/mail/?"+compose.toString());
      return;
    }
    contactMutation.mutate(data);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-muted/30"
      data-testid="section-contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Contact me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If you’d like to discuss a role, a paper or a question about my work, send me a message.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="border-card-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-2/5"></div>
            <CardContent className="p-8 relative">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            data-testid="input-name"
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            data-testid="input-email"
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            rows={6}
                            {...field}
                            data-testid="input-message"
                            className="resize-none bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={contactMutation.isPending || mode==="checking"}
                    data-testid="button-send-message"
                  >
                    {contactMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {mode==="compose"?"Continue in Gmail":"Send Message"}
                      </>
                    )}
                  </Button>
                  {mode==="compose" && <p className="text-sm">Gmail opens a draft addressed to Fasih. Review it and press Send in Gmail.</p>}
                  {mode!=="compose" && <a className="block text-center underline" href={"https://mail.google.com/mail/?"+compose.toString()} target="_blank" rel="noreferrer">Send these details using Gmail ↗</a>}
                </form>
              </Form>
            </CardContent>
          </Card>

          <aside><h3 className="text-2xl mb-3">Email me directly</h3><a className="underline" href="mailto:fasih31@gmail.com">fasih31@gmail.com</a><p role="status" className="my-4">{notice}</p><h3 className="text-2xl mb-3">Find me on LinkedIn</h3><a className="underline" href="https://www.linkedin.com/in/fasihurrehman05">Fasih ur Rehman ↗</a></aside>
        </div>
      </div>
    </section>
  );
}
