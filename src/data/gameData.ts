import { World, ShapeItem, DailyMission, Achievement, Level } from '../types/game';

export const WORLDS: World[] = [
  {
    id: 1,
    name: "Pulau Bentuk",
    subtitle: "Tiga gerbang mengenal bangun datar",
    themeColor: "#10b981", // Emerald green
    accentColor: "#f59e0b",
    islandImg: "/assets/07_world_01_pulau_bentuk.png",
    bannerImg: "/assets/12_world_01_banner.png",
    totalLevels: 3,
    levelStart: 1,
    levelEnd: 3,
    description: "Jelajahi tiga gerbang: kenali bentuk, hitung sisi dan titik sudut, lalu temukan bangun datar pada benda sehari-hari.",
    shapeFocus: ["Segitiga", "Persegi", "Persegi Panjang", "Lingkaran"]
  },
  {
    id: 2,
    name: "Hutan Segi Empat",
    subtitle: "Sisi, sudut dan jenis-jenisnya",
    themeColor: "#8b5cf6", // Purple
    accentColor: "#a855f7",
    islandImg: "/assets/08_world_02_hutan_segi_empat.png",
    bannerImg: "/assets/13_world_02_banner.png",
    totalLevels: 6,
    levelStart: 7,
    levelEnd: 12,
    description: "Hutan ajaib berdaun ungu dengan gerbang-gerbang simetris. Pelajari sisi sejajar, sudut siku-siku, belah ketupat, dan trapesium!",
    shapeFocus: ["Jajar Genjang", "Belah Ketupat", "Layang-layang", "Trapesium"]
  },
  {
    id: 3,
    name: "Pegunungan Segitiga",
    subtitle: "Jenis segitiga dan keliling",
    themeColor: "#0284c7", // Sky blue / navy
    accentColor: "#38bdf8",
    islandImg: "/assets/09_world_03_pegunungan_segitiga.png",
    bannerImg: "/assets/14_world_03_banner.png",
    totalLevels: 6,
    levelStart: 13,
    levelEnd: 18,
    description: "Puncak-puncak gunung bersalju dengan sudut lancip dan tumpul. Temukan rahasia total sudut 180° dan rumus keliling segitiga!",
    shapeFocus: ["Segitiga Sama Sisi", "Segitiga Sama Kaki", "Segitiga Siku-Siku", "Segitiga Sembarang"]
  },
  {
    id: 4,
    name: "Danau Lingkaran",
    subtitle: "Jari-jari, diameter dan luas",
    themeColor: "#f97316", // Warm amber/orange
    accentColor: "#fbbf24",
    islandImg: "/assets/10_world_04_danau_lingkaran.png",
    bannerImg: "/assets/15_world_04_banner.png",
    totalLevels: 6,
    levelStart: 19,
    levelEnd: 24,
    description: "Danau air jernih dengan platform cincin geometri mengapung. Pelajari jari-jari (r), diameter (d), keliling π×d, dan luas π×r²!",
    shapeFocus: ["Lingkaran", "Jari-jari & Diameter", "Keliling Lingkaran", "Luas Lingkaran"]
  },
  {
    id: 5,
    name: "Kastil Geometri",
    subtitle: "Gabungan bentuk dan luas",
    themeColor: "#e11d48", // Crimson red / gold
    accentColor: "#fb7185",
    islandImg: "/assets/11_world_05_kastil_geometri.png",
    bannerImg: "/assets/16_world_05_banner.png",
    totalLevels: 6,
    levelStart: 25,
    levelEnd: 30,
    description: "Kastil megah para ahli geometri! Pecahkan teka-teki bangun gabungan dan bangun ruang 3 dimensi seperti kubus, balok, dan tabung.",
    shapeFocus: ["Bangun Gabungan", "Kubus & Balok", "Tabung & Kerucut", "Bola Geometri"]
  }
];

