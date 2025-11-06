### Structure générale du projet

**Fichiers à créer :**

- `index.html` : Structure de la page
- `style.css` : Habillage visuel (animation, fond binaire, esthétique du terminal)
- `script.js` : Gestion du minuteur, du code de désactivation et du menu admin

***

### 1. Structure HTML (index.html)

- **Section principale du scénario :**
    - Conteneur global (`<div id="app">`)
    - Logo en haut à droite (`<img id="logo">`)

```
- Compteur au centre (`<div id="timer">HH:MM:SS:MS</div>`)
```

    - Champ de texte pour entrer le code (`<input id="codeInput" type="text">`)

```
- Bouton de validation du code (`<button id="validateBtn">Valider</button>`)
```

```
- Zone des messages de feedback (`<div id="feedback"></div>`)
```

- **Menu administrateur masqué (accès par Alt + A) :**
    - Fenêtre modale (`<div id="adminPanel">`)
    - Champs :
        - Durée du minuteur (HH:MM:SS)
        - Mot de passe de désactivation
        - Pénalité pour erreur
    - Boutons :
        - Démarrer minuteur
        - Réinitialiser
        - Sauvegarder paramètres
- **Effets visuels :**
    - Fond animé de chiffres binaires (`<canvas id="binaryBackground">`)
    - Sons (explosion, validation)

***

### 2. Style CSS (style.css)

Principaux éléments :

- Corps : fond noir, police monospace.
- Fond binaire : animation verticale lente avec opacité.
- Timer : police large, couleur changeant (vert → orange → rouge selon le temps restant).
- Zone de saisie : effet terminal (texte vert, curseur clignotant).
- Popup d’erreur : animation “shake”, couleur rouge, disparition après 5 secondes.
- Menu admin : design minimaliste avec bordures lumineuses et fond semi-transparent.

***

### 3. Script JavaScript (script.js)

**Variables principales :**

- `timerDuration` (par défaut 3600 s)
- `deactivationCode` (par défaut "netsafe")
- `penaltySeconds`
- `remainingTime`
- `timerInterval`
- `isRunning`

**Fonctionnalités clés :**

1. **Initialisation du minuteur**
    - Afficher les heures, minutes, secondes.
    - Décrémentation chaque 100 ms.
    - Changement de couleur lors du seuil critique (par exemple < 5 min).
2. **Validation du code**
    - Comparer la saisie avec le code secret.
    - Si correct → Arrêt minuteur + message succès.
    - Si incorrect → pénalité + animation rouge + popup “Code invalide”.
3. **Menu admin (Alt + A)**
    - Ouverture/fermeture du panneau.
    - Application des réglages personnalisés.
4. **Fin du compte à rebours**
    - Arrêt minuteur.
    - Animation explosion + son.

