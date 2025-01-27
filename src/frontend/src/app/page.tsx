"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { make3dTransformValue } from "react-quick-pinch-zoom";

export default function Home() {
  const imgRef = useRef();
  const [scale, setScale] = useState(1);

  const handleAreaHover = (coords) => {
    const { current: img } = imgRef;
    if (img) {
      const [x, y] = coords.split(',').map(Number);
      const zoomScale = 1.1; // Adjust the scale factor as needed
      const value = make3dTransformValue({ x: -x * (zoomScale - 1), y: -y * (zoomScale - 1), scale: zoomScale });
      img.style.setProperty("transform", value);
      img.classList.add("glassmorphism"); // Add glassmorphism effect
    }
  };

  const handleAreaLeave = () => {
    const { current: img } = imgRef;
    if (img) {
      const value = make3dTransformValue({ x: 0, y: 0, scale: 1 });
      img.style.setProperty("transform", value);
      img.classList.remove("glassmorphism"); // Remove glassmorphism effect
    }
  };

  // Function to adjust hotspot coordinates based on the current scale
  const adjustCoords = (coords, scale) => {
    return coords
      .split(',')
      .map((coord) => Math.round(Number(coord) * scale))
      .join(',');
  };

  return (
      <main className="flex flex-col justify-center items-center text-center h-screen">
        <div className="relative w-full h-screen overflow-visible">
          <div className="absolute inset-0 w-full h-full">
            {/* <img
              src="/images/TavernTales-landing-bkg.png"
              alt="Tavern Tales"
              ref={imgRef}
              useMap="#image-map"
              /> */}
            <Image
              src="/images/TavernTales-landing-bkg.png"
              alt="Tavern Tales"
              ref={imgRef}
              fill
              style={{
                objectFit: "cover",
                minWidth: "120%",
                minHeight: "120%",
                top: "-10%",
                left: "-10%",
                transformOrigin: "center",
              }}
              useMap="#image-map"
            />
          </div>

          <map name="image-map">
            <area
              id="table"
              target="_blank"
              alt="test char creation"
              title="test char creation"
              href="https://www.google.ca"
              coords={adjustCoords("871,1020,866,993,866,962,835,922,830,882,844,851,870,836,905,823,960,814,989,814,1004,792,1029,792,1058,794,1064,806,1088,808,1097,782,1105,753,1126,733,1143,731,1161,743,1174,745,1184,721,1203,684,1227,677,1257,684,1274,710,1292,748,1302,770,1349,780,1379,772,1397,757,1406,709,1424,677,1438,669,1439,1023", scale)}
              shape="poly"
              onMouseEnter={() => handleAreaHover("871,1020")}
              onMouseLeave={handleAreaLeave}
            />
            <area
              id="board"
              target="_blank"
              alt="test campaign creation"
              title="test campaign creation"
              href="https://www.google.ca"
              coords={adjustCoords("1090,649,1090,344,1337,222,1345,686", scale)}
              shape="poly"
              onMouseEnter={() => handleAreaHover("1090,649")}
              onMouseLeave={handleAreaLeave}
            />
    
            {/* <area
              id="dice"
              target="_blank"
              alt="test dice"
              title="test dice"
              href="https://www.google.ca"
              coords={adjustCoords("267,842,337,799,400,834,386,883,336,934,291,898", scale)}
              shape="poly"
              onMouseEnter={() => handleAreaHover("267,842")}
              onMouseLeave={handleAreaLeave}
            /> */}
          </map>
        </div>
      </main>
  );
}