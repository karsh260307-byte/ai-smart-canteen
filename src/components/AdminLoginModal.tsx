import React, { useState } from 'react';
import { Shield, Key, Lock, ArrowRight, X, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('canteen_staff');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulated authentic authentication delay for realism
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onClose();
    }, 450);
  };

  const handleInstantDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0e1730] border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider mb-1">
              Staff Portal • Demo Mode
            </div>
            <h3 className="text-xl font-bold text-white font-['Poppins']">
              Admin Login / Admin View
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          Access the administrative console to manage queue density, advance digital food tokens, oversee stock availability, and view AI insights.
        </p>

        {/* Simulation Notice */}
        <div className="p-3 mb-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
          <span>
            <strong>Demo Notice:</strong> This is a prototype interface. You can click <strong>Instant Demo Login</strong> directly or submit with pre-filled credentials.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Staff Username / ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#070c1c] border border-slate-700 focus:border-cyan-400 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                placeholder="e.g. staff_manager"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Staff Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#070c1c] border border-slate-700 focus:border-cyan-400 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Instant 1-Click Access Button */}
          <button
            type="button"
            id="instant-demo-admin-login-btn"
            onClick={handleInstantDemoLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Instant Demo Login (Direct Access)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1c2541] hover:bg-[#253258] border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              <span>Sign in with Form Credentials</span>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Simulated Authentication • No real credentials required</span>
        </div>
      </div>
    </div>
  );
};
