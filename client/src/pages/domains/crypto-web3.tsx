
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead, getWebPageSchema, getServiceSchema } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Bitcoin, 
  Blocks, 
  Wallet, 
  Shield, 
  TrendingUp,
  Code,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { LeadCaptureForm } from "@/components/lead-capture-form";

export default function CryptoWeb3Domain() {
  const expertise = [
    {
      icon: Blocks,
      title: "Blockchain Development",
      description: "Built decentralized applications, smart contracts, and blockchain-based solutions for various industries.",
    },
    {
      icon: Bitcoin,
      title: "DeFi Platforms",
      description: "Designed and launched decentralized finance protocols, yield farming, and liquidity pool platforms.",
    },
    {
      icon: Wallet,
      title: "Crypto Trading Platforms",
      description: "Developed cryptocurrency exchanges, trading bots, and portfolio management tools.",
    },
    {
      icon: Code,
      title: "NFT & Web3 Solutions",
      description: "Created NFT marketplaces, Web3 integrations, and token-based ecosystems.",
    },
  ];

  const achievements = [
    "Co-founded Labs360.io Web3 growth marketing agency",
    "Built DeFi platform with $1M+ TVL",
    "Launched NFT marketplace with 10K+ transactions",
    "Developed smart contracts for multiple blockchain networks",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Crypto/Web3 Product Manager | Blockchain & DeFi Expert | Fasih ur Rehman"
        description="Expert Crypto/Web3 Product Manager specializing in blockchain development, DeFi protocols, NFT marketplaces, and decentralized applications. Co-founder of Labs360.io."
        keywords="Crypto product manager, Web3 expert, blockchain development, DeFi platform, NFT marketplace, smart contracts, cryptocurrency exchange, decentralized applications"
        canonicalUrl="https://iamfasih.com/domains/crypto-web3"
        schema={[
          getWebPageSchema(
            "Crypto/Web3 Solutions by Fasih ur Rehman",
            "Expert Crypto/Web3 Product Manager specializing in blockchain and decentralized technologies"
          ),
          getServiceSchema(),
        ]}
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Blockchain & Decentralized Finance</Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Crypto/Web3 Product Manager
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Building the future of finance through blockchain technology, DeFi protocols, and 
                  decentralized applications. Co-founder of Labs360.io with proven expertise in Web3 
                  product development and tokenomics.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/solutions/crypto-web3-platform">
                    <Button size="lg" className="gap-2">
                      <Bitcoin className="h-5 w-5" />
                      Explore Web3 Solutions
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/#contact">Start Your Project</a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{achievement}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Crypto/Web3 Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive blockchain solutions from DeFi protocols to NFT marketplaces
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <Icon className="h-10 w-10 text-primary mb-2" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Enter the Web3 Revolution
              </h2>
              <p className="text-xl text-muted-foreground">
                Let's build your decentralized future together
              </p>
            </div>
            <LeadCaptureForm domain="crypto-web3" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
