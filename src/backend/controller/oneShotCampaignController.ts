import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { runPythonScriptMiddleware } from "../../backend/middlewares/runPythonScript";

const prisma = new PrismaClient();

export class oneShotCampaignController {
  // Method to get all one-shot campaigns
  async getAllOneShotCampaigns(req: Request, res: Response) {
    try {
      const campaigns = await prisma.oneShotCampaign.findMany({
        include: {
          key_npcs: true,
          encounters: true,
        },
      });
      res.status(200).json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  }

  async createOneShotCampaign(req: Request, res: Response) {
    // Call the middleware
    await runPythonScriptMiddleware(req, res, async () => {
      try {
        // Extract generated campaign data
        const campaignData = req.body.generatedCampaign;
        console.log(
          "Stringified campaignData:",
          JSON.stringify(campaignData, null, 2)
        );

        // Save the campaign to the database using Prisma
        const result = await prisma.oneShotCampaign.create({
          data: {
            campaign_title: campaignData.campaign_title,
            setting: campaignData.setting,
            setting_details: campaignData.setting_details,
            introduction: campaignData.introduction,
            ending: campaignData.ending,
            tone: campaignData.tone,
            key_npcs: {
              create: campaignData.key_npcs.map((npc: any) => ({
                name: npc.name,
                role: npc.role,
                description: npc.description,
              })),
            },
            encounters: {
              create: campaignData.encounters.map((encounter: any) => ({
                description: encounter.description,
                enemy_types: encounter.enemy_types,
                difficulty: encounter.difficulty,
                rewards: encounter.rewards,
              })),
            },
            rewards: campaignData.rewards,
          },
        });

        res.status(201).json(result);
      } catch (error) {
        console.error("Failed to create campaign:", error);
        res.status(500).json({ error: "Failed to create campaign." });
      }
    });
  }
}
