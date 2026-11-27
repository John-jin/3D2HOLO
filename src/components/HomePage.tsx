import FAQ from "@/components/FAQ";
import GiftSection from "@/components/GiftSection";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import SourcesSection from "@/components/SourcesSection";
import ToolsSection from "@/components/ToolsSection";
import TrustBar from "@/components/TrustBar";

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 pb-10 pt-4 md:gap-10 md:pt-5">
        <Hero />
        <TrustBar />
        <ProductSection />
        <GiftSection />
        <SourcesSection />
        <ToolsSection />
        <FAQ />
      </div>
    </div>
  );
}
