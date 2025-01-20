import { Request, Response, NextFunction } from "express";
import { spawn } from "child_process";
import * as path from "path";

export const runPythonScriptMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pythonPath = path.resolve(process.env.PYTHON_PATH_VENV || "");
  const scriptPath = path.resolve(process.env.PYTHON_PATH_ONESHOT || "");

  console.log("Python executable path:", pythonPath);
  console.log("Python script path:", scriptPath);

  if (!pythonPath || !scriptPath) {
    return res.status(500).json({
      error: "Python path or script path is not properly configured.",
    });
  }

  try {
    // Spawn the Python process
    const pythonProcess = spawn(pythonPath, [scriptPath]);
    let campaignData = "";

    pythonProcess.stdout.on("data", (data) => {
      campaignData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).send(`Python script exited with code ${code}`);
      }

      try {
        // Attach the parsed campaign data to the request object
        req.body.generatedCampaign = JSON.parse(campaignData);
        next(); // Call the next middleware or controller
      } catch (error) {
        console.error("Error parsing Python script output:", error);
        res
          .status(500)
          .json({ error: "Failed to parse Python script output." });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Failed to execute Python script." });
  }
};
