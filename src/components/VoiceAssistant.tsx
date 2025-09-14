import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, VolumeX, Play, Pause, Settings } from "lucide-react";

interface VoiceAssistantProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function VoiceAssistant({ onNavigate, currentPage }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(0.8);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [lastCommand, setLastCommand] = useState("");
  const [isReading, setIsReading] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Voice commands mapping
  const voiceCommands = {
    dashboard: ["dashboard", "home", "main page", "overview"],
    appointments: ["appointments", "book appointment", "doctor appointment", "schedule"],
    records: ["medical records", "records", "health records", "documents"],
    chatbot: ["chatbot", "ai assistant", "health assistant", "ask question"],
    facilities: ["facilities", "find hospital", "locate clinic", "healthcare facilities"],
    reminders: ["reminders", "medicine reminders", "medication", "pills"],
    profile: ["profile", "settings", "account", "personal information"]
  };

  // Initialize speech synthesis and recognition
  useEffect(() => {
    if ("speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = synthesisRef.current?.getVoices() || [];
        setAvailableVoices(voices);
        
        // Try to find English voices first
        const englishVoice = voices.find(voice => 
          voice.lang.startsWith("en") && voice.name.includes("Google")
        ) || voices.find(voice => voice.lang.startsWith("en"));
        
        if (englishVoice) {
          setSelectedVoice(englishVoice.name);
        }
      };

      loadVoices();
      synthesisRef.current.addEventListener("voiceschanged", loadVoices);
    }

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setLastCommand(command);
        handleVoiceCommand(command);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
  alert("Voice recognition error. Please try again.");
      };
    } else {
  alert("Voice recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  // Handle voice commands
  const handleVoiceCommand = (command: string) => {
    console.log("Voice command received:", command);
    
    // Check for navigation commands
    for (const [page, commands] of Object.entries(voiceCommands)) {
      if (commands.some(cmd => command.includes(cmd))) {
  speak(`Navigating to ${page.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        onNavigate(page);
        return;
      }
    }

    // Check for reading commands
    if (command.includes("read") || command.includes("speak") || command.includes("voice")) {
      if (command.includes("page") || command.includes("content")) {
        readPageContent();
        return;
      }
    }

    // Check for control commands
    if (command.includes("stop") || command.includes("quiet") || command.includes("silence")) {
      stopSpeaking();
      return;
    }

    if (command.includes("repeat")) {
      readPageContent();
      return;
    }

    // If no command matched, provide help
    speak("I didn't understand that command. Say 'help' to hear available commands, or try saying things like 'go to appointments' or 'read page'.");
  };

  // Text-to-speech function
  const speak = (text: string) => {
    if (!isEnabled || !synthesisRef.current) return;

    // Stop any current speech
    synthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceObj = availableVoices.find(voice => voice.name === selectedVoice);
    
    if (selectedVoiceObj) {
      utterance.voice = selectedVoiceObj;
    }
    
    utterance.rate = speechRate;
    utterance.volume = speechVolume;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsReading(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsReading(false);
    };

    currentUtteranceRef.current = utterance;
    synthesisRef.current.speak(utterance);
  };

  // Read current page content
  const readPageContent = () => {
    const pageContent = getPageContent();
    if (pageContent) {
      setIsReading(true);
      speak(pageContent);
    }
  };

  // Get content to read based on current page
  const getPageContent = () => {
    const pageDescriptions = {
      dashboard: "You are on the dashboard. Here you can see your upcoming appointments, recent medical records, medicine reminders, and health alerts. You have 2 upcoming appointments and your health score is 85 percent.",
      appointments: "You are on the appointments page. Here you can search for doctors by specialty and book appointments. Use the search bar to find doctors, or browse by specialty like cardiology, general medicine, or orthopedics.",
      records: "You are on the medical records page. Here you can upload, view, and manage your health documents including prescriptions, lab reports, x-rays, and vaccination records. All records are securely encrypted.",
      chatbot: "You are on the AI health assistant page. Ask me any health-related questions in English, Hindi, or Odia. I can help with symptoms, medicine information, and health tips.",
      facilities: "You are on the healthcare facilities page. Find nearby hospitals, clinics, pharmacies, blood banks, and Red Cross centers. Use your location to get directions and contact information.",
      reminders: "You are on the medicine reminders page. Set up medication schedules and get SMS or WhatsApp notifications. Track your daily progress and never miss a dose.",
      profile: "You are on the profile page. Update your personal information, medical details, notification preferences, and privacy settings."
    };

    return pageDescriptions[currentPage as keyof typeof pageDescriptions] || "Welcome to MediMax healthcare platform";
  };

  // Start/stop voice recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
  alert("Voice recognition not available");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
  alert("Listening... Speak your command now");
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
      setIsReading(false);
    }
  };

  // Speak available commands
  const speakHelp = () => {
    const helpText = `Available voice commands: 
    Navigation: Say 'go to dashboard', 'open appointments', 'show medical records', 'open chatbot', 'find facilities', 'medicine reminders', or 'open profile'.
    Reading: Say 'read page' to hear the current page content.
    Control: Say 'stop' to stop speaking, or 'repeat' to read again.
    You can also ask the AI assistant health questions when on the chatbot page.`;
    
    speak(helpText);
  };

  if (!isEnabled) {
    return (
      <button
        onClick={() => setIsEnabled(true)}
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg border bg-white flex items-center justify-center"
      >
        <VolumeX className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 space-y-2 z-50">
      <div className="shadow-lg bg-white rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-500 animate-pulse' : isListening ? 'bg-blue-500 animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm font-medium">Voice Assistant</span>
          </div>
          <button
            onClick={() => setIsEnabled(false)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={toggleListening}
            disabled={isSpeaking}
            className={`p-2 rounded ${isListening ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <button
            onClick={readPageContent}
            disabled={isSpeaking}
            className="p-2 rounded bg-gray-100"
          >
            {isReading ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={stopSpeaking}
            disabled={!isSpeaking}
            className="p-2 rounded bg-gray-100"
          >
            <VolumeX className="w-4 h-4" />
          </button>
          <button
            onClick={speakHelp}
            disabled={isSpeaking}
            className="p-2 rounded bg-gray-100"
          >
            ?
          </button>
        </div>

        {lastCommand && (
          <div className="text-xs text-gray-500 mt-2">
            Last command: "{lastCommand}"
          </div>
        )}

        <div className="space-y-2 mt-2">
          <div>
            <label className="text-xs text-gray-500">Speech Rate</label>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={speechRate}
              onChange={e => setSpeechRate(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Volume</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={speechVolume}
              onChange={e => setSpeechVolume(Number(e.target.value))}
              className="w-full mt-1"
            />
          </div>
          {availableVoices.length > 0 && (
            <div>
              <label className="text-xs text-gray-500">Voice</label>
              <select
                value={selectedVoice}
                onChange={e => setSelectedVoice(e.target.value)}
                className="w-full h-8 text-xs mt-1 border rounded"
              >
                {availableVoices
                  .filter(voice => voice.lang.startsWith("en"))
                  .map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {(isListening || isSpeaking) && (
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-1 rounded text-xs ${isListening ? 'bg-blue-100 text-blue-700' : isSpeaking ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
              {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Ready"}
            </span>
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => speak("Welcome to MediMax healthcare platform. How can I help you today?")}
          disabled={isSpeaking}
          className="text-xs px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          Welcome
        </button>
        <button
          onClick={readPageContent}
          disabled={isSpeaking}
          className="text-xs px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          Read Page
        </button>
      </div>
    </div>
  );
}