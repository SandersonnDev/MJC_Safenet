// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
  
  // === VARIABLES GLOBALES ===
  let timerDuration = 3600;      // Durée par défaut (1h)
  let deactivationCode = "netsafe"; // Code par défaut
  let penaltySeconds = 10;        // Pénalité par défaut

  let remainingTime = timerDuration;
  let timerInterval = null;
  let isRunning = false;

  // === SÉLECTION DES ÉLÉMENTS DU DOM ===
  const timerDisplay = document.getElementById("timer");
  const codeInput = document.getElementById("codeInput");
  const validateBtn = document.getElementById("validateBtn");
  const feedback = document.getElementById("feedback");
  const explosionSound = document.getElementById("explosionSound");
  
  // Éléments du panneau Admin
  const adminPanel = document.getElementById("adminPanel");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const saveBtn = document.getElementById("saveBtn");
  const adminDurationInput = document.getElementById("adminDuration");
  const adminCodeInput = document.getElementById("adminCode");
  const adminPenaltyInput = document.getElementById("adminPenalty");

  // === GESTION DU MENU ADMIN ===

  // Afficher/Cacher avec Alt + A
  document.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "a" || e.key === "A")) {
      const isPanelVisible = adminPanel.style.display === "block";
      adminPanel.style.display = isPanelVisible ? "none" : "block";
    }
  });

  // Bouton Démarrer
  startBtn.addEventListener("click", () => {
    startTimer();
    adminPanel.style.display = "none"; // MODIFICATION : Ferme le panneau
  });

  // Bouton Réinitialiser
  resetBtn.addEventListener("click", resetTimer);

  // Bouton Sauvegarder
  saveBtn.addEventListener("click", () => {
    saveSettings();
    adminPanel.style.display = "none"; // MODIFICATION : Ferme le panneau
  });

  // === LOGIQUE DU MINUTEUR ===

  function startTimer() {
    if (isRunning) return; // Empêche de lancer plusieurs minuteurs
    isRunning = true;
    feedback.textContent = "Tentative de piratage en cours...";
    timerInterval = setInterval(updateTimer, 1000); // Déclenche toutes les secondes
  }

  function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = timerDuration;
    updateDisplay();
    isRunning = false;
    feedback.textContent = "Simulation réinitialisée.";
    timerDisplay.style.color = "#00ff00";
    timerDisplay.style.borderColor = "#00ff00";
  }

  function updateTimer() {
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      explosionSound.play();
      feedback.textContent = "Le compte Darko_Fz est compromis !";
      timerDisplay.textContent = "00:00:00";
      timerDisplay.style.color = "red";
      timerDisplay.style.borderColor = "red";
      document.body.classList.add("shake");
      return;
    }

    remainingTime--;
    updateDisplay();

    // Change la couleur en rouge quand il reste moins d'une minute
    if (remainingTime < 60 && timerDisplay.style.color !== "red") {
      timerDisplay.style.color = "red";
      timerDisplay.style.borderColor = "red";
    }
  }

  // Met à jour l'affichage HH:MM:SS
  function updateDisplay() {
    const h = String(Math.floor(remainingTime / 3600)).padStart(2, "0");
    const m = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, "0");
    const s = String(remainingTime % 60).padStart(2, "0");
    timerDisplay.textContent = `${h}:${m}:${s}`;
  }

  // === VÉRIFICATION DU CODE ===
  validateBtn.addEventListener("click", checkCode);
  // Permet de valider aussi avec la touche "Entrée"
  codeInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      checkCode();
    }
  });


  function checkCode() {
    if (!isRunning) {
        feedback.textContent = "Le minuteur n'est pas démarré.";
        return;
    }

    const userCode = codeInput.value.trim();
    if (userCode === deactivationCode) {
      clearInterval(timerInterval);
      isRunning = false;
      feedback.textContent = "Félicitations ! Vous avez désactivé le piratage du compte de Darko_Fz.";
      timerDisplay.style.color = "#00ff00";
      timerDisplay.style.borderColor = "#00ff00";
    } else {
      feedback.textContent = "Code invalide. Pénalité appliquée.";
      applyPenalty();
      // Animation "shake"
      document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 500);
    }
    codeInput.value = ""; // Vide le champ après validation
  }

  function applyPenalty() {
    remainingTime -= penaltySeconds;
    if (remainingTime < 0) {
      remainingTime = 0;
    }
    updateDisplay(); // Met à jour l'affichage immédiatement après la pénalité
  }

  // === SAUVEGARDE DES PARAMÈTRES ADMIN ===
  function saveSettings() {
    timerDuration = parseInt(adminDurationInput.value) || 3600;
    deactivationCode = adminCodeInput.value || "netsafe";
    penaltySeconds = parseInt(adminPenaltyInput.value) || 10;
    
    // Si le minuteur ne tourne pas, on met à jour le temps affiché
    if (!isRunning) {
      remainingTime = timerDuration;
      updateDisplay();
    }
    feedback.textContent = "Paramètres enregistrés.";
  }

  // === ANIMATION DU FOND BINAIRE (CANVAS) ===
  const canvas = document.getElementById("binaryBackground");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawBinaryRain() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Effet de traînée
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00"; // Couleur des chiffres
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = Math.random() > 0.5 ? "1" : "0";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // Réinitialise la goutte aléatoirement pour un effet plus naturel
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  // Lance l'animation de fond
  setInterval(drawBinaryRain, 50);

  // Gère le redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalcule les colonnes (même si ce n'est pas parfait, évite les erreurs)
  });

  // === INITIALISATION ===
  updateDisplay(); // Affiche la durée par défaut au chargement
  adminDurationInput.value = timerDuration;
  adminCodeInput.value = deactivationCode;
  adminPenaltyInput.value = penaltySeconds;

});