# Application Météo

Application web Flask qui affiche les informations météorologiques en utilisant l'API OpenWeatherMap.

## Configuration sécurisée

### Prérequis
1. Obtenez une clé API gratuite sur [OpenWeatherMap](https://openweathermap.org/api)
2. Python 3.x installé

### Installation

1. Installez les dépendances :
```bash
pip install -r requirements.txt
```

2. Configurez votre clé API :
```bash
cp .env.example .env
```

3. Éditez le fichier `.env` et remplacez `votre_cle_api_ici` par votre vraie clé API OpenWeatherMap.

### Utilisation

```bash
python meteo_app.py
```

L'application sera accessible à l'adresse http://localhost:5000

## Sécurité

⚠️ **Important** : Le fichier `.env` contient des informations sensibles et ne doit jamais être commité dans Git. Il est automatiquement ignoré par le fichier `.gitignore`.

## Fonctionnalités

- Détection automatique de la géolocalisation
- Affichage des informations météo en temps réel
- Interface responsive avec Bootstrap
- Fallback sur Paris en cas d'erreur