import { Request, Response } from "express";
import fetch from "node-fetch";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class generateDnDImageController {
  private async downloadImage(
    imageUrl: string,
    charData: any
  ): Promise<object> {
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

      const imageName = `${charData.characterClass}_${charData.characterId}_${charData.campaignId}_${formattedDate}.png`;
      const buffer = await response.arrayBuffer();
      const filePath = `localstorage/${imageName}`;
      const imageDetails = {
        imageType: "Character",
        imageName: imageName,
        campaignId: charData.campaignId,
        characterId: charData.characterId,
        prompt_params: charData,
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
          campaignId: imageDetailsData.campaignId,
          characterId: imageDetailsData.characterId,
          promptParams: [
            imageDetailsData.prompt_params.characterClass,
            imageDetailsData.prompt_params.characterRace,
            imageDetailsData.prompt_params.characterHair,
            imageDetailsData.prompt_params.CharacterEye,
            imageDetailsData.prompt_params.characterSkin,
            imageDetailsData.prompt_params.characterAge,
            imageDetailsData.prompt_params.characterGender,
          ].map((param) => param.toString()),
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
      const charData = {
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

      const imageDetails: any = await this.downloadImage(imageUrl, charData);
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
