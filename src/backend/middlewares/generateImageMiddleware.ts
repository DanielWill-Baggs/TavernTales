import { Request, Response, NextFunction } from "express";
import { generatePrompt } from "../utils/generatePrompt";
import {
  DnDCharacterPrompt,
  DnDCampaignPrompt,
  DnDCampaignPromptSimple,
} from "../prompts/dndPrompts";

export const setupPromptMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Incoming Data Middleware:", req.body);

    const isCampaign = req.body.imageType === "Campaign";
    const requiredFields = isCampaign
      ? [
          "campaignId",
          "campaign_title",
          "setting",
          "setting_details",
          "tone",
          "theme",
          "location",
          "party_composition",
          "introduction",
          "ending",
          "rewards",
        ]
      : [
          "characterClass",
          "characterRace",
          "characterHair",
          "CharacterEye",
          "characterSkin",
          "characterAge",
          "characterGender",
          "campaignId",
          "characterId",
        ];

    // Check if all required fields are present
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required parameters: ${missingFields.join(", ")}`,
      });
    }

    // Assign variables based on image type
    const variables = isCampaign
      ? {
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
          characterClass: req.body.characterClass,
          characterRace: req.body.characterRace,
          characterHair: req.body.characterHair,
          CharacterEye: req.body.CharacterEye,
          characterSkin: req.body.characterSkin,
          characterAge: req.body.characterAge,
          characterGender: req.body.characterGender,
          campaignId: req.body.campaignId,
          characterId: req.body.characterId,
        };

    const sanitizedVariables = Object.entries(variables).reduce(
      (acc, [key, value]) => {
        acc[key] = value !== undefined ? String(value) : "";
        return acc;
      },
      {} as Record<string, string>
    );

    // Generate the prompt based on the type
    const prompt = generatePrompt(
      isCampaign ? DnDCampaignPromptSimple : DnDCharacterPrompt,
      sanitizedVariables
    );

    console.log("Generated Prompt Middleware:", prompt);

    // Attach the generated prompt to the request body
    req.body.generatedPrompt = prompt;

    next();
  } catch (error) {
    console.error("Error in setupPromptMiddleware:", error);
    res.status(500).json({ error: "Failed to generate prompt" });
  }
};