export const INITIAL_LEVELS: Level[] = [
  // World 1: Pulau Bentuk (3 learning gates)
  {
    id: 1,
    worldId: 1,
    number: 1,
    title: "Mengenal Bentuk",
    description: "Pahami nama segitiga, persegi, dan lingkaran sebelum menjelajahi pulau dan mengumpulkan bentuk.",
    topic: "Bentuk Dasar",
    starsEarned: 0,
    isUnlocked: true,
    questions: [
      {
        id: "q1-1",
        prompt: "Manakah nama bangun datar yang ditunjukkan gambar?",
        subtext: "Perhatikan bentuk dengan tiga sisi lurus.",
        shapeSvgType: "triangle",
        options: [
          { text: "Segitiga", isCorrect: true, explanation: "Tepat! Segitiga memiliki tiga sisi lurus." },
          { text: "Persegi", isCorrect: false, explanation: "Persegi memiliki empat sisi sama panjang." },
          { text: "Lingkaran", isCorrect: false, explanation: "Lingkaran berbentuk bulat dan tidak memiliki sisi lurus." }
        ],
        hint: "Bangun ini memiliki tiga sisi dan tiga titik sudut."
      },
      {
        id: "q1-2",
        prompt: "Bangun datar manakah yang bentuknya bulat?",
        subtext: "Bangun ini tidak memiliki titik sudut.",
        shapeSvgType: "circle",
        options: [
          { text: "Lingkaran", isCorrect: true, explanation: "Benar! Lingkaran berbentuk bulat dan tidak memiliki titik sudut." },
          { text: "Persegi", isCorrect: false, explanation: "Persegi memiliki empat sisi lurus." },
          { text: "Segitiga", isCorrect: false, explanation: "Segitiga memiliki tiga sisi lurus." }
        ],
        hint: "Pikirkan bentuk roda atau jam dinding bundar."
      },
      {
        id: "q1-3",
        prompt: "Pilih bangun datar yang merupakan persegi.",
        subtext: "Persegi memiliki empat sisi sama panjang.",
        shapeSvgType: "square",
        options: [
          { text: "Persegi", isCorrect: true, explanation: "Hebat! Persegi memiliki empat sisi yang sama panjang." },
          { text: "Persegi panjang", isCorrect: false, explanation: "Persegi panjang memiliki dua sisi panjang dan dua sisi lebar." },
          { text: "Lingkaran", isCorrect: false, explanation: "Lingkaran tidak memiliki sisi lurus." }
        ],
        hint: "Keempat sisi bangun ini memiliki panjang yang sama."
      },
      {
        id: "q1-4",
        prompt: "Bentuk apa yang memiliki tiga sisi?",
        subtext: "Hitung garis lurus di tepi bangun.",
        shapeSvgType: "triangle",
        options: [
          { text: "Segitiga", isCorrect: true, explanation: "Benar! Segitiga memiliki tiga sisi." },
          { text: "Persegi", isCorrect: false, explanation: "Persegi memiliki empat sisi." },
          { text: "Lingkaran", isCorrect: false, explanation: "Lingkaran tidak memiliki sisi lurus." }
        ],
        hint: "Nama bangun ini mengandung kata 'tiga'."
      },
      {
        id: "q1-5",
        prompt: "Bangun datar mana yang memiliki 4 sisi sama panjang?",
        subtext: "Keempat sisinya juga bertemu membentuk pojok siku-siku.",
        shapeSvgType: "square",
        options: [
          { text: "Persegi", isCorrect: true, explanation: "Tepat! Persegi memiliki empat sisi yang sama panjang." },
          { text: "Persegi panjang", isCorrect: false, explanation: "Persegi panjang memiliki dua sisi panjang dan dua sisi lebar." },
          { text: "Lingkaran", isCorrect: false, explanation: "Lingkaran tidak memiliki sisi lurus." }
        ],
        hint: "Semua sisi bangun ini sama panjang."
      }
    ]
  },
  {
    id: 2,
    worldId: 1,
    number: 2,
    title: "Mengenal Sisi",
    description: "Di Lembah Bentuk, kenali jumlah sisi dan titik sudut pada bangun datar sederhana.",
    topic: "Sisi dan Titik Sudut",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q2-1",
        prompt: "Bangun datar manakah yang memiliki empat sisi?",
        subtext: "Hitung sisi pada setiap bangun.",
        shapeSvgType: "square",
        options: [
          { text: "Persegi", isCorrect: true, explanation: "Betul! Persegi memiliki empat sisi." },
          { text: "Segitiga", isCorrect: false, explanation: "Segitiga memiliki tiga sisi." },
          { text: "Lingkaran", isCorrect: false, explanation: "Lingkaran tidak memiliki sisi lurus." }
        ],
        hint: "Bangun ini punya empat garis tepi."
      },
      {
        id: "q2-2",
        prompt: "Berapa banyak sisi yang dimiliki segitiga?",
        subtext: "Hitung garis lurus pembentuknya.",
        shapeSvgType: "triangle",
        options: [
          { text: "3 sisi", isCorrect: true, explanation: "Tepat! Segitiga memiliki tiga sisi." },
          { text: "4 sisi", isCorrect: false, explanation: "Empat sisi adalah jumlah sisi persegi." },
          { text: "0 sisi", isCorrect: false, explanation: "Lingkaran tidak memiliki sisi lurus." }
        ],
        hint: "Nama bangun ini mengandung kata 'tiga'."
      },
      {
        id: "q2-3",
        prompt: "Bangun datar apa yang tidak memiliki titik sudut?",
        subtext: "Cari bangun yang tepinya melengkung.",
        shapeSvgType: "circle",
        options: [
          { text: "Lingkaran", isCorrect: true, explanation: "Luar biasa! Lingkaran tidak memiliki titik sudut." },
          { text: "Persegi", isCorrect: false, explanation: "Persegi memiliki empat titik sudut." },
          { text: "Segitiga", isCorrect: false, explanation: "Segitiga memiliki tiga titik sudut." }
        ],
        hint: "Bangun ini bulat dan tidak memiliki pojok."
      },
      {
        id: "q2-4",
        prompt: "Berapa banyak titik sudut yang dimiliki persegi?",
        subtext: "Titik sudut adalah tempat bertemunya dua sisi.",
        shapeSvgType: "square",
        options: [
          { text: "4 titik sudut", isCorrect: true, explanation: "Betul! Persegi memiliki empat titik sudut." },
          { text: "3 titik sudut", isCorrect: false, explanation: "Tiga titik sudut dimiliki segitiga." },
          { text: "0 titik sudut", isCorrect: false, explanation: "Lingkaran tidak memiliki titik sudut." }
        ],
        hint: "Hitung keempat pojok persegi."
      },
      {
        id: "q2-5",
        prompt: "Bangun datar mana yang memiliki tiga sisi dan tiga titik sudut?",
        subtext: "Hitung garis lurus pembentuk bangunnya.",
        shapeSvgType: "triangle",
        options: [
          { text: "Segitiga", isCorrect: true, explanation: "Benar! Segitiga memiliki tiga sisi." },
          { text: "Persegi", isCorrect: false, explanation: "Persegi memiliki empat sisi." },
          { text: "Lingkaran", isCorrect: false, explanation: "Lingkaran tidak memiliki sisi lurus." }
        ],
        hint: "Sisi dan titik sudutnya berjumlah tiga."
      }
    ]
  },
  {
    id: 3,
    worldId: 1,
    number: 3,
    title: "Bentuk di Sekitar Kita",
    description: "Di Hutan Bentuk, temukan bangun datar pada jam, atap rumah, ubin, pintu, dan roda.",
    topic: "Bentuk Sehari-hari",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q3-1",
        prompt: "Benda manakah yang berbentuk lingkaran?",
        subtext: "Bentuknya bulat dan dapat berputar.",
        shapeSvgType: "circle",
        options: [
          { text: "Jam dinding bundar", isCorrect: true, explanation: "Tepat! Jam dinding bundar memiliki bentuk lingkaran." },
          { text: "Pintu", isCorrect: false, explanation: "Pintu umumnya berbentuk persegi panjang." },
          { text: "Penggaris segitiga", isCorrect: false, explanation: "Penggaris segitiga berbentuk segitiga." }
        ],
        hint: "Apakah roda bisa berputar jika punya sudut tajam?"
      },
      {
        id: "q3-2",
        prompt: "Benda manakah yang memiliki bentuk seperti persegi panjang?",
        subtext: "Bentuknya memiliki dua sisi panjang dan dua sisi pendek.",
        shapeSvgType: "rectangle",
        options: [
          { text: "Buku tulis", isCorrect: true, explanation: "Benar! Sampul buku tulis biasanya berbentuk persegi panjang." },
          { text: "Bola", isCorrect: false, explanation: "Bola berbentuk bulat seperti bangun ruang." },
          { text: "Rambu segitiga", isCorrect: false, explanation: "Rambu itu berbentuk segitiga." }
        ],
        hint: "Benda ini biasa dipakai untuk menulis pelajaran."
      },
      {
        id: "q3-3",
        prompt: "Bagian atap rumah pada gambar biasanya menyerupai bangun apa?",
        subtext: "Perhatikan bentuk yang memiliki tiga sisi.",
        shapeSvgType: "triangle",
        options: [
          { text: "Segitiga", isCorrect: true, explanation: "Bagus! Atap rumah sering digambar berbentuk segitiga." },
          { text: "Lingkaran", isCorrect: false, explanation: "Lingkaran tidak memiliki sisi lurus." },
          { text: "Persegi", isCorrect: false, explanation: "Persegi memiliki empat sisi sama panjang." }
        ],
        hint: "Bangun ini memiliki tiga sisi dan tiga pojok."
      },
      {
        id: "q3-4",
        prompt: "Ubin lantai yang bentuknya sama panjang di setiap sisi menyerupai bangun apa?",
        subtext: "Ubin ini punya empat sisi dan empat pojok.",
        shapeSvgType: "square",
        options: [
          { text: "Persegi", isCorrect: true, explanation: "Benar! Ubin persegi memiliki empat sisi yang sama panjang." },
          { text: "Lingkaran", isCorrect: false, explanation: "Lingkaran tidak memiliki sisi lurus." },
          { text: "Segitiga", isCorrect: false, explanation: "Segitiga hanya memiliki tiga sisi." }
        ],
        hint: "Bayangkan ubin kotak di lantai."
      },
      {
        id: "q3-5",
        prompt: "Roda sepeda terlihat seperti bangun datar apa jika dilihat dari samping?",
        subtext: "Bentuknya bulat tanpa pojok.",
        shapeSvgType: "circle",
        options: [
          { text: "Lingkaran", isCorrect: true, explanation: "Betul! Roda sepeda berbentuk lingkaran." },
          { text: "Persegi panjang", isCorrect: false, explanation: "Persegi panjang memiliki empat sisi lurus." },
          { text: "Segitiga", isCorrect: false, explanation: "Segitiga memiliki tiga sisi lurus." }
        ],
        hint: "Roda dapat berputar dengan mulus."
      }
    ]
  },
  // World 2: Hutan Segi Empat (Levels 7 - 12)
  {
    id: 7,
    worldId: 2,
    number: 7,
    title: "Jajar Genjang yang Miring",
    description: "Pelajari segi empat dengan dua pasang sisi sejajar.",
    topic: "Segi Empat",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q7-1",
        prompt: "Berapa banyak pasang sisi sejajar yang ada pada bangun Jajar Genjang?",
        subtext: "Sisi atas sejajar dengan sisi bawah, sisi kiri sejajar dengan sisi kanan.",
        shapeSvgType: "parallelogram",
        options: [
          { text: "2 Pasang sisi sejajar", isCorrect: true, explanation: "Tepat! Jajar genjang memiliki 2 pasang sisi yang sama panjang dan saling sejajar." },
          { text: "1 Pasang sisi sejajar", isCorrect: false, explanation: "Itu adalah ciri dari trapesium." },
          { text: "Tidak ada yang sejajar", isCorrect: false, explanation: "Jajar genjang memiliki sisi sejajar." }
        ],
        hint: "Lihat sisi atas-bawah dan sisi kiri-kanan."
      },
      {
        id: "q7-2",
        prompt: "Apa rumus luas bangun Jajar Genjang?",
        subtext: "Hampir mirip persegi panjang, tetapi menggunakan alas dan tinggi.",
        shapeSvgType: "parallelogram",
        options: [
          { text: "Luas = alas × tinggi", isCorrect: true, explanation: "Benar! Luas jajar genjang dihitung dengan mengalikan alas (a) dengan tinggi tegak lurus (t)." },
          { text: "Luas = sisi × sisi", isCorrect: false, explanation: "Itu rumus luas persegi." },
          { text: "Luas = ½ × alas × tinggi", isCorrect: false, explanation: "Itu rumus luas segitiga." }
        ],
        hint: "Alas dikalikan dengan tinggi tegak lurus."
      }
    ]
  },
  {
    id: 8,
    worldId: 2,
    number: 8,
    title: "Belah Ketupat & Ketupat Lebaran",
    description: "Segi empat istimewa dengan 4 sisi sama panjang tapi miring.",
    topic: "Belah Ketupat",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q8-1",
        prompt: "Kedua diagonal pada Belah Ketupat saling berpotongan membentuk sudut berapa?",
        subtext: "Garis diagonal yang saling membelah tegak lurus.",
        shapeSvgType: "rhombus",
        options: [
          { text: "Sudut Siku-Siku (90°)", isCorrect: true, explanation: "Pintar! Diagonal belah ketupat selalu berpotongan tegak lurus membentuk sudut 90°." },
          { text: "Sudut Lurus (180°)", isCorrect: false, explanation: "180° adalah garis lurus." },
          { text: "Sudut Lancip (45°)", isCorrect: false, explanation: "Kedua diagonal membentuk sudut 90°." }
        ],
        hint: "Perpotongannya tegak lurus seperti tanda tambah (+)."
      },
      {
        id: "q8-2",
        prompt: "Apa rumus luas Belah Ketupat dengan diagonal d1 dan d2?",
        subtext: "Gunakan perkalian kedua diagonal.",
        shapeSvgType: "rhombus",
        options: [
          { text: "Luas = ½ × d1 × d2", isCorrect: true, explanation: "Tepat! Luas = setengah dikali diagonal 1 dikali diagonal 2." },
          { text: "Luas = d1 + d2", isCorrect: false, explanation: "Bukan penjumlahan diagonal." },
          { text: "Luas = 4 × sisi", isCorrect: false, explanation: "4 × sisi adalah rumus keliling belah ketupat." }
        ],
        hint: "Setengah dikali diagonal satu dikali diagonal dua."
      }
    ]
  },
  {
    id: 9,
    worldId: 2,
    number: 9,
    title: "Layang-Layang Terbang Tinggi",
    description: "Pelajari bangun dengan dua pasang sisi berdekatan sama panjang.",
    topic: "Layang-layang",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q9-1",
        prompt: "Berapa sumbu simetri lipat yang dimiliki bangun Layang-Layang?",
        subtext: "Lipat layang-layang dari ujung atas ke ujung bawah.",
        shapeSvgType: "rhombus",
        options: [
          { text: "1 Sumbu Simetri", isCorrect: true, explanation: "Tepat! Layang-layang hanya memiliki 1 sumbu simetri lipat di sepanjang diagonal utamanya." },
          { text: "2 Sumbu Simetri", isCorrect: false, explanation: "Belah ketupat memiliki 2 sumbu simetri." },
          { text: "4 Sumbu Simetri", isCorrect: false, explanation: "Persegi yang memiliki 4 sumbu simetri." }
        ],
        hint: "Layang-layang hanya bisa dilipat simetris secara vertikal."
      }
    ]
  },
  {
    id: 10,
    worldId: 2,
    number: 10,
    title: "Trapesium & Atap Rumah",
    description: "Mengenal trapesium sama kaki, siku-siku, dan sembarang.",
    topic: "Trapesium",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q10-1",
        prompt: "Ciri khas bangun Trapesium adalah...",
        subtext: "Perhatikan jumlah sisi yang sejajar.",
        shapeSvgType: "trapezoid",
        options: [
          { text: "Tepat memiliki 1 pasang sisi yang sejajar", isCorrect: true, explanation: "Benar sekali! Trapesium memiliki sepasang sisi sejajar (sisi atas dan sisi bawah)." },
          { text: "Semua sisinya harus sama panjang", isCorrect: false, explanation: "Itu adalah belah ketupat atau persegi." },
          { text: "Tidak memiliki sudut", isCorrect: false, explanation: "Trapesium memiliki 4 sudut." }
        ],
        hint: "Bentuk atap rumah tradisional sering berbentuk trapesium."
      }
    ]
  },
  {
    id: 11,
    worldId: 2,
    number: 11,
    title: "Sudut-Sudut Segi Empat",
    description: "Berapa total jumlah sudut dalam pada semua jenis segi empat?",
    topic: "Sudut Segi Empat",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q11-1",
        prompt: "Berapakah jumlah seluruh sudut dalam pada bangun datar SEGI EMPAT?",
        subtext: "Gabungan dari 2 segitiga (180° + 180°).",
        shapeSvgType: "square",
        options: [
          { text: "360°", isCorrect: true, explanation: "Luar biasa! Semua segi empat (persegi, persegi panjang, jajar genjang, dll) sudut dalamnya selalu berjumlah 360°." },
          { text: "180°", isCorrect: false, explanation: "180° adalah jumlah sudut segitiga." },
          { text: "90°", isCorrect: false, explanation: "90° adalah besar 1 sudut siku-siku." }
        ],
        hint: "Empat sudut siku-siku: 4 × 90° = ?"
      }
    ]
  },
  {
    id: 12,
    worldId: 2,
    number: 12,
    title: "Penjaga Hutan Segi Empat (Boss Level 2)",
    description: "Kuasai semua segi empat untuk membuka jalur Pegunungan Segitiga!",
    topic: "Master Hutan Segi Empat",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q12-1",
        prompt: "Trapesium dengan sisi sejajar 10 cm dan 6 cm, serta tinggi 4 cm. Berapakah luasnya?",
        subtext: "Rumus luas trapesium = ½ × (jumlah sisi sejajar) × tinggi.",
        shapeSvgType: "trapezoid",
        options: [
          { text: "32 cm²", isCorrect: true, explanation: "Hebat! Luas = ½ × (10 + 6) × 4 = ½ × 16 × 4 = 32 cm²." },
          { text: "16 cm²", isCorrect: false, explanation: "Jangan lupa kalikan dengan tingginya." },
          { text: "64 cm²", isCorrect: false, explanation: "Jangan lupa dibagi 2 (dikali ½)." }
        ],
        hint: "Jumlahkan 10 + 6 = 16, lalu kalikan 4 = 64, lalu bagi 2 = 32."
      }
    ]
  },

  // World 3: Pegunungan Segitiga (Levels 13 - 18)
  {
    id: 13,
    worldId: 3,
    number: 13,
    title: "Segitiga Sama Sisi",
    description: "Segitiga paling seimbang dengan 3 sisi dan 3 sudut sama besar.",
    topic: "Segitiga",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q13-1",
        prompt: "Berapa besar masing-masing sudut pada Segitiga Sama Sisi?",
        subtext: "Total sudut segitiga 180° dibagi 3 sudut yang sama besar.",
        shapeSvgType: "triangle",
        options: [
          { text: "60°", isCorrect: true, explanation: "Tepat! 180° ÷ 3 = 60°. Ketiga sudutnya selalu 60°." },
          { text: "90°", isCorrect: false, explanation: "90° adalah sudut siku-siku." },
          { text: "45°", isCorrect: false, explanation: "3 × 45° = 135°, belum 180°." }
        ],
        hint: "Bagi 180 dengan 3."
      }
    ]
  },
  {
    id: 14,
    worldId: 3,
    number: 14,
    title: "Segitiga Sama Kaki & Siku-Siku",
    description: "Pelajari segitiga dengan 2 sisi kembar dan segitiga bersudut 90°.",
    topic: "Segitiga Khusus",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q14-1",
        prompt: "Segitiga yang salah satu sudutnya tepat 90° disebut...",
        subtext: "Sudut ini membentuk huruf L tegak lurus.",
        shapeSvgType: "triangle",
        options: [
          { text: "Segitiga Siku-Siku", isCorrect: true, explanation: "Benar! Sudut 90° adalah sudut siku-siku." },
          { text: "Segitiga Tumpul", isCorrect: false, explanation: "Segitiga tumpul sudutnya lebih dari 90°." },
          { text: "Segitiga Lancip", isCorrect: false, explanation: "Segitiga lancip semua sudutnya kurang dari 90°." }
        ],
        hint: "Siku lengan tanganmu saat ditekuk tegak."
      }
    ]
  },
  {
    id: 15,
    worldId: 3,
    number: 15,
    title: "Luas Segitiga (Setengah Alas × Tinggi)",
    description: "Mengapa rumus luas segitiga adalah ½ × alas × tinggi?",
    topic: "Luas Segitiga",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q15-1",
        prompt: "Segitiga memiliki alas 12 cm dan tinggi 5 cm. Berapa luasnya?",
        subtext: "Rumus: Luas = ½ × alas × tinggi.",
        shapeSvgType: "triangle",
        options: [
          { text: "30 cm²", isCorrect: true, explanation: "Pintar! Luas = ½ × 12 × 5 = 6 × 5 = 30 cm²." },
          { text: "60 cm²", isCorrect: false, explanation: "Jangan lupa kalikan dengan ½!" },
          { text: "17 cm²", isCorrect: false, explanation: "Bukan dijumlahkan (12 + 5)." }
        ],
        hint: "Setengah dari 12 adalah 6, lalu 6 × 5 = ?"
      }
    ]
  },
  {
    id: 16,
    worldId: 3,
    number: 16,
    title: "Keliling Segitiga Sembarang",
    description: "Menghitung pagar keliling tanah berbentuk segitiga.",
    topic: "Keliling Segitiga",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q16-1",
        prompt: "Segitiga memiliki panjang sisi 5 cm, 7 cm, dan 8 cm. Berapakah kelilingnya?",
        subtext: "Keliling = sisi A + sisi B + sisi C.",
        shapeSvgType: "triangle",
        options: [
          { text: "20 cm", isCorrect: true, explanation: "Hebat! 5 + 7 + 8 = 20 cm." },
          { text: "28 cm", isCorrect: false, explanation: "Hitung kembali penjumlahannya." },
          { text: "15 cm", isCorrect: false, explanation: "Terlalu kecil." }
        ],
        hint: "Jumlahkan ketiga sisinya."
      }
    ]
  },
  {
    id: 17,
    worldId: 3,
    number: 17,
    title: "Teorema Pythagoras Dasar",
    description: "Hubungan sisi segitiga siku-siku 3, 4, dan 5!",
    topic: "Tripel Pythagoras",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q17-1",
        prompt: "Pada segitiga siku-siku dengan sisi penyiku 3 cm dan 4 cm, berapakah sisi miringnya?",
        subtext: "3² + 4² = 9 + 16 = 25.",
        shapeSvgType: "triangle",
        options: [
          { text: "5 cm", isCorrect: true, explanation: "Luar biasa! Akar dari 25 adalah 5 cm (Tripel Pythagoras 3-4-5)." },
          { text: "7 cm", isCorrect: false, explanation: "Sisi miring bukan 3 + 4." },
          { text: "6 cm", isCorrect: false, explanation: "5 adalah tripel pythagoras 3, 4, 5." }
        ],
        hint: "Berapa kali berapa yang hasilnya 25?"
      }
    ]
  },
  {
    id: 18,
    worldId: 3,
    number: 18,
    title: "Puncak Salju Segitiga (Boss Level 3)",
    description: "Kuasai puncak gunung dan temukan jembatan menuju Danau Lingkaran!",
    topic: "Master Segitiga",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q18-1",
        prompt: "Sebuah segitiga sama kaki memiliki keliling 26 cm. Jika alasnya 10 cm, berapa panjang masing-masing sisi kakinya?",
        subtext: "Kedua kakinya sama panjang. (26 - 10) dibagi 2.",
        shapeSvgType: "triangle",
        options: [
          { text: "8 cm", isCorrect: true, explanation: "Jenius! Sisa keliling = 26 - 10 = 16 cm. Karena ada 2 kaki sama panjang, 16 ÷ 2 = 8 cm." },
          { text: "16 cm", isCorrect: false, explanation: "16 cm adalah jumlah kedua kaki." },
          { text: "10 cm", isCorrect: false, explanation: "Jika 10 cm, kelilingnya jadi 30 cm." }
        ],
        hint: "26 dikurangi 10 adalah 16, lalu bagi dua."
      }
    ]
  },

  // World 4: Danau Lingkaran (Levels 19 - 24)
  {
    id: 19,
    worldId: 4,
    number: 19,
    title: "Bagian-Bagian Lingkaran",
    description: "Titik pusat, jari-jari, diameter, busur, dan tali busur.",
    topic: "Unsur Lingkaran",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q19-1",
        prompt: "Daerah di dalam lingkaran yang dibatasi oleh dua jari-jari dan satu busur lingkaran disebut...",
        subtext: "Bentuknya mirip potongan kue atau potongan pizza.",
        shapeSvgType: "circle",
        options: [
          { text: "Juring Lingkaran", isCorrect: true, explanation: "Tepat! Juring seperti potongan pizza yang dibatasi 2 jari-jari dan 1 busur lingkaran." },
          { text: "Tembereng", isCorrect: false, explanation: "Tembereng dibatasi oleh tali busur dan busur." },
          { text: "Apotema", isCorrect: false, explanation: "Apotema adalah garis tegak lurus dari pusat ke tali busur." }
        ],
        hint: "Mirip potongan pizza lezat!"
      }
    ]
  },
  {
    id: 20,
    worldId: 4,
    number: 20,
    title: "Angka Ajaib Pi (π)",
    description: "Mengenal nilai perbandingan keliling lingkaran yaitu 22/7 atau 3,14.",
    topic: "Konstanta Pi",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q20-1",
        prompt: "Bilangan berapakah yang paling tepat untuk nilai Pi (π) jika jari-jari lingkaran kelipatan 7?",
        subtext: "Pecahan ini mempermudah perhitungan lingkaran.",
        shapeSvgType: "circle",
        options: [
          { text: "22/7", isCorrect: true, explanation: "Benar sekali! 22/7 sangat mudah dicoret dengan angka kelipatan 7 (seperti 7, 14, 21, 28)." },
          { text: "3,14", isCorrect: false, explanation: "3,14 lebih cocok untuk angka yang bukan kelipatan 7." },
          { text: "7/22", isCorrect: false, explanation: "Pecahannya terbalik." }
        ],
        hint: "Dua puluh dua per tujuh."
      }
    ]
  },
  {
    id: 21,
    worldId: 4,
    number: 21,
    title: "Keliling Lingkaran (K = 2 × π × r)",
    description: "Hitung panjang lintasan satu putaran penuh ban sepeda.",
    topic: "Keliling Lingkaran",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q21-1",
        prompt: "Roda sepeda memiliki jari-jari 7 cm. Berapakah keliling roda tersebut?",
        subtext: "Rumus: K = 2 × (22/7) × r.",
        shapeSvgType: "circle",
        options: [
          { text: "44 cm", isCorrect: true, explanation: "Luar biasa! K = 2 × (22/7) × 7 = 2 × 22 = 44 cm." },
          { text: "22 cm", isCorrect: false, explanation: "22 baru setengah kelilingnya." },
          { text: "154 cm", isCorrect: false, explanation: "154 cm² adalah luas lingkarannya." }
        ],
        hint: "Angka 7 saling mencoret, jadi 2 × 22 = ?"
      }
    ]
  },
  {
    id: 22,
    worldId: 4,
    number: 22,
    title: "Luas Lingkaran (L = π × r²)",
    description: "Hitung besarnya permukaan lingkaran.",
    topic: "Luas Lingkaran",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q22-1",
        prompt: "Sebuah pizza berbentuk lingkaran dengan jari-jari 7 cm. Berapakah luas pizza tersebut?",
        subtext: "Rumus: L = (22/7) × r × r.",
        shapeSvgType: "circle",
        options: [
          { text: "154 cm²", isCorrect: true, explanation: "Hebat! L = (22/7) × 7 × 7 = 22 × 7 = 154 cm²." },
          { text: "44 cm²", isCorrect: false, explanation: "44 cm adalah kelilingnya." },
          { text: "49 cm²", isCorrect: false, explanation: "49 baru 7 × 7, belum dikali 22/7." }
        ],
        hint: "Kalikan 22 dengan 7."
      }
    ]
  },
  {
    id: 23,
    worldId: 4,
    number: 23,
    title: "Setengah & Seperempat Lingkaran",
    description: "Menghitung luas bentuk kipas dan busur.",
    topic: "Pecahan Lingkaran",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q23-1",
        prompt: "Jika luas satu lingkaran penuh adalah 100 cm², berapakah luas setengah lingkaran?",
        subtext: "Bagi luas penuh menjadi dua bagian sama besar.",
        shapeSvgType: "circle",
        options: [
          { text: "50 cm²", isCorrect: true, explanation: "Tepat! Setengah lingkaran = ½ × 100 = 50 cm²." },
          { text: "25 cm²", isCorrect: false, explanation: "25 cm² adalah seperempat lingkaran." },
          { text: "75 cm²", isCorrect: false, explanation: "Itu adalah tiga perempat lingkaran." }
        ],
        hint: "100 dibagi 2."
      }
    ]
  },
  {
    id: 24,
    worldId: 4,
    number: 24,
    title: "Penjaga Danau Lingkaran (Boss Level 4)",
    description: "Selesaikan tantangan dan masuki gerbang Kastil Geometri!",
    topic: "Master Lingkaran",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q24-1",
        prompt: "Taman bundar memiliki diameter 14 meter. Berapakah jari-jarinya?",
        subtext: "Jari-jari adalah setengah dari diameter.",
        shapeSvgType: "circle",
        options: [
          { text: "7 meter", isCorrect: true, explanation: "Jenius! r = d ÷ 2 = 14 ÷ 2 = 7 meter." },
          { text: "28 meter", isCorrect: false, explanation: "28 adalah 2 kali diameter." },
          { text: "14 meter", isCorrect: false, explanation: "14 adalah diameternya." }
        ],
        hint: "Bagi 14 dengan 2."
      }
    ]
  },

  // World 5: Kastil Geometri (Levels 25 - 30)
  {
    id: 25,
    worldId: 5,
    number: 25,
    title: "Mengenal Kubus & Balok",
    description: "Bentuk 3 dimensi dengan rusuk, sisi, dan titik sudut.",
    topic: "Bangun Ruang 3D",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q25-1",
        prompt: "Berapa banyak sisi (bidang) yang dimiliki oleh sebuah Kubus?",
        subtext: "Pikirkan dadu permainan monopoli.",
        shapeSvgType: "cube",
        options: [
          { text: "6 Sisi", isCorrect: true, explanation: "Tepat! Kubus memiliki 6 sisi berbentuk persegi yang berukuran sama persis (seperti mata dadu 1 sampai 6)." },
          { text: "8 Sisi", isCorrect: false, explanation: "8 adalah jumlah titik sudut kubus." },
          { text: "12 Sisi", isCorrect: false, explanation: "12 adalah jumlah rusuk kubus." }
        ],
        hint: "Berapa banyak angka yang ada pada dadu?"
      }
    ]
  },
  {
    id: 26,
    worldId: 5,
    number: 26,
    title: "Tabung, Kerucut & Bola",
    description: "Bangun ruang dengan permukaan lengkung.",
    topic: "Bangun Ruang Lengkung",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q26-1",
        prompt: "Benda manakah di sekitar kita yang berbentuk Tabung?",
        subtext: "Memiliki alas dan tutup berbentuk lingkaran yang sama besar.",
        shapeSvgType: "cylinder",
        options: [
          { text: "Kaleng Minuman & Pipa Air", isCorrect: true, explanation: "Benar! Kaleng minuman memiliki alas dan tutup lingkaran serta selimut tabung." },
          { text: "Bola Sepak", isCorrect: false, explanation: "Bola sepak berbentuk bangun ruang bola." },
          { text: "Topi Ulang Tahun", isCorrect: false, explanation: "Topi ulang tahun berbentuk kerucut." }
        ],
        hint: "Benda yang mirip kaleng susu atau drum musik."
      }
    ]
  },
  {
    id: 27,
    worldId: 5,
    number: 27,
    title: "Volume Kubus & Balok",
    description: "Menghitung isi ruang di dalam kotak kubus dan balok.",
    topic: "Volume Dasar",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q27-1",
        prompt: "Sebuah kotak kado berbentuk kubus memiliki rusuk 5 cm. Berapakah volumenya?",
        subtext: "Rumus Volume Kubus = s × s × s (s³).",
        shapeSvgType: "cube",
        options: [
          { text: "125 cm³", isCorrect: true, explanation: "Hebat! V = 5 × 5 × 5 = 25 × 5 = 125 cm³." },
          { text: "25 cm³", isCorrect: false, explanation: "25 baru 5 × 5." },
          { text: "75 cm³", isCorrect: false, explanation: "Hitung 25 × 5." }
        ],
        hint: "Kalikan 5 × 5 × 5."
      }
    ]
  },
  {
    id: 28,
    worldId: 5,
    number: 28,
    title: "Bangun Datar Gabungan",
    description: "Menghitung luas gabungan persegi dan segitiga (seperti gambar rumah).",
    topic: "Bangun Gabungan",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q28-1",
        prompt: "Gambar sebuah rumah terdiri dari atap segitiga (luas 20 cm²) dan dinding persegi (luas 50 cm²). Berapa total luas rumah tersebut?",
        subtext: "Jumlahkan luas kedua bagian.",
        shapeSvgType: "square",
        options: [
          { text: "70 cm²", isCorrect: true, explanation: "Pintar! Total luas = Luas atap + Luas dinding = 20 + 50 = 70 cm²." },
          { text: "100 cm²", isCorrect: false, explanation: "Jangan dikalikan, cukup dijumlahkan." },
          { text: "30 cm²", isCorrect: false, explanation: "Bukan dikurangkan." }
        ],
        hint: "Jumlahkan 20 + 50."
      }
    ]
  },
  {
    id: 29,
    worldId: 5,
    number: 29,
    title: "Jaring-Jaring Bangun Ruang",
    description: "Pola kertas lipat yang dapat membentuk kubus dan balok.",
    topic: "Jaring-Jaring",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q29-1",
        prompt: "Jaring-jaring kubus terdiri dari berapa banyak persegi yang saling terhubung?",
        subtext: "Jumlah bidang penutup kubus.",
        shapeSvgType: "cube",
        options: [
          { text: "6 Buah Persegi", isCorrect: true, explanation: "Tepat! Karena kubus memiliki 6 sisi, jaring-jaringnya selalu tersusun atas 6 persegi." },
          { text: "4 Buah Persegi", isCorrect: false, explanation: "4 persegi belum bisa menutup atas dan bawah." },
          { text: "8 Buah Persegi", isCorrect: false, explanation: "Terlalu banyak persegi." }
        ],
        hint: "Sama dengan jumlah sisi kubus."
      }
    ]
  },
  {
    id: 30,
    worldId: 5,
    number: 30,
    title: "Tahta Raja Geometri (Grand Finale Level 30)",
    description: "Selesaikan ujian agung terakhir dan jadilah Raja Geometri Sejati!",
    topic: "Master Agung Geometri",
    starsEarned: 0,
    isUnlocked: false,
    questions: [
      {
        id: "q30-1",
        prompt: "Bangun ruang yang memiliki 1 titik puncak lancip, 1 sisi alas lingkaran, dan 1 selimut lengkung adalah...",
        subtext: "Bentuknya mirip cone es krim atau tumpeng nasi kuning.",
        shapeSvgType: "cone",
        options: [
          { text: "Kerucut", isCorrect: true, explanation: "SELAMAT! Kerucut memiliki alas lingkaran dan sebuah titik puncak di atasnya. Kamu adalah Master Geometri Sejati!" },
          { text: "Tabung", isCorrect: false, explanation: "Tabung memiliki 2 lingkaran di atas dan bawah." },
          { text: "Prisma", isCorrect: false, explanation: "Prisma tidak memiliki titik puncak lancip." }
        ],
        hint: "Bentuk topi pesulap atau tumpeng nasi kuning!"
      }
    ]
  }
];

