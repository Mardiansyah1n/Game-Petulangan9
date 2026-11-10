import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import {
  X,
  Play,
  RotateCcw,
  Trophy,
  ArrowRight,
  Pause,
  Sparkles,
  Star,
  CheckCircle2,
  Flag,
  HelpCircle,
  Home
} from 'lucide-react';

interface PlatformerGameModalProps {
  onClose: () => void;
  onWinLevel: (score: number, coinsEarned: number, stars: number) => void;
}

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Collectible {
  id: number;
  type: 'triangle' | 'square' | 'circle' | 'coin';
  x: number;
  y: number;
  radius: number;
  collected: boolean;
  floatOffset: number;
}

export const PlatformerGameModal: React.FC<PlatformerGameModalProps> = ({
  onClose,
  onWinLevel
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'quiz' | 'victory'>('playing');
  const [coins, setCoins] = useState(0);
  const [shapesCollected, setShapesCollected] = useState({ triangle: 0, square: 0, circle: 0 });
  const [score, setScore] = useState(0);

  // Controls state
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({
    left: false,
    right: false,
    jump: false
  });

  // Target shapes requirement to clear stage
  const TARGET_TOTAL = 5;
  const currentTotalCollected = shapesCollected.triangle + shapesCollected.square + shapesCollected.circle;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let tick = 0;

    // Set virtual resolution
    const V_WIDTH = 750;
    const V_HEIGHT = 450;
    canvas.width = V_WIDTH;
    canvas.height = V_HEIGHT;

    // Player (Triangle Hero)
    const player = {
      x: 60,
      y: 280,
      width: 42,
      height: 44,
      vx: 0,
      vy: 0,
      speed: 4.8,
      jumpForce: -11.5,
      grounded: false,
      facingRight: true,
      walkFrame: 0
    };

    // Platforms matching asset sheet floating cliffs
    const platforms: Platform[] = [
      { x: 30, y: 350, width: 170, height: 60 },
      { x: 230, y: 310, width: 130, height: 50 },
      { x: 380, y: 250, width: 120, height: 50 },
      { x: 520, y: 330, width: 120, height: 50 },
      { x: 650, y: 270, width: 180, height: 60 } // Destination platform with flag
    ];

    // Collectibles placed on platforms
    const collectibles: Collectible[] = [
      { id: 1, type: 'triangle', x: 120, y: 290, radius: 15, collected: false, floatOffset: 0 },
      { id: 2, type: 'coin', x: 160, y: 280, radius: 10, collected: false, floatOffset: 1 },
      { id: 3, type: 'square', x: 290, y: 250, radius: 15, collected: false, floatOffset: 2 },
      { id: 4, type: 'coin', x: 340, y: 220, radius: 10, collected: false, floatOffset: 3 },
      { id: 5, type: 'circle', x: 440, y: 190, radius: 15, collected: false, floatOffset: 4 },
      { id: 6, type: 'coin', x: 480, y: 180, radius: 10, collected: false, floatOffset: 5 },
      { id: 7, type: 'triangle', x: 570, y: 270, radius: 15, collected: false, floatOffset: 6 },
      { id: 8, type: 'square', x: 610, y: 260, radius: 15, collected: false, floatOffset: 7 },
      { id: 9, type: 'coin', x: 700, y: 210, radius: 10, collected: false, floatOffset: 8 }
    ];

    // Flagpole on right platform
    const flag = { x: 740, y: 210, reached: false };

    // Keyboard event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Main Game Loop
    const loop = () => {
      tick++;

      if (gameState === 'playing') {
        // --- 1. UPDATE PHYSICS ---
        // Horizontal Movement
        if (keysRef.current.left) {
          player.vx = -player.speed;
          player.facingRight = false;
          player.walkFrame += 0.2;
        } else if (keysRef.current.right) {
          player.vx = player.speed;
          player.facingRight = true;
          player.walkFrame += 0.2;
        } else {
          player.vx *= 0.75;
          if (Math.abs(player.vx) < 0.1) player.vx = 0;
        }

        // Jump
        if (keysRef.current.jump && player.grounded) {
          player.vy = player.jumpForce;
          player.grounded = false;
          sound.playJump();
        }

        // Gravity
        player.vy += 0.58;
        if (player.vy > 12) player.vy = 12;

        // Apply movement
        player.x += player.vx;
        player.y += player.vy;

        // Boundary constraint
        if (player.x < 10) player.x = 10;
        if (player.x > V_WIDTH - player.width - 10) {
          player.x = V_WIDTH - player.width - 10;
        }

        // Platform collisions
        player.grounded = false;
        for (const plat of platforms) {
          // Check falling through top edge
          if (
            player.x + player.width > plat.x + 6 &&
            player.x < plat.x + plat.width - 6 &&
            player.y + player.height >= plat.y &&
            player.y + player.height <= plat.y + 18 &&
            player.vy >= 0
          ) {
            player.y = plat.y - player.height;
            player.vy = 0;
            player.grounded = true;
          }
        }

        // Respawn if fell off platform (as mentioned in collage: "Tidak ada hukuman permanen, respawn di checkpoint")
        if (player.y > V_HEIGHT + 30) {
          player.x = 60;
          player.y = 280;
          player.vx = 0;
          player.vy = 0;
          sound.playWrong();
        }

        // Collectibles check
        for (const item of collectibles) {
          if (!item.collected) {
            const dx = (player.x + player.width / 2) - item.x;
            const dy = (player.y + player.height / 2) - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < item.radius + 20) {
              item.collected = true;
              if (item.type === 'coin') {
                sound.playReward();
                setCoins(c => c + 1);
                setScore(s => s + 20);
              } else {
                sound.playCollectShape();
                const shapeKey = item.type as 'triangle' | 'square' | 'circle';
                setShapesCollected(prev => ({
                  ...prev,
                  [shapeKey]: prev[shapeKey] + 1
                }));
                setScore(s => s + 50);
              }
            }
          }
        }

        // Flag reach check
        const flagDx = (player.x + player.width / 2) - flag.x;
        const flagDy = (player.y + player.height / 2) - flag.y;
        const collectedShapeCount = collectibles.filter(item => item.type !== 'coin' && item.collected).length;
        if (collectedShapeCount >= TARGET_TOTAL && Math.abs(flagDx) < 35 && Math.abs(flagDy) < 55) {
          // Trigger the final challenge question
          setGameState('quiz');
          sound.playVictory();
        }
      }

      // --- 2. RENDER GRAPHICS ---
      ctx.clearRect(0, 0, V_WIDTH, V_HEIGHT);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, V_HEIGHT);
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(0.6, '#bae6fd');
      skyGrad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

      // Distant mountains & Castle silhouette
      ctx.fillStyle = 'rgba(186, 230, 253, 0.7)';
      ctx.beginPath();
      ctx.moveTo(0, 320);
      ctx.lineTo(160, 180);
      ctx.lineTo(320, 320);
      ctx.lineTo(460, 200);
      ctx.lineTo(600, 320);
      ctx.lineTo(750, 220);
      ctx.lineTo(750, 450);
      ctx.lineTo(0, 450);
      ctx.fill();

      // Castle on distant right cliff
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(660, 120, 60, 70);
      ctx.fillRect(645, 140, 20, 50);
      ctx.fillRect(715, 140, 20, 50);
      // Castle roofs
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(690, 80);
      ctx.lineTo(660, 120);
      ctx.lineTo(720, 120);
      ctx.fill();

      // Waterfalls below platforms
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillRect(110, 360, 20, 90);
      ctx.fillRect(300, 320, 16, 130);
      ctx.fillRect(430, 260, 18, 190);

      // Draw Platforms (Grassy cliff style)
      for (const plat of platforms) {
        // Brown cliff body
        ctx.fillStyle = '#854d0e';
        ctx.beginPath();
        ctx.roundRect(plat.x, plat.y + 12, plat.width, plat.height - 12, [0, 0, 16, 16]);
        ctx.fill();

        // Shading on cliff
        ctx.fillStyle = '#713f12';
        ctx.fillRect(plat.x + 8, plat.y + 20, plat.width - 16, plat.height - 28);

        // Lush green grass top
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.roundRect(plat.x - 3, plat.y, plat.width + 6, 16, 8);
        ctx.fill();

        // Grass highlight
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(plat.x + 4, plat.y + 2, plat.width - 8, 4);
      }

      // Draw Collectibles
      for (const item of collectibles) {
        if (!item.collected) {
          const bob = Math.sin((tick + item.floatOffset * 15) * 0.08) * 5;
          const cy = item.y + bob;

          if (item.type === 'coin') {
            // Gold Coin
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(item.x, cy, item.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Coin inner star
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(item.x, cy, item.radius - 3.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (item.type === 'triangle') {
            // Golden Triangle
            ctx.fillStyle = '#eab308';
            ctx.beginPath();
            ctx.moveTo(item.x, cy - item.radius);
            ctx.lineTo(item.x + item.radius, cy + item.radius);
            ctx.lineTo(item.x - item.radius, cy + item.radius);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#ca8a04';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          } else if (item.type === 'square') {
            // Blue Square
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.roundRect(item.x - item.radius + 2, cy - item.radius + 2, (item.radius - 2) * 2, (item.radius - 2) * 2, 4);
            ctx.fill();
            ctx.strokeStyle = '#1d4ed8';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          } else if (item.type === 'circle') {
            // Red Circle
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(item.x, cy, item.radius - 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#b91c1c';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }
        }
      }

      // Draw Goal Flag
      ctx.fillStyle = '#64748b';
      ctx.fillRect(flag.x - 2, flag.y, 4, 60);
      // Flag banner (red waving)
      const flagWave = Math.sin(tick * 0.1) * 3;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(flag.x + 2, flag.y);
      ctx.lineTo(flag.x + 36 + flagWave, flag.y + 12);
      ctx.lineTo(flag.x + 2, flag.y + 24);
      ctx.closePath();
      ctx.fill();

      // Draw Player (Triangle Hero mascot)
      ctx.save();
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
      if (!player.facingRight) ctx.scale(-1, 1);

      // Blue Backpack
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(-24, -4, 10, 18, 3);
      ctx.fill();

      // Yellow Triangle Body
      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(20, 18);
      ctx.lineTo(-20, 18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cheerful Eyes
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(-5, 0, 3.5, 0, Math.PI * 2);
      ctx.arc(7, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Eye reflections
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-4, -1, 1.5, 0, Math.PI * 2);
      ctx.arc(8, -1, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(1, 6, 5, 0.1 * Math.PI, 0.9 * Math.PI, false);
      ctx.stroke();

      // Animated Boots
      const legOffset = Math.sin(player.walkFrame) * 6;
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-12, 17, 7, 7 + (player.grounded ? legOffset : 0));
      ctx.fillRect(5, 17, 7, 7 - (player.grounded ? legOffset : 0));

      ctx.restore();

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Touch handlers for mobile buttons
  const startLeft = () => { keysRef.current.left = true; };
  const stopLeft = () => { keysRef.current.left = false; };
  const startRight = () => { keysRef.current.right = true; };
  const stopRight = () => { keysRef.current.right = false; };
  const triggerJump = () => {
    keysRef.current.jump = true;
    setTimeout(() => { keysRef.current.jump = false; }, 150);
  };

  const handleFinishVictory = () => {
    sound.playVictory();
    setGameState('victory');
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
    onWinLevel(score, coins + 12, 3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-sky-300 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300 flex flex-col max-h-[95vh]">
        
        {/* ======================================================== */}
        {/* TOP STATUS BAR (Panel 3 UI)                              */}
        {/* ======================================================== */}
        <div className="bg-sky-600/90 backdrop-blur-md px-3 sm:px-5 py-2.5 text-white flex items-center justify-between shadow-md shrink-0 border-b-2 border-sky-400">
          
          {/* Pause / Exit button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setGameState(g => g === 'paused' ? 'playing' : 'paused');
              }}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              {gameState === 'paused' ? <Play className="w-5 h-5 fill-white ml-0.5" /> : <Pause className="w-5 h-5" />}
            </button>
            <span className="font-display font-black text-sm text-yellow-300 hidden sm:inline">
              Petualangan Si Segitiga
            </span>
          </div>

          {/* Goal Mission Target Card */}
          <div className="bg-white/95 text-slate-800 px-3 py-1.5 rounded-2xl shadow-sm border border-sky-200 flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-slate-700 hidden sm:inline">
              Kumpulkan Bentuk:
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <span title="Segitiga" className="flex items-center gap-0.5">🔺 {shapesCollected.triangle}</span>
              <span title="Persegi" className="flex items-center gap-0.5">🟦 {shapesCollected.square}</span>
              <span title="Lingkaran" className="flex items-center gap-0.5">🔴 {shapesCollected.circle}</span>
            </div>
            <span className="text-xs font-black text-blue-600 ml-1">
              {Math.min(TARGET_TOTAL, currentTotalCollected)}/{TARGET_TOTAL}
            </span>
          </div>

          {/* Coins & Stars */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 bg-amber-400/90 text-amber-950 px-2.5 py-1 rounded-xl font-bold text-xs shadow-inner">
              <span>🪙</span>
              <span>{coins}</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* GAME CANVAS AREA                                         */}
        {/* ======================================================== */}
        <div className="relative flex-1 bg-sky-200 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[400px]">
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-h-[500px] object-contain block shadow-inner"
          />

          {/* Paused Overlay */}
          {gameState === 'paused' && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white z-30">
              <h3 className="font-display font-black text-2xl text-yellow-300 mb-2">Permainan Dijeda ⏸️</h3>
              <p className="text-xs text-blue-100 mb-4">Gunakan tombol panah atau tombol layar untuk bergerak dan melompat!</p>
              <button
                onClick={() => setGameState('playing')}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black text-sm text-white shadow-lg"
              >
                Lanjutkan Main
              </button>
            </div>
          )}

          {/* All collected shapes unlock the five-question level quiz. */}
          {gameState === 'quiz' && (
            <div className="absolute inset-0 z-40 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-amber-300 shadow-2xl text-center space-y-4">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black rounded-full uppercase">
                  🏁 Semua Bentuk Terkumpul!
                </span>
                <h3 className="font-display font-black text-lg text-slate-800">
                  Hebat! Kamu berhasil mengumpulkan lima bentuk.
                </h3>
                <p className="text-sm text-slate-600">
                  Sekarang jawab lima soal untuk menyelesaikan gerbang ini.
                </p>
                <button
                  onClick={handleFinishVictory}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-display font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Mulai Kuis 5 Soal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* VICTORY RESULT SCREEN (Panel 5 in Collage) */}
          {gameState === 'victory' && (
            <div className="absolute inset-0 z-40 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
              <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-amber-300 shadow-2xl text-center space-y-4">
                
                {/* Banner */}
                <div className="inline-block px-5 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl shadow-md border-2 border-amber-200">
                  <h3 className="font-display font-black text-xl text-amber-950 uppercase">
                    Level Selesai! 🎉
                  </h3>
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center gap-2 text-amber-400">
                  <Star className="w-10 h-10 fill-amber-400 animate-star-pop" />
                  <Star className="w-12 h-12 fill-amber-400 animate-star-pop -mt-2" />
                  <Star className="w-10 h-10 fill-amber-400 animate-star-pop" />
                </div>

                {/* Mascot Icon */}
                <div className="w-24 h-24 mx-auto animate-float-hero">
                  <img
                    src="/assets/22_triangle_hero_map_crop.png"
                    alt="Hero"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Score & Rewards Box (Matching Panel 5) */}
                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 text-xs space-y-2">
                  <div className="flex justify-between items-center px-2">
                    <span className="font-bold text-slate-600 flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      Skor Total
                    </span>
                    <span className="font-display font-black text-base text-slate-800">{score + 460} 🪙</span>
                  </div>
                  <div className="flex justify-between items-center px-2 border-t border-slate-200 pt-1.5">
                    <span className="font-bold text-slate-600 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Pengalaman (XP)
                    </span>
                    <span className="font-display font-black text-base text-purple-700">+100 XP</span>
                  </div>
                  <div className="flex justify-between items-center px-2 border-t border-slate-200 pt-1.5">
                    <span className="font-bold text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Tantangan
                    </span>
                    <span className="font-bold text-emerald-700">Berhasil Tuntas!</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onClose();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-display font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Lanjutkan ke Peta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setGameState('playing');
                      setCoins(0);
                      setShapesCollected({ triangle: 0, square: 0, circle: 0 });
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Ulangi Game
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* TOUCH CONTROLS ON-SCREEN (Panel 3 UI)                    */}
        {/* ======================================================== */}
        <div className="bg-sky-600/95 px-4 py-3 border-t-2 border-sky-400 flex items-center justify-between shrink-0 select-none">
          {/* Left & Right D-Pad Buttons */}
          <div className="flex items-center gap-3">
            <button
              onMouseDown={startLeft}
              onMouseUp={stopLeft}
              onTouchStart={startLeft}
              onTouchEnd={stopLeft}
              className="w-14 h-14 rounded-2xl bg-white/20 active:bg-white/40 border-2 border-white/60 text-white font-black text-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              ⬅️
            </button>
            <button
              onMouseDown={startRight}
              onMouseUp={stopRight}
              onTouchStart={startRight}
              onTouchEnd={stopRight}
              className="w-14 h-14 rounded-2xl bg-white/20 active:bg-white/40 border-2 border-white/60 text-white font-black text-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              ➡️
            </button>
          </div>

          <div className="text-center hidden sm:block">
            <p className="text-[11px] font-bold text-sky-100">Keyboard: Panah Kiri/Kanan & Spasi untuk Lompat</p>
          </div>

          {/* Jump Button */}
          <button
            onMouseDown={triggerJump}
            onTouchStart={triggerJump}
            className="w-16 h-14 rounded-2xl bg-gradient-to-b from-amber-400 to-yellow-500 active:from-amber-500 active:to-yellow-600 border-2 border-amber-200 text-slate-900 font-display font-black text-base flex items-center justify-center gap-1 shadow-xl active:scale-95 transition-transform"
          >
            <span>⬆️</span>
            <span>Lompat</span>
          </button>
        </div>

      </div>
    </div>
  );
};
