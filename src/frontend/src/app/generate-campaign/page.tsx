"use client";
import Image from "next/image";
import { CampaignCard } from "@/components/ui/Campaign/CampaignCard";
import SmokeEffect from "@/components/ui/SmokeEffect";
export default function GenerateCampaign() {
  return (
    <main className="relative flex flex-col justify-center items-center text-center h-screen border-black">
      <div className="absolute opacity-75 z-10 w-full h-full">
        <SmokeEffect />
      </div>
      <div className="relative z-10">{<CampaignCard />}</div>

      <Image
        src="/images/TavernTales-CampaignCreation-bkg.png"
        alt="Tavern Tales"
        fill
        className="object-cover z-0"
      />
    </main>
  );
}
