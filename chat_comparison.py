from dotenv import load_dotenv
import os

load_dotenv()

# from groq import Groq

# client = Groq(
#     api_key=os.environ.get("GROQ_API_KEY"),
# )

# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "user",
#             "content": "Tell a joke about someone who loves going to the gym",
#         }
#     ],
#     model="llama-3.3-70b-versatile",
# )

# print(chat_completion.choices[0].message.content)

## Count to 10

# chat_completion = client.chat.completions.create(
#     #
#     # Required parameters
#     #
#     messages=[
#         # Set an optional system message. This sets the behavior of the
#         # assistant and can be used to provide specific instructions for
#         # how it should behave throughout the conversation.
#         {
#             "role": "system",
#             "content": "you are a helpful assistant."
#         },
#         # Set a user message for the assistant to respond to.
#         {
#             "role": "user",
#             "content": "Count to 10.  Your response must begin with \"1, \".  example: 1, 2, 3, ...",
#         }
#     ],

#     # The language model which will generate the completion.
#     model="llama-3.3-70b-versatile",

#     #
#     # Optional parameters
#     #

#     # Controls randomness: lowering results in less random completions.
#     # As the temperature approaches zero, the model will become deterministic
#     # and repetitive.
#     temperature=0.5,

#     # The maximum number of tokens to generate. Requests can use up to
#     # 2048 tokens shared between prompt and completion.
#     max_completion_tokens=1024,

#     # Controls diversity via nucleus sampling: 0.5 means half of all
#     # likelihood-weighted options are considered.
#     top_p=1,

#     # A stop sequence is a predefined or user-specified text string that
#     # signals an AI to stop generating content, ensuring its responses
#     # remain focused and concise. Examples include punctuation marks and
#     # markers like "[end]".
#     # For this example, we will use ", 6" so that the llm stops counting at 5.
#     # If multiple stop values are needed, an array of string may be passed,
#     # stop=[", 6", ", six", ", Six"]
#     stop=", 6",

#     # If set, partial message deltas will be sent.
#     stream=False,
# )

# # Print the completion returned by the LLM.
# print(chat_completion.choices[0].message.content)

# from typing import List, Optional
# import json

# from pydantic import BaseModel
# from groq import Groq

# groq = Groq()


# # Data model for LLM to generate
# class Ingredient(BaseModel):
#     name: str
#     quantity: str
#     quantity_unit: Optional[str]


# class Recipe(BaseModel):
#     recipe_name: str
#     ingredients: List[Ingredient]
#     directions: List[str]


# def get_recipe(recipe_name: str) -> Recipe:
#     chat_completion = groq.chat.completions.create(
#         messages=[
#             {
#                 "role": "system",
#                 "content": "You are a recipe database that outputs recipes in JSON.\n"
#                 # Pass the json schema to the model. Pretty printing improves results.
#                 f" The JSON object must use the schema: {json.dumps(Recipe.model_json_schema(), indent=2)}",
#             },
#             {
#                 "role": "user",
#                 "content": f"Fetch a recipe for {recipe_name}",
#             },
#         ],
#         model="llama3-70b-8192",
#         temperature=0,
#         # Streaming is not supported in JSON mode
#         stream=False,
#         # Enable JSON mode by setting the response format
#         response_format={"type": "json_object"},
#     )
#     return Recipe.model_validate_json(chat_completion.choices[0].message.content)


# def print_recipe(recipe: Recipe):
#     print("Recipe:", recipe.recipe_name)

#     print("\nIngredients:")
#     for ingredient in recipe.ingredients:
#         print(
#             f"- {ingredient.name}: {ingredient.quantity} {ingredient.quantity_unit or ''}"
#         )
#     print("\nDirections:")
#     for step, direction in enumerate(recipe.directions, start=1):
#         print(f"{step}. {direction}")


# recipe = get_recipe("apple pie")
# print_recipe(recipe)

from typing import List, Optional
import json

from pydantic import BaseModel
from groq import Groq

# groq = Groq()
# class CharacterName(BaseModel):
#     fictional_name: List[str]

# client = Groq(
#     api_key=os.environ.get("GROQ_API_KEY"),
# )


# def generate_character_name() -> CharacterName:
#     chat_completion = groq.chat.completions.create(
#         messages=[
#             {
#                 "role": "system",
#                 "content": "You are a character database from the dungeons and dragons world that outputs character names in JSON.\n"
#                 # Pass the json schema to the model. Pretty printing improves results.
#                 f" The JSON object must use the schema: {json.dumps(CharacterName.model_json_schema(), indent=2)}",
#             },
#             {
#                 "role": "user",
#                 "content": f"Fetch character names for dungeons and dragons",
#             },
#         ],
#         model="llama3-70b-8192",
#         temperature=0,
#         # Streaming is not supported in JSON mode
#         stream=False,
#         # Enable JSON mode by setting the response format
#         response_format={"type": "json_object"},
#     )
#     return CharacterName.model_validate_json(chat_completion.choices[0].message.content)


# def print_character_name(character_name: CharacterName):

