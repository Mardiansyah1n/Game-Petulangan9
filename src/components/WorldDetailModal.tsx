import React from 'react';
import { World, Level } from '../types/game';
import { sound } from '../utils/audio';
import { X, Play, Star, Lock, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface WorldDetailModalProps {
  world: World;
  levels: Level[];
  onSelectLevel: (level: Level) => void;
  onClose: () => void;
}

export const WorldDetailModal: React.FC<WorldDetailModalProps> = ({
  world,
  levels,
  onSelectLevel,
  onClose
}) => {
  const worldLevels = levels.filter(l =>
    l.worldId === world.id && l.number >= world.levelStart && l.number <= world.levelEnd
  );
  const completedCount = worldLevels.filter(l => l.starsEarned > 0).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300 flex flex-col max-h-[90vh]">
        
        {/* Banner Header */}
        <div
          className="p-5 text-white relative overflow-hidden shadow-md shrink-0"
          style={{ background: `linear-gradient(135deg, ${world.themeColor}, #1e1b4b)` }}
        >
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-yellow-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                Dunia {world.id} dari 5
              </span>
              <h3 className="font-display font-black text-2xl text-yellow-300 drop-shadow">
                {world.name}
              </h3>
              <p className="text-xs text-white/90 font-medium mt-0.5">
                {world.subtitle}
              </p>
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

          <div className="mt-3 flex items-center gap-3 text-xs text-white/80">
            <span className="font-semibold">Progres Dunia:</span>
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all"
                style={{ width: `${(completedCount / world.totalLevels) * 100}%` }}
              />
            </div>
            <span className="font-bold text-yellow-300">{completedCount}/{world.totalLevels} Selesai</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 bg-slate-50 flex-1">
          {/* Description & Focus */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
            <p className="text-slate-700 leading-relaxed font-medium">
              {world.description}
            </p>
            {world.id === 1 && (
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                <p className="font-extrabold text-sky-900">Alur Pulau Bentuk · 3 gerbang</p>
                <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                  {['Pahami', 'Jelajahi', 'Kumpulkan', 'Jawab'].map((step, index) => (
                    <div key={step} className="rounded-lg bg-white px-2 py-1.5 text-center font-bold text-slate-700">
                      <span className="mr-1 text-sky-600">0{index + 1}</span>{step}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-slate-600">
                  Kumpulkan 5 bentuk di setiap gerbang, lalu jawab 5 soal untuk membuka gerbang berikutnya.
                </p>
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-800">Fokus Materi:</span>
              {world.shapeFocus.map((shape, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 font-semibold text-[11px]"
                >
                  {shape}
                </span>
              ))}
            </div>
          </div>

          {/* Levels List */}
          <div>
            <h4 className="font-display font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Daftar Level Pembelajaran
            </h4>

            <div className="space-y-2">
              {worldLevels.map((lvl) => {
                const isPlayable = lvl.isUnlocked;
                const gateName = world.id === 1
                  ? ['Gerbang Pulau Bentuk', 'Lembah Bentuk', 'Hutan Bentuk'][lvl.number - 1]
                  : undefined;

                return (
                  <div
                    key={lvl.id}
                    onClick={() => {
                      if (isPlayable) {
                        sound.playClick();
                        onSelectLevel(lvl);
                        onClose();
                      }
                    }}
                    className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      isPlayable
                        ? "bg-white border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer group"
                        : "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl font-display font-black text-sm flex items-center justify-center shrink-0 shadow-sm ${
                        lvl.starsEarned > 0
                          ? "bg-amber-400 text-amber-950"
                          : isPlayable
                            ? "bg-blue-600 text-white"
                            : "bg-slate-300 text-slate-500"
                      }`}>
                        {lvl.number}
                      </div>

                      <div>
                        {gateName && (
                          <p className="text-[9px] font-extrabold uppercase tracking-wide text-emerald-700">
                            {gateName}
                          </p>
                        )}
                        <h5 className={`font-display font-bold text-sm ${isPlayable ? 'text-slate-800 group-hover:text-blue-600' : 'text-slate-500'}`}>
                          {lvl.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {lvl.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Stars */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= lvl.starsEarned
                                ? "fill-amber-400 text-amber-500"
                                : "text-slate-200 fill-slate-100"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Play / Lock icon */}
                      {isPlayable ? (
                        <button className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 text-center shrink-0">
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
