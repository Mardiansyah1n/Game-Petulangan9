import React, { useState } from 'react';
import { ShapeItem } from '../types/game';
import { ShapeSvg } from './ShapeSvg';
import { sound } from '../utils/audio';
import { X, Lock, Sparkles, BookOpen, Calculator, Globe2 } from 'lucide-react';

interface ShapeCollectionModalProps {
  shapes: ShapeItem[];
  onClose: () => void;
}

export const ShapeCollectionModal: React.FC<ShapeCollectionModalProps> = ({ shapes, onClose }) => {
  const [selectedShape, setSelectedShape] = useState<ShapeItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Bangun Datar Dasar', 'Segi Empat', 'Segitiga', 'Bangun Lengkung', 'Bangun Ruang'];
  const unlockedCount = shapes.filter(s => s.unlocked).length;

  const filteredShapes = shapes.filter(s => {
    if (filterCategory === 'Semua') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-amber-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-4 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner">
              📦
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-white drop-shadow-sm">
                Koleksi Bentuk Geometri
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                Terkumpul {unlockedCount} dari {shapes.length} Bentuk Geometri
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-amber-50 border-b border-amber-200 overflow-x-auto flex items-center gap-1.5 shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setFilterCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-amber-200 hover:bg-amber-100/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {filteredShapes.map(shape => {
              const isSelected = selectedShape?.id === shape.id;
              return (
                <div
                  key={shape.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedShape(shape);
                  }}
                  className={`group relative p-3.5 rounded-2xl transition-all cursor-pointer border-2 text-center flex flex-col items-center justify-between min-h-[160px] ${
                    shape.unlocked
                      ? isSelected
                        ? "bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400"
                        : "bg-white border-slate-200 hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5"
                      : "bg-slate-100 border-slate-300 opacity-70"
                  }`}
                >
                  {/* Category Pill */}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 mb-1">
                    {shape.category}
                  </span>

                  {/* Shape Graphic or Locked Icon */}
                  <div className="my-2 relative flex items-center justify-center w-20 h-20">
                    {shape.unlocked ? (
                      <div className="transform group-hover:scale-110 transition-transform duration-200">
                        <ShapeSvg type={shape.svgShape} size={70} color={shape.color} />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <Lock className="w-6 h-6 mb-1" />
                        <span className="text-[9px] font-bold uppercase">Terkunci</span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h4 className="font-display font-bold text-xs text-slate-800 line-clamp-1">
                    {shape.unlocked ? shape.name : "???"}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Modal Overlay for Selected Shape */}
        {selectedShape && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 animate-in fade-in">
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden max-h-[90vh] flex flex-col">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    {selectedShape.unlocked ? selectedShape.name : "Bentuk Masih Terkunci"}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedShape(null)}
                  className="w-8 h-8 rounded-full bg-amber-600/30 hover:bg-amber-600/50 flex items-center justify-center text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 overflow-y-auto space-y-4">
                {selectedShape.unlocked ? (
                  <>
                    {/* Visual Showcase */}
                    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-50 to-sky-50 rounded-2xl border border-amber-200">
                      <ShapeSvg type={selectedShape.svgShape} size={120} showLabels={true} />
                      <span className="mt-2 text-xs font-semibold text-slate-500">
                        Kategori: {selectedShape.category}
                      </span>
                    </div>

                    {/* Properties Grid */}
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 font-medium block">Jumlah Sisi</span>
                        <span className="font-bold text-slate-800 text-sm">{selectedShape.sides}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 font-medium block">Titik Sudut / Rusuk</span>
                        <span className="font-bold text-slate-800 text-sm">{selectedShape.vertices}</span>
                      </div>
                      {selectedShape.anglesSum && (
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                          <span className="text-slate-500 font-medium block">Jumlah Sudut</span>
                          <span className="font-bold text-slate-800 text-sm">{selectedShape.anglesSum}</span>
                        </div>
                      )}
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 font-medium block">Simetri Lipat</span>
                        <span className="font-bold text-slate-800 text-sm">{selectedShape.symmetryFold}</span>
                      </div>
                    </div>

                    {/* Formula Section */}
                    <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-2xl text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-sky-900">
                        <Calculator className="w-4 h-4 text-sky-600" />
                        <span>Rumus Penting:</span>
                      </div>
                      <p className="text-slate-700">
                        <span className="font-semibold text-sky-800">Keliling: </span>
                        {selectedShape.perimeterFormula}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold text-sky-800">Luas: </span>
                        {selectedShape.areaFormula}
                      </p>
                      {selectedShape.volumeFormula && (
                        <p className="text-slate-700">
                          <span className="font-semibold text-sky-800">Volume: </span>
                          {selectedShape.volumeFormula}
                        </p>
                      )}
                    </div>

                    {/* Real World Examples */}
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <Globe2 className="w-4 h-4 text-emerald-600" />
                        <span>Contoh di Sekitarmu:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedShape.realWorldExamples.map((ex, i) => (
                          <span key={i} className="px-2.5 py-1 bg-white rounded-lg border border-emerald-200 text-emerald-800 font-medium">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Fun Fact */}
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-900">Fakta Unik: </span>
                        <span className="text-amber-800">{selectedShape.funFact}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <Lock className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-bold text-base text-slate-800">
                      Bentuk Ini Masih Terkunci!
                    </h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Jelajahi peta dan selesaikan level-level petualangan untuk membuka bentuk rahasia ini ke dalam koleksimu!
                    </p>
                  </div>
                )}
              </div>

              {/* Close Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <button
                  onClick={() => setSelectedShape(null)}
                  className="w-full py-2.5 rounded-xl font-display font-bold text-xs text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm"
                >
                  Tutup Rincian
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
