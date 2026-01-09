import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { DexChart } from "@/components/DexChart";
import { Footer } from "@/components/Footer";
import { BiodomeSection } from "@/components/BiodomeSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <Header />
      <main className="flex-1 relative z-10 pt-14 sm:pt-16">
        <HeroSection />
        <DexChart />
        <BiodomeSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
