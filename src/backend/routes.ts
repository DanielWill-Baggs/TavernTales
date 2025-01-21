import { oneShotCampaignController } from "../backend/controller/oneShotCampaignController";
import { generateOneShotMiddleware } from "./middlewares/generateOneShotMiddleware";
import { setQuestionsMiddleware } from "./middlewares/setQuestionsMiddleware";
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
];
