"use client";
import Image from "next/image";
import CampaignCreation from "../../public/images/TavernTales-CampaignCreation-bkg.png";
import { CampaignForm } from "@/components/ui/Campaign/CampaignForm";
import { CampaignCard } from "@/components/ui/Campaign/CampaignCard";
import { Button } from "@/components/ui/button";

export default function GenerateCampaign() {
  return (
    <main className="flex flex-col justify-center items-center text-center h-screen border-black">
      {/* <div className="relative w-full h-full"> */}
      <div className="relative w-full h-full z-10">
        <CampaignForm />
      </div>
      <div className="relative w-full h-full z-10">
        <CampaignCard />
      </div>
      <Button className="bg-primary text-primary-foreground">Click Me</Button>;
      {/* <Image
        src={CampaignCreation}
        alt="Tavern Tales"
        fill
        className="object-cover z-0"
      /> */}
      {/* </div> */}
    </main>
  );
}
