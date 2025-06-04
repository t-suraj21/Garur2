// src/components/SpeakText.jsx
import { useEffect } from 'react';
import { speakText } from '../utils/voiceUtils';

const SpeakText = ({ text }) => {
  useEffect(() => {
    speakText(text);
  }, [text]);

  return null;
};

export default SpeakText;