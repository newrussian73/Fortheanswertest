(() => {
  const ROUNDS_PER_GAME = 5;

  const state = {
    mode: null,
    round: 0,
    score: 0,
    stars: 0,
    locked: false,
    current: null,
    buildProgress: [],
    bubbleTimer: null,
  };

  const els = {
    screens: {
      home: document.getElementById("screen-home"),
      game: document.getElementById("screen-game"),
      win: document.getElementById("screen-win"),
    },
    promptText: document.getElementById("prompt-text"),
    pictureFrame: document.getElementById("picture-frame"),
    playArea: document.getElementById("play-area"),
    feedback: document.getElementById("feedback"),
    score: document.getElementById("score"),
    stars: document.getElementById("stars"),
    winStars: document.getElementById("win-stars"),
    confetti: document.getElementById("confetti"),
    mascotWin: document.getElementById("mascot-win"),
    btnSpeak: document.getElementById("btn-speak"),
  };

  /* ---------- Speech ---------- */
  function speak(text, rate = 0.85) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ru-RU";
    u.rate = rate;
    u.pitch = 1.1;
    const voices = window.speechSynthesis.getVoices();
    const ru = voices.find((v) => v.lang.startsWith("ru"));
    if (ru) u.voice = ru;
    window.speechSynthesis.speak(u);
  }

  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  /* ---------- Screens ---------- */
  function showScreen(name) {
    Object.values(els.screens).forEach((s) => s.classList.remove("active"));
    els.screens[name].classList.add("active");
  }

  function updateHud() {
    els.score.textContent = String(state.score);
    els.stars.querySelectorAll(".star").forEach((star, i) => {
      star.classList.toggle("lit", i < state.stars);
    });
  }

  function setFeedback(text, kind) {
    els.feedback.textContent = text;
    els.feedback.className = "feedback " + (kind || "");
  }

  function clearPlay() {
    if (state.bubbleTimer) {
      clearInterval(state.bubbleTimer);
      state.bubbleTimer = null;
    }
    els.playArea.innerHTML = "";
    els.playArea.className = "play-area";
    setFeedback("");
  }

  /* ---------- Round control ---------- */
  function startMode(mode) {
    state.mode = mode;
    state.round = 0;
    state.score = 0;
    state.stars = 0;
    state.locked = false;
    updateHud();
    showScreen("game");
    nextRound();
  }

  function nextRound() {
    if (state.round >= ROUNDS_PER_GAME) {
      endGame();
      return;
    }
    state.round += 1;
    state.locked = false;
    state.buildProgress = [];
    clearPlay();
    els.pictureFrame.hidden = true;
    els.pictureFrame.innerHTML = "";

    if (state.mode === "listen") startListen();
    else if (state.mode === "build") startBuild();
    else if (state.mode === "picture") startPicture();
    else if (state.mode === "pop") startPop();
  }

  function onCorrect() {
    state.score += 10;
    state.stars = Math.min(5, state.stars + 1);
    updateHud();
    setFeedback(pick(PRAISE), "good");
    speak(pick(["Молодец!", "Ура!", "Супер!"]), 1);
    setTimeout(nextRound, 900);
  }

  function onWrong() {
    setFeedback(pick(ENCOURAGE), "bad");
    speak("Попробуй ещё", 1);
  }

  function endGame() {
    clearPlay();
    els.winStars.textContent = String(state.stars);
    els.mascotWin.innerHTML = getIllustration("fox");
    spawnConfetti();
    speak("Ура! Ты молодец!", 1);
    showScreen("win");
  }

  function spawnConfetti() {
    els.confetti.innerHTML = "";
    const colors = ["#FB7185", "#38BDF8", "#FACC15", "#4ADE80", "#FB923C", "#A78BFA"];
    for (let i = 0; i < 40; i++) {
      const s = document.createElement("span");
      s.style.left = Math.random() * 100 + "%";
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = Math.random() * 1.2 + "s";
      s.style.animationDuration = 2 + Math.random() * 1.5 + "s";
      s.style.width = 8 + Math.random() * 10 + "px";
      s.style.height = 8 + Math.random() * 10 + "px";
      els.confetti.appendChild(s);
    }
  }

  /* ---------- Mode: Listen ---------- */
  function startListen() {
    const correct = pick(EASY_SYLLABLES);
    const options = shuffle([correct, ...uniqueDistractors(correct, EASY_SYLLABLES, 3)]);
    state.current = { type: "listen", correct, speakText: correct.toLowerCase() };

    els.promptText.innerHTML = "Найди слог";
    els.btnSpeak.onclick = () => speak(correct, 0.75);

    options.forEach((syl) => {
      const btn = document.createElement("button");
      btn.className = "syllable-btn";
      btn.textContent = syl;
      btn.addEventListener("click", () => {
        if (state.locked) return;
        if (syl === correct) {
          state.locked = true;
          btn.classList.add("correct");
          speak(syl, 0.8);
          onCorrect();
        } else {
          btn.classList.add("wrong");
          speak(syl, 0.9);
          onWrong();
          setTimeout(() => btn.classList.remove("wrong"), 400);
        }
      });
      els.playArea.appendChild(btn);
    });

    setTimeout(() => speak(correct, 0.75), 350);
  }

  /* ---------- Mode: Build word ---------- */
  function startBuild() {
    const word = pick(WORDS.filter((w) => w.syllables.length >= 2 && w.syllables.length <= 3));
    state.current = { type: "build", word };
    state.buildProgress = [];

    els.pictureFrame.hidden = false;
    els.pictureFrame.innerHTML = getIllustration(word.picture);
    els.promptText.innerHTML = word.syllables
      .map((s) => `<span class="syl" style="visibility:hidden">${s}</span>`)
      .join("");
    // Show dashed hint as empty slots label
    els.promptText.innerHTML = "Собери слово";
    els.btnSpeak.onclick = () => speak(word.say, 0.85);

    const slots = document.createElement("div");
    slots.className = "build-slots";
    word.syllables.forEach((_, i) => {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.index = String(i);
      slots.appendChild(slot);
    });
    els.playArea.appendChild(slots);

    const distractors = uniqueDistractors(
      word.syllables[0],
      EASY_SYLLABLES.filter((s) => !word.syllables.includes(s)),
      Math.max(2, 5 - word.syllables.length)
    );
    // Add some wrong syllables; keep all correct ones available
    const pool = shuffle([...word.syllables, ...distractors]);

    const choices = document.createElement("div");
    choices.className = "choices";

    pool.forEach((syl) => {
      const btn = document.createElement("button");
      btn.className = "syllable-btn";
      btn.textContent = syl;
      btn.addEventListener("click", () => {
        if (state.locked || btn.disabled) return;
        const nextIdx = state.buildProgress.length;
        const expected = word.syllables[nextIdx];
        speak(syl, 0.85);

        if (syl === expected) {
          state.buildProgress.push(syl);
          btn.disabled = true;
          btn.style.opacity = "0.4";
          const slot = slots.querySelector(`[data-index="${nextIdx}"]`);
          slot.textContent = syl;
          slot.classList.add("filled");

          if (state.buildProgress.length === word.syllables.length) {
            state.locked = true;
            els.promptText.innerHTML = word.syllables
              .map((s) => `<span class="syl">${s}</span>`)
              .join("");
            setTimeout(() => speak(word.say, 0.85), 200);
            onCorrect();
          }
        } else {
          btn.classList.add("wrong");
          onWrong();
          setTimeout(() => btn.classList.remove("wrong"), 400);
        }
      });
      choices.appendChild(btn);
    });
    els.playArea.appendChild(choices);
    setTimeout(() => speak(word.say, 0.85), 400);
  }

  /* ---------- Mode: Picture / guess word ---------- */
  function startPicture() {
    // Variant A: show word syllables, pick picture
    // Variant B: show picture, pick correct syllable sequence button
    const usePicChoice = Math.random() > 0.45;
    const word = pick(WORDS);
    state.current = { type: "picture", word };

    if (usePicChoice) {
      els.pictureFrame.hidden = true;
      els.promptText.innerHTML = word.syllables
        .map((s) => `<span class="syl">${s}</span>`)
        .join("");
      els.btnSpeak.onclick = () => speak(word.say, 0.85);

      const others = shuffle(WORDS.filter((w) => w.word !== word.word)).slice(0, 3);
      const options = shuffle([word, ...others]);

      options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "picture-choice";
        btn.style.animationDelay = i * 0.08 + "s";
        btn.innerHTML = getIllustration(opt.picture);
        btn.setAttribute("aria-label", opt.say);
        btn.addEventListener("click", () => {
          if (state.locked) return;
          if (opt.word === word.word) {
            state.locked = true;
            btn.classList.add("correct");
            speak(word.say, 0.85);
            onCorrect();
          } else {
            btn.classList.add("wrong");
            onWrong();
          }
        });
        els.playArea.appendChild(btn);
      });
      setTimeout(() => speak(word.say, 0.85), 350);
    } else {
      els.pictureFrame.hidden = false;
      els.pictureFrame.innerHTML = getIllustration(word.picture);
      els.promptText.textContent = "Как читается?";
      els.btnSpeak.onclick = () => speak(word.say, 0.85);

      const wrongWords = shuffle(WORDS.filter((w) => w.word !== word.word)).slice(0, 3);
      const options = shuffle([word, ...wrongWords]);

      options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "syllable-btn";
        btn.style.fontSize = opt.syllables.length > 2 ? "1.2rem" : "1.5rem";
        btn.style.minWidth = "110px";
        btn.textContent = opt.syllables.join("-");
        btn.addEventListener("click", () => {
          if (state.locked) return;
          if (opt.word === word.word) {
            state.locked = true;
            btn.classList.add("correct");
            speak(word.say, 0.85);
            onCorrect();
          } else {
            btn.classList.add("wrong");
            speak(opt.say, 0.9);
            onWrong();
            setTimeout(() => btn.classList.remove("wrong"), 400);
          }
        });
        els.playArea.appendChild(btn);
      });
    }
  }

  /* ---------- Mode: Pop bubbles ---------- */
  function startPop() {
    const correct = pick(EASY_SYLLABLES);
    state.current = { type: "pop", correct };
    let found = false;

    els.promptText.innerHTML = `Лопни: <span class="syl">${correct}</span>`;
    els.btnSpeak.onclick = () => speak(correct, 0.75);

    const field = document.createElement("div");
    field.className = "bubble-field";
    els.playArea.appendChild(field);

    const colors = [
      "linear-gradient(145deg,#fb7185,#e11d48)",
      "linear-gradient(145deg,#38bdf8,#0284c7)",
      "linear-gradient(145deg,#4ade80,#16a34a)",
      "linear-gradient(145deg,#fbbf24,#d97706)",
      "linear-gradient(145deg,#fb923c,#ea580c)",
    ];

    function spawnBubble(forceCorrect = false) {
      if (state.locked || found) return;
      const isCorrect = forceCorrect || Math.random() < 0.35;
      const syl = isCorrect
        ? correct
        : pick(EASY_SYLLABLES.filter((s) => s !== correct));

      const bubble = document.createElement("button");
      bubble.className = "bubble";
      bubble.textContent = syl;
      bubble.style.left = 8 + Math.random() * 70 + "%";
      bubble.style.bottom = "-20px";
      bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
      bubble.style.animationDuration = 4 + Math.random() * 2.5 + "s";

      bubble.addEventListener("click", () => {
        if (state.locked || found) return;
        bubble.classList.add("pop");
        speak(syl, 0.85);
        if (syl === correct) {
          found = true;
          state.locked = true;
          clearInterval(state.bubbleTimer);
          state.bubbleTimer = null;
          onCorrect();
        } else {
          onWrong();
        }
        setTimeout(() => bubble.remove(), 320);
      });

      field.appendChild(bubble);
      setTimeout(() => {
        if (bubble.parentNode) bubble.remove();
      }, 7000);
    }

    spawnBubble(true);
    state.bubbleTimer = setInterval(() => spawnBubble(false), 900);
    setTimeout(() => speak(correct, 0.75), 300);
  }

  /* ---------- Events ---------- */
  document.getElementById("btn-start").addEventListener("click", () => {
    speak("Давай играть!", 1);
    // scroll to modes or start listen by default
    document.getElementById("mode-grid").scrollIntoView({ behavior: "smooth" });
  });

  document.querySelectorAll(".mode-card").forEach((card) => {
    card.addEventListener("click", () => {
      const mode = card.dataset.mode;
      speak(card.querySelector(".mode-title").textContent, 1);
      startMode(mode);
    });
  });

  document.getElementById("btn-home").addEventListener("click", () => {
    clearPlay();
    window.speechSynthesis && window.speechSynthesis.cancel();
    showScreen("home");
  });

  document.getElementById("btn-again").addEventListener("click", () => {
    startMode(state.mode || "listen");
  });

  document.getElementById("btn-menu").addEventListener("click", () => {
    clearPlay();
    showScreen("home");
  });

  els.btnSpeak.addEventListener("click", () => {
    if (!state.current) return;
    if (state.current.speakText) speak(state.current.speakText, 0.75);
    else if (state.current.word) speak(state.current.word.say, 0.85);
    else if (state.current.correct) speak(state.current.correct, 0.75);
  });
})();
