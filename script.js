let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10); // Updates every 10 milliseconds

    // Toggle button states
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

function pause() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;

    // Toggle button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    
    display.innerHTML = '00:00:00.<span class="ms">00</span>';
    lapsList.innerHTML = ''; // Clear laps

    // Reset button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    // Math calculation for time formats
    let tempTime = elapsedTime;
    const ms = Math.floor((tempTime % 1000) / 10);
    tempTime = Math.floor(tempTime / 1000);
    const secs = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);
    const mins = tempTime % 60;
    const hrs = Math.floor(tempTime / 60);

    // Format strings to always have leading zeros
    const pad = (num) => num.toString().padStart(2, '0');

    display.innerHTML = `${pad(hrs)}:${pad(mins)}:${pad(secs)}.<span class="ms">${pad(ms)}</span>`;
}

function lap() {
    const li = document.createElement("li");
    const lapCount = lapsList.childElementCount + 1;
    
    li.innerHTML = `<span>Lap ${lapCount}</span> <span>${display.textContent}</span>`;
    lapsList.prepend(li); // Adds the newest lap to the top of the list
}