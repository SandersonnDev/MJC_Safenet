function init() {
  // Variables globales
  let timerDurationMinutes = 60;
  let deactivationCode = "netsafe";
  let penaltyValue = 10;
  let penaltyUnit = "seconds";
  let remainingTimeMs = timerDurationMinutes * 60 * 1000;
  let timerInterval = null;
  let isRunning = false;
  let isBinaryRed = false;
  let binarySpeed = 1;
  let consoleInterval = null;
  let lastSecondPlayed = null;
  let errorGif = null;

  // Références DOM
  const timerDisplay = document.getElementById("timer");
  const codeInput = document.getElementById("codeInput");
  const validateBtn = document.getElementById("validateBtn");
  const feedback = document.getElementById("feedback");
  const adminPanel = document.getElementById("adminPanel");
  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const saveBtn = document.getElementById("saveBtn");
  const adminHoursInput = document.getElementById("adminHours");
  const adminMinutesInput = document.getElementById("adminMinutes");
  const adminSecondsInput = document.getElementById("adminSeconds");
  const adminCodeInput = document.getElementById("adminCode");
  const adminPenaltyInput = document.getElementById("adminPenalty");
  const adminPenaltyUnitInput = document.getElementById("adminPenaltyUnit");
  const outputConsole = document.getElementById("output-console");

  const beepSound = document.getElementById("beepSound");
  const gameOverSound = document.getElementById("gameOverSound");
  const errorSound = document.getElementById("errorSound");

  // Gestion menu admin toggle avec Alt+A
  document.addEventListener("keydown", e => {
    if (e.altKey && (e.key === "a" || e.key === "A")) {
      if (adminPanel) adminPanel.classList.toggle("hidden");
    }
  });

  // Boutons admin
  startBtn.addEventListener("click", () => {
    startTimer();
    if (adminPanel) adminPanel.classList.add("hidden");
  });
  resetBtn.addEventListener("click", resetTimer);
  saveBtn.addEventListener("click", () => {
    saveSettings();
    if (adminPanel) adminPanel.classList.add("hidden");
  });

  // Déclaration des ligne de la fausse console
  const commandStart = [
    'Performing DNS Lookups for',
    'Searching',
    'Analyzing',
    'Estimating Approximate Location of',
    'Compressing',
    'Requesting Authorization From :',
    'wget -a -t',
    'tar -xzf',
    'Entering Location',
    'Compilation Started of',
    'Downloading'
  ];
  const commandParts = [
    'Data Structure',
    'http://wwjd.com?au&2',
    'Texture',
    'TPS Reports',
    '.... Searching ...',
    'http://zanb.se/?23&88&far=2',
    'http://ab.ret45-33/?timing=1ww'
  ];
  const commandResponses = [
    'Authorizing',
    'Authorized...',
    'Access Granted..',
    'Going Deeper....',
    'Compression Complete.',
    'Compilation of Data Structures Complete..',
    'Entering Security Console...',
    'Encryption Unsuccessful Attempting Retry...',
    'Waiting for response...',
    '....Searching...',
    'Calculating Space Requirements'
  ];

  // Console simulée
  let consoleState = 0;
  let lastTime = 0;
  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function addConsoleLine(text) {
    const line = document.createElement("div");
    line.textContent = text;
    outputConsole.appendChild(line);
    if (outputConsole.children.length > 30) {
      outputConsole.removeChild(outputConsole.firstChild);
    }
    outputConsole.scrollTop = outputConsole.scrollHeight;
  }

  function updateConsole() {
    if (!isRunning) return;
    const now = Date.now();
    if (now - lastTime < 600) return;
    lastTime = now;
    if (consoleState === 0) {
      addConsoleLine("> " + randomItem(commandStart) + " " + randomItem(commandParts));
      consoleState = 1;
    } else if (consoleState === 1) {
      addConsoleLine(randomItem(commandResponses));
      consoleState = 2;
    } else {
      addConsoleLine("");
      consoleState = 0;
    }
  }
  consoleInterval = setInterval(updateConsole, 200);

  // Fond binaire
  const canvas = document.getElementById("binaryBackground");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  setInterval(drawBinaryRain, 50);

  function drawBinaryRain() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = isBinaryRed ? "red" : "#2e912eff";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = Math.random() > 0.5 ? "1" : "0";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i] += binarySpeed;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    }
  }
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Démarrer timer
  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    feedback.textContent = "Tentative de piratage en cours...";
    feedback.classList.add("invalid-code");
    timerInterval = setInterval(() => updateTimer(), 30);
  }

  // Reset timer complet
  function resetTimer() {
    clearInterval(timerInterval);
    clearInterval(consoleInterval);
    remainingTimeMs = timerDurationMinutes * 60 * 1000;
    updateDisplay();
    isRunning = false;
    feedback.textContent = "Simulation réinitialisée.";
    feedback.classList.add("invalid-code");
    timerDisplay.style.color = "#00ff00";
    timerDisplay.style.borderColor = "#00ff00";
    outputConsole.style.display = "block";
    outputConsole.innerHTML = "";
    consoleInterval = setInterval(updateConsole, 200);
    hideErrorGif();
    canvas.style.display = "block";
    document.body.classList.remove("bomb-gray-background");
    lastSecondPlayed = null;

    // Rendre visible le terminal
    const terminalDiv = document.getElementById("terminal");
    if (terminalDiv) terminalDiv.style.display = "flex";
  }

  // Met à jour le timer
