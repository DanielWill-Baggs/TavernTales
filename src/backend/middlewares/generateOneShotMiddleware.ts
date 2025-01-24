import { Request, Response, NextFunction } from "express";
import { spawn } from "child_process";
import * as path from "path";

export const generateOneShotMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pythonPath = path.resolve(process.env.PYTHON_PATH_VENV || "");
  const scriptPath = path.resolve(process.env.PYTHON_PATH_ONESHOT || "");
  const paramList = req.body.paramList || [];
  console.log("Passing paramList to Python script:", paramList);

  console.log("Python executable path:", pythonPath);
  console.log("Python script path:", scriptPath);

  if (!pythonPath || !scriptPath) {
    return res.status(500).json({
      error: "Python path or script path is not properly configured.",
    });
  }

  if (!paramList || !Array.isArray(paramList)) {
    return res.status(400).json({ error: "Param list is missing or invalid." });
  }

  try {
    // Spawn the Python process
    const pythonProcess = spawn(pythonPath, [
      scriptPath,
      JSON.stringify(paramList),
    ]);
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

export const runPythonScriptMiddlewareParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pythonPath = path.resolve(process.env.PYTHON_PATH_VENV || "");
  const scriptPath = path.resolve(process.env.PYTHON_PATH_PARAM || "");

  console.log("Python executable path:", pythonPath);
  console.log("Python script path:", scriptPath);

  if (!pythonPath || !scriptPath) {
    return res.status(500).json({
      error: "Python path or script path is not properly configured.",
    });
  }

  try {
    // Example of extracting parameters from the request
    const param1 = req.body.param1 || "defaultValue1"; // You can change where to get the parameters from
    const param2 = req.body.param2 || "defaultValue2"; // You can add more parameters as needed
    const param3 =
      req.body.param3 || "I visited the world to share it with you.";

    console.log("Sending parameters to Python:", param1, param2, param3);

    // Spawn the Python process and pass parameters as arguments
    const pythonProcess = spawn(pythonPath, [
      scriptPath,
      param1,
      param2,
      param3,
    ]);

    let scriptOutput = "";

    // Capture Python output
    pythonProcess.stdout.on("data", (data) => {
      scriptOutput += data.toString();
    });

    // Handle Python errors
    pythonProcess.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    // Handle Python process exit
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).send(`Python script exited with code ${code}`);
      }

      // Do something with the output (e.g., attach it to the request object)
      try {
        // If the output is in JSON format, you can parse it
        req.body.pythonOutput = JSON.parse(scriptOutput);
        next(); // Proceed to the next middleware or controller
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
