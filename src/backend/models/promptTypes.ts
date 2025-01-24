export interface DnDClassPromptVariables {
  characterClass: string;
  characterRace: string;
  characterHair: string;
  CharacterEye: string;
  characterSkin: string;
  characterAge: string;
  characterGender: string;
  [key: string]: string;
}

export interface DnDCampaignPromptVariables {
  campaign_title: string;
  setting: string;
  setting_details: string;
  tone: string;
  theme: string;
  location: string;
  party_composition: string;
  introduction: string;
  ending: string;
  rewards: string;
  [key: string]: string;
}
