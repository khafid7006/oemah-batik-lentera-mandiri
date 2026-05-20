import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import logoUrl from './1logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.error || 'Email atau password salah. Cek kredensial Supabase Anda.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem saat mencoba login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-batik-cream flex items-center justify-center p-4">
      <div className="batik-pattern absolute inset-0 opacity-[0.03] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 relative z-10 border border-batik-brown/5"
      >
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 flex justify-center">
            <img 
              src={logoUrl} 
              alt="Oemah Batik Lentera Mandiri Logo" 
              className="w-28 h-28 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            />
          </div>
          <h1 className="font-serif text-3xl font-bold text-batik-brown mb-2">Admin Dashboard</h1>
          <p className="text-batik-brown/50 text-sm">Masuk untuk mengelola konten website</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-500 text-xs p-4 rounded-2xl mb-6 border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-batik-brown/30" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark"
                placeholder="example@lentera.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-batik-brown/60 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-batik-brown/30" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-4 bg-batik-cream rounded-2xl border-none focus:ring-2 focus:ring-batik-gold text-batik-dark"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-batik-dark text-batik-cream py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-batik-brown transition-all shadow-xl flex items-center justify-center group disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2" size={18} /> Masuk...
              </span>
            ) : (
              <>
                Masuk <LogIn size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] text-batik-brown/30 uppercase tracking-[0.2em]">Oemah Batik Lentera Mandiri &copy; 2026</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
