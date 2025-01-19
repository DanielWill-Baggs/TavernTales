import { oneShotCampaignController } from "./controller/oneShotCampaignController";

export const Routes = [
  {
    method: "get",
    route: "/one-shot-campaigns",
    controller: new oneShotCampaignController(), // instantiate controller
    action: "getAllOneShotCampaigns",
  },
  {
    method: "post",
    route: "/one-shot-campaigns",
    controller: new oneShotCampaignController(),
    action: "createOneShotCampaign",
  },
];
