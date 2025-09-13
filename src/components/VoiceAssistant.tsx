import { useEffect } from 'react';
// Helper: speak text aloud
function speakText(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const utter = new window.SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  }
}

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const commandMap = [
  { keywords: ['home', 'go to home', 'open home'], path: '/' },
  { keywords: ['dashboard', 'go to dashboard', 'open dashboard'], path: '/dashboard' },
  { keywords: ['alerts', 'go to alerts', 'open alerts'], path: '/alerts' },
  { keywords: ['diseases', 'go to diseases', 'open diseases'], path: '/diseases' },
  { keywords: ['reminders', 'go to reminders', 'open reminders'], path: '/reminders' },
  { keywords: ['vault', 'go to vault', 'open vault'], path: '/vault' },
  { keywords: ['login', 'log in', 'sign in'], path: '/login' },
  { keywords: ['signup', 'sign up', 'register'], path: '/signup' },
];

// Section/tab commands for each page
const sectionCommands = [
  // Vault page
  { keywords: ['prescriptions', 'show prescriptions', 'open prescriptions'], event: { type: 'vault-section', detail: 'prescriptions' } },
  { keywords: ['reports', 'show reports', 'open reports', 'medical reports'], event: { type: 'vault-section', detail: 'reports' } },
  { keywords: ['allergies', 'show allergies', 'open allergies'], event: { type: 'vault-section', detail: 'allergies' } },
  { keywords: ['vaccinations', 'show vaccinations', 'open vaccinations'], event: { type: 'vault-section', detail: 'vaccinations' } },
  // Reminders page
  { keywords: ['medicine reminders', 'medicine tab', 'show medicine reminders'], event: { type: 'reminders-section', detail: 'medicine' } },
  { keywords: ['vaccination reminders', 'vaccination tab', 'show vaccination reminders'], event: { type: 'reminders-section', detail: 'vaccination' } },
  { keywords: ['appointment reminders', 'appointment tab', 'show appointment reminders'], event: { type: 'reminders-section', detail: 'appointment' } },
  // Diseases page
  { keywords: ['cardiovascular diseases', 'show cardiovascular'], event: { type: 'diseases-category', detail: 'cardiovascular' } },
  { keywords: ['neurological diseases', 'show neurological'], event: { type: 'diseases-category', detail: 'neurological' } },
  { keywords: ['respiratory diseases', 'show respiratory'], event: { type: 'diseases-category', detail: 'respiratory' } },
  { keywords: ['infectious diseases', 'show infectious'], event: { type: 'diseases-category', detail: 'infectious' } },
  { keywords: ['all diseases', 'show all diseases'], event: { type: 'diseases-category', detail: 'all' } },
];

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (!transcript) return;
    const lower = transcript.toLowerCase();

    // --- Navigation ---
    for (const cmd of commandMap) {
      if (cmd.keywords.some(k => lower.includes(k))) {
        navigate(cmd.path);
        resetTranscript();
        return;
      }
    }

    // --- Section/tab switching ---
    for (const sec of sectionCommands) {
      if (sec.keywords.some(k => lower.includes(k))) {
        window.dispatchEvent(new CustomEvent(sec.event.type, { detail: sec.event.detail }));
        resetTranscript();
        return;
      }
    }

    // --- Robust 'read' and 'open' command parsing ---
    // 1. "read this for me" or "read this"
    if (/^read (this|it)( for me)?$/.test(lower.trim())) {
      // Try to read focused element, or element with [data-voice-focus]
      let text = '';
      const active = document.activeElement;
      if (active && active !== document.body) {
        text = (active as HTMLElement).innerText || (active as HTMLElement).textContent || '';
      }
      if (!text) {
        const focusEl = document.querySelector('[data-voice-focus]');
        if (focusEl) text = (focusEl as HTMLElement).innerText || (focusEl as HTMLElement).textContent || '';
      }
      if (!text) text = 'No content is currently focused.';
      speakText(text);
      resetTranscript();
      return;
    }

    // 2. "read [section name]" (e.g., "read prescriptions", "read dashboard stats")
    const readSectionMatch = lower.match(/^read ([\w\s-]+)$/);
    if (readSectionMatch) {
      const section = readSectionMatch[1].trim();
      // Try to find element with data-voice-section="section"
      const el = document.querySelector(`[data-voice-section="${section}"]`);
      if (el) {
        const text = (el as HTMLElement).innerText || (el as HTMLElement).textContent || '';
        speakText(text);
      } else {
        speakText(`Section ${section} not found.`);
      }
      resetTranscript();
      return;
    }

    // 3. "open [object] in [section] on [page]" or similar
    // e.g., "open blood test in reports on vault", "open lisinopril inside prescriptions of vault"
    const openObjRegex = /open ([\w\s-]+) (in|inside) ([\w\s-]+) (on|of) ([\w\s-]+)/;
    const openObjMatch = lower.match(openObjRegex);
    if (openObjMatch) {
      const object = openObjMatch[1].trim();
      const section = openObjMatch[3].trim();
      const page = openObjMatch[5].trim();
      // Dispatch a custom event for nested opening
      window.dispatchEvent(new CustomEvent('voice-open-object', {
        detail: { object, section, page }
      }));
      resetTranscript();
      return;
    }

    // 4. "open [object name]" (fallback: just open object in current context)
    const openObjSimple = lower.match(/^open ([\w\s-]+)$/);
    if (openObjSimple) {
      const object = openObjSimple[1].trim();
      window.dispatchEvent(new CustomEvent('voice-open-object', {
        detail: { object }
      }));
      resetTranscript();
      return;
    }

    // --- Login (example: "login with email ... password ...") ---
    if (lower.startsWith('login with')) {
      const match = lower.match(/login with email (\S+) password (\S+)/);
      if (match) {
        const email = match[1];
        const password = match[2];
        login(email, password);
        navigate('/dashboard');
        resetTranscript();
        return;
      }
    }
  }, [transcript, navigate, login, resetTranscript]);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support voice recognition.</span>;
  }

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      <div style={{ background: listening ? '#4ade80' : '#f87171', color: '#fff', padding: 10, borderRadius: 8 }}>
        Voice Assistant: {listening ? 'Listening...' : 'Not listening'}
      </div>
      <div style={{ fontSize: 12, color: '#333', marginTop: 4 }}>Heard: {transcript}</div>
    </div>
  );
};

export default VoiceAssistant;
