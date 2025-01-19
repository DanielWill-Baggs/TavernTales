import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { OneShotCampaign } from "./entity/OneShotCampaign";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    Routes.forEach((route) => {
      const controller = route.controller;
      app[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = controller[route.action](req, res, next);

          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...
    app.get("/", (req: Request, res: Response) => {
      res.send("Server is running!");
    });
    // Start the Express server
    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(
        `Express server has started on port ${PORT}. Open http://localhost:${PORT} to access the app.`
      );
    });
  })
  .catch((error) => {
    console.error("Error during database initialization:", error);
  });
