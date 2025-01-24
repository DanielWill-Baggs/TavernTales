"use client";
import Image from "next/image";
import CampaignCreation from "../../public/images/TavernTales-CampaignCreation-bkg.png";

export default function GenerateCampaign() {
  return (
    <div className="relative w-full h-full">
      <Image
        src={CampaignCreation}
        alt="Tavern Tales"
        fill
        className="object-cover"
      />
      <main className="flex flex-col justify-center items-center text-center h-screen"></main>
    </div>
  );
}
