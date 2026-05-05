import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex font-['DM_Sans',sans-serif]">

      {/* LEFT PANEL — White Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-tct-accent/5 rounded-full -mr-36 -mt-36" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-tct-accent2/5 rounded-full -ml-30 -mb-30" />

        {/* Brand Tag */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="w-6 h-0.5 bg-tct-darker block" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-tct-darker">
            Coconut Tree Trails
          </span>
        </div>

        {/* Center */}
        <div className="relative z-10 flex flex-col items-center text-center gap-7">
          <div className="flex items-center justify-center">
            <img src="/logo-tct.png" alt="TCT Logo" className="h-48 w-auto object-contain" />
          </div>
          <h2 className="text-5xl text-[#0a2630] font-semibold text-tct-darker">
            Start Your<br />Adventure Today
          </h2>
          <p className="text-md text-gray-500 leading-relaxed max-w-[360px] font-light">
            Join our community of travelers and unlock exclusive experiences tailored for you.
          </p>
        </div>

        {/* Bottom Quote */}
        <div className="relative z-10 border-t border-[#e8edf0] pt-5">
          <p className="font-['Cormorant_Garamond',serif] text-[15px] italic text-gray-400 leading-relaxed justify-center flex">
            "Travel is the only thing you buy that makes you richer."
          </p>
        </div>
      </div>

      {/* RIGHT PANEL — Dark Form */}
      <div className="flex-1 flex items-center justify-center px-12 py-12 bg-[#0a2630] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/[0.015] rounded-full -ml-40 -mb-40" />

        <div className="w-full max-w-[400px] relative z-10 mt-15">

          {/* Header */}
          <div className="mb-11">
            <h1 className="text-[40px] font-semibold text-white leading-none mb-2">
              Create Account
            </h1>
            <p className="text-sm text-[#6b8c97] font-light">Join the community of explorers</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-[#6b8c97] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={e => update('fullName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-[18px] py-3.5 bg-white/[0.04] border border-white/[0.09] rounded-[10px] text-white text-sm placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-200"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-[#6b8c97] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="you@example.com"
                className="w-full px-[18px] py-3.5 bg-white/[0.04] border border-white/[0.09] rounded-[10px] text-white text-sm placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-200"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-[#6b8c97] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-[18px] py-3.5 bg-white/[0.04] border border-white/[0.09] rounded-[10px] text-white text-sm placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-200"
              />
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-[#6b8c97] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-[18px] py-3.5 bg-white/[0.04] border border-white/[0.09] rounded-[10px] text-white text-sm placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-[#6b8c97] mb-2">
                  Confirm
                </label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={e => update('confirm', e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-[18px] py-3.5 bg-white/[0.04] border border-white/[0.09] rounded-[10px] text-white text-sm placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-3.5 h-3.5 accent-[#5fa8b8] cursor-pointer"
              />
              <label htmlFor="terms" className="text-[12px] text-[#6b8c97] font-light cursor-pointer">
                I agree to the <span className="text-[#5fa8b8]">Terms & Conditions</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-[#0a2630] py-[15px] rounded-[10px] text-sm font-semibold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-[#e8f4f7]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#0a2630]/20 border-t-[#0a2630] rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3.5 my-8">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[11px] text-white/20 tracking-[0.1em] uppercase">or</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-9">
            {[
              { label: 'Google', icon: <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
              { label: 'Apple', icon: <svg className="w-[15px] h-[15px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> }
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center gap-2 py-3 bg-white/[0.04] border border-white/[0.08] rounded-[10px] text-[13px] text-white/55 font-normal transition-colors duration-200 hover:bg-white/[0.07] hover:border-white/[0.14]"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Login Link */}
          <p className="text-center text-[13px] text-white/30">
            Already have an account?{' '}
            <Link to="/login" className="text-[#5fa8b8] font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
