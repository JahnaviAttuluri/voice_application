const output = document.getElementById('output');
const startBtn = document.getElementById('start-btn');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  startBtn.addEventListener('click', () => {
    recognition.start();
    output.innerHTML += `<p><em>Listening...</em></p>`;
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    output.innerHTML += `<p><strong>You said:</strong> ${transcript}</p>`;
  };

  recognition.onerror = (event) => {
    output.innerHTML += `<p class="text-danger"><strong>Error:</strong> ${event.error}</p>`;
  };
} else {
  output.innerHTML = `<p class="text-danger">Sorry, your browser doesn't support Speech Recognition.</p>`;
}
