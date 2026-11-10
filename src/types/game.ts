export interface Question {
  id: string;
  prompt: string;
  subtext?: string;
  shapeType?: string;
  shapeSvgType?: 'circle' | 'square' | 'triangle' | 'rectangle' | 'rhombus' | 'trapezoid' | 'parallelogram' | 'cube' | 'cylinder' | 'sphere' | 'cone';
  options: {
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  hint: string;
}

export interface Level {
  id: number;
  worldId: number;
  number: number;
  title: string;
  description: string;
  topic: string;
  starsEarned: number; // 0, 1, 2, or 3
  isUnlocked: boolean;
  questions: Question[];
}

export interface World {
  id: number;
  name: string;
  subtitle: string;
  themeColor: string;
  accentColor: string;
  islandImg: string;
  bannerImg: string;
  totalLevels: number;
  levelStart: number;
  levelEnd: number;
  description: string;
  shapeFocus: string[];
}

export interface ShapeItem {
  id: string;
  name: string;
  category: 'Bangun Datar Dasar' | 'Segi Empat' | 'Segitiga' | 'Bangun Lengkung' | 'Bangun Ruang';
  sides: number | string;
  vertices: number | string;
  anglesSum?: string;
  symmetryFold?: number | string;
  perimeterFormula: string;
  areaFormula: string;
  volumeFormula?: string;
  realWorldExamples: string[];
  funFact: string;
  color: string;
  unlocked: boolean;
  svgShape: 'circle' | 'square' | 'triangle' | 'rectangle' | 'parallelogram' | 'rhombus' | 'kite' | 'trapezoid' | 'pentagon' | 'hexagon' | 'ellipse' | 'semicircle' | 'right_triangle' | 'isosceles_triangle' | 'equilateral_triangle' | 'cube' | 'cuboid' | 'cylinder' | 'cone' | 'sphere' | 'prism' | 'pyramid' | 'octagon' | 'star';
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  rewardType: 'stars' | 'diamonds';
  rewardAmount: number;
  claimed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rewardStars: number;
  rewardDiamonds: number;
}

export interface PlayerProfile {
  name: string;
  title: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  stars: number;
  diamonds: number;
  streakDays: number;
  activeLevelId: number;
  highestUnlockedLevel: number;
  completedLevelsCount: number;
}
