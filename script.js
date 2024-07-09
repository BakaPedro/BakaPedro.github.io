let timer;
let startTime;
let running = false;

function startTimer() {
    if (!running) {
        startTime = Date.now() - (localStorage.getItem('elapsedTime') || 0);
        running = true;
        document.getElementById('startStopBtn').textContent = 'Stop';
        timer = setInterval(updateDisplay, 1000);
    } else {
        clearInterval(timer);
        running = false;
        document.getElementById('startStopBtn').textContent = 'Start';
        localStorage.setItem('elapsedTime', Date.now() - startTime);
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById('timer').textContent = 
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds);
}

function loadTime() {
    const elapsedTime = localStorage.getItem('elapsedTime');
    if (elapsedTime) {
        startTime = Date.now() - elapsedTime;
        running = true;
        document.getElementById('startStopBtn').textContent = 'Stop';
        timer = setInterval(updateDisplay, 1000);
    }
}

document.getElementById('startStopBtn').addEventListener('click', startTimer);

loadTime();
updateDisplay();
