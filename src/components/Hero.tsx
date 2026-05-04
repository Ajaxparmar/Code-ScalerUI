import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Theme } from '../types';
import { PlayCircle, Terminal } from 'lucide-react';

interface HeroProps {
  theme: Theme;
}

export default function Hero({ theme }: HeroProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    'Web Development',
    'System Design',
    'Data Structures',
    'Industrial Tech',
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed]);

  return (
    <section id="hero" className={`relative pt-32 pb-20 px-6 overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      {/* Background Orbs */}
      <div className={`absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none ${
        theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-400'
      }`} />
      <div className={`absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none ${
        theme === 'dark' ? 'bg-purple-600' : 'bg-purple-400'
      }`} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-slate-50 border-slate-200 text-indigo-600'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Accelerate Your Learning
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6 flex flex-wrap items-center gap-x-4">
            <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Master</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              {text}
              <span className="animate-pulse ml-1 inline-block w-1 md:w-2 h-10 md:h-16 bg-indigo-500 align-middle"></span>
            </span>
          </h1>

          <p className={`text-lg md:text-xl mb-10 max-w-lg leading-relaxed ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Expert-led courses in DSA, Full Stack Development, and System Design to help you land your dream tech job. Scale your logic, scale your skills.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all transform hover:scale-105 active:scale-95 ${
              theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-900/40' : 'bg-indigo-500 hover:bg-indigo-600 shadow-xl shadow-indigo-500/20'
            }`}>
              Explore Courses
              <PlayCircle className="w-5 h-5" />
            </button>
            <button className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all border ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'
            }`}>
              Practice Problems
              <Terminal className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/100/100`}
                  alt="Student"
                  className={`w-10 h-10 rounded-full border-2 object-cover ${theme === 'dark' ? 'border-slate-950' : 'border-white'}`}
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              Join <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>10,000+</span> ambitious learners
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className={`relative rounded-[2rem] overflow-hidden border p-2 ${
            theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50'
          }`}>
             <div className="absolute top-4 left-6 h-8 flex items-center gap-1.5 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
             </div>
             <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&fit=crop"
              alt="Programming Illustration"
              className="w-full aspect-[4/3] object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/40 via-transparent to-transparent`} />
          </div>
          
          {/* Floating Element */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-2xl border ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'
            }`}
          >
            <div className="text-2xl font-bold mb-1 text-indigo-500">98%</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Success Rate</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
