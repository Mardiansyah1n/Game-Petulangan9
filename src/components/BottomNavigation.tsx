import React from 'react';
import { sound } from '../utils/audio';
import { Home, Map as MapIcon, Trophy, BookOpen, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil';
  onChangeTab: (tab: 'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil') => void;
  onOpenAchievements: () => void;
  onOpenMaterials: () => void;
  onOpenProfile: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onChangeTab,
  onOpenAchievements,
  onOpenMaterials,
  onOpenProfile
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-sky-300 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] py-2 px-3 sm:px-8">
      <div className="max-w-md mx-auto flex items-center justify-between">
        
        {/* Beranda */}
        <button
          onClick={() => {
            sound.playClick();
            onChangeTab('beranda');
          }}
          className={`flex flex-col items-center gap-1 transition-all flex-1 py-1 ${
            activeTab === 'beranda'
              ? "text-blue-600 scale-105"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-colors ${
              activeTab === 'beranda'
                ? 'bg-blue-100 text-blue-600 shadow-sm'
                : 'hover:bg-slate-100'
            }`}
          >
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span
            className={`font-display text-[10px] sm:text-[11px] ${
              activeTab === 'beranda' ? 'font-extrabold text-blue-700' : 'font-bold'
            }`}
          >
            Beranda
          </span>
        </button>

        {/* Peta */}
        <button
          onClick={() => {
            sound.playClick();
            onChangeTab('peta');
          }}
          className={`flex flex-col items-center gap-1 transition-all flex-1 py-1 ${
            activeTab === 'peta'
              ? "text-blue-600 scale-105"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <div
            className={`px-3 sm:px-4 py-1.5 rounded-2xl transition-all ${
              activeTab === 'peta'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                : 'hover:bg-slate-100'
            }`}
          >
            <MapIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span
            className={`font-display text-[10px] sm:text-[11px] ${
              activeTab === 'peta' ? 'font-extrabold text-blue-700' : 'font-bold'
            }`}
          >
            Peta
          </span>
        </button>

        {/* Prestasi */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenAchievements();
          }}
          className="flex flex-col items-center gap-1 transition-all flex-1 py-1 text-slate-500 hover:text-slate-800"
        >
          <div className="p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="font-display font-bold text-[10px] sm:text-[11px]">
            Prestasi
          </span>
        </button>

        {/* Materi */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenMaterials();
          }}
          className="flex flex-col items-center gap-1 transition-all flex-1 py-1 text-slate-500 hover:text-slate-800"
        >
          <div className="p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="font-display font-bold text-[10px] sm:text-[11px]">
            Materi
          </span>
        </button>

        {/* Profil */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenProfile();
          }}
          className="flex flex-col items-center gap-1 transition-all flex-1 py-1 text-slate-500 hover:text-slate-800"
        >
          <div className="p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="font-display font-bold text-[10px] sm:text-[11px]">
            Profil
          </span>
        </button>

      </div>
    </nav>
  );
};
