import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# Set the URL of the website you want to scrape
base_url = "https://barotraumagame.com/wiki/Crafting"

# Create a directory to save the images
if not os.path.exists('images'):
    os.makedirs('images')

# Fetch the web page
response = requests.get(base_url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find all image tags (modify the selector as needed)
img_tags = soup.find_all('img')

def clean_filename(url):
    # Parse the URL and get the path
    path = urlparse(url).path
    # Extract the base name (e.g., image.jpg)
    base_name = os.path.basename(path)
    # Remove any prefix before the last dash (e.g., 30px-Rubber.png -> Rubber.png)
    base_name = base_name.split('-')[-1]
    # Replace spaces with underscores
    clean_name = base_name.replace(' ', '_')
    # Remove any occurrences of '%'
    clean_name = clean_name.replace('%', '')
    # Remove any occurrences of 'icon'
    clean_name = clean_name.replace('icon', '')
    # Remove trailing underscores
    clean_name = clean_name.rstrip('_')
    return clean_name

# Filter out the image URLs and convert relative URLs to absolute URLs
img_urls = [urljoin(base_url, img['src']) for img in img_tags if 'src' in img.attrs]

# Download each image
for i, img_url in enumerate(img_urls):
    try:
        # Get the cleaned image name
        img_name = clean_filename(img_url)
        img_path = os.path.join('images', img_name)

        # Fetch the image
        img_response = requests.get(img_url, stream=True)
        if img_response.status_code == 200:
            with open(img_path, 'wb') as f:
                for chunk in img_response.iter_content(1024):
                    f.write(chunk)
            print(f"Downloaded {img_url} as {img_name} ({i + 1}/{len(img_urls)})")
        else:
            print(f"Failed to download {img_url}")
    except Exception as e:
        print(f"An error occurred: {e}")

print("Download complete.")
