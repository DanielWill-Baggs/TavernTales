-- CreateTable
CREATE TABLE "OneShotCampaign" (
    "id" SERIAL NOT NULL,
    "campaign_title" TEXT NOT NULL,
    "setting" TEXT NOT NULL,
    "setting_details" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "ending" TEXT NOT NULL,
    "tone" TEXT NOT NULL,
    "rewards" TEXT[],

    CONSTRAINT "OneShotCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NPC" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "NPC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encounter" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "enemy_types" TEXT[],
    "difficulty" TEXT NOT NULL,
    "rewards" TEXT[],
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "Encounter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NPC" ADD CONSTRAINT "NPC_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "OneShotCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "OneShotCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
