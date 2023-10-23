const addTimerButton = document.getElementById('add-timer-button');
const timersContainer = document.getElementById('timers-container');

// Audio element for the sound effect
const audio = new Audio('ding.mp3'); // Replace 'ding.mp3' with the path to your sound file

addTimerButton.addEventListener('click', function () {
    // Create a new timer container
    const timerContainer = document.createElement('div');
    timerContainer.className = 'timer';

    // Create input fields for date and time
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.placeholder = 'Select a date';
    const timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.placeholder = 'Select a time';

    // Create a countdown display area
    const countdownDisplay = document.createElement('div');
    countdownDisplay.className = 'countdown';
    countdownDisplay.innerHTML = `
        <div><span class="countdown-value days">00</span> days</div>
        <div><span class="countdown-value hours">00</span> hours</div>
        <div><span class="countdown-value minutes">00</span> minutes</div>
        <div><span class="countdown-value seconds">00</span> seconds</div>
    `;

    // Create a start button
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';

    // Append the elements to the timer container
    timerContainer.appendChild(dateInput);
    timerContainer.appendChild(timeInput);
    timerContainer.appendChild(countdownDisplay);
    timerContainer.appendChild(startButton);

    // Add the timer container to the timers container
    timersContainer.appendChild(timerContainer);

    // Add a click event to start the countdown for this timer
    startButton.addEventListener('click', function () {
        startCountdown(countdownDisplay, dateInput, timeInput);
    });
});

function formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return [days, hours, minutes, seconds];
}

function updateCountdown(countdownDisplay, targetDate, targetTime) {
    const currentTime = Math.floor((targetDate - Date.now()) / 1000);
    if (currentTime <= 0) {
        countdownDisplay.querySelector('.days').textContent = '00';
        countdownDisplay.querySelector('.hours').textContent = '00';
        countdownDisplay.querySelector('.minutes').textContent = '00';
        countdownDisplay.querySelector('.seconds').textContent = '00';

        // Play the sound effect when the timer reaches zero
        audio.play();
        
        return;
    } else {
        const [days, hours, minutes, seconds] = formatTime(currentTime);
        countdownDisplay.querySelector('.days').textContent = String(days).padStart(2, '0');
        countdownDisplay.querySelector('.hours').textContent = String(hours).padStart(2, '0');
        countdownDisplay.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
        countdownDisplay.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
    }
}

function startCountdown(countdownDisplay, dateInput, timeInput) {
    const targetDate = new Date(dateInput.value);
    const targetTime = timeInput.value.split(':').map(Number);

    if (isNaN(targetDate) || isNaN(targetTime[0]) || isNaN(targetTime[1])) {
        alert('Please select a valid date and time.');
        return;
    }

    targetDate.setHours(targetTime[0]);
    targetDate.setMinutes(targetTime[1]);

    const currentTime = Math.floor((targetDate - Date.now()) / 1000);

    if (currentTime <= 0) {
        alert('Please select a future date and time.');
        return;
    }

    countdownDisplay.querySelector('.days').textContent = '00';
    countdownDisplay.querySelector('.hours').textContent = '00';
    countdownDisplay.querySelector('.minutes').textContent = '00';
    countdownDisplay.querySelector('.seconds').textContent = '00';

    updateCountdown(countdownDisplay, targetDate, targetTime);

    setInterval(function () {
        updateCountdown(countdownDisplay, targetDate, targetTime);
    }, 1000);
}
