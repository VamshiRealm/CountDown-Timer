const startButton = document.getElementById('start-timer'); // Start button
const addButton = document.getElementById('add-timer'); // Add another timer button
const timersContainer = document.getElementById('timers'); // Container for all timers

function createTimer(targetTime, label) {
    const timerDiv = document.createElement('div'); // Create a div for the new timer
    timerDiv.classList.add('timer-container', 'timer'); // Add styling classes

    // If a label is provided, display it above the timer
    if (label) {
        const labelDiv = document.createElement('div');
        labelDiv.textContent = label; // Set the text of the label
        labelDiv.style.fontWeight = 'bold'; // Make the label text bold
        labelDiv.style.marginBottom = '10px'; // Add some space below the label
        timerDiv.appendChild(labelDiv); // Add the label div to the timer div
    }

    // Create and display the countdown
    const countdownDisplay = document.createElement('div');
    countdownDisplay.className = 'countdown-display'; // Apply countdown display styles
    countdownDisplay.textContent = '--:--:--:--'; // Placeholder text
    timerDiv.appendChild(countdownDisplay); // Add the countdown display to the timer

    const message = document.createElement('div');
    message.className = 'message'; // Apply message styles
    timerDiv.appendChild(message); // Add the message div to the timer

    // Create a stop button for the timer
    const stopButton = document.createElement('button');
    stopButton.textContent = 'Stop'; // Set the button text
    stopButton.style.backgroundColor = '#6d4c4c'; // Set the stop button color
    stopButton.addEventListener('click', () => {
        clearInterval(interval); // Stop the countdown
        countdownDisplay.textContent = '--:--:--:--'; // Reset the countdown display
        message.textContent = 'Timer Stopped'; // Display a stopped message
    });
    timerDiv.appendChild(stopButton); // Add the stop button to the timer

    // Create a delete button for the timer
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'; // Set the button text
    deleteButton.style.backgroundColor = '#6d4c4c'; // Set the delete button color
    deleteButton.style.marginLeft = '10px'; // Add some space between buttons
    deleteButton.addEventListener('click', () => {
        clearInterval(interval); // Stop the countdown if it's running
        timerDiv.remove(); // Remove the timer div from the DOM
    });
    timerDiv.appendChild(deleteButton); // Add the delete button to the timer

    timersContainer.appendChild(timerDiv); // Add the new timer to the timers container

    // Set an interval to update the countdown every second
    const interval = setInterval(() => {
        const currentTime = new Date().getTime(); // Get the current time
        const timeDifference = targetTime - currentTime; // Calculate time remaining

        if (timeDifference <= 0) {
            clearInterval(interval); // Stop the countdown when the timer reaches 0
            countdownDisplay.textContent = '--:--:--:--'; // Reset the countdown display
            countdownDisplay.classList.add('animated'); // Add animation when the timer is complete
            message.textContent = 'Countdown Complete!'; // Display the completion message
            const audio = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Play a sound when the timer ends
            audio.play();
            return;
        }

        // Calculate remaining days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Display the updated countdown
        countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000); // Update the countdown every second
}

// Function to start a new countdown when the start button is clicked
function startCountdown() {
    const targetTimeInput = document.getElementById('target-time').value; // Get the target time input
    const labelInput = document.getElementById('timer-label').value; // Get the label input
    const targetTime = new Date(targetTimeInput).getTime(); // Convert the target time to a timestamp
    const now = new Date().getTime(); // Get the current time in timestamp format

    // Check if the target time is valid (future date and time)
    if (!targetTimeInput || targetTime <= now) {
        alert('Please set a valid future date and time.'); // Alert if the time is not valid
        return;
    }

    createTimer(targetTime, labelInput); // Create and display the new timer
}

// Event listener for the start button
startButton.addEventListener('click', startCountdown);

// Event listener for the add button
addButton.addEventListener('click', () => {
    const targetTimeInput = document.getElementById('target-time').value; // Get the target time input
    const labelInput = document.getElementById('timer-label').value; // Get the label input
    const targetTime = new Date(targetTimeInput).getTime(); // Convert the target time to a timestamp
    const now = new Date().getTime(); // Get the current time

    // Check if the target time is valid
    if (!targetTimeInput || targetTime <= now) {
        alert('Please set a valid future date and time.'); // Alert if the time is invalid
        return;
    }

    createTimer(targetTime, labelInput); // Create and display the new timer
});
