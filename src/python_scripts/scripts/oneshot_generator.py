from config.config import groq_api_key
from groq import Groq
from models.oneshotcampaign import MainOneShotCampaign
import json, sys

# import sys
# print(sys.path)

# client = Groq(
#     api_key=groq_api_key,
# )

groq=Groq()

#PROMPT QUESTIONS
#    - Location: {questions["Location"]}
#     - Theme: {questions["Theme"]}
#     - Tone: {questions["Tone"]}
#     - Party Composition: {questions["Party Composition"]}
#     - Objective: {questions["Objective"]}
#     - Challenges: {questions["Challenges"]}
#     - Key NPCs: {questions["NPCs"]}
#     - Campaign Length: {questions["Length"]}
#     - Player Preferences: {questions["Player Preferences"]}
    # Ensure the campaign has:
    # - A compelling introduction.
    # - Memorable NPCs with motivations and backstories.
    # - Engaging challenges (both combat and non-combat) tailored to the theme.
    # - A logical progression of events leading to a satisfying conclusion.



# Function to generate a one-shot campaign using Groq
def generate_one_shot_campaign(settings: dict) -> MainOneShotCampaign:
    # Questions used to build the prompt
    questions = {
        "Setting": settings.get("world_type", "high fantasy"),
        # "Location": settings.get("location", "a forgotten temple"),
        # "Theme": settings.get("theme", "exploration"),
        "Tone": settings.get("tone", "heroic"),
        # "Party Composition": settings.get("party", "balanced"),
        # "Objective": settings.get("objective", "retrieve an ancient artifact"),
        # "Challenges": settings.get("challenges", "traps, puzzles, and goblins"),
        # "NPCs": settings.get("npcs", "a wise sage and a cunning villain"),
        # "Length": settings.get("length", "3-4 hours"),
        # "Player Preferences": settings.get("preferences", "balanced roleplay and combat"),
    }

    # Build the prompt dynamically
    prompt = f"""
    You are an expert Dungeons & Dragons campaign designer. Generate a detailed one-shot campaign based on the following details:
    - Campaign Title: "Compose a compelling title for the campaign."
    - Setting: {questions["Setting"]} 
    - Setting Details: "The campaign takes place in a {questions["Setting"]} world. Describe the world and its unique elements."
    - Introduction: "Describe the campaign's compelling introduction, and the main plot."
    - Ending: "Describe the campaign's ending, including the resolution of the main plot and the consequences for the characters."
    - Tone: "The tone of the campaign is {questions["Tone"]} and should be appropriate for a Dungeons & Dragons campaign. Describe the mood and atmosphere of the campaign."
    - Key NPCs: "Describe the important NPCs in the campaign, including their roles, motivations, and backstories."
    - Encounters: "Describe the combat encounters and non-combat challenges in the campaign."
    - Rewards: "Describe the rewards for the players, such as gold, magic items, or experience points."



    Return the campaign as a JSON object adhering to the schema: 
    {json.dumps(MainOneShotCampaign.model_json_schema(), indent=2)}.
    """

    # Call Groq's chat completion API
    chat_completion = groq.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are an expert Dungeons & Dragons campaign designer.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        model="llama3-70b-8192",
        temperature=0.7,
        response_format={"type": "json_object"},  # Ensure response is JSON formatted
    )

    # Validate and return the campaign as a Pydantic model
    return MainOneShotCampaign.model_validate_json(chat_completion.choices[0].message.content)

def set_user_settings(user_settings: dict = None, **kwargs) -> dict:
    # Default settings
    default_settings = {
        "setting": "high fantasy",
        "location": "a bustling airship port",
        "theme": "exploration and mystery",
        "tone": "wholesome",
        "party": "magic-heavy",
        "objective": "investigate a missing airship",
        "challenges": "mechanical traps, rogue automatons, and rival treasure hunters",
        "npcs": "an eccentric inventor and a suspicious noble",
        "length": "4-5 hours",
        "preferences": "more puzzles and exploration, less combat",
    }

    # Update the settings with the passed-in user values (if any)
    if user_settings:
        default_settings.update(user_settings)

    # Override or add new settings with kwargs
    default_settings.update(kwargs)
    
    return default_settings


if __name__ == "__main__":
    # Set the user settings as the default
    updated_settings = set_user_settings(world_type="cyberpunk", tone="dark")
    user_settings = set_user_settings()
    # Generate the one-shot campaign
    campaign = generate_one_shot_campaign(updated_settings)
    print(campaign.model_dump_json(indent=2))
