import { Request, Response, NextFunction } from "express";
import { generatePrompt } from "../utils/generatePrompt";
import { DnDCharacterPrompt } from "../prompts/dndPrompts";
import { DnDClassPromptVariables } from "../models/promptTypes";

export const setupPromptMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      characterClass,
      characterRace,
      characterHair,
      CharacterEye,
      characterSkin,
      characterAge,
      characterGender,
      campaignId,
      characterId,
    } = req.body;

    console.log("Incoming Data Middleware:", req.body);

    if (
      !characterClass ||
      !characterRace ||
      !characterHair ||
      !CharacterEye ||
      !characterSkin ||
      !characterAge ||
      !characterGender ||
      !campaignId ||
      !characterId
    ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const variables: DnDClassPromptVariables = {
      characterClass,
      characterRace,
      characterHair,
      CharacterEye,
      characterSkin,
      characterAge,
      characterGender,
      campaignId,
      characterId,
    };

    const prompt = generatePrompt(DnDCharacterPrompt, variables);
    console.log("Generated Prompt Middleware:", prompt);

    req.body.generatedPrompt = prompt;

    next();
  } catch (error) {
    console.error("Error in setupPromptMiddleware:", error);
    res.status(500).json({ error: "Failed to generate prompt" });
  }
};
