import React from 'react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/audio';

type NavTab = 'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil';

interface HomeScreenProps {
  profile: PlayerProfile;
  onOpenMap: () => void;
  onOpenShapes: () => void;
  onOpenMissions: () => void;
  onOpenMaterials: () => void;
  onOpenAchievements: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onSetActiveNavTab: (tab: NavTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  onOpenMap,
  onOpenShapes,
  onOpenMissions,
  onOpenMaterials,
  onOpenAchievements,
  onOpenProfile,
  onOpenSettings,
  onSetActiveNavTab
}) => {
  const playerName = profile.name.replace(/^Siswa\s+/i, '') || profile.name;
  const xpProgress = profile.xpToNextLevel > 0
    ? Math.min(100, (profile.xp / profile.xpToNextLevel) * 100)
    : 0;

  const navigate = (tab: NavTab) => {
    sound.playClick();
    onSetActiveNavTab(tab);
  };

  return (
    <main className="min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="relative mx-auto h-[100dvh] w-full max-w-[56.28dvh] overflow-hidden bg-sky-400 shadow-2xl">
        <img
          src="/assets/aistudio/1._Petualangan_Bangun_Datar_Game_Screen_bb968efc.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-fill"
        />

        <div className="absolute left-[17.7%] top-[1.4%] z-10 flex h-[8.1%] w-[20.5%] flex-col justify-center rounded-lg bg-gradient-to-r from-[#21649e] to-[#1d4c82] pl-1 text-white">
          <span className="text-[clamp(7px,1.3vw,12px)] font-bold leading-tight">Siswa</span>
          <span className="truncate text-[clamp(10px,2vw,18px)] font-extrabold leading-tight">{playerName}</span>
          <span className="mt-0.5 h-[3px] overflow-hidden rounded-full bg-[#123b69]">
            <span className="block h-full rounded-full bg-emerald-400" style={{ width: `${xpProgress}%` }} />
          </span>
          <span className="text-[clamp(7px,1.2vw,11px)] font-bold leading-tight text-blue-100">Level {profile.level}</span>
        </div>

        <span className="absolute left-[59.4%] top-[3.1%] z-10 flex h-[2.2%] w-[6.4%] items-center justify-center rounded-sm bg-[#14508d] text-[clamp(9px,1.8vw,16px)] font-extrabold text-white">
          {profile.stars}
        </span>
        <span className="absolute left-[79.5%] top-[3.1%] z-10 flex h-[2.2%] w-[5.1%] items-center justify-center rounded-sm bg-[#14508d] text-[clamp(9px,1.8vw,16px)] font-extrabold text-white">
          {profile.diamonds}
        </span>

        <button
          type="button"
          aria-label="Buka profil siswa"
          onClick={onOpenProfile}
          className="absolute left-[2%] top-[1.8%] z-20 h-[7.5%] w-[40%] rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
        />
        <button
          type="button"
          aria-label="Buka misi harian"
          onClick={onOpenMissions}
          className="absolute left-[59%] top-[8.2%] z-20 h-[9%] w-[38%] rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
        />
        <button
          type="button"
          aria-label="Lihat jumlah bintang dan misi"
          onClick={onOpenMissions}
          className="absolute left-[51%] top-[2.3%] z-20 h-[5.2%] w-[20%] rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
        />
        <button
          type="button"
          aria-label="Lihat jumlah permata dan misi"
          onClick={onOpenMissions}
          className="absolute left-[73%] top-[2.3%] z-20 h-[5.2%] w-[19%] rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300"
        />
        <button
          type="button"
          aria-label="Buka pengaturan"
          onClick={onOpenSettings}
          className="absolute left-[91.5%] top-[2.2%] z-20 h-[5.5%] w-[7.5%] rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
        />
        <button
          type="button"
          aria-label="Mulai petualangan"
          onClick={onOpenMap}
          className="absolute left-[19%] top-[45.4%] z-20 h-[9.2%] w-[61%] rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
        />
        <button
          type="button"
          aria-label="Kenali bangun datar"
          onClick={onOpenShapes}
          className="absolute left-[1%] top-[61.7%] z-20 h-[8%] w-[28%] rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
        />

        <nav aria-label="Navigasi utama" className="absolute inset-x-0 bottom-0 z-30 h-[10%]">
          <button
            type="button"
            aria-label="Beranda"
            onClick={() => navigate('beranda')}
            className="absolute left-[5%] top-0 h-full w-[19%] rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
          />
          <button
            type="button"
            aria-label="Peta"
            onClick={() => navigate('peta')}
            className="absolute left-[24%] top-0 h-full w-[18%] rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
          />
          <button
            type="button"
            aria-label="Prestasi"
            onClick={onOpenAchievements}
            className="absolute left-[43%] top-0 h-full w-[18%] rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
          />
          <button
            type="button"
            aria-label="Materi"
            onClick={onOpenMaterials}
            className="absolute left-[62%] top-0 h-full w-[18%] rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
          />
          <button
            type="button"
            aria-label="Profil"
            onClick={onOpenProfile}
            className="absolute left-[81%] top-0 h-full w-[17%] rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
          />
        </nav>
      </div>
    </main>
  );
};
