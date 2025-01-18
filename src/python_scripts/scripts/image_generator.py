import requests
prompt_text=f"A striking fantasy-themed artwork designed to captivate users on the authentication page of a Dungeons & Dragons character creation app. The image features a glowing enchanted doorway surrounded by intricate runes and carvings, symbolizing the gateway to a world of adventure. The doorway emits a warm, magical light that contrasts against a dark, mysterious background of ancient stone walls and scattered mystical artifacts. Above the doorway, an ornate crest with a dragon and crossed swords adds a heroic touch. The overall atmosphere is awe-inspiring, with glowing blue and golden hues, a subtle magical aura, and an inviting sense of mystery and discovery"
def download_image(image_url):
    response = requests.get(image_url)
    with open('authentication.png', 'wb') as file:
        file.write(response.content)
    print('Download Completed')

prompt = {prompt_text}
width = 1024
height = 1024
seed = 545165
model = 'flux' 

image_url = f"https://pollinations.ai/p/{prompt}?width={width}&height={height}&seed={seed}&model={model}"

download_image(image_url)


