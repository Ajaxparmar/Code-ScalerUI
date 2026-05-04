import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, GraduationCap, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Theme } from '../types';

interface InternshipProps {
  theme: Theme;
}

export default function Internship({ theme }: InternshipProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    course: '',
    semester: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/internship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', college: '', course: '', semester: '' });
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
    <section id="internship" className={`py-24 px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Decorative SEO content for bots */}
      <div className="sr-only">
        <h1>Best Industrial Internship in Jind and Hisar, Haryana</h1>
        <p>CodeScaler provides hands-on industrial training and internships in Web Development, App Development, and Software Engineering for college students in Jind, Hisar, Rohtak, and across Haryana. Join our summer and winter training programs.</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
              <Sparkles className="w-4 h-4" />
              Apply for Internship 2026
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-tight">
              Bridge the Gap <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">From College to Career</span>
            </h2>
            <p className={`text-lg mb-10 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              CodeScaler's flagship internship program is designed specifically for students in **Jind, Hisar, and Rohtak (Haryana)**. We provide real industrial projects, mentorship from CEO Ajay Kumar and CTO Deepak Kumar, and certificates that matter.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { icon: <MapPin className="w-5 h-5" />, title: 'Local Offices', p: 'Jind & Hisar' },
                { icon: <Briefcase className="w-5 h-5" />, title: 'Real Projects', p: 'Experience Industry Standards' },
                { icon: <GraduationCap className="w-5 h-5" />, title: 'Placement Aid', p: 'Dedicated Support' },
                { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Certification', p: 'Industrial Standards' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{item.title}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{item.p}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h5 className="font-bold mb-3 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-emerald-500" />
                Why Choose CodeScaler Internship in Haryana?
              </h5>
              <p className="text-sm text-slate-500 leading-relaxed">
                Most students in Jind and Hisar struggle with quality technical guidance. We bring Tier-1 city mentorship to your doorstep. Our interns work on live apps built using React, Node.js, and MongoDB.
              </p>
            </div>
          </div>

          <div className={`p-8 md:p-12 rounded-[3.5rem] border shadow-2xl transition-all ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 shadow-emerald-950/20' : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Application Received!</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    Thanks for applying. Our recruitment team from the Haryana office will contact you soon for an interview.
                  </p>
                </motion.div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your full name"
                      className={`w-full px-5 py-3.5 rounded-xl border outline-none focus:border-emerald-500 transition-all ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-sm'
                      }`}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Email</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="email@example.com"
                        className={`w-full px-5 py-3.5 rounded-xl border outline-none focus:border-emerald-500 transition-all ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-sm'
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>College Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.college}
                        onChange={(e) => setFormData({...formData, college: e.target.value})}
                        placeholder="CRSU / GJU / KU"
                        className={`w-full px-5 py-3.5 rounded-xl border outline-none focus:border-emerald-500 transition-all ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-sm'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Course</label>
                      <input 
                        required
                        type="text" 
                        value={formData.course}
                        onChange={(e) => setFormData({...formData, course: e.target.value})}
                        placeholder="B.Tech"
                        className={`w-full px-5 py-3.5 rounded-xl border outline-none focus:border-emerald-500 transition-all ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-sm'
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>Semester</label>
                      <input 
                        required
                        type="text" 
                        value={formData.semester}
                        onChange={(e) => setFormData({...formData, semester: e.target.value})}
                        placeholder="6th"
                        className={`w-full px-5 py-3.5 rounded-xl border outline-none focus:border-emerald-500 transition-all ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-sm'
                        }`}
                      />
                    </div>
                  </div>

                  <button 
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Apply Now'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
                    Internships target students from Haryana specifically Jind and Hisar
                  </p>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
