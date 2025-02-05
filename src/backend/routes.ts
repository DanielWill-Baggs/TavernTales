import { oneShotCampaignController } from "../backend/controller/oneShotCampaignController";
import { generateDnDImageController } from "../backend/controller/imageGeneratorController";
import { generateCharacterController } from "../backend/controller/generateCharacterController";
import { generateOneShotMiddleware } from "./middlewares/generateOneShotMiddleware";
import { setQuestionsMiddleware } from "./middlewares/setQuestionsMiddleware";
import { setupPromptMiddleware } from "./middlewares/generateImageMiddleware";
type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface Route {
  method: HttpMethod;
  route: string;
  controller: any;
  action: string;
  middleware?: any[];
}
export const Routes: Route[] = [
  {
    method: "get",
    route: "/one-shot-campaigns",
    controller: new oneShotCampaignController(),
    action: "getAllOneShotCampaigns",
  },
  {
    method: "post",
    route: "/one-shot-campaigns",
    middleware: [setQuestionsMiddleware, generateOneShotMiddleware],
    controller: new oneShotCampaignController(),
    action: "createOneShotCampaign",
  },
  {
    method: "get",
    route: "/one-shot-campaigns-dev",
    controller: new oneShotCampaignController(),
    action: "sendParamsList",
  },
  {
    method: "post",
    route: "/generate-image",
    middleware: [setupPromptMiddleware],
    controller: new generateDnDImageController(),
    action: "generateImage",
  },
  {
    method: "get",
    route: "/generate-character",
    controller: new generateCharacterController(),
    action: "getAllCharacters",
  },
  {
    method: "post",
    route: "/generate-character",
    middleware: [],
    controller: new generateCharacterController(),
    action: "createCharacter",
  },

];
