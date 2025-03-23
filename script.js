// Check for browser support
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  document.getElementById('micButton').addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('transcript').innerText = transcript;
    // Send transcript to backend
    fetch('/api/voice-command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: transcript })
    })
      .then(response => response.json())
      .then(data => {
        // Use Speech Synthesis API to speak the response
        const utterance = new SpeechSynthesisUtterance(data.response);
        speechSynthesis.speak(utterance);
      });
  };
}
