import React from 'react';
import { Achievement } from '../types/game';
import { sound } from '../utils/audio';
import { X, Trophy, Star, CheckCircle } from 'lucide-react';

interface AchievementsModalProps {
  achievements: Achievement[];
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ achievements, onClose }) => {
  const completedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shadow-inner">
              🏆
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-white">
                Prestasi & Medali
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                {completedCount} dari {achievements.length} Medali Terbuka
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Achievement List */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto bg-slate-50">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-3.5 rounded-2xl border-2 flex items-center gap-3.5 transition-all ${
                ach.unlocked
                  ? "bg-amber-50/70 border-amber-300 shadow-sm"
                  : "bg-white border-slate-200 opacity-60"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-200 flex items-center justify-center text-2xl shadow-inner shrink-0 border border-amber-300">
                {ach.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display font-bold text-sm text-slate-800 truncate">
                    {ach.title}
                  </h4>
                  {ach.unlocked && (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {ach.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Rewards info */}
              <div className="text-right shrink-0 text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-1 rounded-xl">
                +{ach.rewardStars} ⭐
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-slate-200 text-center">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl font-display font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
