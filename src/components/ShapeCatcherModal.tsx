import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { X, Play, RotateCcw, Trophy, Star, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface ShapeCatcherModalProps {
  onClose: () => void;
  onWinReward: (stars: number, coins: number) => void;
}

interface FallingItem {
  id: number;
  type: 'triangle' | 'square' | 'circle' | 'bomb';
  x: number;
  y: number;
  speed: number;
  size: number;
  caught: boolean;
}

export const ShapeCatcherModal: React.FC<ShapeCatcherModalProps> = ({
  onClose,
  onWinReward
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [gameState, setGameState] = useState<'playing' | 'gameover' | 'victory'>('playing');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [lives, setLives] = useState(3);
  const [currentTarget, setCurrentTarget] = useState<'triangle' | 'square' | 'circle'>('triangle');

  const basketRef = useRef({ x: 250, width: 80, height: 26 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;
    const WIDTH = 600;
    const HEIGHT = 420;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const items: FallingItem[] = [];

    // Target rotation interval
    const targets: ('triangle' | 'square' | 'circle')[] = ['triangle', 'square', 'circle'];
    const targetInterval = setInterval(() => {
      const nextT = targets[Math.floor(Math.random() * targets.length)];
      setCurrentTarget(nextT);
      sound.playCollectShape();
    }, 10000);

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          clearInterval(targetInterval);
          setGameState('victory');
          sound.playVictory();
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          } catch {}
          onWinReward(25, 50);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Mouse & Touch tracking for basket
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const scaleX = WIDTH / rect.width;
      const mouseX = (clientX - rect.left) * scaleX;
      basketRef.current.x = Math.max(0, Math.min(WIDTH - basketRef.current.width, mouseX - basketRef.current.width / 2));
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    // Game Loop
    const loop = () => {
      tick++;

      if (gameState === 'playing') {
        // Spawn falling shapes every 28 frames
        if (tick % 28 === 0) {
          const randType = Math.random();
          let type: FallingItem['type'] = 'triangle';
          if (randType < 0.3) type = 'triangle';
          else if (randType < 0.6) type = 'square';
          else if (randType < 0.85) type = 'circle';
          else type = 'bomb';

          items.push({
            id: Math.random(),
            type,
            x: Math.random() * (WIDTH - 40) + 20,
            y: -20,
            speed: Math.random() * 2 + 3.2,
            size: 22,
            caught: false
          });
        }

        // Update items
        for (const item of items) {
          if (!item.caught) {
            item.y += item.speed;

            // Check collision with basket
            const basket = basketRef.current;
            if (
              item.y + item.size >= HEIGHT - basket.height - 10 &&
              item.y <= HEIGHT - 10 &&
              item.x >= basket.x - 10 &&
              item.x <= basket.x + basket.width + 10
            ) {
              item.caught = true;
              if (item.type === currentTarget) {
                // Correct target shape!
                sound.playReward();
                setScore(s => s + 20);
              } else if (item.type === 'bomb') {
                // Bomb caught!
                sound.playWrong();
                setLives(l => {
                  if (l <= 1) {
                    setGameState('gameover');
                    return 0;
                  }
                  return l - 1;
                });
              } else {
                // Wrong shape caught
                sound.playClick();
                setScore(s => Math.max(0, s - 5));
              }
            }
          }
        }
      }

      // --- RENDER ---
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      bg.addColorStop(0, '#38bdf8');
      bg.addColorStop(1, '#bae6fd');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Draw Falling Items
      for (const item of items) {
        if (!item.caught && item.y < HEIGHT + 30) {
          if (item.type === 'triangle') {
            ctx.fillStyle = '#f59e0b';
            ctx.strokeStyle = '#b45309';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(item.x, item.y - item.size);
            ctx.lineTo(item.x + item.size, item.y + item.size);
            ctx.lineTo(item.x - item.size, item.y + item.size);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          } else if (item.type === 'square') {
            ctx.fillStyle = '#3b82f6';
            ctx.strokeStyle = '#1d4ed8';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.roundRect(item.x - item.size + 3, item.y - item.size + 3, item.size * 2 - 6, item.size * 2 - 6, 4);
            ctx.fill();
            ctx.stroke();
          } else if (item.type === 'circle') {
            ctx.fillStyle = '#ef4444';
            ctx.strokeStyle = '#991b1b';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(item.x, item.y, item.size - 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else if (item.type === 'bomb') {
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.arc(item.x, item.y, item.size - 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.arc(item.x + 3, item.y - 12, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw Basket (Player Catcher)
      const basket = basketRef.current;
      const bGrad = ctx.createLinearGradient(basket.x, HEIGHT - basket.height - 10, basket.x, HEIGHT - 10);
      bGrad.addColorStop(0, '#facc15');
      bGrad.addColorStop(1, '#ca8a04');
      ctx.fillStyle = bGrad;
      ctx.strokeStyle = '#854d0e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(basket.x, HEIGHT - basket.height - 10, basket.width, basket.height, 10);
      ctx.fill();
      ctx.stroke();

      // Basket label
      ctx.fillStyle = '#713f12';
      ctx.font = 'bold 12px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('KOTAK BENTUK', basket.x + basket.width / 2, HEIGHT - 18);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(timer);
      clearInterval(targetInterval);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [gameState, currentTarget]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-300 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-3 sm:p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧺</span>
            <div>
              <h3 className="font-display font-black text-lg text-slate-900 leading-tight">
                Tangkap Bentuk Ajaib!
              </h3>
              <p className="text-xs text-amber-950 font-bold">
                Waktu: {timeLeft}s · Skor: {score} Poin
              </p>
            </div>
          </div>

          {/* Current Mission Target Badge */}
          <div className="bg-white/95 px-3 py-1.5 rounded-2xl border-2 border-amber-300 shadow-sm flex items-center gap-2 animate-pulse">
            <span className="text-[11px] font-extrabold text-slate-700">TANGKAP:</span>
            <span className="font-display font-black text-xs text-blue-700">
              {currentTarget === 'triangle' ? '🔺 SEGITIGA' : currentTarget === 'square' ? '🟦 PERSEGI' : '🔴 LINGKARAN'}
            </span>
          </div>

          {/* Lives & Close */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-rose-500">
              {[...Array(3)].map((_, i) => (
                <Heart key={i} className={`w-4 h-4 ${i < lives ? "fill-rose-500" : "text-slate-300 fill-slate-200"}`} />
              ))}
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-amber-600/30 hover:bg-amber-600/50 flex items-center justify-center text-white ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative w-full aspect-[600/420] bg-sky-100 flex items-center justify-center overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full object-contain block select-none cursor-ew-resize" />

          {/* Game Over / Victory Overlay */}
          {gameState !== 'playing' && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center animate-in fade-in">
              <Trophy className="w-14 h-14 text-yellow-400 mb-2 animate-bounce" />
              <h3 className="font-display font-black text-2xl text-yellow-300 mb-1">
                {gameState === 'victory' ? 'Permainan Selesai! 🎉' : 'Coba Lagi! 💥'}
              </h3>
              <p className="text-sm text-slate-200 mb-4">
                Skor Akhirmu: <span className="font-bold text-yellow-300 text-lg">{score} Poin</span>!
              </p>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    sound.playClick();
                    setGameState('playing');
                    setScore(0);
                    setTimeLeft(30);
                    setLives(3);
                  }}
                  className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-display font-black text-xs rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Main Lagi
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions footer */}
        <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-600 font-semibold">
          💡 Geser mouse atau jari di layar untuk menggerakkan Kotak Bentuk. Hindari bom hitam!
        </div>
      </div>
    </div>
  );
};
