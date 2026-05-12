import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Mic, Send, X, Volume2, VolumeX, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Theme } from '../types';

interface VoiceBotProps {
  theme: Theme;
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function VoiceBot({ theme }: VoiceBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const speakText = async (text: string) => {
    if (!text) return;
    try {
      setIsSpeaking(true);
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const binary = atob(base64Audio);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }

        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        const audioBuffer = await audioContextRef.current.decodeAudioData(bytes.buffer);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error('TTS error:', error);
      setIsSpeaking(false);
      // Fallback to browser TTS if Gemini TTS fails
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startInteraction = async () => {
    setIsOpen(true);
    
    // Initialize or resume audio context on first user click
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (messages.length === 0) {
      const greeting = "Welcome to Code Scaler! I am your AI guide. How can I help you today? We offer courses in DSA, Full Stack Development, and Industrial Internships in Haryana.";
      setMessages([{ role: 'bot', text: greeting }]);
      speakText(greeting);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMessage].map(m => ({ 
          role: m.role === 'bot' ? 'model' : 'user', 
          parts: [{ text: m.text }] 
        })),
        config: {
          systemInstruction: "You are the official AI assistant of CodeScaler, a premier software engineering bootcamp in Jind, Haryana. Your job is to guide students about our courses (DSA, Full Stack, System Design) and our Industrial Internship programs in Jind and Hisar for college students. Be friendly, professional, and encourage them to enroll or apply for internships. If they seem interested, ask for their name and email so we can reach out.",
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      speakText(botResponse);

      // Check if we should save a lead (simple heuristic: if email or 'interested' mentioned)
      if (text.includes('@') || text.toLowerCase().includes('interest') || botResponse.toLowerCase().includes('thank you for your interest')) {
        saveLead(text, botResponse);
      }
    } catch (error) {
      console.error('Bot error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having technical difficulties. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLead = async (userText: string, botResponse: string) => {
    try {
      // Basic extraction of email
      const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const email = emailMatch ? emailMatch[0] : null;
      
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          interest: userText,
          interactionLogs: [...messages, { role: 'user', text: userText }, { role: 'bot', text: botResponse }]
        })
      });
    } catch (err) {
      console.error('Lead save fail:', err);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        id="voice-bot-trigger"
        onClick={startInteraction}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 ${
          theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white'
        }`}
      >
        <MessageSquare className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-24 right-8 z-50 w-[350px] md:w-[400px] h-[500px] md:h-[600px] flex flex-col rounded-3xl shadow-2xl border overflow-hidden ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Header */}
            <div className={`p-4 flex items-center justify-between border-b ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">CodeScaler AI</h3>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : (theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900') + ' rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`p-3 rounded-2xl rounded-tl-none ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Speaking Status */}
            {isSpeaking && (
              <div className="px-4 py-1 text-[10px] flex items-center gap-2 text-indigo-500 font-medium">
                <Volume2 className="w-3 h-3 animate-pulse" />
                AI is speaking...
              </div>
            )}

            {/* Input Area */}
            <div className={`p-4 border-t ${
              theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleListening}
                  className={`p-3 rounded-xl transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : (theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500')
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(inputText)}
                  placeholder="Ask about courses, internships..."
                  className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                    theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'
                  }`}
                />
                <button 
                  onClick={() => handleSend(inputText)}
                  disabled={!inputText.trim() || isLoading}
                  className="p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
