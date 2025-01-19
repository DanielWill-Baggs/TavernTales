import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { NPC } from "./NPC";
import { Encounter } from "./Encounter";

@Entity()
export class OneShotCampaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  campaignTitle: string;

  @Column()
  setting: string;

  @Column({ type: "text" })
  settingDetails: string;

  @Column({ type: "text" })
  introduction: string;

  @Column({ type: "text" })
  ending: string;

  @Column()
  tone: string;

  @OneToMany(() => NPC, (npc) => npc.campaign, { cascade: true })
  keyNPCs: NPC[];

  @OneToMany(() => Encounter, (encounter) => encounter.campaign, {
    cascade: true,
  })
  encounters: Encounter[];
}
