"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });

  const handleAreaFocus = (scale: number, x: number, y: number): void => {
    setZoom({ scale, x, y });
  };

  return (
    <main className="relative flex flex-col justify-center items-center text-center h-screen overflow-hidden">
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transform: `scale(${zoom.scale}) translate(${zoom.x}px, ${zoom.y}px)`,
          transformOrigin: "center center",
        }}
      >
        <Image
          src="/images/TavernTales-landing-bkg.png"
          alt="Tavern Tales"
          fill
          // style={{ objectFit: "cover" }}
        />
        <map name="image-map">
          <area
            alt="test char creation"
            title="test char creation"
            href="https://www.google.ca"
            coords="871,1020,866,993,866,962,835,922,830,882,844,851,870,836,905,823,960,814,989,814,1004,792,1029,792,1058,794,1064,806,1088,808,1097,782,1105,753,1126,733,1143,731,1161,743,1174,745,1184,721,1203,684,1227,677,1257,684,1274,710,1292,748,1302,770,1349,780,1379,772,1397,757,1406,709,1424,677,1438,669,1439,1023"
            shape="poly"
            onMouseEnter={() => handleAreaFocus(2, -500, -500)} // Adjust coordinates
            onMouseLeave={() => handleAreaFocus(1, 0, 0)}
          />
          <area
            alt="test campaign creation"
            title="test campaign creation"
            href="https://www.google.ca"
            coords="1092,633,1090,598,1090,542,1086,467,1087,393,1087,352,1124,336,1198,304,1270,275,1329,251,1331,295,1330,357,1330,495,1332,622,1332,659"
            shape="poly"
            onMouseEnter={() => handleAreaFocus(2, -400, -300)} // Adjust coordinates
            onMouseLeave={() => handleAreaFocus(1, 0, 0)}
          />
          <area
            alt="test dice"
            title="test dice"
            href="https://www.google.ca"
            coords="267,842,337,799,400,834,386,883,336,934,291,898"
            shape="poly"
            onMouseEnter={() => handleAreaFocus(2, 300, 200)} // Adjust coordinates
            onMouseLeave={() => handleAreaFocus(1, 0, 0)}
          />
        </map>
      </div>
    </main>
  );
}
