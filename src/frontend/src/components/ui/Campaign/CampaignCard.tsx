import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CampaignForm } from "./CampaignForm";

export function CampaignCard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    // <Card className="w-[850px] h-[650px] bg-brown-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100 border border-gray-100">
    <Card
      className="bg-[url('https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] drop-shadow-2xl
 bg-cover bg-center text-brown-900 p-8 rounded-lg shadow-xl border-2 border-yellow-700 w-[850px] mx-auto "
    >
      <CardHeader>
        <CardTitle
          className=" text-2xl
"
        >
          One-Shot Campaign
        </CardTitle>
        <CardDescription
          className=" text-white-300 text-l
"
        >
          Create your tailored one-shot adventure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CampaignForm />
      </CardContent>
    </Card>
  );
}
