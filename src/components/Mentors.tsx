import { motion } from 'motion/react';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { Theme } from '../types';

interface MentorProps {
  theme: Theme;
}

const mentors = [
  {
    name: 'Ajay Kumar',
    role: 'CEO',
    image: 'https://picsum.photos/seed/ajay/400/400',
    bio: 'Visionary leader with a passion for scaling tech education globally.',
  },
  {
    name: 'Deepak Kumar',
    role: 'CTO',
    image: 'https://picsum.photos/seed/deepak/400/400',
    bio: 'Technical architect focusing on building scalable learning platforms.',
  },
  {
    name: 'Kirti Pruthi',
    role: 'Team Member',
    image: 'https://picsum.photos/seed/kirti/400/400',
    bio: 'Dedicated to student success and community engagement.',
  },
  {
    name: 'Sumit Sharma',
    role: 'Team Member',
    image: 'https://picsum.photos/seed/sumit/400/400',
    bio: 'Expert in full-stack development and curriculum design.',
  },
  {
    name: 'Sonu Arya',
    role: 'Team Member',
    image: 'https://picsum.photos/seed/sonu/400/400',
    bio: 'Passionate about frontend aesthetics and user experience.',
  },
];

export default function Mentors({ theme }: MentorProps) {
  return (
    <section id="mentors" className={`py-24 px-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Mentors</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Learn from the experts who have scale massive systems and led high-performance teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2rem] border transition-all group ${
                theme === 'dark' ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-500' : 'bg-white border-slate-200 hover:shadow-2xl'
              }`}
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">{mentor.role}</span>
                <h3 className={`text-2xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{mentor.name}</h3>
              </div>
              
              <p className={`text-sm mb-6 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {mentor.bio}
              </p>

              <div className="flex gap-4">
                <a href="#" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
