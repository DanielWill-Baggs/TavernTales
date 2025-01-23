import { Request, Response } from "express";
import fetch from "node-fetch";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class generateDnDImageController {
  private async downloadImage(imageUrl: string, data: any): Promise<object> {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Error fetching image: ${response.statusText}`);
      }

      const currentDate = new Date(Date.now());
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      const isCampaign = data.imageType === "Campaign";
      const imageName = isCampaign
        ? `${data.imageType}_${data.campaign_title}_${data.campaignId}_${formattedDate}.png`
        : `${data.imageType}_${data.characterId}_${data.characterClass}_${formattedDate}.png`;

      const buffer = await response.arrayBuffer();
      const filePath = `localstorage/${imageName}`;
      const imageDetails = {
        imageType: data.imageType,
        imageName: imageName,
        campaignId: data.campaignId || null,
        characterId: data.characterId || null,
        prompt_params: data,
        image_url: filePath,
      };
      fs.writeFileSync(filePath, Buffer.from(buffer));

      console.log("Download Completed");
      return imageDetails;
    } catch (error) {
      console.error("Error downloading image:", error);
      throw new Error("Failed to download image");
    }
  }
  async uploadImage(imageDetails: any): Promise<any> {
    try {
      const imageDetailsData = imageDetails;

      console.log(
        "Stringified Image Data:",
        JSON.stringify(imageDetailsData, null, 2)
      );

      // Save the campaign to the database using Prisma
      const result = await prisma.generatedImages.create({
        data: {
          imageType: imageDetailsData.imageType,
          imageUrl: imageDetailsData.image_url,
          imageName: imageDetailsData.imageName,
          // campaignId: imageDetailsData.campaignId,
          // characterId: imageDetailsData.characterId,
          promptParams:
            imageDetailsData.imageType === "Campaign"
              ? [
                  imageDetailsData.prompt_params.campaign_title,
                  imageDetailsData.prompt_params.setting,
                  imageDetailsData.prompt_params.setting_details,
                  imageDetailsData.prompt_params.tone,
                  imageDetailsData.prompt_params.theme,
                  imageDetailsData.prompt_params.location,
                  imageDetailsData.prompt_params.party_composition,
                  imageDetailsData.prompt_params.introduction,
                  imageDetailsData.prompt_params.ending,
                  imageDetailsData.prompt_params.rewards,
                ].map((param) => param.toString())
              : [
                  imageDetailsData.prompt_params.characterClass,
                  imageDetailsData.prompt_params.characterRace,
                  imageDetailsData.prompt_params.characterHair,
                  imageDetailsData.prompt_params.CharacterEye,
                  imageDetailsData.prompt_params.characterSkin,
                  imageDetailsData.prompt_params.characterAge,
                  imageDetailsData.prompt_params.characterGender,
                ].map((param) => param.toString()),
          campaign: imageDetailsData.campaignId
            ? {
                connect: {
                  id: imageDetailsData.campaignId, // Only connect if campaignId exists
                },
              }
            : {},
          character: imageDetailsData.characterId
            ? {
                connect: {
                  id: imageDetailsData.characterId, // Only connect if characterId exists
                },
              }
            : {}, // Do not attempt to connect if there's no characterId
        },
      });

      return result;
    } catch (error) {
      console.error(
        "Failed to generate Image and save to the database:",
        error
      );
      throw new Error("Failed to generate Image and save to the database");
    }
  }

  public async generateImage(req: Request, res: Response): Promise<void> {
    try {
      const { generatedPrompt } = req.body;

      console.log("Generated Prompt controller:", generatedPrompt);

      const response = await fetch(
        `https://pollinations.ai/p/${encodeURIComponent(
          generatedPrompt
        )}?width=1024&height=1024&seed=42&model=stable-diffusion`
      );

      if (!response.ok) {
        throw new Error(`Error generating image: ${response.statusText}`);
      }

      const imageUrl = response.url;

      const isCampaign = req.body.imageType === "Campaign";
      const data = isCampaign
        ? {
            imageType: "Campaign",
            campaignId: req.body.campaignId,
            campaign_title: req.body.campaign_title,
            setting: req.body.setting,
            setting_details: req.body.setting_details,
            tone: req.body.tone,
            theme: req.body.theme,
            location: req.body.location,
            party_composition: req.body.party_composition,
            introduction: req.body.introduction,
            ending: req.body.ending,
            rewards: req.body.rewards,
          }
        : {
            imageType: "Character",
            characterClass: req.body.characterClass,
            campaignId: req.body.campaignId,
            characterId: req.body.characterId,
            characterRace: req.body.characterRace,
            characterHair: req.body.characterHair,
            CharacterEye: req.body.CharacterEye,
            characterSkin: req.body.characterSkin,
            characterAge: req.body.characterAge,
            characterGender: req.body.characterGender,
          };

      const imageDetails: any = await this.downloadImage(imageUrl, data);
      await this.uploadImage(imageDetails);

      console.log("Final Check:", imageDetails);

      res.status(200).json({
        message: "Image generated successfully and saved to the database.",
        prompt: imageDetails.prompt_params,
        filePath: imageDetails.image_url,
      });
    } catch (error) {
      console.error("Error in generateDnDImage controller:", error);
      res.status(500).json({ error: "Failed to generate image" });
    }
  }
}
