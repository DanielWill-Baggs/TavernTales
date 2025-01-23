import requests
prompt_text=f"The world of Tenebrous is a land ravaged by darkness, where the once-majestic Castle Eldrid now stands as a testament to the ravages of time. The castle's crumbling spires pierce the sky like skeletal fingers, casting long shadows over the surrounding lands. The air is thick with malevolent energy, and the very ground seems to writhe in agony. The castle's history is shrouded in mystery, but whispers speak of a powerful artifact hidden within its walls, waiting to be claimed by those brave (or foolhardy) enough to venture forth."
def download_image(image_url):
    response = requests.get(image_url)
    with open('sample.png', 'wb') as file:
        file.write(response.content)
    print('Download Completed')

prompt = {prompt_text}
width = 1024
height = 1024
seed = 545165
model = 'flux' 

image_url = f"https://pollinations.ai/p/{prompt}?width={width}&height={height}&seed={seed}&model={model}"

download_image(image_url)


