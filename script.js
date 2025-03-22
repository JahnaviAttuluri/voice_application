const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
document.getElementById('start-btn').addEventListener('click', () => {
    recognition.start();
    document.getElementById('output').innerText = "Listening...";
});
recognition.onresult = function(event) {
    let voiceCommand = event.results[0][0].transcript.toLowerCase();
    document.getElementById('output').innerText = `You said: "${voiceCommand}"`;
    processCommand(voiceCommand);
};

// Process Commands
function processCommand(command) {
    if (command.includes("hello")) {
        speak("Hello! How can I help you?");
    } else if (command.includes("open google")) {
        window.open("https://www.google.com", "_blank");
        speak("Opening Google");
    } else if (command.includes("search for")) {
        let searchQuery = command.replace("search for", "").trim();
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
        speak(`Searching for ${searchQuery} on Google`);
    } else if (command.includes("open youtube")) {
        window.open("https://www.youtube.com", "_blank");
        speak("Opening YouTube");
    } else if (command.includes("what is the time")) {
        let time = new Date().toLocaleTimeString();
        speak(`The current time is ${time}`);
    } else {
        speak("Sorry, I didn't understand that.");
    }
}
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
}
recognition.onerror = function(event) {
    document.getElementById('output').innerText = "Error occurred: " + event.error;
};
