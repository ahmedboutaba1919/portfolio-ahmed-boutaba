import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AdminDashboard } from './admin/AdminDashboard';
import { Lock, ShieldAlert, ArrowLeft, Code2 } from 'lucide-react';

export const AdminStandalonePage = () => {
  const { isAdminAuthenticated, loginAdmin, profile } = usePortfolio();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const ok = loginAdmin(pin);
    if (!ok) {
      setError(true);
      setPin('');
    } else {
      setError(false);
    }
  };

  const goToPublicSite = () => {
    window.location.hash = '';
  };

  if (isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans">
        <header className="bg-[#0b101f] border-b border-white/10 py-3 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">Panneau Administrateur — {profile.name}</span>
              <span className="block text-[11px] text-emerald-400 font-mono">Espace Privé Sécurisé</span>
            </div>
          </div>

          <button
            onClick={goToPublicSite}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voir le site public</span>
          </button>
        </header>

        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center p-4 bg-grid-pattern">
      
      <div className="w-full max-w-md bg-[#0d1322] border border-white/15 rounded-2xl p-8 shadow-2xl space-y-6 relative">
        
        <button
          onClick={goToPublicSite}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au Portfolio Public</span>
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-white">Espace Administrateur Privé</h1>
          <p className="text-xs text-slate-400">
            Cette page est strictement réservée à <strong>{profile.name}</strong> pour la gestion de ses projets et contenus.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Code PIN d'Accès</label>
            <input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Code par défaut: 1234"
              className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-center text-xl tracking-widest font-mono text-white focus:outline-none focus:border-emerald-400"
            />
            {error && (
              <p className="text-xs text-rose-400 mt-2 text-center flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Code PIN incorrect. Veuillez réessayer.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
          >
            Accéder à mon Espace Admin
          </button>
        </form>

        <div className="border-t border-white/5 pt-4 text-center">
          <p className="text-[11px] text-slate-500">
            *Code PIN initial : <code className="text-slate-300 font-bold">1234</code> (modifiable dans l'admin)
          </p>
        </div>

      </div>

    </div>
  );
};
