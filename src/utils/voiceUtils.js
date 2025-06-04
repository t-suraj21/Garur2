// src/utils/voiceUtils.js

// ✅ Text-to-speech using SpeechSynthesis API
export const speakText = (text) => {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
};

// ✅ Voice recognition using Web Speech API
export const listenVoice = (onCommand) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert('Your browser does not support Speech Recognition.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log('Heard:', transcript);
    onCommand(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event);
    if (event.error === 'not-allowed') {
      alert('Microphone access is blocked. Please allow microphone permissions.');
    }
  };

  recognition.start();
};
