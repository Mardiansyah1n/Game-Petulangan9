import React, { useState } from 'react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/audio';
import { X, User, Edit3, Award, Star, Flame, Check } from 'lucide-react';

interface ProfileModalProps {
  profile: PlayerProfile;
  onUpdateProfile: (name: string, avatar: string) => void;
  onClose: () => void;
}

const AVATARS = [
  "👦", "👧", "🧒", "🧑‍🎓", "🚀", "🦊", "🦁", "🐼"
];

export const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onUpdateProfile, onClose }) => {
  const [name, setName] = useState(profile.name);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    sound.playReward();
    onUpdateProfile(name.trim() || "Siswa", selectedAvatar);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl shadow-inner">
              {profile.avatar}
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-white">
                {profile.name}
              </h3>
              <p className="text-xs text-blue-100 font-semibold">
                Siswa · Level {profile.level} Petualang
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

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto bg-slate-50">
          
          {/* XP Progress Bar */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Progres Level {profile.level}</span>
              <span className="text-blue-600">{profile.xp} / {profile.xpToNextLevel} XP</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (profile.xp / profile.xpToNextLevel) * 100)}%` }}
              />
            </div>
          </div>

          {/* Stats 4-Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500 mx-auto mb-1" />
              <span className="font-display font-extrabold text-lg text-slate-800">{profile.stars}</span>
              <p className="text-[11px] text-slate-500 font-semibold">Total Bintang</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
              <span className="text-xl mx-auto block mb-1">💎</span>
              <span className="font-display font-extrabold text-lg text-slate-800">{profile.diamonds}</span>
              <p className="text-[11px] text-slate-500 font-semibold">Permata</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-400 mx-auto mb-1" />
              <span className="font-display font-extrabold text-lg text-slate-800">{profile.streakDays} Hari</span>
              <p className="text-[11px] text-slate-500 font-semibold">Streak Belajar</p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
              <Award className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <span className="font-display font-extrabold text-lg text-slate-800">{profile.completedLevelsCount} / 30</span>
              <p className="text-[11px] text-slate-500 font-semibold">Level Ditaklukkan</p>
            </div>
          </div>

          {/* Edit Profile Section */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Ubah Profil & Karakter
              </h4>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsEditing(!isEditing);
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                {isEditing ? "Batal" : "Edit"}
              </button>
            </div>

            {isEditing && (
              <div className="space-y-3 pt-2 border-t border-slate-100 animate-in fade-in">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Nama Siswa</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={20}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                    placeholder="Masukkan namamu..."
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Pilih Avatar</label>
                  <div className="flex flex-wrap gap-2">
                    {AVATARS.map(av => (
                      <button
                        key={av}
                        onClick={() => {
                          sound.playClick();
                          setSelectedAvatar(av);
                        }}
                        className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border-2 transition-transform ${
                          selectedAvatar === av
                            ? "border-blue-500 bg-blue-50 scale-110 shadow-sm"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Simpan Perubahan
                </button>
              </div>
            )}
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
