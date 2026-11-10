import React, { useState, useEffect } from 'react';
import { WORLDS, INITIAL_LEVELS, SHAPES_COLLECTION, DAILY_MISSIONS, ACHIEVEMENTS } from './data/gameData';
import { Level, PlayerProfile, DailyMission, ShapeItem, Achievement, World } from './types/game';
import { MapScreen } from './components/MapScreen';
import { HomeScreen } from './components/HomeScreen';
import { LevelQuizModal } from './components/LevelQuizModal';
import { ShapeCollectionModal } from './components/ShapeCollectionModal';
import { DailyMissionModal } from './components/DailyMissionModal';
import { MaterialModal } from './components/MaterialModal';
import { AchievementsModal } from './components/AchievementsModal';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { WorldDetailModal } from './components/WorldDetailModal';
import { PlatformerGameModal } from './components/PlatformerGameModal';
import { ShapeCatcherModal } from './components/ShapeCatcherModal';
import { BottomNavigation } from './components/BottomNavigation';
import { sound } from './utils/audio';

const STORAGE_KEY = 'petualangan_geometri_save_v1';

const hasSeededProgress = () => {
  try {
    const savedProfile = JSON.parse(localStorage.getItem(`${STORAGE_KEY}_profile`) || 'null') as PlayerProfile | null;
    const savedLevels = JSON.parse(localStorage.getItem(`${STORAGE_KEY}_levels`) || '[]') as Level[];
    return savedProfile?.level === 3 && savedProfile.xp === 85 && savedProfile.stars === 120 &&
      savedProfile.activeLevelId === 3 && savedProfile.completedLevelsCount === 2 &&
      savedLevels.find(level => level.id === 1)?.starsEarned === 3 &&
      savedLevels.find(level => level.id === 2)?.starsEarned === 2;
  } catch {
    return false;
  }
};

