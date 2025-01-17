
import requests
prompt_text = f"a mouse in pixar animation style taking a shower"
def download_image(image_url):
    response = requests.get(image_url)
    with open('monkeyandchicken.png', 'wb') as file:
        file.write(response.content)
    print('Download Completed')

prompt = {prompt_text}
width = 1024
height = 1024
seed = 545165
model = 'flux' 

image_url = f"https://pollinations.ai/p/{prompt}?width={width}&height={height}&seed={seed}&model={model}"

download_image(image_url)


