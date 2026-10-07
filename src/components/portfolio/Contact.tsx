import React, { useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { Mail, Send, Check, Copy, MessageSquare, MapPin, Sparkles, Github, Linkedin, Loader2, AlertCircle } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const email = 'nanh3241@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    // Simulate sending with realistic network feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 700);
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-0.5 bg-cyan-400 inline-block" />
            <span>07 // LIÊN HỆ & KẾT NỐI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Liên hệ Hợp tác & Tuyển dụng
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl">
            Sẵn sàng trao đổi về cơ hội thực tập, vị trí phát triển web hoặc thảo luận các dự án công nghệ mới.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 shadow-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Kênh Liên hệ Trực tiếp</span>
              </h3>

              <div className="space-y-4 text-xs font-mono">
                {/* Email Box with Copy Toast */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Email Trực tiếp</div>
                      <div className="text-slate-200 font-sans font-medium text-xs sm:text-sm mt-0.5">
                        {email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all hover:scale-105 active:scale-95"
                    title="Sao chép email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
                  </button>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Địa điểm</div>
                    <div className="text-slate-200 font-sans font-medium text-xs sm:text-sm mt-0.5">
                      Đồng Nai / TP. Hồ Chí Minh, Việt Nam (GMT+7)
                    </div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Hồ sơ mạng xã hội</div>
                    <div className="text-slate-200 font-sans text-xs mt-0.5">GitHub & LinkedIn</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all hover:scale-105"
                      aria-label="GitHub Profile"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-all hover:scale-105"
                      aria-label="LinkedIn Profile"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Availability status */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="text-xs font-sans">Sẵn sàng nhận cơ hội thực tập & dự án phát triển phần mềm năm 2026.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4"
            >
              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Cảm ơn bạn! Tin nhắn đã được gửi thành công. Tôi sẽ phản hồi lại bạn trong thời gian sớm nhất.</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Họ và tên của bạn <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 text-xs placeholder-slate-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Địa chỉ Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 text-xs placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Tiêu đề tin nhắn
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Cơ hội thực tập / Trao đổi dự án"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 text-xs placeholder-slate-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Nội dung lời nhắn <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Chia sẻ ngắn gọn về thông tin hợp tác hoặc cơ hội của bạn..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 text-xs placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-xs font-mono uppercase tracking-wider text-slate-950 shadow-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer disabled:opacity-60"
                style={{
                  backgroundColor: activeColor,
                  boxShadow: `0 4px 20px ${activeColor}33`,
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <span>Gửi tin nhắn</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
