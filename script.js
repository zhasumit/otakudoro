let timer1, timer2, interval1, interval2;

// Load preferences from localStorage on page load
window.onload = function () {

    const savedBg = localStorage.getItem("background");
    const savedSound = localStorage.getItem("sound");
    const savedTimer1 = localStorage.getItem("timer1Duration");
    const savedTimer2 = localStorage.getItem("timer2Duration");

    // Set background image from localStorage if saved
    if (savedBg) {
        document.body.style.backgroundImage = savedBg
            ? `url("${savedBg}")`
            : "";
        document.getElementById("bgImage").value = savedBg;
    }

    // Set notification sound from localStorage if saved
    if (savedSound) {
        document.getElementById("sound").value = savedSound;
    }

    // Set timer durations from localStorage if saved
    if (savedTimer1) {
        timer1 = savedTimer1 * 60; // Convert minutes to seconds
        document.getElementById("timer1").textContent = formatTime(timer1);
        document.getElementById("timer1Duration").value = savedTimer1;
    } else {
        timer1 = 2400; // Default 40 minutes
    }

    if (savedTimer2) {
        timer2 = savedTimer2 * 60; // Convert minutes to seconds
        document.getElementById("timer2").textContent = formatTime(timer2);
        document.getElementById("timer2Duration").value = savedTimer2;
    } else {
        timer2 = 1200; // Default 20 minutes
    }
};

// Switch tabs between timers
document.getElementById("tab1").addEventListener("click", function () {
    switchTab(1);
});

document.getElementById("tab2").addEventListener("click", function () {
    switchTab(2);
});

// Switch between active tabs
function switchTab(tabNum) {
    document.querySelector(".active-tab").classList.remove("active-tab");
    document
        .querySelector(".active-content")
        .classList.remove("active-content");
    document.getElementById("tab" + tabNum).classList.add("active-tab");
    document.getElementById("content" + tabNum).classList.add("active-content");
}

function startTimer(timer) {
    if (timer === 1) {
        if (!interval1) {
            interval1 = setInterval(() => updateTimer(1), 1000);
        }
    } else {
        if (!interval2) {
            interval2 = setInterval(() => updateTimer(2), 1000);
        }
    }
}

function stopTimer(timer) {
    if (timer === 1) {
        clearInterval(interval1);
        interval1 = null;
    } else {
        clearInterval(interval2);
        interval2 = null;
    }
}

function resetTimer(timer) {
    stopTimer(timer);
    if (timer === 1) {
        timer1 = document.getElementById("timer1Duration").value * 60;
        document.getElementById("timer1").textContent = formatTime(timer1);
    } else {
        timer2 = document.getElementById("timer2Duration").value * 60;
        document.getElementById("timer2").textContent = formatTime(timer2);
    }
    document.title = "otakudoro";
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

function openSettings() {
    document.getElementById("popup").style.display = "block";
}

function closeSettings() {
    document.getElementById("popup").style.display = "none";
}

function applySettings() {
    resetTimer(1);
    resetTimer(2);

    const selectedBg = document.getElementById("bgImage").value;
    document.body.style.backgroundImage = selectedBg
        ? `url("${selectedBg}")`
        : "";
    localStorage.setItem("background", selectedBg);

    const selectedSound = document.getElementById("sound").value;
    localStorage.setItem("sound", selectedSound);

    localStorage.setItem(
        "timer1Duration",
        document.getElementById("timer1Duration").value
    );
    localStorage.setItem(
        "timer2Duration",
        document.getElementById("timer2Duration").value
    );

    closeSettings();
}

function showNotification() {
    let notification = document.getElementById("notificationPopup");
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// Play the selected notification sound and display the "Stop Sound" button
let currentSoundElement = null; // Track the current playing sound

// Play the selected notification sound and display the "Stop Sound" button
function playNotificationSound() {
    const selectedSound = document.getElementById("sound").value;

    if (selectedSound !== "none") {
        const soundElement = new Audio(selectedSound);
        soundElement.volume = 0.4; // Set volume to 70%
        soundElement.loop = false; // Enable looping
        soundElement.play().catch(function (error) {
            console.error("Error playing the audio:", error);
        });

        // Show the stop sound button if necessary
        document.getElementById("stopSoundBtn").style.display = "block";

        // Set the global variable to track the current sound being played
        currentSoundElement = soundElement;
    }
}

// Stop the notification sound and hide the "Stop Sound" button
function stopNotificationSound() {
    if (currentSoundElement) {
        currentSoundElement.pause();
        currentSoundElement.currentTime = 0; // Reset the sound to the beginning
        document.getElementById("stopSoundBtn").style.display = "none"; // Hide stop button
    }
}

// Update the timer and play sound when timer finishes
function updateTimer(timer) {
    if (timer === 1) {
        if (timer1 > 0) {
            timer1--;
            document.getElementById("timer1").textContent = formatTime(timer1);
            document.title = formatTime(timer1) + "☄️";
        } else {
            showNotification();
            playNotificationSound(); // Play sound when the timer finishes
            resetTimer(1);
        }
    } else {
        if (timer2 > 0) {
            timer2--;
            document.getElementById("timer2").textContent = formatTime(timer2);
            document.title = formatTime(timer2) + "🍥";
        } else {
            showNotification();
            playNotificationSound(); // Play sound when the timer finishes
            resetTimer(2);
        }
    }
}

function toggleFullscreen() {
    let fullscreenButton = document.getElementById("fullscreenBtn");
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenButton.innerText = '⨳'
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreenButton.innerText = '⛶'
        }
    }
}
