import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { OneShotCampaign } from "./OneShotCampaign";

@Entity()
export class NPC {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => OneShotCampaign, (campaign) => campaign.keyNPCs)
  campaign: OneShotCampaign;
}
