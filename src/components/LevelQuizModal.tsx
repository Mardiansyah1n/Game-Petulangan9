import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Level } from '../types/game';
import { ShapeSvg } from './ShapeSvg';
import { sound } from '../utils/audio';
import {
  Star,
  X,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  Trophy,
  Sparkles,
  ArrowLeft,
  HelpCircle,
  Home
} from 'lucide-react';

interface LevelQuizModalProps {
  level: Level;
  onClose: () => void;
  onCompleteLevel: (levelId: number, stars: number, starsEarnedDelta: number, diamondsEarned: number, score: number) => void;
  onNextLevel?: () => void;
  hasNextLevel?: boolean;
}

export const LevelQuizModal: React.FC<LevelQuizModalProps> = ({
  level,
  onClose,
  onCompleteLevel,
  onNextLevel,
  hasNextLevel = false
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [needsRetry, setNeedsRetry] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);

  const currentQuestion = level.questions[currentQIndex] || level.questions[0];
  const progressPercent = ((currentQIndex + (isAnswerChecked ? 1 : 0)) / level.questions.length) * 100;
  const isLastQuestion = currentQIndex + 1 === level.questions.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);

    const isCorrect = currentQuestion.options[selectedOption].isCorrect;
    if (isCorrect) {
      sound.playCorrect();
      setCorrectCount(prev => prev + 1);
      setScore(prev => prev + 10);
    } else {
      sound.playWrong();
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (!isLastQuestion) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setShowHint(false);
    } else {
      // Completed all questions in the level!
      const total = level.questions.length;
      const finalCorrect = correctCount;
      const ratio = finalCorrect / total;

      let stars = 1;
      if (ratio === 1) stars = 3;
      else if (ratio >= 0.6) stars = 2;

      setEarnedStars(stars);
      setIsFinished(true);

      if (stars < 2) {
        setNeedsRetry(true);
        sound.playWrong();
        return;
      }

      sound.playVictory();

      // Trigger colorful celebration confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6']
        });
      } catch {}

      const starsDelta = Math.max(0, stars - level.starsEarned);
      const diamondsEarned = starsDelta > 0 ? (stars === 3 ? 5 : 2) : 0;
      onCompleteLevel(level.id, stars, starsDelta, diamondsEarned, score);
    }
  };

  const handleRetry = () => {
    sound.playClick();
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setCorrectCount(0);
    setScore(0);
    setLives(3);
    setShowHint(false);
    setIsFinished(false);
    setNeedsRetry(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300 flex flex-col">
        
        {/* ======================================================== */}
        {/* 1. FIXED TOP HEADER BAR                                  */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-3.5 sm:p-4 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-white text-amber-600 font-extrabold flex items-center justify-center text-lg shadow-sm border border-amber-200 shrink-0">
              {level.number}
            </span>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-tight">
                {level.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-amber-950 font-medium">
                {level.topic} · Soal {currentQIndex + 1} dari {level.questions.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-black text-slate-900">
            <span className="rounded-full bg-white/80 px-2.5 py-1">❤️ {lives}</span>
            <span className="rounded-full bg-white/80 px-2.5 py-1">⭐ {score}</span>
          </div>

          {/* Quick Exit / Back Button in Header */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-amber-600/30 hover:bg-amber-600/50 flex items-center justify-center text-white transition-colors shrink-0"
            title="Keluar ke Peta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-amber-100 h-2 shrink-0">
          <div
            className="bg-emerald-500 h-2 transition-all duration-300 rounded-r-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* ======================================================== */}
        {/* 2. SCROLLABLE QUESTION BODY (Never clips or cuts off!)   */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {!isFinished ? (
            <div className="space-y-4">
              
              {/* Question Visual Card */}
              <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-50 to-amber-50/50 rounded-2xl border-2 border-sky-100 shadow-inner">
                {currentQuestion.shapeSvgType && (
                  <div className="mb-2.5 transform hover:scale-105 transition-transform duration-200">
                    <ShapeSvg type={currentQuestion.shapeSvgType} size={110} showLabels={true} />
                  </div>
                )}
                <h4 className="font-display font-extrabold text-base sm:text-lg text-center text-slate-800 leading-snug">
                  {currentQuestion.prompt}
                </h4>
                {currentQuestion.subtext && (
                  <p className="text-xs text-slate-500 text-center mt-1 font-medium">
                    {currentQuestion.subtext}
                  </p>
                )}
              </div>

              {/* Hint Box (Optional toggle) */}
              {showHint && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 animate-in fade-in">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Petunjuk Guru: </span>
                    {currentQuestion.hint}
                  </div>
                </div>
              )}

              {/* Multiple Choice Options List */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  let btnStyle = "bg-white border-2 border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/50";
                  let icon = null;

                  if (selectedOption === idx) {
                    if (isAnswerChecked) {
                      if (opt.isCorrect) {
                        btnStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-900 shadow-md font-semibold";
                        icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-auto" />;
                      } else {
                        btnStyle = "bg-rose-50 border-2 border-rose-500 text-rose-900 shadow-md font-semibold";
                        icon = <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-auto" />;
                      }
                    } else {
                      btnStyle = "bg-amber-100 border-2 border-amber-500 text-amber-900 font-semibold shadow-sm";
                    }
                  } else if (isAnswerChecked && opt.isCorrect) {
                    btnStyle = "bg-emerald-50/70 border-2 border-emerald-400 text-emerald-900 font-medium";
                    icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-auto" />;
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-all duration-150 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-tight">{opt.text}</span>
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation Box (Shown after checking answer) */}
              {isAnswerChecked && selectedOption !== null && (
                <div
                  className={`p-3.5 rounded-xl text-xs animate-in fade-in duration-200 ${
                    currentQuestion.options[selectedOption].isCorrect
                      ? 'bg-emerald-50 text-emerald-900 border-2 border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border-2 border-rose-200'
                  }`}
                >
                  <p className="font-extrabold text-sm flex items-center gap-1.5">
                    {currentQuestion.options[selectedOption].isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Jawabanmu Benar! Hebat! 🎉</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 text-rose-600" />
                        <span>Jawaban Kurang Tepat. Pembahasan:</span>
                      </>
                    )}
                  </p>
                  <p className="mt-1 leading-relaxed text-slate-700">
                    {currentQuestion.options[selectedOption].explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* ======================================================== */
            /* LEVEL COMPLETED SCREEN                                   */
            /* ======================================================== */
            <div className="text-center py-4 space-y-4">
              <div className="inline-flex p-3 bg-amber-100 rounded-full text-amber-600 animate-bounce shadow-md">
                <Trophy className="w-12 h-12" />
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-slate-900">
                  {needsRetry ? 'Ayo Coba Lagi!' : `Level ${level.number} Selesai!`}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {needsRetry
                    ? `Kamu menjawab ${correctCount} dari ${level.questions.length} soal benar. Dapatkan minimal 2 bintang untuk melanjutkan.`
                    : `Kamu berhasil menjawab ${correctCount} dari ${level.questions.length} soal dengan baik!`}
                </p>
              </div>

              {/* Stars Display */}
              <div className="flex items-center justify-center gap-3 my-2">
                {[1, 2, 3].map((starNum) => {
                  const isEarned = starNum <= earnedStars;
                  return (
                    <div
                      key={starNum}
                      className={`transform transition-all duration-500 ${
                        isEarned
                          ? "scale-110 text-amber-400 drop-shadow-md animate-star-pop"
                          : "scale-90 text-slate-200"
                      }`}
                      style={{ animationDelay: `${starNum * 150}ms` }}
                    >
                      <Star className={`w-12 h-12 ${isEarned ? "fill-amber-400" : "fill-slate-200"}`} />
                    </div>
                  );
                })}
              </div>

              {/* Rewards Summary Box */}
              {!needsRetry && <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-200 rounded-2xl p-3.5 max-w-xs mx-auto shadow-sm">
                <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Hadiah Level
                </p>
                <div className="flex items-center justify-around">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                    <span className="font-display font-bold text-base text-slate-800">
                      +{earnedStars * 20} ⭐
                    </span>
                  </div>
                  <div className="w-px h-6 bg-amber-200" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">💎</span>
                    <span className="font-display font-bold text-base text-slate-800">
                      +{earnedStars === 3 ? 5 : 2}
                    </span>
                  </div>
                </div>
              </div>}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 3. STICKY ALWAYS-VISIBLE BOTTOM ACTION FOOTER            */}
        {/* Both "Kembali" and "Lanjut" are always right here!       */}
        {/* ======================================================== */}
        <div className="bg-white border-t-2 border-slate-200 p-3.5 sm:p-4 shadow-lg shrink-0 z-20">
          {!isFinished ? (
            <div className="flex items-center justify-between gap-2.5">
              
              {/* Left Button: Kembali ke Peta / Petunjuk */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  title="Kembali ke Peta"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Kembali</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setShowHint(!showHint);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  title="Petunjuk"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span className="hidden sm:inline">{showHint ? "Tutup" : "Petunjuk"}</span>
                </button>
              </div>

              {/* Right Action Button: Periksa or Lanjut */}
              {!isAnswerChecked ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className={`flex-1 py-3 px-5 rounded-xl font-display font-black text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                    selectedOption === null
                      ? "bg-slate-300 cursor-not-allowed opacity-60"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 shadow-amber-500/20"
                  }`}
                >
                  <span>Periksa Jawaban</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 py-3 px-5 rounded-xl font-display font-black text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>{isLastQuestion ? "Selesai & Lihat Skor" : "Lanjut ke Soal Berikutnya"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

            </div>
          ) : (
            /* Finished Actions */
            <div className="flex flex-col gap-2">
              {hasNextLevel && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onNextLevel?.();
                  }}
                  className="w-full py-3.5 rounded-xl font-display font-black text-sm text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <span>Lanjut ke Level Berikutnya</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRetry}
                  className={`${needsRetry ? 'w-full' : 'flex-1'} py-2.5 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5`}
                >
                  <RotateCcw className="w-4 h-4" />
                  {needsRetry ? 'Ulangi 5 Soal' : 'Main Lagi'}
                </button>
                {!needsRetry && <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Home className="w-4 h-4" />
                  Kembali ke Peta
                </button>}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
