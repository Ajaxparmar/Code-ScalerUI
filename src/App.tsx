/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCarousel from './components/CourseCarousel';
import IndustrialSolutions from './components/IndustrialSolutions';
import Internship from './components/Internship';
import Mentors from './components/Mentors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VoiceBot from './components/VoiceBot';
import { Theme } from './types';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-200 font-sans' : 'bg-white text-slate-900'
    }`}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero theme={theme} />
        
        {/* Features Section */}
        <section className={`py-20 border-y ${
          theme === 'dark' ? 'bg-slate-950/50 border-slate-900' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Learn by Doing', desc: 'Focus on projects and real-world scenarios rather than just video lectures.', icon: '🚀' },
                { title: 'Interactive Quizzes', desc: 'Test your knowledge with integrated quizzes and coding challenges.', icon: '💡' },
                { title: 'Community Support', desc: 'Get help from mentors and peers in our dedicated Discord server.', icon: '🤝' },
              ].map((feature, i) => (
                <div key={i} className={`flex flex-col items-center text-center p-8 rounded-[2rem] transition-all border border-transparent ${
                  theme === 'dark' ? 'hover:bg-slate-900 hover:border-slate-800' : 'hover:bg-white hover:border-slate-200 hover:shadow-xl'
                }`}>
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <IndustrialSolutions theme={theme} />

        <Internship theme={theme} />

        <CourseCarousel theme={theme} />

        <Mentors theme={theme} />

        <Contact theme={theme} />

        {/* CTA Section */}
        <section className="py-24 px-6 relative overflow-hidden">
           <div className={`max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden ${
             theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500 text-white'
           }`}>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
              
              <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 tracking-tight">
                Ready to level up your code?
              </h2>
              <p className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto font-medium relative z-10">
                Join thousands of students who have already transformed their careers with CodeScaler.
              </p>
              <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-lg transition-all hover:scale-110 active:scale-95 shadow-2xl relative z-10">
                Get Started Today
              </button>
           </div>
        </section>
      </main>

      <Footer theme={theme} />
      <VoiceBot theme={theme} />
    </div>
  );
}
