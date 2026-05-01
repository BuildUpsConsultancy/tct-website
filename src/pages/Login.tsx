import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-[45%] flex-col justify-between p-10 bg-tct-darker relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tct-darker via-tct-darker/80 to-tct-darker" />

        {/* Logo */}
        <div className="relative z-10">
          <span className="font-mono-custom text-xs tracking-widest text-tct-muted uppercase">Coconut Tree Trails</span>
        </div>

        {/* Big Logo Center */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <img src="/logococnut.png" alt="TCT Logo" className="h-40 w-auto opacity-60 animate-float" />
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <p className="font-display text-2xl italic text-tct-text leading-relaxed mb-4">
            "The night is not the end of the journey, but the beginning of a different light."
          </p>
          <div className="w-10 h-0.5 bg-red-400 rounded-full" />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-8 py-16 bg-[#eef3f8]">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-10">
            <h1 className="font-display text-4xl font-bold text-tct-darker mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to access your global itinerary.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✉</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="voyager@night.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-tct-darker placeholder-gray-400 focus:outline-none focus:border-tct-accent2 focus:ring-2 focus:ring-tct-accent2/20 transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">Password</label>
                <button type="button" className="text-xs text-tct-accent2 hover:underline">Forgot Password?</button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-tct-darker placeholder-gray-400 focus:outline-none focus:border-tct-accent2 focus:ring-2 focus:ring-tct-accent2/20 transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-tct-darker text-tct-white py-4 rounded-xl font-semibold text-sm tracking-wide hover:bg-tct-navy transition-colors disabled:opacity-60"
            >
              {loading ? 'Authenticating...' : 'Login to Dashboard'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-mono text-gray-400 tracking-widest">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
              <span>🔍</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
              <span>🍎</span> Apple
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center mt-8 text-sm text-gray-500">
            New to the voyage?{' '}
            <Link to="/register" className="text-tct-darker font-bold hover:text-tct-accent2 transition-colors">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
