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
    <Card
      className="bg-[url('https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] shadow-[0px_0px_40px_3px_rgba(255,227,46,1)]
 bg-cover bg-center text-brown-900 p-8 rounded-lg border-2 border-yellow-700 w-[850px] mx-auto "
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
