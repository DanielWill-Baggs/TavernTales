import requests
prompt_text = f"The world of Verdigris is a primeval, mist-shrouded realm where ancient forests stretch as far as the eye can see. The air is thick with the scent of damp earth and decaying vegetation. Towering trees, their trunks as wide as a house, stretch towards the sky, their canopies a tangle of vines and moss. The landscape is dotted with mist-filled valleys, crystal-clear rivers, and treacherous bogs. The world is alive with ancient magic, where the whispers of the land itself can be heard by those attuned to its rhythms."
def download_image(image_url):
    response = requests.get(image_url)
    with open('Verdigris.png', 'wb') as file:
        file.write(response.content)
    print('Download Completed')

prompt = {prompt_text}
width = 1024
height = 1024
seed = 545165
model = 'flux' 

image_url = f"https://pollinations.ai/p/{prompt}?width={width}&height={height}&seed={seed}&model={model}"

download_image(image_url)


