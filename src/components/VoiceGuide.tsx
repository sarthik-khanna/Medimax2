
import { Mic, Volume2, Navigation, MessageCircle, Play, HelpCircle } from "lucide-react";

export function VoiceGuide() {
  const voiceCommands = [
    {
      category: "Navigation Commands",
      icon: Navigation,
      color: "bg-primary/10 text-primary",
      commands: [
        { phrase: "Go to dashboard", description: "Navigate to main dashboard" },
        { phrase: "Open appointments", description: "View appointment booking page" },
        { phrase: "Show medical records", description: "Access your health records" },
        { phrase: "Open chatbot", description: "Start AI health assistant" },
        { phrase: "Find facilities", description: "Locate healthcare services" },
        { phrase: "Medicine reminders", description: "Manage medication alerts" },
        { phrase: "Open profile", description: "Edit personal settings" }
      ]
    },
    {
      category: "Reading Commands",
      icon: Volume2,
      color: "bg-secondary/10 text-secondary",
      commands: [
        { phrase: "Read page", description: "Listen to current page content" },
        { phrase: "Read this", description: "Read current section aloud" },
        { phrase: "Speak content", description: "Voice output of page text" }
      ]
    },
    {
      category: "Control Commands", 
      icon: Play,
      color: "bg-accent/10 text-accent",
      commands: [
        { phrase: "Stop", description: "Stop voice output" },
        { phrase: "Repeat", description: "Repeat last content" },
        { phrase: "Pause", description: "Pause voice reading" },
        { phrase: "Help", description: "Hear available commands" }
      ]
    },
    {
      category: "Health Assistant",
      icon: MessageCircle, 
      color: "bg-success/10 text-success",
      commands: [
        { phrase: "What are symptoms of [condition]", description: "Ask health questions" },
        { phrase: "Medicine information", description: "Get drug details" },
        { phrase: "Health tips", description: "Request wellness advice" },
        { phrase: "Emergency help", description: "Get urgent health guidance" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Mic className="w-6 h-6 text-primary" />
          Voice Assistant Guide
        </h2>
        <p className="text-muted-foreground">
          Use these voice commands to navigate MediMax hands-free
        </p>
      </div>

      <div className="grid gap-6">
        {voiceCommands.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="border rounded-lg shadow bg-white mb-4">
              <div className="p-4 border-b flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-lg font-semibold">{category.category}</span>
              </div>
              <div className="p-4">
                <div className="grid gap-3">
                  {category.commands.map((command, cmdIndex) => (
                    <div key={cmdIndex} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                      <div className="space-y-1">
                        <span className="font-mono text-xs border px-2 py-1 rounded bg-white">"{command.phrase}"</span>
                        <p className="text-sm text-gray-600">{command.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border rounded-lg shadow bg-primary-light p-6 mt-6">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-primary mt-1" />
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">Getting Started</h4>
            <ul className="text-sm text-primary/80 space-y-1">
              <li>• Click the microphone button to activate voice recognition</li>
              <li>• Speak clearly and wait for the blue listening indicator</li>
              <li>• Voice commands work in English, Hindi, and Odia</li>
              <li>• Use "Help" command anytime to hear available options</li>
              <li>• Adjust speech rate and volume in voice settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}