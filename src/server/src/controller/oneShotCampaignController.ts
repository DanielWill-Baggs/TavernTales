import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { OneShotCampaign } from "../entity/OneShotCampaign";

export class oneShotCampaignController {
  // Method to get all one-shot campaigns
  async getAllOneShotCampaigns(req: Request, res: Response) {
    try {
      const campaigns = await AppDataSource.getRepository(OneShotCampaign).find(
        {
          relations: ["keyNPCs", "encounters"],
        }
      );
      res.status(200).json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  }

  // Method to create a new one-shot campaign
  async createOneShotCampaign(req: Request, res: Response) {
    try {
      const campaign = AppDataSource.getRepository(OneShotCampaign).create(
        req.body
      );
      const result = await AppDataSource.getRepository(OneShotCampaign).save(
        campaign
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create campaign" });
    }
  }
}