export const SHAPES_COLLECTION: ShapeItem[] = [
  {
    id: "segitiga_sama_sisi",
    name: "Segitiga Sama Sisi",
    category: "Segitiga",
    sides: 3,
    vertices: 3,
    anglesSum: "180° (masing-masing 60°)",
    symmetryFold: 3,
    perimeterFormula: "K = 3 × sisi",
    areaFormula: "L = ¼ × s² × √3",
    realWorldExamples: ["Rambu Lalu Lintas", "Potongan Roti Sandwich", "Gantungan Baju"],
    funFact: "Segitiga adalah bentuk paling kokoh dalam arsitektur jembatan dan atap karena tidak mudah berubah bentuk!",
    color: "#f59e0b",
    unlocked: true,
    svgShape: "equilateral_triangle"
  },
  {
    id: "persegi",
    name: "Persegi (Bujur Sangkar)",
    category: "Bangun Datar Dasar",
    sides: 4,
    vertices: 4,
    anglesSum: "360° (masing-masing 90°)",
    symmetryFold: 4,
    perimeterFormula: "K = 4 × sisi",
    areaFormula: "L = sisi × sisi (s²)",
    realWorldExamples: ["Papan Catur", "Ubin Lantai", "Biskuit Persegi", "Origami"],
    funFact: "Semua persegi adalah persegi panjang, tetapi tidak semua persegi panjang adalah persegi!",
    color: "#3b82f6",
    unlocked: true,
    svgShape: "square"
  },
  {
    id: "persegi_panjang",
    name: "Persegi Panjang",
    category: "Bangun Datar Dasar",
    sides: 4,
    vertices: 4,
    anglesSum: "360° (masing-masing 90°)",
    symmetryFold: 2,
    perimeterFormula: "K = 2 × (p + l)",
    areaFormula: "L = panjang × lebar",
    realWorldExamples: ["Buku Tulis", "Pintu Rumah", "Layar TV / HP", "Uang Kertas"],
    funFact: "Rasio perbandingan emas (golden rectangle) sering digunakan seniman untuk lukisan terindah seperti Mona Lisa!",
    color: "#10b981",
    unlocked: true,
    svgShape: "rectangle"
  },
  {
    id: "lingkaran",
    name: "Lingkaran",
    category: "Bangun Lengkung",
    sides: 1,
    vertices: 0,
    anglesSum: "360°",
    symmetryFold: "Tak Terhingga (∞)",
    perimeterFormula: "K = 2 × π × r = π × d",
    areaFormula: "L = π × r²",
    realWorldExamples: ["Roda Sepeda", "Jam Dinding", "Donat", "Koin Uang"],
    funFact: "Lingkaran memiliki luas terbesar dibanding bentuk lain yang kelilingnya sama!",
    color: "#ef4444",
    unlocked: true,
    svgShape: "circle"
  },
  {
    id: "segitiga_siku_siku",
    name: "Segitiga Siku-Siku",
    category: "Segitiga",
    sides: 3,
    vertices: 3,
    anglesSum: "180° (ada satu sudut 90°)",
    symmetryFold: 0,
    perimeterFormula: "K = a + b + c",
    areaFormula: "L = ½ × alas × tinggi",
    realWorldExamples: ["Penggaris Segitiga", "Layar Perahu", "Atap Rumah Sebelah"],
    funFact: "Pythagoras menemukan hubungan ajaib sisi miring segitiga siku-siku lebih dari 2.500 tahun yang lalu!",
    color: "#06b6d4",
    unlocked: true,
    svgShape: "right_triangle"
  },
  {
    id: "segitiga_sama_kaki",
    name: "Segitiga Sama Kaki",
    category: "Segitiga",
    sides: 3,
    vertices: 3,
    anglesSum: "180°",
    symmetryFold: 1,
    perimeterFormula: "K = alas + (2 × kaki)",
    areaFormula: "L = ½ × alas × tinggi",
    realWorldExamples: ["Potongan Semangka", "Tenda Kemah", "Panah Arah"],
    funFact: "Dua sudut di kaki segitiga ini selalu sama besar!",
    color: "#8b5cf6",
    unlocked: true,
    svgShape: "isosceles_triangle"
  },
  {
    id: "jajar_genjang",
    name: "Jajar Genjang",
    category: "Segi Empat",
    sides: 4,
    vertices: 4,
    anglesSum: "360°",
    symmetryFold: 0,
    perimeterFormula: "K = 2 × (sisi a + sisi b)",
    areaFormula: "L = alas × tinggi",
    realWorldExamples: ["Penghapus Karet Miring", "Corak Batik Parang", "Gedung Miring"],
    funFact: "Jika dipotong satu segitiga di sampingnya lalu dipindah ke sisi lain, jajar genjang akan berubah jadi persegi panjang!",
    color: "#a855f7",
    unlocked: true,
    svgShape: "parallelogram"
  },
  {
    id: "belah_ketupat",
    name: "Belah Ketupat",
    category: "Segi Empat",
    sides: 4,
    vertices: 4,
    anglesSum: "360°",
    symmetryFold: 2,
    perimeterFormula: "K = 4 × sisi",
    areaFormula: "L = ½ × d1 × d2",
    realWorldExamples: ["Ketupat Lebaran", "Rambu Peringatan Jalan", "Logo Wajik Kartu"],
    funFact: "Semua 4 sisinya sama panjang persis seperti persegi, tapi sudutnya bukan 90°!",
    color: "#ec4899",
    unlocked: true,
    svgShape: "rhombus"
  },
  {
    id: "layang_layang",
    name: "Layang-Layang",
    category: "Segi Empat",
    sides: 4,
    vertices: 4,
    anglesSum: "360°",
    symmetryFold: 1,
    perimeterFormula: "K = 2 × (sisi pendek + sisi panjang)",
    areaFormula: "L = ½ × d1 × d2",
    realWorldExamples: ["Mainan Layangan", "Liontin Kalung", "Batu Permata"],
    funFact: "Kedua diagonal layang-layang saling tegak lurus (90°) tepat di udara saat terbang!",
    color: "#f97316",
    unlocked: false,
    svgShape: "kite"
  },
  {
    id: "trapesium",
    name: "Trapesium",
    category: "Segi Empat",
    sides: 4,
    vertices: 4,
    anglesSum: "360°",
    symmetryFold: "1 (pada trapesium sama kaki)",
    perimeterFormula: "K = sisi a + b + c + d",
    areaFormula: "L = ½ × (a + b) × tinggi",
    realWorldExamples: ["Atap Rumah Limasan", "Pot Bunga", "Perahu Kertas"],
    funFact: "Kata trapesium berasal dari bahasa Yunani 'trapeza' yang berarti meja!",
    color: "#eab308",
    unlocked: false,
    svgShape: "trapezoid"
  },
  {
    id: "segi_lima",
    name: "Segi Lima (Pentagon)",
    category: "Bangun Datar Dasar",
    sides: 5,
    vertices: 5,
    anglesSum: "540° (masing-masing 108°)",
    symmetryFold: 5,
    perimeterFormula: "K = 5 × sisi",
    areaFormula: "L = ¼ × √(5(5+2√5)) × s²",
    realWorldExamples: ["Bintang Laut", "Corak Kulit Bola Sepak", "Gedung Pentagon"],
    funFact: "Pola hitam pada bola sepak klasik tersusun dari 12 segi lima yang indah!",
    color: "#14b8a6",
    unlocked: false,
    svgShape: "pentagon"
  },
  {
    id: "segi_enam",
    name: "Segi Enam (Heksagon)",
    category: "Bangun Datar Dasar",
    sides: 6,
    vertices: 6,
    anglesSum: "720° (masing-masing 120°)",
    symmetryFold: 6,
    perimeterFormula: "K = 6 × sisi",
    areaFormula: "L = (3√3 / 2) × s²",
    realWorldExamples: ["Sarang Lebah Madu", "Baut Mur Mesin", "Kepingan Salju"],
    funFact: "Lebah menggunakan segi enam karena bentuk ini menyimpan madu paling banyak dengan lilin paling sedikit!",
    color: "#d97706",
    unlocked: false,
    svgShape: "hexagon"
  },
  {
    id: "elips",
    name: "Elips (Lonjong)",
    category: "Bangun Lengkung",
    sides: 1,
    vertices: 0,
    anglesSum: "360°",
    symmetryFold: 2,
    perimeterFormula: "K ≈ π × (3(a+b) - √((3a+b)(a+3b)))",
    areaFormula: "L = π × a × b",
    realWorldExamples: ["Telur Ayam", "Bola Rugbi", "Orbit Planet Mengelilingi Matahari"],
    funFact: "Semua planet di tata surya mengelilingi matahari dalam lintasan berbentuk elips!",
    color: "#6366f1",
    unlocked: false,
    svgShape: "ellipse"
  },
  {
    id: "setengah_lingkaran",
    name: "Setengah Lingkaran",
    category: "Bangun Lengkung",
    sides: 2,
    vertices: 2,
    anglesSum: "180°",
    symmetryFold: 1,
    perimeterFormula: "K = (π × r) + 2r",
    areaFormula: "L = ½ × π × r²",
    realWorldExamples: ["Pelangi di Langit", "Busur Derajat", "Kipas Lipat Terbuka"],
    funFact: "Busur derajat matematikamu adalah setengah lingkaran sempurna bersudut 180°!",
    color: "#f43f5e",
    unlocked: false,
    svgShape: "semicircle"
  },
  {
    id: "segi_delapan",
    name: "Segi Delapan (Oktagon)",
    category: "Bangun Datar Dasar",
    sides: 8,
    vertices: 8,
    anglesSum: "1080° (masing-masing 135°)",
    symmetryFold: 8,
    perimeterFormula: "K = 8 × sisi",
    areaFormula: "L = 2 × (1 + √2) × s²",
    realWorldExamples: ["Rambu STOP Internasional", "Payung Terbuka", "Gazebo Taman"],
    funFact: "Rambu STOP sedunia menggunakan segi delapan agar mudah dikenali dari belakang oleh pengemudi lain!",
    color: "#dc2626",
    unlocked: false,
    svgShape: "octagon"
  },
  {
    id: "bintang",
    name: "Bintang Segi Lima",
    category: "Bangun Datar Dasar",
    sides: 10,
    vertices: 5,
    anglesSum: "180° (pada ujung-ujungnya)",
    symmetryFold: 5,
    perimeterFormula: "K = 10 × sisi tepi",
    areaFormula: "L = 5 × luas segitiga penyusun",
    realWorldExamples: ["Bintang di Langit Malam", "Bintang Bendera", "Bintang Laut"],
    funFact: "Simbol bintang segi lima memiliki proporsi rasio emas di setiap persilangan garisnya!",
    color: "#eab308",
    unlocked: false,
    svgShape: "star"
  },
  {
    id: "kubus",
    name: "Kubus",
    category: "Bangun Ruang",
    sides: "6 sisi persegi",
    vertices: "8 titik sudut, 12 rusuk",
    perimeterFormula: "Panjang Rusuk = 12 × s",
    areaFormula: "Luas Permukaan = 6 × s²",
    volumeFormula: "V = s × s × s (s³)",
    realWorldExamples: ["Dadu Monopoli", "Rubik's Cube", "Kotak Kado", "Es Batu Kotak"],
    funFact: "Kubus adalah satu dari lima bangun ruang platonik paling sempurna di alam semesta!",
    color: "#3b82f6",
    unlocked: false,
    svgShape: "cube"
  },
  {
    id: "balok",
    name: "Balok (Prisma Segi Empat)",
    category: "Bangun Ruang",
    sides: "6 sisi persegi panjang",
    vertices: "8 titik sudut, 12 rusuk",
    perimeterFormula: "Panjang Rusuk = 4 × (p + l + t)",
    areaFormula: "Luas = 2 × (pl + pt + lt)",
    volumeFormula: "V = panjang × lebar × tinggi",
    realWorldExamples: ["Batu Bata", "Kotak Pensil", "Kulkas", "Buku Tebal"],
    funFact: "Sebagian besar gedung pencakar langit dan rumah didesain dengan struktur dasar balok!",
    color: "#10b981",
    unlocked: false,
    svgShape: "cuboid"
  },
  {
    id: "tabung",
    name: "Tabung (Silinder)",
    category: "Bangun Ruang",
    sides: "3 sisi (alas, tutup, selimut)",
    vertices: "0 titik sudut, 2 rusuk lengkung",
    perimeterFormula: "Keliling Alas = 2 × π × r",
    areaFormula: "Luas Permukaan = 2πr(r + t)",
    volumeFormula: "V = π × r² × tinggi",
    realWorldExamples: ["Kaleng Soda", "Baterai", "Gelas Minum", "Drum Musik"],
    funFact: "Jika selimut tabung dibuka dan dibentangkan, bentuknya adalah sebuah persegi panjang yang lebar!",
    color: "#0284c7",
    unlocked: false,
    svgShape: "cylinder"
  },
  {
    id: "kerucut",
    name: "Kerucut",
    category: "Bangun Ruang",
    sides: "2 sisi (alas lingkaran & selimut)",
    vertices: "1 titik puncak, 1 rusuk lengkung",
    perimeterFormula: "Keliling Alas = 2 × π × r",
    areaFormula: "Luas = πr(r + s)",
    volumeFormula: "V = ⅓ × π × r² × tinggi",
    realWorldExamples: ["Cone Es Krim", "Topi Ulang Tahun", "Tumpeng", "Traffic Cone"],
    funFact: "Volume kerucut tepat sepertiga (⅓) dari volume tabung dengan alas dan tinggi yang sama!",
    color: "#f97316",
    unlocked: false,
    svgShape: "cone"
  },
  {
    id: "bola",
    name: "Bola Geometri",
    category: "Bangun Ruang",
    sides: "1 sisi lengkung utuh",
    vertices: "0 titik sudut, 0 rusuk",
    perimeterFormula: "Jarak terpanjang = keliling lingkaran pusat",
    areaFormula: "Luas Permukaan = 4 × π × r²",
    volumeFormula: "V = 4/3 × π × r³",
    realWorldExamples: ["Planet Bumi", "Bola Basket", "Kelereng", "Gelembung Sabun"],
    funFact: "Tetesan air dan gelembung sabun selalu berbentuk bola karena bola meminimalkan tegangan permukaan!",
    color: "#8b5cf6",
    unlocked: false,
    svgShape: "sphere"
  },
  {
    id: "prisma_segitiga",
    name: "Prisma Segitiga",
    category: "Bangun Ruang",
    sides: "5 sisi (2 segitiga, 3 persegi panjang)",
    vertices: "6 titik sudut, 9 rusuk",
    perimeterFormula: "Jumlah rusuk = 2(keliling segitiga) + 3t",
    areaFormula: "L = (2 × Luas Alas) + (Keliling Alas × t)",
    volumeFormula: "V = Luas Alas Segitiga × tinggi",
    realWorldExamples: ["Atap Rumah", "Cokelat Toblerone", "Tenda Pramuka"],
    funFact: "Prisma kaca transparan dapat mengurai cahaya matahari putih menjadi 7 warna pelangi yang memukau!",
    color: "#f59e0b",
    unlocked: false,
    svgShape: "prism"
  },
  {
    id: "limas_segi_empat",
    name: "Limas Segi Empat (Piramida)",
    category: "Bangun Ruang",
    sides: "5 sisi (1 alas persegi, 4 sisi tegak segitiga)",
    vertices: "5 titik sudut, 8 rusuk",
    perimeterFormula: "Keliling alas = 4 × s",
    areaFormula: "L = Luas Alas + (4 × Luas Segitiga)",
    volumeFormula: "V = ⅓ × Luas Alas × tinggi",
    realWorldExamples: ["Piramida Giza Mesir", "Puncak Monas", "Kue Bacang"],
    funFact: "Piramida Agung Giza telah berdiri kokoh selama lebih dari 4.500 tahun berkat dasar limas yang stabil!",
    color: "#ca8a04",
    unlocked: false,
    svgShape: "pyramid"
  },
  {
    id: "segitiga_sembarang",
    name: "Segitiga Sembarang",
    category: "Segitiga",
    sides: 3,
    vertices: 3,
    anglesSum: "180°",
    symmetryFold: 0,
    perimeterFormula: "K = a + b + c",
    areaFormula: "L = √(s(s-a)(s-b)(s-c)) [Rumus Heron]",
    realWorldExamples: ["Pecahan Kaca", "Potongan Puzzle Acak", "Bukit Berbatu"],
    funFact: "Ketiga sisi dan ketiga sudutnya sama sekali tidak ada yang sama panjang!",
    color: "#64748b",
    unlocked: false,
    svgShape: "triangle"
  }
];

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: "m1",
    title: "Selesaikan 3 Level Sempurna",
    description: "Raih nilai 3 bintang di 3 level petualangan bentuk mana saja.",
    target: 3,
    current: 1,
    rewardType: "stars",
    rewardAmount: 50,
    claimed: false
  },
  {
    id: "m2",
    title: "Buka Koleksi Bentuk Baru",
    description: "Temukan dan pelajari 2 bentuk baru di ensiklopedia geometri.",
    target: 2,
    current: 2,
    rewardType: "diamonds",
    rewardAmount: 15,
    claimed: false
  },
  {
    id: "m3",
    title: "Eksplorasi Laboratorium Bentuk",
    description: "Gunakan penggeser ukuran di menu Materi untuk melihat rumus berubah.",
    target: 1,
    current: 0,
    rewardType: "stars",
    rewardAmount: 30,
    claimed: false
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach_1",
    title: "Penjelajah Pemula",
    description: "Selesaikan level 1 Pulau Bentuk dengan sempurna.",
    icon: "🗺️",
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rewardStars: 25,
    rewardDiamonds: 5
  },
  {
    id: "ach_2",
    title: "Kolektor Bentuk Dasar",
    description: "Buka minimal 8 bentuk dalam Koleksi Bentuk.",
    icon: "💎",
    unlocked: true,
    progress: 8,
    maxProgress: 8,
    rewardStars: 50,
    rewardDiamonds: 10
  },
  {
    id: "ach_3",
    title: "Pakar Segitiga",
    description: "Taklukkan semua level di Pegunungan Segitiga.",
    icon: "📐",
    unlocked: false,
    progress: 2,
    maxProgress: 6,
    rewardStars: 100,
    rewardDiamonds: 25
  },
  {
    id: "ach_4",
    title: "Penguasa Lingkaran",
    description: "Hitung luas dan keliling lingkaran tanpa membuat kesalahan.",
    icon: "⭕",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardStars: 75,
    rewardDiamonds: 20
  },
  {
    id: "ach_5",
    title: "Raja Geometri",
    description: "Selesaikan seluruh 30 level petualangan dunia bentuk!",
    icon: "👑",
    unlocked: false,
    progress: 2,
    maxProgress: 30,
    rewardStars: 300,
    rewardDiamonds: 100
  }
];
