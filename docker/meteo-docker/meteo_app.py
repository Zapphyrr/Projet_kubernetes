from flask import Flask, render_template, request
import requests
from datetime import datetime
import os
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

app = Flask(__name__)

# Récupérer la clé API depuis les variables d'environnement
API_KEY = os.getenv('API_KEY')
if not API_KEY:
    raise ValueError("La clé API est manquante. Veuillez configurer la variable d'environnement API_KEY dans le fichier .env")

def get_meteo(lat, lon):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
    return data

@app.route('/')
def meteo():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    print("voici le lat, lon:", lat, lon)
    if lat and lon:
        data = get_meteo(lat, lon)
        if str(data.get("cod")) != "200":
            # Si erreur, on affiche Paris
            data = get_meteo(48.8535, 2.3484)
    else:
        data = get_meteo(48.8535, 2.3484)

    city = data["name"]
    temp = data["main"]["temp"]
    icon = data["weather"][0]["icon"]
    description = data["weather"][0]["description"]
    now = datetime.now().strftime("%H:%M")

    return render_template("meteo.html", city=city, temp=temp, icon=icon, description=description, now=now)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)