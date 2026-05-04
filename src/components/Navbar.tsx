import { Sun, Moon, Database, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Courses', href: '#courses' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Internship', href: '#internship' },
    { name: 'Mentors', href: '#mentors' },
    { name: 'Contact', href: '#contact' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950/80 border-b border-slate-800' : 'bg-white/80 border-b border-slate-200'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img 
              src="https://d502jbuhuh9wk.cloudfront.net/logos/6626668ac4fff6266055a815.png?v=4" 
              alt="CodeScaler Logo" 
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              CodeScaler
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  theme === 'dark' ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 border ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800 text-yellow-400 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className={`px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg ${
              theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20' : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/10'
            }`}>
              Login
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'dark' ? 'text-yellow-400' : 'text-zinc-600'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${
              theme === 'dark' ? 'bg-zinc-950 border-b border-zinc-800' : 'bg-white border-b border-zinc-200'
            }`}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block text-lg font-medium transition-colors ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full px-5 py-3 rounded-xl text-md font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all">
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
