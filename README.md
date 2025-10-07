# 🐳 Projet_Kubernetes

## Objectif du projet
Ce projet a pour objectif de **me former à Docker et Kubernetes** à travers plusieurs mini-projets pratiques, illustrant la **création, la conteneurisation et le déploiement d’applications web** simples et complètes.

---

## 1. Initiation à Docker

### But
Découvrir les principes fondamentaux de Docker : création d’une image, conteneurisation d’une API simple et exécution d’un service dans un environnement isolé.

### Contenu
Le dossier **Hello-docker** contient une première application Flask minimale :

- **`app.py`** : API permettant d’afficher `"Hello"` à la racine (`/`), accessible sur le port **5000**.  
- **`Dockerfile`** : copie une image Python de base, ajoute les fichiers nécessaires et lance le script `app.py`.  
- **`requirements.txt`** : installe le module **Flask**, requis pour exécuter l’API.

### Résultat
Exécution d’une application Flask contenue dans une image Docker légère.  
Cette étape constitue la base de la compréhension de la création et du lancement de conteneurs.

---

## 🌦️ 2. Mini-projet : Affichage météo selon la position

### Objectif
Créer une petite application web permettant d’afficher la météo selon la **position géographique actuelle** de l’utilisateur, et de l’exécuter dans un conteneur Docker.

### Description
- Utilisation du **framework Bootstrap** pour la mise en page.  
- Consommation de l’**API REST OpenWeatherMap** pour récupérer les données météo.  
- Si la position de l’utilisateur est accessible, l’application affiche la météo locale. Sinon, elle affiche celle de **Paris** par défaut.

### Exemple
<img width="371" height="158" alt="image" src="https://github.com/user-attachments/assets/5595d9be-93df-4917-a6ea-8d11ac297463" />

---

## 3. Gestionnaire de tâches (ToDo App)

### Objectif
Créer une **application complète** (frontend + backend + base de données) et l’exécuter à l’aide de **Docker**.  
Ce projet met en pratique la séparation des services dans différents conteneurs et la communication entre eux.

### Architecture du projet

- **Frontend :** React ou Vue.js  
- **Backend :** Flask (Python)  
- **Base de données :** SQLite  
- **Orchestration :** Docker (images et conteneurs distincts)

### Structure générale

```
ToDoApp/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── tasks.db
│
├── frontend/
│   ├── package.json
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
└── docker-compose.yml
```

---

### 🧠 Fonctionnement du backend (Flask)

API REST Flask gérant les tâches :

- `GET /tasks` → Récupère la liste des tâches  
- `POST /tasks` → Ajoute une nouvelle tâche  
- `PUT /tasks/<id>` → Modifie une tâche  
- `DELETE /tasks/<id>` → Supprime une tâche  

**Exemple de code :**
```python
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    conn.close()
    return jsonify(tasks)
```

---

### Étapes de mise en place

#### Étape 1 — Création et test du backend
- Création du fichier `app.py` et du fichier `tasks.db`.  
- Test local avec Flask pour vérifier le bon fonctionnement de l’API.

#### Étape 2 — Dockerisation du backend
- Écriture d’un **Dockerfile** :
```dockerfile
FROM python:3.9
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```
- Construction de l’image :
```bash
docker build -t todo-backend .
```
- Lancement du conteneur :
```bash
docker run -p 5000:5000 todo-backend
```

#### Étape 3 — Création et dockerisation du frontend
- Initialisation d’un projet React :
```bash
npx create-react-app todo-frontend
```
ou Vue :
```bash
npm init vue@latest
```

- Ajout des dépendances et connexion à l’API Flask.

#### Étape 4 — Intégration et déploiement via Docker Compose
- Création du fichier `docker-compose.yml` pour orchestrer les conteneurs :
```yaml
version: "3.9"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```
- Lancement simultané :
```bash
docker-compose up --build
```

---

### Résultat final

**Interface frontend (Vue / React)** affichant la liste des tâches :

- Ajout d’une nouvelle tâche  
- Suppression d’une tâche  
- Marquage d’une tâche comme terminée  

**Exemple d’interface :**

<img width="250" alt="todo" src="https://github.com/user-attachments/assets/0de91b09-ec33-4a2a-8563-36d35484a837" />

---

## Compétences techniques mises en œuvre

| Domaine | Technologies |
|----------|---------------|
| **Conteneurisation** | Docker, Docker Compose |
| **Backend** | Flask, Python, SQLite |
| **Frontend** | React, Vue.js, HTML, CSS, JavaScript |
| **Orchestration (à venir)** | Kubernetes |
| **API REST** | Méthodes CRUD, communication client-serveur |
| **DevOps / CI** | Construction d’images, gestion de versions |
| **Outils & Environnement** | VS Code, GitHub, Docker Hub |

---

## Conclusion

Ce projet m’a permis de :
- Comprendre le cycle complet de **développement et conteneurisation** d’une application.  
- Expérimenter la communication entre services **frontend**, **backend** et **base de données**.  
- Préparer la prochaine étape : **le déploiement de ces conteneurs sur Kubernetes**.
