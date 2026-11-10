import React from 'react';
import { sound } from '../utils/audio';
import { X, Volume2, VolumeX, RotateCcw, Info, Heart } from 'lucide-react';

interface SettingsModalProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  soundEnabled,
  onToggleSound,
  onResetProgress,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-lg shadow-inner">
              ⚙️
            </div>
            <h3 className="font-display font-extrabold text-lg text-white">
              Pengaturan Game
            </h3>
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

        {/* Options */}
        <div className="p-5 space-y-4 bg-slate-50">
          
          {/* Sound Toggle */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-800">Efek Suara (SFX)</h4>
                <p className="text-[11px] text-slate-500">Bunyi kuis, bintang, & klik</p>
              </div>
            </div>
            <button
              onClick={() => {
                onToggleSound();
                sound.playClick();
              }}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                soundEnabled ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  soundEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Reset Progress */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-800">Reset Progres</h4>
                <p className="text-[11px] text-slate-500">Kembalikan level ke awal</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm("Apakah kamu yakin ingin mengulang petualangan dari level 1?")) {
                  onResetProgress();
                }
              }}
              className="w-full mt-2 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
            >
              Reset Semua Level
            </button>
          </div>

          {/* About App */}
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-center text-xs text-sky-900 space-y-1">
            <p className="font-display font-bold text-sm text-sky-950">Petualangan Geometri v1.0</p>
            <p className="text-[11px] text-sky-800 flex items-center justify-center gap-1">
              Dibuat dengan <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" /> untuk belajar geometri seru anak-anak
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 text-center">
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
