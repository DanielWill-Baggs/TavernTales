"use client";
import Image from "next/image";
import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

export default function Home() {
  const imgRef = useRef();
  const zoomRef = useRef();

  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;
    // check if image exists
    if (img) {
      const value = make3dTransformValue({ x, y, scale });
      img.style.setProperty("transform", value);
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <main className="flex flex-col justify-center items-center text-center h-screen">
        <div className="relative w-full h-screen">
          <QuickPinchZoom
            onUpdate={onUpdate}
            tapZoomFactor={2}
            zoomOutFactor={4}
            inertiaFriction={0}
            maxZoom={1.5}
            minZoom={1}
          >
            <img
              src="/images/TavernTales-landing-bkg.png"
              alt="Tavern Tales"
              // style={{ width: "100%", height: "auto"}}
              ref={imgRef}
              useMap="#image-map"
            />
          </QuickPinchZoom>

          <map name="image-map">
            <area
              target="_blank"
              alt="test char creation"
              title="test char creation"
              href="https://www.google.ca"
              coords="871,1020,866,993,866,962,835,922,830,882,844,851,870,836,905,823,960,814,989,814,1004,792,1029,792,1058,794,1064,806,1088,808,1097,782,1105,753,1126,733,1143,731,1161,743,1174,745,1184,721,1203,684,1227,677,1257,684,1274,710,1292,748,1302,770,1349,780,1379,772,1397,757,1406,709,1424,677,1438,669,1439,1023"
              shape="poly"
            />
            <area
              target="_blank"
              alt="test campaign creation"
              title="test campaign creation"
              href="https://www.google.ca"
              coords="1092,633,1090,598,1090,542,1086,467,1087,393,1087,352,1124,336,1198,304,1270,275,1329,251,1331,295,1330,357,1330,495,1332,622,1332,659"
              shape="poly"
            />
            <area
              target="_blank"
              alt="test dice"
              title="test dice"
              href="https://www.google.ca"
              coords="267,842,337,799,400,834,386,883,336,934,291,898"
              shape="poly"
            />
          </map>
        </div>
      </main>
    </div>
  );
}
