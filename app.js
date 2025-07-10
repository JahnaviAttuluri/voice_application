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
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.innerHTML += `<p><strong>You said:</strong> ${transcript}</p>`;

    if (transcript.includes("weather in")) {
      const city = transcript.split("weather in")[1].trim();
      getWeather(city);
    } else {
      const message = "Sorry, I didn't understand. Try saying: weather in Hyderabad.";
      output.innerHTML += `<p>${message}</p>`;
      speak(message);
    }
  };

  recognition.onerror = (event) => {
    const message = `Error occurred: ${event.error}`;
    output.innerHTML += `<p class="text-danger">${message}</p>`;
    speak("Sorry, an error occurred.");
  };
} else {
  output.innerHTML = `<p class="text-danger">Speech Recognition not supported in this browser.</p>`;
}

function getWeather(city) {
  const apiKey = '834c3cbbb30cb34a16e9c6f30c7a66bd'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const message = `The weather in ${city} is ${temp} degrees Celsius with ${desc}.`;
        output.innerHTML += `<p>${message}</p>`;
        speak(message);
      } else {
        const message = "Sorry, I couldn't find that city.";
        output.innerHTML += `<p class="text-danger">${message}</p>`;
        speak(message);
      }
    })
    .catch(error => {
      const message = `Error fetching weather: ${error}`;
      output.innerHTML += `<p class="text-danger">${message}</p>`;
      speak("Something went wrong fetching the weather.");
    });
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

