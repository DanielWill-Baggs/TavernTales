// components/CampaignIntroDialog.js
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CampaignIntroDialog({ open, onOpenChange, content }) {
  // Default content if `content` is null or undefined
  const defaultContent = {
    title: "Welcome to D&D!",
    description: "Learn the basics of Dungeons & Dragons.",
    paragraphs: [
      "Dungeons & Dragons (D&D) is a collaborative storytelling game where players create characters and embark on adventures in a fantasy world.",
      "The Dungeon Master (DM) guides the story, while players make decisions and roll dice to determine the outcomes of their actions.",
      "Whether you're a seasoned adventurer or new to the game, D&D offers endless opportunities for creativity and fun!",
    ],
  };

  // Use the provided content or fall back to default content
  const dialogContent = content || defaultContent;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <DialogDescription>{dialogContent.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {dialogContent.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}