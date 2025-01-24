import { Request, Response, NextFunction } from "express";

export const setQuestionsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Example: Gather parameters from request body or query
    const userInputs = req.body.userInputs || {};
    // Create a paramList based on user input
    const paramList = [
      `setting: ${userInputs.setting || "high fantasy"}`,
      `location: ${userInputs.location || "a forgotten temple"}`,
      `theme: ${userInputs.theme || "exploration"}`,
      `tone: ${userInputs.tone || "heroic"}`,
      `party_composition: ${userInputs.party_composition || "balanced"}`,
      `length: ${userInputs.length || "3-4 hours"}`,
      `player_preferences: ${
        userInputs.player_preferences || "balanced roleplay and combat"
      }`,
    ];

    // Attach paramList to request object
    req.body.paramList = paramList;

    console.log("Param List prepared:", paramList);
    next(); // Pass control to the next middleware
  } catch (error) {
    console.error("Error in setUpParamListMiddleware:", error);
    res.status(500).json({ error: "Failed to set up parameters." });
  }
};
