
import { useEffect, useState } from "react";
import { Mic, Volume2, X } from "lucide-react";

interface VoiceIntroductionProps {
  onDismiss: () => void;
  onStartVoice: () => void;
}

export function VoiceIntroduction({ onDismiss, onStartVoice }: VoiceIntroductionProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg animate-in slide-in-from-bottom-4">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" />
              Voice Assistant Ready
            </h3>
            <button className="p-2 rounded hover:bg-gray-100" onClick={handleDismiss}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Your voice assistant is ready to help! Here's what you can do:
            </p>

            <div className="space-y-2 text-sm">
              <div className="bg-gray-100 rounded p-2">
                <strong>Navigation:</strong> Say "Go to appointments" or "Open medical records"
              </div>
              <div className="bg-gray-100 rounded p-2">
                <strong>Reading:</strong> Say "Read page" to hear the current content
              </div>
              <div className="bg-gray-100 rounded p-2">
                <strong>Help:</strong> Say "Help" to hear all available commands
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                className="flex-1 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  onStartVoice();
                  handleDismiss();
                }}
              >
                <Mic className="w-4 h-4" />
                Try Voice Commands
              </button>
              <button
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
                onClick={handleDismiss}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}