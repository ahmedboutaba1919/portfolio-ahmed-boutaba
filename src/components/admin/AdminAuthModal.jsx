import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, X, KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AdminAuthModal = () => {
  const { isAdminModalOpen, setIsAdminModalOpen, loginAdmin } = usePortfolio();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(pin);
    if (!success) {
      setError(true);
      setPin('');
    } else {
      setError(false);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#0d1322] border border-white/15 rounded-2xl p-6 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAdminModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Espace Administrateur</h3>
          <p className="text-xs text-slate-400">
            Entrez votre code d'accès administrateur pour gérer vos projets et vos réglages.
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Code PIN / Mot de passe</label>
            <input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Code par défaut: 1234"
              className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-center text-lg tracking-widest font-mono text-white focus:outline-none focus:border-emerald-400"
            />
            {error && (
              <p className="text-xs text-rose-400 mt-2 text-center flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Code incorrect. Veuillez réessayer.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all"
          >
            Se Connecter
          </button>

          <p className="text-[11px] text-slate-500 text-center">
            *Code par défaut initial : <code className="text-slate-400 font-bold">1234</code> (modifiable dans l'admin)
          </p>
        </form>

      </div>
    </div>
  );
};
