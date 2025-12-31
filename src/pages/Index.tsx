import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { DexChart } from "@/components/DexChart";
import { Footer } from "@/components/Footer";
import { GrowingSeeds } from "@/components/GrowingSeeds";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <GrowingSeeds />
      <Header />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <DexChart />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