export default function App() {
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
    if (saved) {
      try {
        if (!hasSeededProgress()) return JSON.parse(saved);
      } catch {}
    }
    return {
      name: "Siswa Rizki",
      title: "Petualang Bentuk",
      avatar: "👦",
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      stars: 50,
      diamonds: 10,
      streakDays: 1,
      activeLevelId: 1,
      highestUnlockedLevel: 1,
      completedLevelsCount: 0
    };
  });

  const [levels, setLevels] = useState<Level[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_levels`);
    if (saved) {
      try {
        if (!hasSeededProgress()) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_LEVELS;
  });

  const [shapes, setShapes] = useState<ShapeItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_shapes`);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return SHAPES_COLLECTION;
  });

  const [missions, setMissions] = useState<DailyMission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_missions`);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return DAILY_MISSIONS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_achievements`);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return ACHIEVEMENTS;
  });

  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active navigation tab
  const [activeNavTab, setActiveNavTab] = useState<'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil'>('beranda');

  // Active modals
  const [activeQuizLevel, setActiveQuizLevel] = useState<Level | null>(null);
  const [pendingQuizLevel, setPendingQuizLevel] = useState<Level | null>(null);
  const [selectedWorldDetail, setSelectedWorldDetail] = useState<World | null>(null);
  const [showPlatformerModal, setShowPlatformerModal] = useState(false);
  const [showCatcherModal, setShowCatcherModal] = useState(false);
  const [showMissionsModal, setShowMissionsModal] = useState(false);
  const [showShapesModal, setShowShapesModal] = useState(false);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Persist state
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_levels`, JSON.stringify(levels));
  }, [levels]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_shapes`, JSON.stringify(shapes));
  }, [shapes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_missions`, JSON.stringify(missions));
  }, [missions]);

  // Handle completing a level
  const handleCompleteLevel = (levelId: number, stars: number, starsEarnedDelta: number, diamondsEarned: number, score: number) => {
    const nextLevelId = levelId === 3 ? 7 : levelId + 1;

    setLevels(prev => {
      return prev.map(lvl => {
        if (lvl.id === levelId) {
          return {
            ...lvl,
            starsEarned: Math.max(lvl.starsEarned, stars)
          };
        }
        if (lvl.id === nextLevelId) {
          return {
            ...lvl,
            isUnlocked: true
          };
        }
        return lvl;
      });
    });

    if (levelId === 3) {
      setShapes(prev => prev.map(s => s.id === 'layang_layang' ? { ...s, unlocked: true } : s));
    } else if (levelId === 4) {
      setShapes(prev => prev.map(s => s.id === 'trapesium' ? { ...s, unlocked: true } : s));
    } else if (levelId >= 7) {
      setShapes(prev => prev.map((s, idx) => idx <= Math.min(prev.length - 1, 8 + levelId - 6) ? { ...s, unlocked: true } : s));
    }

    setProfile(prev => {
      let xpRemainder = prev.xp + score;
      let newLevel = prev.level;

      while (xpRemainder >= prev.xpToNextLevel) {
        newLevel += 1;
        xpRemainder -= prev.xpToNextLevel;
        sound.playUnlock();
      }

      const completed = levels.filter(l => l.starsEarned > 0 || l.id === levelId).length;

      return {
        ...prev,
        level: newLevel,
        xp: xpRemainder,
        stars: prev.stars + (starsEarnedDelta * 20),
        diamonds: prev.diamonds + diamondsEarned,
        completedLevelsCount: completed,
        highestUnlockedLevel: Math.max(prev.highestUnlockedLevel, nextLevelId),
        activeLevelId: Math.max(prev.activeLevelId, nextLevelId)
      };
    });

    setMissions(prev => prev.map(m => {
      if (m.id === 'm1' && stars === 3) {
        return { ...m, current: Math.min(m.target, m.current + 1) };
      }
      return m;
    }));
  };

  // Move to next level directly from quiz modal
  const handleNextLevelFromModal = () => {
    if (!activeQuizLevel) return;
    const nextLevelId = activeQuizLevel.id === 3 ? 7 : activeQuizLevel.id + 1;
    const nextLvl = levels.find(l => l.id === nextLevelId);
    if (nextLvl) {
      setActiveQuizLevel(null);
      setPendingQuizLevel(nextLvl);
      setShowPlatformerModal(true);
    }
  };

  const handleStartLevel = (level: Level) => {
    setPendingQuizLevel(level);
    setShowPlatformerModal(true);
  };

  // Claim Mission Reward
  const handleClaimMission = (missionId: string, rewardType: 'stars' | 'diamonds', amount: number) => {
    setMissions(prev => prev.map(m => m.id === missionId ? { ...m, claimed: true } : m));
    setProfile(prev => ({
      ...prev,
      stars: rewardType === 'stars' ? prev.stars + amount : prev.stars,
      diamonds: rewardType === 'diamonds' ? prev.diamonds + amount : prev.diamonds
    }));
  };

  // Handle winning the 2D Platformer exploration mini-game
  const handleWinPlatformer = (scorePoints: number, coinsEarned: number, starsEarned: number) => {
    setProfile(prev => ({
      ...prev,
      stars: prev.stars + starsEarned * 15,
      diamonds: prev.diamonds + 5,
      xp: prev.xp + scorePoints
    }));
    if (pendingQuizLevel) {
      setActiveQuizLevel(pendingQuizLevel);
      setPendingQuizLevel(null);
    }
    setShowPlatformerModal(false);
  };

  // Handle winning the Shape Catcher arcade game
  const handleWinCatcher = (starsAwarded: number, coinsAwarded: number) => {
    setProfile(prev => ({
      ...prev,
      stars: prev.stars + starsAwarded,
      diamonds: prev.diamonds + 3,
      xp: prev.xp + 30
    }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    localStorage.removeItem(`${STORAGE_KEY}_profile`);
    localStorage.removeItem(`${STORAGE_KEY}_levels`);
    localStorage.removeItem(`${STORAGE_KEY}_shapes`);
    localStorage.removeItem(`${STORAGE_KEY}_missions`);
    localStorage.removeItem(`${STORAGE_KEY}_achievements`);

    setLevels(INITIAL_LEVELS);
    setShapes(SHAPES_COLLECTION);
    setMissions(DAILY_MISSIONS);
    setAchievements(ACHIEVEMENTS);
    setProfile({
      name: "Siswa Rizki",
      title: "Petualang Bentuk",
      avatar: "👦",
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      stars: 50,
      diamonds: 10,
      streakDays: 1,
      activeLevelId: 1,
      highestUnlockedLevel: 1,
      completedLevelsCount: 0
    });
    setShowSettingsModal(false);
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sound.enabled = nextVal;
  };

  return (
    <div className="min-h-screen bg-sky-200 text-slate-800 flex flex-col font-sans">
      
      {/* Active Screen: Map or Home */}
      {activeNavTab === 'beranda' ? (
        <HomeScreen
          profile={profile}
          onOpenMap={() => {
            sound.playClick();
            setActiveNavTab('peta');
          }}
          onOpenShapes={() => {
            sound.playClick();
            setShowShapesModal(true);
          }}
          onOpenMissions={() => {
            sound.playClick();
            setShowMissionsModal(true);
          }}
          onOpenMaterials={() => {
            sound.playClick();
            setShowMaterialsModal(true);
          }}
          onOpenAchievements={() => {
            sound.playClick();
            setShowAchievementsModal(true);
          }}
          onOpenProfile={() => {
            sound.playClick();
            setShowProfileModal(true);
          }}
          onOpenSettings={() => {
            sound.playClick();
            setShowSettingsModal(true);
          }}
          onSetActiveNavTab={setActiveNavTab}
        />
      ) : (
        <MapScreen
          worlds={WORLDS}
          levels={levels}
          profile={profile}
          onSelectLevel={(lvl) => {
            sound.playClick();
            handleStartLevel(lvl);
          }}
          onOpenMissions={() => {
            sound.playClick();
            setShowMissionsModal(true);
          }}
          onOpenShapes={() => {
            sound.playClick();
            setShowShapesModal(true);
          }}
          onOpenSettings={() => {
            sound.playClick();
            setShowSettingsModal(true);
          }}
          onOpenProfile={() => {
            sound.playClick();
            setShowProfileModal(true);
          }}
          onOpenAchievements={() => {
            sound.playClick();
            setShowAchievementsModal(true);
          }}
          onOpenMaterials={() => {
            sound.playClick();
            setShowMaterialsModal(true);
          }}
          onOpenWorldDetail={(w) => {
            sound.playClick();
            setSelectedWorldDetail(w);
          }}
          onOpenPlatformerGame={() => {
            sound.playClick();
            setShowPlatformerModal(true);
          }}
          activeNavTab={activeNavTab}
          setActiveNavTab={setActiveNavTab}
        />
      )}

      {/* 2D PLATFORMER EXPLORATION GAME MODAL (Panel 3) */}
      {showPlatformerModal && (
        <PlatformerGameModal
          onClose={() => setShowPlatformerModal(false)}
          onWinLevel={handleWinPlatformer}
        />
      )}

      {/* SHAPE CATCHER ARCADE MINI-GAME MODAL */}
      {showCatcherModal && (
        <ShapeCatcherModal
          onClose={() => setShowCatcherModal(false)}
          onWinReward={handleWinCatcher}
        />
      )}

      {/* QUIZ MODAL */}
      {activeQuizLevel && (
        <LevelQuizModal
          level={activeQuizLevel}
          onClose={() => setActiveQuizLevel(null)}
          onCompleteLevel={handleCompleteLevel}
          onNextLevel={handleNextLevelFromModal}
          hasNextLevel={levels.some(l => l.id === (activeQuizLevel.id === 3 ? 7 : activeQuizLevel.id + 1))}
        />
      )}

      {/* WORLD DETAIL MODAL */}
      {selectedWorldDetail && (
        <WorldDetailModal
          world={selectedWorldDetail}
          levels={levels}
          onSelectLevel={(lvl) => {
            handleStartLevel(lvl);
          }}
          onClose={() => setSelectedWorldDetail(null)}
        />
      )}

      {/* SHAPES ENCYCLOPEDIA MODAL */}
      {showShapesModal && (
        <ShapeCollectionModal
          shapes={shapes}
          onClose={() => setShowShapesModal(false)}
        />
      )}

      {/* DAILY MISSIONS MODAL */}
      {showMissionsModal && (
        <DailyMissionModal
          missions={missions}
          onClaim={handleClaimMission}
          onClose={() => setShowMissionsModal(false)}
        />
      )}

      {/* MATERIALS & LAB MODAL */}
      {showMaterialsModal && (
        <MaterialModal
          onClose={() => setShowMaterialsModal(false)}
        />
      )}

      {/* ACHIEVEMENTS MODAL */}
      {showAchievementsModal && (
        <AchievementsModal
          achievements={achievements}
          onClose={() => setShowAchievementsModal(false)}
        />
      )}

      {/* PROFILE & AVATAR MODAL */}
      {showProfileModal && (
        <ProfileModal
          profile={profile}
          onUpdateProfile={(newName, newAvatar) => {
            setProfile(prev => ({ ...prev, name: newName, avatar: newAvatar }));
          }}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* SETTINGS MODAL */}
      {showSettingsModal && (
        <SettingsModal
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onResetProgress={handleResetProgress}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* UNIVERSAL PERSISTENT BOTTOM NAVIGATION (Always visible in Beranda, Peta, etc.) */}
      {activeNavTab !== 'beranda' && (
        <BottomNavigation
          activeTab={activeNavTab}
          onChangeTab={(tab) => {
            setActiveNavTab(tab);
          }}
          onOpenAchievements={() => setShowAchievementsModal(true)}
          onOpenMaterials={() => setShowMaterialsModal(true)}
          onOpenProfile={() => setShowProfileModal(true)}
        />
      )}

    </div>
  );
}