function updateTimer() {
  if (remainingTimeMs <= 0) {
    clearInterval(timerInterval);
    isRunning = false;

    if (gameOverSound) gameOverSound.play();

    feedback.textContent = "Le compte est compromis !";
    feedback.classList.remove("invalid-code");
    timerDisplay.style.color = "red";
    timerDisplay.style.borderColor = "red";
    timerDisplay.textContent = "00:00:00:00";

    document.body.classList.add("shake");
    makeBinaryRed();
    setTimeout(() => document.body.classList.remove("shake"), 500);

    showErrorGif();

    const terminalDiv = document.getElementById("terminal");
    if (terminalDiv) terminalDiv.style.display = "none"; // Masquer le terminal

    lastSecondPlayed = null;
    return;
  }
    remainingTimeMs -= 30;
    updateDisplay();

    let currentSecond = Math.ceil(remainingTimeMs / 1000);
    if (currentSecond <= 60 && currentSecond !== lastSecondPlayed) {
      lastSecondPlayed = currentSecond;
      if (beepSound) beepSound.play();
    }

    if (remainingTimeMs < 60000 && timerDisplay.style.color !== "red") {
      timerDisplay.style.color = "red";
      timerDisplay.style.borderColor = "red";
    }
  }

  // Affiche le timer format hh:mm:ss:ms
  function updateDisplay() {
    let ms = remainingTimeMs % 1000;
    let totalSeconds = Math.floor(remainingTimeMs / 1000);
    let seconds = totalSeconds % 60;
    let totalMinutes = Math.floor(totalSeconds / 60);
    let minutes = totalMinutes % 60;
    let hours = Math.floor(totalMinutes / 60);
    timerDisplay.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}:${String(Math.floor(ms/10)).padStart(2,'0')}`;
  }

  // Validation code
  validateBtn.addEventListener("click", checkCode);
  codeInput.addEventListener("keyup", e => { if (e.key === "Enter") checkCode(); });

  function checkCode() {
    if (!isRunning) {
      feedback.textContent = "Le minuteur n'est pas démarré.";
      feedback.classList.add("invalid-code");
      if (errorSound) errorSound.play();
      hideErrorGif();
      return;
    }
    const userCode = codeInput.value.trim();
    if (userCode === deactivationCode) {
      clearInterval(timerInterval);
      isRunning = false;

      feedback.textContent = "";
      feedback.classList.remove("invalid-code");
      timerDisplay.style.color = "#444444ff";
      timerDisplay.style.borderColor = "#444444ff";
      hideErrorGif();

      clearInterval(consoleInterval);
      showCongratsMessage();
      canvas.style.display = "none";
      document.body.classList.add("bomb-gray-background");

      // Masquer terminal
      const terminalDiv = document.getElementById("terminal");
      if (terminalDiv) terminalDiv.style.display = "none";

      let visible = true;
      const blinkTimer = setInterval(() => {
        timerDisplay.style.visibility = visible ? "hidden" : "visible";
        visible = !visible;
      }, 500);
      setTimeout(() => {
        clearInterval(blinkTimer);
        timerDisplay.style.visibility = "visible";
      }, 10000);
    } else {
      feedback.textContent = "Code invalide.";
      feedback.classList.add("invalid-code");
      if (errorSound) errorSound.play();
      applyPenalty();
      document.body.classList.add("shake");
      makeBinaryRed();
      hideErrorGif();
      setTimeout(() => {
        document.body.classList.remove("shake");
        isBinaryRed = false;
      }, 500);
    }
    codeInput.value = "";
  }

  // Affiche message félicitations
  function showCongratsMessage() {
    outputConsole.innerHTML = "";
    const congratsDiv = document.createElement("div");
    congratsDiv.textContent = "Félicitations";
    congratsDiv.style.fontSize = "3em";
    congratsDiv.style.color = "#ffc400ff";
    congratsDiv.style.textAlign = "center";
    congratsDiv.style.marginTop = "40px";
    outputConsole.appendChild(congratsDiv);
  }

  // Affiche gif erreur
  function showErrorGif() {
    if (!errorGif) {
      errorGif = document.createElement("img");
      errorGif.src = "fail.webp";
      errorGif.alt = "Erreur de code";
      errorGif.style.maxWidth = "100%";
      errorGif.style.marginTop = "10px";
      feedback.appendChild(errorGif);
    }
  }
  function hideErrorGif() {
    if (errorGif && errorGif.parentNode) {
      errorGif.parentNode.removeChild(errorGif);
      errorGif = null;
    }
  }

  function makeBinaryRed() {
    isBinaryRed = true;
    setTimeout(() => isBinaryRed = false, 500);
  }

  function applyPenalty() {
    let penaltyMs = (penaltyUnit === "minutes") ? penaltyValue * 60 * 1000 : penaltyValue * 1000;
    remainingTimeMs -= penaltyMs;
    if (remainingTimeMs < 0) remainingTimeMs = 0;
    updateDisplay();
  }

  function saveSettings() {
    // Récupération heures, minutes, secondes
    const h = parseInt(adminHoursInput.value) || 0;
    const m = parseInt(adminMinutesInput.value) || 0;
    const s = parseInt(adminSecondsInput.value) || 0;

    // Calcul du total en minutes
    timerDurationMinutes = h * 60 + m + s / 60;

    deactivationCode = adminCodeInput.value || "netsafe";
    penaltyValue = parseFloat(adminPenaltyInput.value) || 10;
    penaltyUnit = adminPenaltyUnitInput?.value || "seconds";

    if (!isRunning) {
      remainingTimeMs = timerDurationMinutes * 60 * 1000;
      updateDisplay();
    }

    feedback.textContent = "Paramètres enregistrés.";
    feedback.classList.add("invalid-code");
    hideErrorGif();
  }

  // Initialisations
  updateDisplay();
  adminHoursInput.value = Math.floor(timerDurationMinutes / 60);
  adminMinutesInput.value = Math.floor(timerDurationMinutes % 60);
  adminSecondsInput.value = Math.floor((timerDurationMinutes * 60) % 60);

  adminCodeInput.value = deactivationCode;
  adminPenaltyInput.value = penaltyValue;
  if (adminPenaltyUnitInput) adminPenaltyUnitInput.value = penaltyUnit;
}

// Chargement JS
if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
