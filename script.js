let hours = 0;
let minutes = 0;
let seconds = 0;
let timer;
let running = false;

function startTimer() {
    if (!running) {
        running = true;
        document.getElementById('startStopBtn').textContent = 'Stop';
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateDisplay();
            saveTime();
        }, 1000);
    } else {
        clearInterval(timer);
        running = false;
        document.getElementById('startStopBtn').textContent = 'Start';
    }
}

function updateDisplay() {
    document.getElementById('timer').textContent = 
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds);
}

function saveTime() {
    localStorage.setItem('timer', JSON.stringify({hours, minutes, seconds, running}));
}

function loadTime() {
    const savedTime = JSON.parse(localStorage.getItem('timer'));
    if (savedTime) {
        hours = savedTime.hours;
        minutes = savedTime.minutes;
        seconds = savedTime.seconds;
        running = savedTime.running;
        updateDisplay();
        if (running) {
            startTimer();
        }
    }
}

document.getElementById('startStopBtn').addEventListener('click', startTimer);

loadTime();
