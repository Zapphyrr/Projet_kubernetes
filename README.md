# Projet_kubernetes
## but de ce projet
  -> Ce projet a pour but de me former en docker ainsi qu'en kubernetes
## Initiation Docker
  -> Le dossier Hello-docker est un dossier initial permettant juste de démarrer mon apprentissage sur le docker et par extension, en kubernetes
### Fonctionnement :
  - app.py : API permetttant d'afficher "hello" à la racine, et écoute sur le port 5000
  - dockerfile : copie une image python, copie les fichiers du dossier et lance app.py
  - requirement : permet d'installer les modules nécessaires au bon fonctionnement du projet initiation docker. Il y a ici uniquement le module flask qui est nécessaire

## Affichage meteo sur notre position exacte
 -> utilisation de bootstrap affichant la méteo sur notre position actuel.
 -> API rest vers openweathermap

 ### Fonctionnement : 
 - Si on arrive à obtenir les coordonnées sur notre position actuel, on effectue l'api rest pour obtenir la météo à notre position. Sinon, on affiche celle de base, Paris.
 - Eexemple ci-dessous : 
<img width="371" height="158" alt="image" src="https://github.com/user-attachments/assets/5595d9be-93df-4917-a6ea-8d11ac297463" />

