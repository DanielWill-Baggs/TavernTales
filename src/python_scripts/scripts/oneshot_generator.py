import sys
from config.config import groq_api_key
from groq import Groq
from models.oneshotcampaign import MainOneShotCampaign
import json

groq=Groq()

# Function to generate a one-shot campaign using Groq
def generate_one_shot_campaign(settings: dict) -> MainOneShotCampaign:
    # Questions used to build the prompt
    questions = {
        "Setting": settings.get("setting"),
        "Location": settings.get("location"),
        "Theme": settings.get("theme"),
        "Tone": settings.get("tone"),
        "Party Composition": settings.get("party_composition"),
        "Length": settings.get("length"),
        "Player Preferences": settings.get("preferences"),
    }

    # Build the prompt dynamically
    prompt = f"""
    You are an expert Dungeons & Dragons campaign designer. Generate a detailed and creative one-shot campaign using the following player-provided details. Structure your response to include compelling descriptions, character motivations, and engaging challenges.

    **Campaign Details**
    - **Setting:** The campaign takes place in a {questions["Setting"]} world, centered around {questions["Location"]}. Describe this world’s unique elements, history, and notable features.
    - **Theme and Tone:** The theme is {questions["Theme"]}, with a {questions["Tone"]} tone. Reflect this in the mood and atmosphere of the story.
    - **Party Composition and Length:** The adventuring party is {questions["Party Composition"]} and the campaign is designed to last approximately {questions["Length"]}. Ensure the encounters and pacing align with this composition and timeframe.
    - **Player Preferences:** The players prefer {questions["Player Preferences"]}. Balance roleplay, exploration, and combat accordingly.

    **Campaign Structure**
    1. **Campaign Title:** Create a captivating title that reflects the essence of the story.
    2. **Setting Details:** Describe the world in detail, focusing on how the {questions["Setting"]} and {questions["Location"]} influence the environment and the story.
    3. **Introduction:** Write a compelling opening scene to immerse the players in the campaign. Establish the main plot and initial motivations for the party.
    4. **Key NPCs:** Develop at least three important NPCs, detailing their roles, motivations, and backstories. These characters should align with the {questions["Theme"]} and serve as allies, antagonists, or quest givers.
    5. **Encounters:** Design a mix of combat and non-combat challenges that fit the {questions["Theme"]} and {questions["Tone"]}. Include enemies, traps, puzzles, and social interactions.
    6. **Climactic Ending:** Conclude the campaign with an epic finale. Resolve the main plot and describe the consequences of the players' actions for the world.
    7. **Rewards:** Detail meaningful rewards, including gold, magic items, or knowledge. Ensure these align with the difficulty and tone of the campaign.

    Ensure the campaign is well-paced, engaging, and provides opportunities for player agency. Highlight unique aspects of the setting and theme to make this adventure memorable.


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

def set_user_settings(param_list: dict = None, user_settings: dict = None, **kwargs) -> dict:
    """
    Updates the campaign settings based on the passed param_list, user_settings, or kwargs.
    
    Args:
        param_list (dict): Parameters directly passed from the backend (e.g., req.body).
        user_settings (dict): Optional custom user settings.
        kwargs: Additional settings to override or add.

    Returns:
        dict: Finalized settings dictionary.
    """
    # Default settings
    default_settings = {
        "setting": "post-apocalyptic",
        "location": "an abandoned city",
        "theme": "exploration and mystery",
        "tone": "scary, dark",
        "party_composition": "balanced",
        "length": "6-8 hours",
        "preferences": "combat-heavy roleplay",
    }

    # Convert param_list into a dictionary
    if param_list:
        # Split each string into a key-value pair and build a dictionary
        param_dict = {item.split(":")[0].strip(): item.split(":")[1].strip() for item in param_list}
        default_settings.update(param_dict)

    # Update the settings with the passed-in user values (if any)
    if user_settings:
        default_settings.update(user_settings)

    # Override or add new settings with kwargs
    default_settings.update(kwargs)
    
    return default_settings


if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            param_list = json.loads(sys.argv[1])
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            sys.exit(1)
    else:
        # Default empty param_list if no input is provided
        param_list = {}

    # Generate the campaign settings using param_list
    user_settings = set_user_settings(param_list=param_list)
    
    # Pass the finalized settings to your campaign generator function
    campaign = generate_one_shot_campaign(user_settings)
    print(campaign.model_dump_json(indent=2))