#     for name in character_name.fictional_name:
#         print("Character Name:", name)

# character_name_list = generate_character_name()
# print_character_name(character_name_list)




# class OneShotCampaign(BaseModel):
#     title: str  # The campaign's title
#     setting: str  # Overall setting (e.g., "high fantasy world")
#     location: str  # Specific location (e.g., "haunted castle")
#     theme: str  # Theme of the story (e.g., "exploration", "heist", "mystery")
#     tone: str  # Tone of the campaign (e.g., "heroic", "grim", "lighthearted")
#     objective: str  # The players' main goal
#     plot_hook: str  # How the story begins (e.g., "Players are summoned by a local noble")
#     key_npcs: List[NPC]  # Important NPCs in the story
#     encounters: List[Encounter]  # Combat or non-combat challenges
#     puzzles: Optional[List[str]]  # Description of puzzles (if any)
#     twists: Optional[List[str]]  # Any unexpected story twists
#     rewards: List[str]  # Rewards for the players (e.g., "gold, magic items")
#     length: str  # Approximate length (e.g., "3-4 hours")
#     conclusion: str  # How the campaign wraps up


# def generate_one_shot_campaign(settings: dict) -> OneShotCampaign:
#     questions = {
#         "Setting": settings.get("world_type", "high fantasy"),
#         "Location": settings.get("location", "a forgotten temple"),
#         "Theme": settings.get("theme", "exploration"),
#         "Tone": settings.get("tone", "heroic"),
#         "Party Composition": settings.get("party", "balanced"),
#         "Objective": settings.get("objective", "retrieve an ancient artifact"),
#         "Challenges": settings.get("challenges", "traps, puzzles, and goblins"),
#         "NPCs": settings.get("npcs", "a wise sage and a cunning villain"),
#         "Length": settings.get("length", "3-4 hours"),
#         "Player Preferences": settings.get("preferences", "balanced roleplay and combat")
#     }

#     chat_completion = groq.chat.completions.create(
#         messages=[
#             {
#                 "role": "system",
#                 "content": (
#                     "You are a Dungeon Master assistant that generates rich and engaging one-shot D&D campaigns. "
#                     "Generate a campaign based on the following parameters. Ensure the response adheres to the JSON schema:\n"
#                     f"{json.dumps(OneShotCampaign.model_json_schema(), indent=2)}"
#                 ),
#             },
#             {
#                 "role": "user",
#                 "content": f"Generate a D&D one-shot campaign with these details:\n{json.dumps(questions, indent=2)}"
#             },
#         ],
#         model="llama3-70b-8192",
#         temperature=0.7,
#         response_format={"type": "json_object"},
#     )
#     return OneShotCampaign.model_validate_json(chat_completion.choices[0].message.content)


from typing import List, Optional, Dict, Any
import json

# from pydantic import BaseModel
from groq import Groq

from pydantic import BaseModel, Field
# from typing import List, Optional

groq=Groq()

class NPC(BaseModel):
    name: str
    role: str  # e.g., "ally", "villain", "neutral"
    description: str

class Encounter(BaseModel):
    description: str
    enemy_types: List[str]  # e.g., ["goblins", "undead", "bandits"]
    difficulty: str  # e.g., "easy", "medium", "hard"


# Define the OneShotCampaign schema
class OneShotCampaign(BaseModel):
    campaign_title: str
    setting: str
    setting_details: str
    introduction: str
    ending: str
    tone: str
    key_npcs: List[NPC]
    encounters: List[Encounter]
    rewards: List[str]
    # extra: Dict[str, Any] = Field(default_factory=dict)

    # class Config:
    #     extra = "allow"  # Allow extra fields
    # location: str
    # theme: str
    # tone: str
    # party_composition: str
    # objective: str
    # challenges: str
    # key_npcs: List[NPC]  # Important NPCs in the story
    # encounters: List[Encounter]  # Combat or non-combat challenges
    # puzzles: Optional[List[str]]  # Description of puzzles (if any)
    # twists: Optional[List[str]]  # Any unexpected story twists
    # rewards: List[str]  # Rewards for the players (e.g., "gold, magic items")
    # length: str
    # player_preferences: str

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
def generate_one_shot_campaign(settings: dict) -> OneShotCampaign:
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
    {json.dumps(OneShotCampaign.model_json_schema(), indent=2)}.
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
    return OneShotCampaign.model_validate_json(chat_completion.choices[0].message.content)

# Example usage
if __name__ == "__main__":
    # Define example user settings
    user_settings = {
        "world_type": "post-apocalyptic",
        "location": "a bustling airship port",
        "theme": "exploration and mystery",
        "tone": "sad, grim, and dark",
        "party": "magic-heavy",
        "objective": "investigate a missing airship",
        "challenges": "mechanical traps, rogue automatons, and rival treasure hunters",
        "npcs": "an eccentric inventor and a suspicious noble",
        "length": "4-5 hours",
        "preferences": "more puzzles and exploration, less combat",
    }

    # Generate the one-shot campaign
    campaign = generate_one_shot_campaign(user_settings)
    print(campaign.model_dump_json(indent=2))