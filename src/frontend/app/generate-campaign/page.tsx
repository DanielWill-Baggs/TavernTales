"use client";
import Image from "next/image";

export default function GenerateCampaign() {
  return (
    <div className="relative w-full h-full">
      <main className="flex flex-col justify-center items-center text-center h-screen">
        <div className="relative w-full h-screen">
          <Image
            src="/images/TavernTales-landing-bkg.png"
            alt="Tavern Tales"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </main>
    </div>
  );
}
