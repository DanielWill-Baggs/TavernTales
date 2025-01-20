import { oneShotCampaignController } from "../backend/controller/oneShotCampaignController";
import { runPythonScriptMiddleware } from "./middlewares/runPythonScript";
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
    middleware: [runPythonScriptMiddleware],
    controller: new oneShotCampaignController(),
    action: "createOneShotCampaign",
  },
];
