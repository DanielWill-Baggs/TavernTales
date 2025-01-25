import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Routes } from "./routes";
import cors from "cors";

const prisma = new PrismaClient();

const main = async () => {
  try {
    const app = express.default();
    app.use(cors());
    app.use(bodyParser.json());

    // Iterating through defined routes
    Routes.forEach((route) => {
      const controller = route.controller;
      const middlewares = route.middleware || [];

      app[route.method](
        route.route,
        ...middlewares,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await controller[route.action](req, res, next);
            if (result !== null && result !== undefined) {
              res.json(result);
            }
          } catch (error) {
            next(error);
          }
        }
      );
    });

    app.get("/", (req: Request, res: Response) => {
      res.send("Server is running with Prisma!");
    });

    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(
        `Express server has started on port ${PORT}. Open http://localhost:${PORT} to access the app.`
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    await prisma.$disconnect();
  }
};

// Start the application
main().catch((error) => {
  console.error("Fatal error in main function:", error);
});
