from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# NPC Schema for one-shot campaign
class NPC(BaseModel):
    name: str
    role: str  
    description: str

# Encounter Schema for one-shot campaign
class Encounter(BaseModel):
    description: str
    enemy_types: List[str] 
    difficulty: str 
    rewards: Optional[List[str]]



# MAIN one-shot campaign Schema 
class MainOneShotCampaign(BaseModel):
    # World Building fields
    campaign_title: str
    setting: str
    setting_details: str
    introduction: str
    ending: str
    tone: str
    key_npcs: List[NPC]
    encounters: List[Encounter]
    rewards: List[str]


# Extended schema for story-driven fields
class StoryDrivenOneShotCampaign(MainOneShotCampaign):
    location: str
    theme: str
    party_composition: str
    objective: str
    challenges: str
    puzzles: Optional[List[str]] = None
    twists: Optional[List[str]] = None


# Extended schema for player-specific fields
class PlayerBasedOneShotCampaign(MainOneShotCampaign):
    length: str  # e.g., "3-4 hours"
    player_preferences: str  # e.g., "action, adventure, fantasy"


# Example of an extended schema allowing custom extra fields
class FlexibleOneShotCampaign(MainOneShotCampaign):
    extra: Dict[str, Any] = Field(default_factory=dict)

    class Config:
        extra = "allow"  # Allow additional fields in this schema