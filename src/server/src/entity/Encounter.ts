import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OneShotCampaign } from "./OneShotCampaign";

@Entity()
export class Encounter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  description: string;

  @Column()
  difficulty: string;

  @ManyToOne(() => OneShotCampaign, (campaign) => campaign.encounters)
  campaign: OneShotCampaign;
}
