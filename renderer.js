
const remote = require('@electron/remote');

function minimize() {
  remote.getCurrentWindow().minimize();
}

function closeApp() {
  remote.getCurrentWindow().close();
}

window.minimize = minimize;
window.closeApp = closeApp;

const pages = {
  start: document.getElementById("startPage"),
  select: document.getElementById("selectPage"),
  timer: document.getElementById("timerPage"),
  done: document.getElementById("donePage")
};

const timeDisplay = document.getElementById("timeDisplay");

const bakeTimes = {
  Muffins: 13,
  Square: 28,
  Circle8: 28,
  Circle9: 24,
  Bundt: 36
};

const cakeFrames = ["views/cake1.PNG", "views/cake2.PNG", "views/cake3.PNG", "views/cake2.PNG"];
let cakeFrameIndex = 0;
let cakeAnimationInterval;


let timerInterval;

function goToStart() {
  hideAllPages();
  pages.start.classList.remove("hidden");
}

function goToSelect() {
  hideAllPages();
  pages.select.classList.remove("hidden");
}

function startTimer(item) {
  hideAllPages();
  pages.timer.classList.remove("hidden");

  let seconds = bakeTimes[item] * 60;

  updateDisplay(seconds);
    startCakeAnimation();
  timerInterval = setInterval(() => {
    seconds--;
    updateDisplay(seconds);

    if (seconds <= 0) {
      clearInterval(timerInterval);
      clearInterval(cakeAnimationInterval);
      goToDone();
    }
  }, 1000);
}

function startCakeAnimation() {
  const cakeImg = document.getElementById("cakeAnimation");
  cakeFrameIndex = 0;

  cakeAnimationInterval = setInterval(() => {
    cakeImg.src = cakeFrames[cakeFrameIndex];
    cakeFrameIndex = (cakeFrameIndex + 1) % cakeFrames.length;
  }, 500); // Adjust speed (ms) here
}

function updateDisplay(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  timeDisplay.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function goToDone() {
  clearInterval(timerInterval);
clearInterval(cakeAnimationInterval);

  hideAllPages();
  pages.done.classList.remove("hidden");
}

function hideAllPages() {
  Object.values(pages).forEach(page => page.classList.add("hidden"));
}

function snooze() {
  hideAllPages();
  pages.timer.classList.remove("hidden");

  startCakeAnimation();

  let seconds = 5 * 60;

  updateDisplay(seconds);
  timerInterval = setInterval(() => {
    seconds--;
    updateDisplay(seconds);

    if (seconds <= 0) {
      clearInterval(timerInterval);
      clearInterval(cakeAnimationInterval);
      goToDone();
    }
  }, 1000);
}



