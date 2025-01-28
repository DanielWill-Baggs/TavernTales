import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class generateCharacterController {
  // Method to get all one-shot campaigns
  async getCharacterCampaigns(req: Request, res: Response) {
    try {
      const characters = await prisma.dnDCharacter.findMany();
      res.status(200).json(characters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Characters" });
    }
  }
  async createNewCharacter(req: Request, res: Response) {
    try {
      // Extract generated campaign data
      const characterData = req.body.generatedCharacter;

      console.log(
        "Stringified campaignData:",
        JSON.stringify(characterData, null, 2)
      );

      // Save the campaign to the database using Prisma
      const result = await prisma.dnDCharacter.create({
        data: {
          name: characterData.name,
          characterClass: characterData.characterClass,
          characterRace: characterData.characterRace,
          characterGender: characterData.characterGender,
          characterAge: characterData.characterAge,
          characterHair: characterData.characterHair,
          characterEye: characterData.characterEye,
          characterSkin: characterData.characterSkin,
          alignment: characterData.alignment,
          background: characterData.background,
          strength: characterData.strength,
          dexterity: characterData.dexterity,
          constitution: characterData.constitution,
          intelligence: characterData.intelligence,
          wisdom: characterData.wisdom,
          charisma: characterData.charisma,
          hitPoints: characterData.hitPoints,
          armorClass: characterData.armorClass,
          speed: characterData.speed,
          level: characterData.level,
          experience: characterData.experience,
          inventory: characterData.inventory || [],
          spells: characterData.spells || [],
          equipment: characterData.equipment || [],
          campaignId: characterData.campaignId,
        },
      });

      res.status(201).json(result);
    } catch (error) {
      console.error("Failed to create campaign:", error);
      res.status(500).json({ error: "Failed to create campaign." });
    }
  }
}
