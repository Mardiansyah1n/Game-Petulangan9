import React from 'react';
import confetti from 'canvas-confetti';
import { DailyMission } from '../types/game';
import { sound } from '../utils/audio';
import { X, Check, Gift, Sparkles, Star } from 'lucide-react';

interface DailyMissionModalProps {
  missions: DailyMission[];
  onClaim: (missionId: string, rewardType: 'stars' | 'diamonds', amount: number) => void;
  onClose: () => void;
}

export const DailyMissionModal: React.FC<DailyMissionModalProps> = ({ missions, onClaim, onClose }) => {
  const handleClaim = (mission: DailyMission) => {
    sound.playReward();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch {}
    onClaim(mission.id, mission.rewardType, mission.rewardAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shadow-inner">
              📋
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Misi Hari Ini
              </h3>
              <p className="text-xs text-amber-950 font-medium">
                Selesaikan misi & klaim bintang serta permata gratis!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-amber-600/30 hover:bg-amber-600/50 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Login Gift Banner */}
        <div className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50 border-b border-sky-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center shadow-md animate-bounce">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-slate-800">
                Bonus Kehadiran Harian
              </h4>
              <p className="text-xs text-slate-500">Streak Hari ke-3 (+50 ⭐)</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Sudah Diambil
          </span>
        </div>

        {/* Missions List */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto bg-slate-50">
          {missions.map(mission => {
            const isCompleted = mission.current >= mission.target;
            const percent = Math.min(100, Math.round((mission.current / mission.target) * 100));

            return (
              <div
                key={mission.id}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  mission.claimed
                    ? "bg-slate-100 border-slate-200 opacity-60"
                    : isCompleted
                      ? "bg-emerald-50/60 border-emerald-300 shadow-sm"
                      : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-800">
                      {mission.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {mission.description}
                    </p>
                  </div>

                  {/* Reward Badge */}
                  <div className="shrink-0 flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-xl text-xs font-bold border border-amber-200">
                    {mission.rewardType === 'stars' ? (
                      <>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>+{mission.rewardAmount}</span>
                      </>
                    ) : (
                      <>
                        <span>💎</span>
                        <span>+{mission.rewardAmount}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress Bar & Claim Button */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                      <span>Progres</span>
                      <span>{mission.current} / {mission.target}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isCompleted ? "bg-emerald-500" : "bg-amber-400"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  {mission.claimed ? (
                    <span className="text-xs font-bold text-slate-400 px-3 py-1.5">
                      Selesai
                    </span>
                  ) : isCompleted ? (
                    <button
                      onClick={() => handleClaim(mission)}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-display font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5 animate-pulse"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Klaim!
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 px-2">
                      Belum
                    </span>
                  )}
                </div>
              </div>
            );
          })}
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
