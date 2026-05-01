import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-tct-dark">
      {/* Hero Contact */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tct-darker/90 via-tct-dark/70 to-tct-dark" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <p className="section-label mb-4">Get In Touch</p>
            <h1 className="font-display text-6xl font-black text-tct-white">
              We'd Love to Hear From You
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Contact Info */}
            <div className="space-y-4">
              {[
                { icon: '✉️', label: 'Email Us', value: 'voyage@cinematichorizon.com' },
                { icon: '📞', label: 'Call Us', value: '+1 (555) 234-8890' },
                { icon: '📍', label: 'Our Studio', value: '402 Midnight Ave, Nordic District, IC' },
              ].map(item => (
                <div key={item.label} className="tct-card rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tct-mid flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="section-label text-[10px] mb-0.5">{item.label}</p>
                    <p className="text-tct-white text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 mt-4">
                {['🌐', '🎬', '▶'].map((icon, i) => (
                  <button key={i} className="w-11 h-11 rounded-full border border-tct-mid flex items-center justify-center text-tct-muted hover:border-tct-accent2 hover:text-tct-accent2 transition-colors">
                    {icon}
                  </button>
                ))}
              </div>

              {/* Logo */}
              <div className="pt-8">
                <img src="/images/logo-tct.png" alt="TCT Logo" className="h-24 w-auto opacity-40" />
              </div>
            </div>

            {/* Right Form */}
            <div className="tct-card rounded-2xl p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-5xl mb-4">✉️</div>
                  <h3 className="font-display text-2xl text-tct-white mb-2">Message Sent!</h3>
                  <p className="text-tct-muted">We'll reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="section-label text-[10px] mb-2 block">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="John Voyager"
                        className="tct-input text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="section-label text-[10px] mb-2 block">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        placeholder="john@midnight.com"
                        className="tct-input text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="section-label text-[10px] mb-2 block">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => update('subject', e.target.value)}
                      placeholder="Inquiry about Nordic Expedition"
                      className="tct-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="section-label text-[10px] mb-2 block">Message</label>
                    <textarea
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      placeholder="Tell us about your dream journey..."
                      rows={6}
                      className="tct-input text-sm resize-none"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-4 text-sm">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
