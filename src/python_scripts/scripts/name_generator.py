from dotenv import load_dotenv
import os

load_dotenv()

# from groq import Groq

# client = Groq(
#     api_key=os.environ.get("GROQ_API_KEY"),
# )

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
