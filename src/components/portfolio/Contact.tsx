import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { Mail, Send, Check, Copy, MessageSquare, MapPin, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings } = useCursor();
  const activeColor = settings.color || '#00F0FF';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = 'nanh3241@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>05 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Together
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl">
            Interested in collaboration, internship opportunities, or discuss a web project? Send me a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 shadow-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Contact Channels</span>
              </h3>

              <div className="space-y-4 text-xs font-mono">
                {/* Email Box with Copy */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Direct Email</div>
                      <div className="text-slate-200 font-sans font-medium text-xs sm:text-sm mt-0.5">
                        {email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Location</div>
                    <div className="text-slate-200 font-sans font-medium text-xs sm:text-sm mt-0.5">
                      Ho Chi Minh City, Vietnam (GMT+7)
                    </div>
                  </div>
                </div>

                {/* Availability status */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-sans">Currently available for summer internships & freelance contracts.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4"
            >
              {submitted && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Thank you! Your message has been simulated and received. I will get back to you shortly.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Nguyen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 text-xs placeholder-slate-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 text-xs placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship opportunity / Project inquiry"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 text-xs placeholder-slate-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a brief overview of your project or inquiry..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 text-xs placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-xs font-mono uppercase tracking-wider text-slate-950 shadow-lg transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: activeColor,
                  boxShadow: `0 4px 20px ${activeColor}33`,
                }}
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
