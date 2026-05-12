import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { Theme, Course } from '../types';

interface CourseCarouselProps {
  theme: Theme;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Web Dev Mastery',
    description: 'Master HTML, CSS, JavaScript, and React from scratch to build professional websites.',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=800&fit=crop',
    instructor: 'Alex Parmar',
    price: '₹1499',
    duration: '24 Weeks',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Data Structures & Algorithms',
    description: 'Learn fundamental data structures and advanced algorithms to crack top-tier interviews.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&fit=crop',
    instructor: 'Sarah Jenkins',
    price: '₹1999',
    duration: '16 Weeks',
    rating: 4.9,
  },
  {
    id: '3',
    title: 'System Design Architecture',
    description: 'Understand how to build scalable distributed systems that can handle millions of users.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&fit=crop',
    instructor: 'Michael Chen',
    price: '₹2499',
    duration: '12 Weeks',
    rating: 4.7,
  },
  {
    id: '4',
    title: 'Advanced Backend with Node.js',
    description: 'Deep dive into server-side development, databases, and high-performance APIs.',
    image: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=800&fit=crop',
    instructor: 'David Miller',
    price: '₹1799',
    duration: '20 Weeks',
    rating: 4.6,
  }
];

export default function CourseCarousel({ theme }: CourseCarouselProps) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % (courses.length - 1));
  const prev = () => setIndex((prev) => (prev - 1 + (courses.length - 1)) % (courses.length - 1));

  return (
    <section id="courses" className={`py-24 px-6 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Courses</span>
            </h2>
            <p className={`text-lg max-w-xl ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
              Handpicked courses curated by industry veterans to help you bridge the gap between theory and practical engineering.
            </p>
          </div>
          <div className="flex gap-4">
            <button
               onClick={prev}
               className={`p-4 rounded-full border transition-all ${
                 theme === 'dark' ? 'border-slate-800 bg-slate-900 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
               }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
               onClick={next}
               className={`p-4 rounded-full border transition-all ${
                 theme === 'dark' ? 'border-slate-800 bg-slate-900 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
               }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${index * 33.33}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                className={`flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] rounded-[2rem] overflow-hidden border group transition-all duration-300 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-indigo-500 shadow-xl' : 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300'
                }`}
              >
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${
                  i % 3 === 0 ? 'from-indigo-900 to-slate-900' : 
                  i % 3 === 1 ? 'from-purple-900 to-slate-900' : 
                  'from-indigo-800 to-slate-900'
                }`}>
                   <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/30">
                      Intermediate
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className={`text-xl font-bold mb-3 line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{course.title}</h3>
                  <p className={`text-sm mb-6 line-clamp-2 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {course.description}
                  </p>

                  <div className={`flex items-center justify-between pt-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                    <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{course.price}</span>
                    <button className={`text-indigo-400 text-sm font-semibold underline hover:text-indigo-300 transition-colors`}>
                      Explore
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
