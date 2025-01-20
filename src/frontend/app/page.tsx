import Image from "next/image";
import { ChevronRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="relative w-full h-full">
      <main className="flex flex-col justify-center items-center text-center h-screen">
        <div className="relative w-full h-screen">
          <Image
            src="/images/TavernTales-landing-bkg.png"
            alt="Tavern Tales"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom 40%"
          />
          <div id="welcome" className="bg-brown-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100">
            <div className="wrapper">
              <div className="header">
                <h1>WELCOME</h1>
                <p>
                  Embark on a journey of storytelling and adventure in Tavern Tales
                </p>
              </div>
              <Separator className="separator" />
              <div className="links">
                <div className="button">
                  <Button variant="link">
                    Sign up <ChevronRight className="chevron" />
                  </Button>
                </div>
                <Separator orientation="vertical" />
                <div className="button">
                  <Button variant="link">
                    Log in <ChevronRight className="chevron" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
}
