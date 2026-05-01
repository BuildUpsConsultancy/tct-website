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
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-[45%] flex-col justify-between p-10 bg-tct-darker relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tct-darker via-tct-darker/80 to-tct-darker" />

        <div className="relative z-10">
          <span className="font-mono-custom text-xs tracking-widest text-tct-muted uppercase">Coconut Tree Trails</span>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <img src="/logococnut.png" alt="TCT Logo" className="h-40 w-auto opacity-60 animate-float" />
        </div>

        <div className="relative z-10">
          <p className="font-display text-2xl italic text-tct-text leading-relaxed mb-4">
            "The night is not the end of the journey, but the beginning of a different light."
          </p>
          <div className="w-10 h-0.5 bg-red-400 rounded-full" />
          <p className="text-tct-muted text-xs mt-4">© 2024 The Midnight Voyager. Cinematic Editorial Travel.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-8 py-16 bg-[#eef3f8]">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-10 text-center">
            <h1 className="font-display text-4xl font-bold text-tct-darker mb-2">Create Your Account</h1>
            <p className="text-gray-500 text-sm">Join the exclusive circle of nocturnal explorers.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={e => update('fullName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-tct-darker placeholder-gray-400 focus:outline-none focus:border-tct-accent2 focus:ring-2 focus:ring-tct-accent2/20 transition-all text-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="voyager@midnight.com"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-tct-darker placeholder-gray-400 focus:outline-none focus:border-tct-accent2 focus:ring-2 focus:ring-tct-accent2/20 transition-all text-sm"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-tct-darker placeholder-gray-400 focus:outline-none focus:border-tct-accent2 focus:ring-2 focus:ring-tct-accent2/20 transition-all text-sm"
              />
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-tct-darker placeholder-gray-400 focus:outline-none focus:border-tct-accent2 focus:ring-2 focus:ring-tct-accent2/20 transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Confirm</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={e => update('confirm', e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-tct-darker placeholder-gray-400 focus:outline-none focus:border-tct-accent2 focus:ring-2 focus:ring-tct-accent2/20 transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-tct-darker text-tct-white py-4 rounded-xl font-semibold text-sm tracking-widest uppercase hover:bg-tct-navy transition-colors disabled:opacity-60"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-mono text-gray-400 tracking-widest">OR SIGN UP WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
              <span>🔍</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
              <span>☁️</span> Apple
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-tct-darker font-bold hover:text-tct-accent2 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
