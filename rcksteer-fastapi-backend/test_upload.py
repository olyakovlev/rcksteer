import requests

url = "http://localhost:8000/upload-las/"
file_path = "test.las"

with open(file_path, 'rb') as f:
    files = {'file': (file_path, f)}
    response = requests.post(url, files=files)

print(response.json())
