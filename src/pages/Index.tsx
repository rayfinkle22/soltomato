import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { DexChart } from "@/components/DexChart";
import { Footer } from "@/components/Footer";
import { GrowingSeeds } from "@/components/GrowingSeeds";
import { BiodomeSection } from "@/components/BiodomeSection";
import { UpdatesSection } from "@/components/UpdatesSection";
import { ShoutOutsSection } from "@/components/ShoutOutsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <GrowingSeeds />
      <Header />
      <main className="flex-1 relative z-10 pt-14 sm:pt-16">
        <HeroSection />
        <DexChart />
        <ShoutOutsSection />
        <UpdatesSection />
        <BiodomeSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
