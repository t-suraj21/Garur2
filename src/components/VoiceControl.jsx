// src/components/VoiceControl.jsx
import { useEffect } from 'react';
import { listenVoice } from '../utils/voiceUtils';

const VoiceControl = ({ onCommand }) => {
  useEffect(() => {
    listenVoice((command) => {
      onCommand(command);
    });
  }, [onCommand]);

  return null;
};

export default VoiceControl;
