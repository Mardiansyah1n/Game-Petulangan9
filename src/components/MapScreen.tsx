import React, { useState, useRef } from 'react';
import { World, Level, PlayerProfile } from '../types/game';
import { sound } from '../utils/audio';
import { Star, Settings, ChevronRight, Home, Map as MapIcon, Trophy, BookOpen, User, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface MapScreenProps {
  worlds: World[];
  levels: Level[];
  profile: PlayerProfile;
  onSelectLevel: (level: Level) => void;
  onOpenMissions: () => void;
  onOpenShapes: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onOpenAchievements: () => void;
  onOpenMaterials: () => void;
  onOpenWorldDetail: (world: World) => void;
  onOpenPlatformerGame?: () => void;
  activeNavTab: 'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil';
  setActiveNavTab: (tab: 'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil') => void;
}

// Hotspot definitions aligned with 00_map_screen_reference.png (941 x 1672)
interface NodeHotspot {
  levelNumber: number;
  worldId: number;
  xPct: number; // Center X %
  yPct: number; // Center Y %
  radiusPct: number; // Radius % of width
}

const LEVEL_HOTSPOTS: NodeHotspot[] = [
  // World 1: Pulau Bentuk
  { levelNumber: 1, worldId: 1, xPct: 17.0, yPct: 27.2, radiusPct: 4.8 },
  { levelNumber: 2, worldId: 1, xPct: 31.9, yPct: 27.8, radiusPct: 4.8 },
  { levelNumber: 3, worldId: 1, xPct: 44.6, yPct: 28.4, radiusPct: 4.8 },

  // World 2: Hutan Segi Empat
  { levelNumber: 7, worldId: 2, xPct: 69.1, yPct: 33.8, radiusPct: 4.5 },
  { levelNumber: 8, worldId: 2, xPct: 78.6, yPct: 35.9, radiusPct: 4.5 },
  { levelNumber: 9, worldId: 2, xPct: 89.3, yPct: 36.8, radiusPct: 4.5 },
  { levelNumber: 10, worldId: 2, xPct: 65.9, yPct: 38.9, radiusPct: 4.5 },
  { levelNumber: 11, worldId: 2, xPct: 80.2, yPct: 40.7, radiusPct: 4.5 },
  { levelNumber: 12, worldId: 2, xPct: 94.0, yPct: 40.7, radiusPct: 4.5 },

  // World 3: Pegunungan Segitiga
  { levelNumber: 13, worldId: 3, xPct: 18.6, yPct: 52.9, radiusPct: 4.5 },
  { levelNumber: 14, worldId: 3, xPct: 31.9, yPct: 53.2, radiusPct: 4.5 },
  { levelNumber: 15, worldId: 3, xPct: 44.6, yPct: 54.1, radiusPct: 4.5 },
  { levelNumber: 16, worldId: 3, xPct: 20.2, yPct: 58.6, radiusPct: 4.5 },
  { levelNumber: 17, worldId: 3, xPct: 31.3, yPct: 58.9, radiusPct: 4.5 },
  { levelNumber: 18, worldId: 3, xPct: 43.6, yPct: 58.9, radiusPct: 4.5 },

  // World 4: Danau Lingkaran
  { levelNumber: 19, worldId: 4, xPct: 70.7, yPct: 61.3, radiusPct: 4.5 },
  { levelNumber: 20, worldId: 4, xPct: 82.9, yPct: 62.5, radiusPct: 4.5 },
  { levelNumber: 21, worldId: 4, xPct: 94.0, yPct: 61.6, radiusPct: 4.5 },
  { levelNumber: 22, worldId: 4, xPct: 73.9, yPct: 66.4, radiusPct: 4.5 },
  { levelNumber: 23, worldId: 4, xPct: 85.5, yPct: 67.3, radiusPct: 4.5 },
  { levelNumber: 24, worldId: 4, xPct: 96.2, yPct: 66.1, radiusPct: 4.5 },

  // World 5: Kastil Geometri
  { levelNumber: 25, worldId: 5, xPct: 44.1, yPct: 79.8, radiusPct: 4.5 },
  { levelNumber: 26, worldId: 5, xPct: 53.1, yPct: 80.4, radiusPct: 4.5 },
  { levelNumber: 27, worldId: 5, xPct: 63.8, yPct: 80.1, radiusPct: 4.5 },
  { levelNumber: 28, worldId: 5, xPct: 44.1, yPct: 84.6, radiusPct: 4.5 },
  { levelNumber: 29, worldId: 5, xPct: 54.2, yPct: 85.2, radiusPct: 4.5 },
  { levelNumber: 30, worldId: 5, xPct: 64.3, yPct: 84.6, radiusPct: 4.5 }
];

// World Banners Hotspots on the map
const WORLD_BANNERS = [
  { worldId: 1, leftPct: 7.5, topPct: 16.5, widthPct: 34, heightPct: 5.5 },
  { worldId: 2, leftPct: 58.5, topPct: 24.5, widthPct: 35, heightPct: 5.2 },
  { worldId: 3, leftPct: 9.5, topPct: 44.0, widthPct: 34, heightPct: 5.3 },
  { worldId: 4, leftPct: 61.0, topPct: 51.4, widthPct: 34, heightPct: 5.3 },
  { worldId: 5, leftPct: 30.0, topPct: 70.9, widthPct: 32, heightPct: 5.4 }
];

export const MapScreen: React.FC<MapScreenProps> = ({
  worlds,
  levels,
  profile,
  onSelectLevel,
  onOpenMissions,
  onOpenShapes,
  onOpenSettings,
  onOpenProfile,
  onOpenAchievements,
  onOpenMaterials,
  onOpenWorldDetail,
  onOpenPlatformerGame,
  activeNavTab,
  setActiveNavTab
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredLevel, setHoveredLevel] = useState<Level | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const getLevel = (num: number) => levels.find(l => l.number === num);

  // Focus on a specific world (for classroom teaching presentation)
  const scrollToWorld = (worldId: number) => {
    sound.playClick();
    if (!mapContainerRef.current) return;
    const yTargets: Record<number, number> = {
      1: 0.15,
      2: 0.28,
      3: 0.48,
      4: 0.62,
      5: 0.78
    };
    const targetY = yTargets[worldId] || 0;
    const scrollTarget = mapContainerRef.current.scrollHeight * targetY;
    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 overflow-x-hidden pb-24">
      
      {/* CLASSROOM TEACHING QUICK BAR (Floating on top for quick teacher navigation) */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-sky-600/95 via-blue-600/95 to-indigo-700/95 backdrop-blur-md px-3 py-2 text-white shadow-lg border-b-2 border-amber-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Quick Jump to Worlds */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-bold text-yellow-300 whitespace-nowrap hidden sm:inline mr-1">
              Dunia:
            </span>
            {[
              { id: 1, name: "1. Pulau", emoji: "🏝️" },
              { id: 2, name: "2. Hutan", emoji: "🌲" },
              { id: 3, name: "3. Gunung", emoji: "🏔️" },
              { id: 4, name: "4. Danau", emoji: "🌊" },
              { id: 5, name: "5. Kastil", emoji: "🏰" }
            ].map(w => (
              <button
                key={w.id}
                onClick={() => scrollToWorld(w.id)}
                className="px-2.5 py-1 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-xs font-bold text-white whitespace-nowrap transition-all border border-white/20 flex items-center gap-1"
              >
                <span>{w.emoji}</span>
                <span>{w.name}</span>
              </button>
            ))}
          </div>

          {/* Right: Game, Missions, Shapes & Settings Quick Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenPlatformerGame && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenPlatformerGame();
                }}
                className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-slate-900 text-xs font-black shadow-md flex items-center gap-1 transition-all animate-pulse"
                title="Main Game Petualangan 2D"
              >
                <span>🎮</span>
                <span className="hidden sm:inline">Main Game</span>
              </button>
            )}
            <button
              onClick={() => {
                sound.playClick();
                onOpenMissions();
              }}
              className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-black shadow-sm flex items-center gap-1 transition-all"
            >
              <span>📋</span>
              <span className="hidden sm:inline">Misi</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenShapes();
              }}
              className="px-2.5 py-1 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-black shadow-sm flex items-center gap-1 transition-all"
            >
              <span>💎</span>
              <span className="hidden sm:inline">Bentuk</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenSettings();
              }}
              className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all"
              title="Pengaturan"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MAP CANVAS CONTAINER
          Maintains the exact 941x1672 aspect ratio matching 00_map_screen_reference.png.
          All hotspots sit at exact relative percentages, ensuring 0% drift across devices!
      */}
      <div className="max-w-xl mx-auto px-2 sm:px-4 pt-3 flex justify-center">
        
        <div
          ref={mapContainerRef}
          className="relative w-full aspect-[941/1672] rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300 select-none bg-sky-300"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
        >
          {/* Unified High-Resolution Map Background Graphic */}
          <img
            src="/assets/00_map_screen_reference.png"
            alt="Peta Petualangan Geometri Lengkap"
            className="w-full h-full object-cover block pointer-events-none select-none"
            draggable={false}
          />

          {/* ======================================================== */}
          {/* INTERACTIVE HOTSPOTS ON MAP (TOP BAR & WIDGETS)          */}
          {/* ======================================================== */}
          
          {/* Profile Card Hotspot (Top Left) */}
          <div
            onClick={() => {
              sound.playClick();
              onOpenProfile();
            }}
            style={{ left: '2.5%', top: '1.2%', width: '38%', height: '7.2%' }}
            className="absolute z-20 cursor-pointer rounded-2xl hover:ring-2 hover:ring-amber-300/80 transition-all"
            title="Buka Profil Siswa"
          />

          {/* Stars Currency Hotspot */}
          <div
            onClick={() => {
              sound.playReward();
              onOpenMissions();
            }}
            style={{ left: '52%', top: '1.8%', width: '20%', height: '4.5%' }}
            className="absolute z-20 cursor-pointer rounded-full hover:ring-2 hover:ring-yellow-300/80 transition-all"
            title="Tambah Bintang (Misi Harian)"
          />

          {/* Diamonds Currency Hotspot */}
          <div
            onClick={() => {
              sound.playReward();
              onOpenMissions();
            }}
            style={{ left: '73.5%', top: '1.8%', width: '19.5%', height: '4.5%' }}
            className="absolute z-20 cursor-pointer rounded-full hover:ring-2 hover:ring-cyan-300/80 transition-all"
            title="Tambah Permata (Misi Harian)"
          />

          {/* Settings Gear Hotspot */}
          <div
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            style={{ left: '94%', top: '1.8%', width: '5.8%', height: '4.5%' }}
            className="absolute z-20 cursor-pointer rounded-xl hover:ring-2 hover:ring-white transition-all"
            title="Pengaturan"
          />

          {/* Back Button Hotspot */}
          <div
            onClick={() => {
              sound.playClick();
              setActiveNavTab('beranda');
            }}
            style={{ left: '2.5%', top: '9.8%', width: '9.5%', height: '5.0%' }}
            className="absolute z-20 cursor-pointer rounded-full hover:ring-2 hover:ring-white hover:scale-105 active:scale-95 transition-all"
            title="Kembali ke Beranda"
          />

          {/* Daily Mission Card Hotspot (Top Right) */}
          <div
            onClick={() => {
              sound.playClick();
              onOpenMissions();
            }}
            style={{ left: '73%', top: '7.5%', width: '25.5%', height: '7.5%' }}
            className="absolute z-20 cursor-pointer rounded-2xl hover:ring-2 hover:ring-amber-400 hover:scale-[1.02] active:scale-95 transition-all group"
            title="Buka Misi Hari Ini"
          >
            {/* Subtle glow reminder */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
          </div>

          {/* ======================================================== */}
          {/* CLICKABLE WORLD BANNERS (Opens World Lesson & Levels)    */}
          {/* ======================================================== */}
          {WORLD_BANNERS.map(wb => {
            const world = worlds.find(w => w.id === wb.worldId);
            if (!world) return null;

            return (
              <div
                key={wb.worldId}
                onClick={() => {
                  sound.playClick();
                  onOpenWorldDetail(world);
                }}
                style={{
                  left: `${wb.leftPct}%`,
                  top: `${wb.topPct}%`,
                  width: `${wb.widthPct}%`,
                  height: `${wb.heightPct}%`
                }}
                className="absolute z-20 cursor-pointer rounded-2xl hover:ring-3 hover:ring-yellow-300 hover:scale-[1.03] active:scale-95 transition-all group"
                title={`Pelajari ${world.name}`}
              >
                {/* Glow hint on hover */}
                <div className="absolute inset-0 rounded-2xl bg-yellow-400/0 group-hover:bg-yellow-400/15 transition-colors" />
              </div>
            );
          })}

          {/* ======================================================== */}
          {/* INTERACTIVE LEVEL NODE HOTSPOTS (0% OVERLAP!)            */}
          {/* Hotspots sit exactly on top of the illustrated node      */}
          {/* circles without redrawing clashing opaque background!    */}
          {/* ======================================================== */}
          {LEVEL_HOTSPOTS.map(hs => {
            const level = getLevel(hs.levelNumber);
            if (!level) return null;

            const isPlayable = level.isUnlocked;
            const isCompleted = level.starsEarned > 0;
            const isNextLevel = level.id === profile.activeLevelId;

            return (
              <div
                key={hs.levelNumber}
                style={{
                  left: `${hs.xPct}%`,
                  top: `${hs.yPct}%`,
                  width: `${hs.radiusPct * 2}%`,
                  height: `${hs.radiusPct * 2 * (941 / 1672)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute z-20 flex items-center justify-center"
              >
                <button
                  onClick={() => {
                    sound.playClick();
                    onSelectLevel(level);
                  }}
                  onMouseEnter={() => setHoveredLevel(level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className={`relative w-full h-full rounded-full transition-all duration-150 flex items-center justify-center cursor-pointer ${
                    isNextLevel
                      ? "ring-4 ring-yellow-400 ring-offset-2 ring-offset-sky-400 animate-pulse-glow scale-110"
                      : isCompleted
                        ? "hover:ring-3 hover:ring-emerald-400 hover:scale-110"
                        : isPlayable
                          ? "hover:ring-3 hover:ring-blue-400 hover:scale-110"
                          : "hover:ring-2 hover:ring-slate-300"
                  }`}
                  title={`Level ${level.number}: ${level.title}`}
                >
                  {/* Subtle active highlight badge for the current active hero level */}
                  {isNextLevel && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-md whitespace-nowrap animate-bounce">
                      MAIN!
                    </div>
                  )}

                  {/* Star indicators for completed levels if re-earned */}
                  {isCompleted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 pointer-events-none">
                      {[1, 2, 3].map(s => (
                        <Star
                          key={s}
                          className={`w-2.5 h-2.5 ${
                            s <= level.starsEarned
                              ? "fill-amber-400 text-amber-500 drop-shadow"
                              : "text-slate-300 fill-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              </div>
            );
          })}

          {/* Shape Collection Card Hotspot (Bottom Left, 8/24) */}
          <div
            onClick={() => {
              sound.playClick();
              onOpenShapes();
            }}
            style={{ left: '2.5%', top: '81.6%', width: '28%', height: '7.5%' }}
            className="absolute z-20 cursor-pointer rounded-2xl hover:ring-3 hover:ring-amber-400 hover:scale-105 active:scale-95 transition-all"
            title="Buka Koleksi Bentuk (8 / 24)"
          />

          {/* Bottom Nav Bar Hotspots directly on the map graphic */}
          <div
            onClick={() => {
              sound.playClick();
              setActiveNavTab('beranda');
            }}
            style={{ left: '3.7%', top: '91.8%', width: '18%', height: '7.2%' }}
            className="absolute z-20 cursor-pointer rounded-2xl hover:bg-black/5"
            title="Beranda"
          />

          <div
            onClick={() => {
              sound.playClick();
              setActiveNavTab('peta');
            }}
            style={{ left: '22.5%', top: '91.8%', width: '18%', height: '7.2%' }}
            className="absolute z-20 cursor-pointer rounded-2xl hover:bg-black/5"
            title="Peta Petualangan"
          />

          <div
            onClick={() => {
              sound.playClick();
              onOpenAchievements();
            }}
            style={{ left: '41.5%', top: '91.8%', width: '18%', height: '7.2%' }}
            className="absolute z-20 cursor-pointer rounded-2xl hover:bg-black/5"
            title="Prestasi & Medali"
          />

          <div
            onClick={() => {
              sound.playClick();
              onOpenMaterials();
            }}
            style={{ left: '60.5%', top: '91.8%', width: '18%', height: '7.2%' }}
            className="absolute z-20 cursor-pointer rounded-2xl hover:bg-black/5"
            title="Materi Belajar"
          />

          <div
            onClick={() => {
              sound.playClick();
              onOpenProfile();
            }}
            style={{ left: '79.5%', top: '91.8%', width: '18%', height: '7.2%' }}
            className="absolute z-20 cursor-pointer rounded-2xl hover:bg-black/5"
            title="Profil Siswa"
          />
        </div>
      </div>

    </div>
  );
};

