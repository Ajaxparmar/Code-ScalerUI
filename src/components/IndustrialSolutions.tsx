import { motion } from 'motion/react';
import { Globe, Smartphone, Lightbulb, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Theme } from '../types';

interface IndustrialSolutionsProps {
  theme: Theme;
}

const solutions = [
  {
    title: 'Custom Web Ecosystems',
    description: 'We build high-performance, SEO-optimized web applications that act as the backbone of your digital presence.',
    icon: <Globe className="w-8 h-8" />,
    color: 'indigo'
  },
  {
    title: 'Native Mobile Apps',
    description: 'Transform your business into a mobile powerhouse with seamless iOS and Android experiences tailored for your users.',
    icon: <Smartphone className="w-8 h-8" />,
    color: 'purple'
  },
  {
    title: 'Digital Transformation',
    description: 'Automate legacy processes with modern cloud solutions and AI-driven workflows designed for industrial scale.',
    icon: <Zap className="w-8 h-8" />,
    color: 'emerald'
  }
];

export default function IndustrialSolutions({ theme }: IndustrialSolutionsProps) {
  return (
    <section id="solutions" className={`py-24 px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5">
        <div className="grid grid-cols-10 h-full w-full">
           {[...Array(100)].map((_, i) => (
             <div key={i} className="border-[0.5px] border-slate-500" />
           ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
              <Lightbulb className="w-4 h-4" />
              For Industries & Startups
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-tight">
              Scaling Businesses with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 font-serif italic">Precision Engineering</span>
            </h2>
            <p className={`text-lg mb-10 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Beyond education, we are your strategic technology partners. We help industries transition from legacy systems to modern, scalable web and mobile solutions that drive real business growth.
            </p>
            
            <div className="space-y-4">
              {[
                'Enterprise-grade security standards',
                'Scalable architecture specialized for high traffic',
                'User-centric design that converts curiosity into loyalty',
                'Seamless integration with your existing CRM/ERP'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>{item}</span>
                </div>
              ))}
            </div>

            <button className="mt-12 group flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-900/40">
              Request a Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-[2.5rem] border transition-all hover:translate-x-2 ${
                  theme === 'dark' ? 'bg-slate-900/40 border-slate-800 hover:border-indigo-500/50' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`w-16 h-16 rounded-3xl mb-6 flex items-center justify-center ${
                   solution.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-500' :
                   solution.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                   'bg-emerald-500/10 text-emerald-500'
                }`}>
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Impact Counter */}
        <div className={`p-12 rounded-[3.5rem] border text-center ${
          theme === 'dark' ? 'bg-slate-900/20 border-slate-800' : 'bg-indigo-50 border-indigo-100'
        }`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Industries Helped', value: '50+' },
              { label: 'Custom Apps Built', value: '120+' },
              { label: 'Scale Capability', value: '1M+ req/s' },
              { label: 'Client Satisfaction', value: '100%' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black text-indigo-500 mb-2">{stat.value}</div>
                <div className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
