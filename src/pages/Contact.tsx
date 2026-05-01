import { useState } from 'react';
import type { FormEvent } from 'react';
import { Globe2, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#081b22] text-white">
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d484d] via-[#16383c] to-[#0a1f24]" />
        <div className="absolute inset-0 bg-[url('/images/image_1.png')] bg-cover bg-center opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#102b30]/35 to-[#081b22]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-8 md:pb-24">
          <div className="text-center pt-6 md:pt-10">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-[#f5f0e8]/90">GET IN TOUCH</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[0.95] text-white md:text-6xl lg:text-[4.2rem]">
              We&apos;d Love to Hear From You
            </h1>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">
            <div className="space-y-4 lg:pt-8">
              {[
                { icon: Mail, label: 'Email Us', value: 'voyage@cinematichorizon.com' },
                { icon: Phone, label: 'Call Us', value: '+1(555) 234–8890' },
                { icon: MapPin, label: 'Our Studio', value: '402 Midnight Ave, Nordic District, IC' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-xl bg-[#152339]/90 px-5 py-4 shadow-lg shadow-black/25 transition-transform duration-300 hover:-translate-y-0.5">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md bg-[#567aa1] text-[#dbeeff]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{item.label}</p>
                        <p className="mt-0.5 text-sm text-white/85">{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex gap-3 pl-1 pt-4">
                {[Globe2, Mail, Phone].map((Icon, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8fc0ff]/55 text-[#8fc0ff] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8fc0ff] hover:text-[#081b22]"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>

              <div className="pt-8 md:pt-14">
                <img src="/logococnut.png" alt="The Coconut Tree Trails" className="h-24 w-auto opacity-90 md:h-28" />
              </div>
            </div>

            <div className="rounded-2xl bg-[#132238]/90 p-6 shadow-2xl shadow-black/30 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-white/85">FULL NAME</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="John Voyager"
                      className="h-11 w-full rounded-md border border-black/25 bg-[#0a1322] px-4 text-sm text-white placeholder:text-white/18 outline-none transition focus:border-[#8fc0ff]/55"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-white/85">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="john@midnight.com"
                      className="h-11 w-full rounded-md border border-black/25 bg-[#0a1322] px-4 text-sm text-white placeholder:text-white/18 outline-none transition focus:border-[#8fc0ff]/55"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-white/85">SUBJECT</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => update('subject', e.target.value)}
                    placeholder="Inquiry about Nordic Expedition"
                    className="h-11 w-full rounded-md border border-black/25 bg-[#0a1322] px-4 text-sm text-white placeholder:text-white/18 outline-none transition focus:border-[#8fc0ff]/55"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-white/85">MESSAGE</label>
                  <textarea
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Tell us about your dream journey..."
                    rows={7}
                    className="w-full rounded-md border border-black/25 bg-[#0a1322] px-4 py-3 text-sm text-white placeholder:text-white/18 outline-none transition focus:border-[#8fc0ff]/55"
                  />
                </div>

                <button type="submit" className="mt-2 w-full rounded-full bg-[#f5f0e8] py-4 text-sm font-semibold text-[#1a202d] transition hover:brightness-95">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <img src="/logococnut.png" alt="The Coconut Tree Trails" className="w-[220px] opacity-90 md:w-[260px]" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
