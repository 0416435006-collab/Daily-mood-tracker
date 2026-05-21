// Variable to store the // Variable to store the currently selected mood
let currentMood = "";
let currentEmoji = "";

// Function to load saved moods when page loads
function loadSavedMood() {
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    
    if (moodHistory.length > 0) {
        displayMoodHistory(moodHistory);
    }
}

// Function to display mood history
    // Show the last 5 moods
    function displayMoodHistory(moodHistory) {
    let historyDiv = document.getElementById("mood-history");
    historyDiv.innerText = "";
    
    for (let i = moodHistory.length - 1; i >= 0 && i >= moodHistory.length - 5; i--) {
        let moodEntry = document.createElement("div");
        moodEntry.innerText = moodHistory[i].date + ": " + moodHistory[i].emoji + " " + moodHistory[i].mood;
        historyDiv.appendChild(moodEntry);
    }
}

// Function toandle mood selection
function selectMood(moodName, moodEmoji) {
    currentMood = moodName;
    currentEmoji = moodEmoji;
    let selectedDiv = document.getElementById("selected-mood");
    selectedDiv.innerText = "You selected: " + moodEmoji + " " + moodName + " (click Submit to save)";
}


// Function to submit the mood
function submitMood() {
    if (currentMood === "") {
        alert("Please select a mood first!");
        return;
    }
    
    // Get today's date
    let today = new Date();
    let dateString = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    
    // Get existing mood history or create empty array
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    
    // Add new mood to history with date
    let newMoodEntry = {
        date: dateString,
        mood: currentMood,
        emoji: currentEmoji
    };
    moodHistory.push(newMoodEntry);
    
    // Save updated history
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
    
    // Show confirmation then refresh
    let selectedDiv = document.getElementById("selected-mood");
    selectedDiv.innerText = "Mood saved!";
    
    setTimeout(function() {
        location.reload();
    }, 1000);
}

// Load saved mood when page first loads
loadSavedMood();

// Add event listeners to the mood buttons
let happyButton = document.getElementById("happy-btn");
happyButton.addEventListener("click", function() {
    selectMood("Happy", "😊");
});

let sadButton = document.getElementById("sad-btn");
sadButton.addEventListener("click", function() {
    selectMood("Sad", "😢");
});

let excitedButton = document.getElementById("excited-btn");
excitedButton.addEventListener("click", function() {
    selectMood("Excited", "🤩");
});

let angryButton = document.getElementById("angry-btn");
angryButton.addEventListener("click", function() {
    selectMood("Angry", "😠");
});

// Add event listener for submit button
let submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", submitMood);