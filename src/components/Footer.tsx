import { Github, Twitter, Linkedin, Youtube, Database, MapPin, Mail, Phone } from 'lucide-react';
import { Theme } from '../types';

interface FooterProps {
  theme: Theme;
}

export default function Footer({ theme }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#' },
    { name: 'Github', icon: <Github className="w-5 h-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: '#' },
    { name: 'Youtube', icon: <Youtube className="w-5 h-5" />, href: '#' },
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'Support', href: '#' },
        { name: 'Help Center', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className={`pt-20 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white border-t border-slate-900' : 'bg-slate-50 text-slate-900 border-t border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
             <div className="flex items-center gap-3 mb-6">
                <img 
                  src="https://d502jbuhuh9wk.cloudfront.net/logos/6626668ac4fff6266055a815.png?v=4" 
                  alt="CodeScaler Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-2xl font-bold tracking-tight">CodeScaler</span>
              </div>
              <p className={`mb-8 leading-relaxed ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                Empowering the next generation of software engineers with industry-vetted courses and a community-first approach to learning.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`p-3 rounded-full border transition-all hover:scale-110 active:scale-95 ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-500 shadow-sm'
                    }`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-bold mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-sm font-medium transition-colors ${
                        theme === 'dark' ? 'text-slate-500 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
             <h4 className="text-lg font-bold mb-6">Contact Us</h4>
             <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                    2nd Floor, 43, Housing Board Colony, Shiv Colony, Jind, Haryana 126102
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                    hello@codescaler.in
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                      +91 70158 22199
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                      +91 95881 61422
                    </span>
                  </div>
                </li>
             </ul>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${
          theme === 'dark' ? 'border-slate-900' : 'border-slate-200'
        }`}>
          <p className="text-sm text-slate-500 font-medium">
             &copy; {currentYear} CodeScaler. Made with &#10084; for Developers.
          </p>
          <div className="flex items-center gap-6">
             <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Designed by Ajax</span>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-500 font-medium">Systems Operational</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
