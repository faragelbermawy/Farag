
export enum ModuleId {
  HAND_HYGIENE = 'hand-hygiene',
  PPE_PROTOCOLS = 'ppe-protocols',
  MDRO_BASICS = 'mdro-basics',
  EQUIPMENT_CLEANING = 'equipment-cleaning',
  PATIENT_TYPES = 'patient-types',
  VISITOR_EDUCATION = 'visitor-education'
}

export interface Visitor {
  id: string;
  name: string;
  department: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  completedModules: string[];
  quizScores: Record<string, number>;
  handWashStreak: number;
  lastHandWash: string;
  totalHandWashes: number; // New: Total actual washes
  ppeDonningCount: number; // New: Total correct donning sessions
  ppeDoffingCount: number; // New: Total correct doffing sessions
}

export interface PPEStep {
  title: string;
  description: string;
  image?: string;
}

export interface PPEProtocol {
  donning: PPEStep[];
  doffing: PPEStep[];
}
