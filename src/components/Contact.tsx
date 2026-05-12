import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Theme } from '../types';

interface ContactProps {
  theme: Theme;
}

export default function Contact({ theme }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={`py-24 px-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Touch</span>
            </h2>
            <p className={`text-lg mb-12 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Have questions about our programs or want to scale your team? Our experts are here to help you navigate your coding journey.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-indigo-600/10 text-indigo-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Our Office</h4>
                  <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>2nd Floor, 43, Housing Board Colony,<br />Shiv Colony, Jind, Haryana 126102</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-purple-600/10 text-purple-500">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Call Us</h4>
                  <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>+91 70158 22199</p>
                  <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>+91 95881 61422</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-indigo-600/10 text-indigo-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Email Us</h4>
                  <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>hello@codescaler.in</p>
                  <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>support@codescaler.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-8 md:p-12 rounded-[3rem] border relative ${
            theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold">Message Sent!</h3>
                  <p className="text-slate-500">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none focus:border-indigo-500 ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none focus:border-indigo-500 ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Subject</label>
                    <input 
                      required
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Inquiry about DSA course"
                      className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none focus:border-indigo-500 ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Your message here..."
                      className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none focus:border-indigo-500 resize-none ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                      }`}
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                      <AlertCircle className="w-4 h-4" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button 
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-900/40 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
