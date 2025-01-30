"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { CampaignIntroDialog } from "@/components/ui/Landing/CampaignIntroDiaglog";

export default function Home() {
  const imgRef = useRef();
  const [imageDimensions, setImageDimensions] = useState({ originalWidth: 0, originalHeight: 0, renderedWidth: 0, renderedHeight: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null); // Track dialog content
  const [isCooldown, setIsCooldown] = useState(false); // Track cooldown state

  const contentMap = {
    table: {
      title: "Character Creation",
      description: "Learn how to create your D&D character.",
      paragraphs: [
        "Creating a character is the first step in any D&D campaign. You'll choose a race, class, and background, and then customize your character's abilities, skills, and personality.",
        "Your character's race determines their innate abilities, while their class defines their role in the party (e.g., fighter, wizard, rogue).",
        "Work with your Dungeon Master to integrate your character into the campaign's story.",
      ],
    },
    board: {
      title: "Campaign Creation",
      description: "Learn how to create a D&D campaign.",
      paragraphs: [
        "A D&D campaign is a series of interconnected adventures that tell a larger story. As the Dungeon Master, you'll create the world, design encounters, and guide the players through the narrative.",
        "Start by outlining the main plot and key NPCs (non-player characters). Then, create smaller quests and challenges that tie into the overarching story.",
        "Remember, the players' choices will shape the campaign, so be prepared to adapt and improvise!",
      ],
    },
  };

  // Track the image's dimensions when it loads
  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    const renderedWidth = event.target.offsetWidth;
    const renderedHeight = event.target.offsetHeight;
    setImageDimensions({ originalWidth: naturalWidth, originalHeight: naturalHeight, renderedWidth, renderedHeight });
  };

  // Adjust hotspot coordinates based on the rendered image size
  const adjustCoords = (coords) => {
    const { originalWidth, originalHeight, renderedWidth, renderedHeight } = imageDimensions;
    const scaleX = renderedWidth / originalWidth;
    const scaleY = renderedHeight / originalHeight;

    return coords
      .split(',')
      .map((coord, index) => {
        const value = Number(coord);
        return index % 2 === 0 ? Math.round(value * scaleX) : Math.round(value * scaleY);
      })
      .join(',');
  };

  // Handle area hover with cooldown check
  const handleAreaHover = (areaId) => {
    if (!isCooldown) {
      setDialogContent(contentMap[areaId]); // Set content based on areaId
      setIsDialogOpen(true); // Open dialog
    }
  };

  // Handle area leave
  const handleAreaLeave = () => {
    const { current: img } = imgRef;
    if (img) {
      img.classList.remove("glassmorphism");
    }
  };

  // Handle dialog close with cooldown
  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close dialog
    setIsCooldown(true); // Start cooldown
    setTimeout(() => setIsCooldown(false), 300); // End cooldown after 300ms
  };

  // Recalculate coordinates on window resize
  useEffect(() => {
    const handleResize = () => {
      const { current: img } = imgRef;
      if (img) {
        const renderedWidth = img.offsetWidth;
        const renderedHeight = img.offsetHeight;
        setImageDimensions(prev => ({ ...prev, renderedWidth, renderedHeight }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center text-center h-screen">
      <div className="relative w-full h-screen overflow-visible">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/TavernTales-landing-bkg.png"
            alt="Tavern Tales"
            ref={imgRef}
            fill
            onLoad={handleImageLoad}
            useMap="#image-map"
            style={{ objectFit: "cover" }}
          />
        </div>

        <map name="image-map">
          <area
            id="table"
            target="_blank"
            alt="test char creation"
            title="test char creation"
            href="https://www.google.ca"
            coords={adjustCoords("824,1013,834,840,1041,761,1224,669,1436,670,1437,1021")}
            shape="poly"
            onMouseEnter={() => handleAreaHover("table")}
            onMouseLeave={handleAreaLeave}
          />
          <area
            id="board"
            target="_blank"
            alt="test campaign creation"
            title="test campaign creation"
            href="https://www.google.ca"
            coords={adjustCoords("1090,649,1090,344,1337,222,1345,686")}
            shape="poly"
            onMouseEnter={() => handleAreaHover("board")}
            onMouseLeave={handleAreaLeave}
          />
        </map>
        <CampaignIntroDialog
          open={isDialogOpen}
          onOpenChange={handleDialogClose}
          content={dialogContent}
        />
      </div>
    </main>
  );
}