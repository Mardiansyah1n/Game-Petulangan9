import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { X, Sliders, BookOpen, Calculator, Sparkles } from 'lucide-react';

interface MaterialModalProps {
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'lab' | 'summary'>('lab');
  const [labShape, setLabShape] = useState<'persegi' | 'persegi_panjang' | 'segitiga' | 'lingkaran'>('persegi');

  // Sliders state
  const [sisi, setSisi] = useState(6);
  const [panjang, setPanjang] = useState(8);
  const [lebar, setLebar] = useState(5);
  const [alas, setAlas] = useState(10);
  const [tinggi, setTinggi] = useState(6);
  const [jariJari, setJariJari] = useState(7);

  // Calculations
  const kelilingPersegi = 4 * sisi;
  const luasPersegi = sisi * sisi;

  const kelilingPersegiPanjang = 2 * (panjang + lebar);
  const luasPersegiPanjang = panjang * lebar;

  const luasSegitiga = 0.5 * alas * tinggi;
  // Approximation for equilateral or right triangle keliling
  const sisiMiringSegitiga = Math.round(Math.sqrt(alas * alas + tinggi * tinggi));
  const kelilingSegitiga = alas + tinggi + sisiMiringSegitiga;

  const kelilingLingkaran = Math.round(2 * (22 / 7) * jariJari);
  const luasLingkaran = Math.round((22 / 7) * jariJari * jariJari);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-amber-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 p-4 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shadow-inner">
              📚
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-white">
                Materi & Lab Geometri
              </h3>
              <p className="text-xs text-sky-100 font-medium">
                Eksplorasi rumus dan bentuk secara interaktif!
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-sky-50/50 p-2 gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('lab');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'lab'
                ? "bg-sky-500 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Laboratorium Bentuk</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('summary');
            }}
            className={`flex-1 py-2 px-3 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'summary'
                ? "bg-sky-500 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Ringkasan Rumus Cepat</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {activeTab === 'lab' ? (
            <div className="space-y-5">
              {/* Shape Selector Bar */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'persegi', label: 'Persegi' },
                  { id: 'persegi_panjang', label: 'Persegi Panjang' },
                  { id: 'segitiga', label: 'Segitiga' },
                  { id: 'lingkaran', label: 'Lingkaran' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setLabShape(item.id as typeof labShape);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      labShape === item.id
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Interactive Sandbox Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                
                {/* Visual Canvas Display */}
                <div className="bg-white rounded-2xl border-2 border-sky-200 p-6 flex flex-col items-center justify-center min-h-[260px] shadow-sm relative overflow-hidden">
                  <div className="absolute top-3 left-3 text-[11px] font-bold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-full">
                    Visual Interaktif
                  </div>

                  {labShape === 'persegi' && (
                    <div className="flex flex-col items-center">
                      <div
                        className="bg-blue-500 border-4 border-slate-800 rounded-lg flex items-center justify-center text-white font-extrabold shadow-md transition-all duration-150"
                        style={{
                          width: `${Math.min(180, Math.max(60, sisi * 18))}px`,
                          height: `${Math.min(180, Math.max(60, sisi * 18))}px`
                        }}
                      >
                        s = {sisi} cm
                      </div>
                      <span className="text-xs text-slate-500 font-semibold mt-3">
                        Persegi dengan sisi {sisi} cm
                      </span>
                    </div>
                  )}

                  {labShape === 'persegi_panjang' && (
                    <div className="flex flex-col items-center">
                      <div
                        className="bg-emerald-500 border-4 border-slate-800 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow-md transition-all duration-150 text-center px-1"
                        style={{
                          width: `${Math.min(220, Math.max(70, panjang * 15))}px`,
                          height: `${Math.min(150, Math.max(50, lebar * 15))}px`
                        }}
                      >
                        p = {panjang} cm<br />l = {lebar} cm
                      </div>
                      <span className="text-xs text-slate-500 font-semibold mt-3">
                        Persegi Panjang {panjang} × {lebar} cm
                      </span>
                    </div>
                  )}

                  {labShape === 'segitiga' && (
                    <div className="flex flex-col items-center">
                      <svg width="180" height="150" viewBox="0 0 180 150">
                        <polygon
                          points={`90,${140 - Math.min(110, tinggi * 10)} ${90 + Math.min(80, (alas / 2) * 10)},140 ${90 - Math.min(80, (alas / 2) * 10)},140`}
                          fill="#f59e0b"
                          stroke="#1e293b"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                        <line x1="90" y1="140" x2="90" y2={`${140 - Math.min(110, tinggi * 10)}`} stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
                      </svg>
                      <span className="text-xs text-slate-500 font-semibold mt-1">
                        Segitiga: alas = {alas} cm, tinggi = {tinggi} cm
                      </span>
                    </div>
                  )}

                  {labShape === 'lingkaran' && (
                    <div className="flex flex-col items-center">
                      <div
                        className="bg-rose-500 border-4 border-slate-800 rounded-full flex items-center justify-center text-white font-extrabold text-xs shadow-md transition-all duration-150"
                        style={{
                          width: `${Math.min(180, Math.max(60, jariJari * 14))}px`,
                          height: `${Math.min(180, Math.max(60, jariJari * 14))}px`
                        }}
                      >
                        r = {jariJari} cm
                      </div>
                      <span className="text-xs text-slate-500 font-semibold mt-3">
                        Lingkaran: r = {jariJari} cm (d = {jariJari * 2} cm)
                      </span>
                    </div>
                  )}
                </div>

                {/* Slider Controls & Live Output */}
                <div className="space-y-4">
                  {/* Sliders */}
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <h5 className="font-display font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-sky-600" />
                      Atur Ukuran Bentuk
                    </h5>

                    {labShape === 'persegi' && (
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Panjang Sisi (s)</span>
                          <span className="text-blue-600 font-mono">{sisi} cm</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="15"
                          value={sisi}
                          onChange={e => setSisi(Number(e.target.value))}
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                      </div>
                    )}

                    {labShape === 'persegi_panjang' && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>Panjang (p)</span>
                            <span className="text-emerald-600 font-mono">{panjang} cm</span>
                          </div>
                          <input
                            type="range"
                            min="3"
                            max="16"
                            value={panjang}
                            onChange={e => setPanjang(Number(e.target.value))}
                            className="w-full accent-emerald-600 cursor-pointer"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>Lebar (l)</span>
                            <span className="text-emerald-600 font-mono">{lebar} cm</span>
                          </div>
                          <input
                            type="range"
                            min="2"
                            max="12"
                            value={lebar}
                            onChange={e => setLebar(Number(e.target.value))}
                            className="w-full accent-emerald-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {labShape === 'segitiga' && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>Alas (a)</span>
                            <span className="text-amber-600 font-mono">{alas} cm</span>
                          </div>
                          <input
                            type="range"
                            min="4"
                            max="18"
                            value={alas}
                            onChange={e => setAlas(Number(e.target.value))}
                            className="w-full accent-amber-600 cursor-pointer"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>Tinggi (t)</span>
                            <span className="text-amber-600 font-mono">{tinggi} cm</span>
                          </div>
                          <input
                            type="range"
                            min="3"
                            max="14"
                            value={tinggi}
                            onChange={e => setTinggi(Number(e.target.value))}
                            className="w-full accent-amber-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {labShape === 'lingkaran' && (
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Jari-jari (r)</span>
                          <span className="text-rose-600 font-mono">{jariJari} cm</span>
                        </div>
                        <input
                          type="range"
                          min="3"
                          max="14"
                          value={jariJari}
                          onChange={e => setJariJari(Number(e.target.value))}
                          className="w-full accent-rose-600 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Calculations Result Box */}
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl border-2 border-indigo-200 shadow-sm space-y-2 text-xs">
                    <h5 className="font-display font-bold text-indigo-950 flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-indigo-600" />
                      Hasil Perhitungan Langsung
                    </h5>

                    {labShape === 'persegi' && (
                      <div className="space-y-1.5 text-slate-700">
                        <div className="p-2 bg-white rounded-lg border border-indigo-100 flex justify-between items-center">
                          <span>Keliling (4 × {sisi}) =</span>
                          <span className="font-display font-extrabold text-blue-700 text-sm">{kelilingPersegi} cm</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-indigo-100 flex justify-between items-center">
                          <span>Luas ({sisi} × {sisi}) =</span>
                          <span className="font-display font-extrabold text-blue-700 text-sm">{luasPersegi} cm²</span>
                        </div>
                      </div>
                    )}

                    {labShape === 'persegi_panjang' && (
                      <div className="space-y-1.5 text-slate-700">
                        <div className="p-2 bg-white rounded-lg border border-indigo-100 flex justify-between items-center">
                          <span>Keliling 2 × ({panjang} + {lebar}) =</span>
                          <span className="font-display font-extrabold text-emerald-700 text-sm">{kelilingPersegiPanjang} cm</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-indigo-100 flex justify-between items-center">
                          <span>Luas ({panjang} × {lebar}) =</span>
                          <span className="font-display font-extrabold text-emerald-700 text-sm">{luasPersegiPanjang} cm²</span>
                        </div>
                      </div>
                    )}

                    {labShape === 'segitiga' && (
                      <div className="space-y-1.5 text-slate-700">
                        <div className="p-2 bg-white rounded-lg border border-indigo-100 flex justify-between items-center">
                          <span>Luas (½ × {alas} × {tinggi}) =</span>
                          <span className="font-display font-extrabold text-amber-700 text-sm">{luasSegitiga} cm²</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-indigo-100 flex justify-between items-center">
                          <span>Estimasi Keliling =</span>
                          <span className="font-display font-extrabold text-amber-700 text-sm">~{kelilingSegitiga} cm</span>
                        </div>
                      </div>
                    )}

                    {labShape === 'lingkaran' && (
                      <div className="space-y-1.5 text-slate-700">
                        <div className="p-2 bg-white rounded-lg border border-indigo-100 flex justify-between items-center">
                          <span>Keliling (2 × π × {jariJari}) ≈</span>
                          <span className="font-display font-extrabold text-rose-700 text-sm">{kelilingLingkaran} cm</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-indigo-100 flex justify-between items-center">
                          <span>Luas (π × {jariJari}²) ≈</span>
                          <span className="font-display font-extrabold text-rose-700 text-sm">{luasLingkaran} cm²</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Summary Cards Tab */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                {
                  title: "Persegi",
                  formulaK: "4 × s",
                  formulaL: "s × s",
                  properties: "4 sisi sama panjang, 4 sudut siku-siku (90°), 4 simetri lipat."
                },
                {
                  title: "Persegi Panjang",
                  formulaK: "2 × (p + l)",
                  formulaL: "p × l",
                  properties: "2 pasang sisi sejajar & sama panjang, 4 sudut 90°, 2 simetri lipat."
                },
                {
                  title: "Segitiga",
                  formulaK: "sisi a + b + c",
                  formulaL: "½ × alas × tinggi",
                  properties: "3 sisi, 3 sudut dengan jumlah total selalu 180°."
                },
                {
                  title: "Jajar Genjang",
                  formulaK: "2 × (a + b)",
                  formulaL: "alas × tinggi",
                  properties: "2 pasang sisi sejajar, sudut berhadapan sama besar, tidak bersiku-siku."
                },
                {
                  title: "Belah Ketupat",
                  formulaK: "4 × s",
                  formulaL: "½ × d1 × d2",
                  properties: "4 sisi sama panjang, kedua diagonal berpotongan tegak lurus (90°)."
                },
                {
                  title: "Layang-Layang",
                  formulaK: "2 × (s1 + s2)",
                  formulaL: "½ × d1 × d2",
                  properties: "2 pasang sisi berdekatan sama panjang, 1 sumbu simetri lipat."
                },
                {
                  title: "Trapesium",
                  formulaK: "a + b + c + d",
                  formulaL: "½ × (a + b) × t",
                  properties: "Memiliki tepat 1 pasang sisi yang sejajar (sisi atas dan sisi alas)."
                },
                {
                  title: "Lingkaran",
                  formulaK: "2 × π × r = π × d",
                  formulaL: "π × r²",
                  properties: "Kurva tertutup tanpa sudut, simetri lipat dan putar tak terhingga."
                }
              ].map((card, idx) => (
                <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs space-y-1">
                  <h5 className="font-display font-bold text-sm text-sky-800">{card.title}</h5>
                  <p className="text-slate-600"><span className="font-semibold text-slate-800">Keliling: </span>{card.formulaK}</p>
                  <p className="text-slate-600"><span className="font-semibold text-slate-800">Luas: </span>{card.formulaL}</p>
                  <p className="text-slate-500 text-[11px] pt-1 border-t border-slate-100">{card.properties}</p>
                </div>
              ))}
            </div>
          )}
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
            Tutup Materi
          </button>
        </div>
      </div>
    </div>
  );
};
