import "reflect-metadata";
import { DataSource } from "typeorm";
import { OneShotCampaign } from "./entity/OneShotCampaign";
import { NPC } from "./entity/NPC";
import { Encounter } from "./entity/Encounter";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [OneShotCampaign, NPC, Encounter],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});
