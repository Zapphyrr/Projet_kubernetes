# Projet Kubernetes - Formation Docker & Kubernetes

## À quoi sert ce projet ?

Ce projet est un **environnement d'apprentissage pratique** pour Docker et Kubernetes. Il contient des exemples concrets et des exercices pour vous aider à comprendre :

- ✅ Comment containeriser une application avec Docker
- ✅ Comment construire et exécuter des images Docker
- ✅ Les bases de Kubernetes (à venir)
- ✅ Le déploiement d'applications containerisées

## Que contient ce projet ?

### 📁 `docker/hello-docker/`
Une application Flask simple qui sert de premier exemple de containerisation :
- **`app.py`** : Application web Flask qui affiche "Hello !!!" sur le port 5000
- **`dockerfile`** : Instructions pour créer l'image Docker
- **`requirements.txt`** : Dépendances Python nécessaires

## Comment utiliser ce projet ?

### 1. 🐍 Exécuter l'application Python directement

```bash
# Se placer dans le dossier de l'application
cd docker/hello-docker

# Installer les dépendances
pip install -r requirements.txt

# Lancer l'application
python app.py
```

Visitez http://localhost:5000 pour voir "Hello !!!"

### 2. 🐳 Construire et exécuter avec Docker

```bash
# Se placer dans le dossier de l'application
cd docker/hello-docker

# Construire l'image Docker
docker build -t hello-docker .

# Exécuter le conteneur
docker run -p 5000:5000 hello-docker
```

Visitez http://localhost:5000 pour voir l'application containerisée

### 3. 🚀 Kubernetes (à venir)
- Fichiers de déploiement Kubernetes
- Services et Ingress
- Exemples de mise à l'échelle

## Objectifs d'apprentissage

Ce projet vous permet d'apprendre :

1. **Docker Basics** : Comment écrire un Dockerfile, construire une image et lancer un conteneur
2. **Application Web** : Comprendre comment containeriser une application Flask
3. **Bonnes pratiques** : Structure de projet, gestion des dépendances
4. **Kubernetes** : Déploiement et gestion d'applications (modules à venir)

## Prochaines étapes

- [ ] Ajouter des exemples Kubernetes (deployment, service, ingress)
- [ ] Créer une application multi-conteneurs
- [ ] Ajouter des exemples de volumes et réseaux Docker
- [ ] Intégration CI/CD

---

**💡 Conseil** : Commencez par exécuter l'application Python, puis testez Docker pour comprendre la différence entre exécution native et containerisée.
