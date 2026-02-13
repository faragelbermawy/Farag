
import React from 'react';
import { 
  ShieldCheck, 
  Hand, 
  Stethoscope, 
  UserRound, 
  AlertCircle,
  Users,
  LucideIcon 
} from 'lucide-react';
import { ModuleId, PPEProtocol } from './types';

export interface ModuleDefinition {
  id: ModuleId;
  title: string;
  shortDesc: string;
  icon: LucideIcon;
  color: string;
}

export const MODULES: ModuleDefinition[] = [
  {
    id: ModuleId.MDRO_BASICS,
    title: 'MDRO Awareness',
    shortDesc: 'Multi-Drug Resistant Organisms education.',
    icon: AlertCircle,
    color: 'bg-red-500'
  },
  {
    id: ModuleId.HAND_HYGIENE,
    title: 'Hand Hygiene',
    shortDesc: 'WHO 5 Moments & Proper Techniques.',
    icon: Hand,
    color: 'bg-blue-500'
  },
  {
    id: ModuleId.PPE_PROTOCOLS,
    title: 'PPE Mastery',
    shortDesc: 'Donning & Doffing clinical sequence.',
    icon: ShieldCheck,
    color: 'bg-emerald-500'
  },
  {
    id: ModuleId.VISITOR_EDUCATION,
    title: 'Family & Visitors',
    shortDesc: 'Protect your loved ones from infection.',
    icon: Users,
    color: 'bg-purple-500'
  },
  {
    id: ModuleId.PATIENT_TYPES,
    title: 'Patient Precautions',
    shortDesc: 'Clean vs. Contact status logic.',
    icon: UserRound,
    color: 'bg-amber-500'
  },
  {
    id: ModuleId.EQUIPMENT_CLEANING,
    title: 'Equipment Care',
    shortDesc: 'Sanitization of medical instruments.',
    icon: Stethoscope,
    color: 'bg-indigo-500'
  },
];

export const PPE_DATA: PPEProtocol = {
  donning: [
    { 
      title: '1. Gown (المئزر)', 
      description: 'Fully cover torso from neck to knees, arms to end of wrists, and wrap around the back. Fasten in back of neck and waist.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: '2. Mask (القناع)', 
      description: 'Secure ties or elastic bands at middle of head and neck. Fit flexible band to nose bridge. Fit snug to face and below chin.',
      image: 'https://images.unsplash.com/photo-1586942229167-05a208215c12?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: '3. Goggles/Shield (النظارات)', 
      description: 'Place over face and eyes and adjust to fit.',
      image: 'https://images.unsplash.com/photo-1584622781564-1d9876a1c742?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: '4. Gloves (القفازات)', 
      description: 'Extend to cover wrist of isolation gown completely.',
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600'
    }
  ],
  doffing: [
    { 
      title: '1. Gloves (القفازات)', 
      description: 'Peel off from outside. Slide fingers under remaining glove at wrist.',
      image: 'https://images.unsplash.com/photo-1583311622870-0d23528f3fc4?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: '2. Goggles (النظارات)', 
      description: 'Remove from back by lifting head band without touching front.',
      image: 'https://images.unsplash.com/photo-1542617267-83349d0c9243?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: '3. Gown (المئزر)', 
      description: 'Unfasten ties. Pull away from neck, touching inside only.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: '4. Mask (القناع)', 
      description: 'Grasp bottom ties then top ones. Remove without touching front.',
      image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=600'
    }
  ]
};

export const MODULE_STEPS: Record<string, { en: string, ar: string, descEn: string, descAr: string, img?: string, icon?: LucideIcon }[]> = {
  [ModuleId.HAND_HYGIENE]: [
    { en: "Wet Hands", ar: "بلل اليدين", descEn: "Use warm water", descAr: "استخدم الماء الدافئ", img: "https://images.unsplash.com/photo-1603398938378-e54eab446ddd?auto=format&fit=crop&q=80&w=400" },
    { en: "Apply Soap", ar: "ضع الصابون", descEn: "Cover all surfaces", descAr: "تغطية جميع الأسطح", img: "https://images.unsplash.com/photo-1584622781564-1d9876a1c742?auto=format&fit=crop&q=80&w=400" },
    { en: "Rub Palms", ar: "فرك الراحتين", descEn: "Circular motions", descAr: "حركات دائرية", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400" },
    { en: "Rinse & Dry", ar: "الشطف والتجفيف", descEn: "Use single-use towel", descAr: "استخدم منشفة أحادية الاستخدام", img: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&q=80&w=400" }
  ],
  [ModuleId.VISITOR_EDUCATION]: [
    { 
      en: "Hand Hygiene on Entry", 
      ar: "نظافة اليدين عند الدخول", 
      descEn: "Use alcohol sanitizer immediately before touching anything.", 
      descAr: "استخدم المعقم الكحولي فوراً قبل لمس أي شيء في الغرفة.",
      icon: Hand
    },
    { 
      en: "Wear Protective Gown", 
      ar: "ارتداء المئزر الواقي", 
      descEn: "Creates a barrier to prevent bacteria from adhering to your clothes.", 
      descAr: "يخلق حاجزاً يمنع البكتيريا من الالتصاق بملابسك الشخصية.",
      icon: ShieldCheck
    },
    { 
      en: "Avoid Patient Bed", 
      ar: "تجنب الجلوس على سرير المريض", 
      descEn: "The bed is the most contaminated area in the room.", 
      descAr: "يعتبر سرير المريض أكثر المناطق تلوثاً بالبكتيريا في الغرفة.",
      icon: AlertCircle
    },
    { 
      en: "Exit Protocol", 
      ar: "بروتوكول الخروج", 
      descEn: "Remove PPE inside the room and wash hands before exiting.", 
      descAr: "انزع الملابس الواقية داخل الغرفة واغسل يديك قبل الخروج.",
      icon: UserRound
    }
  ]
};

export const INITIAL_QUIZ: Record<string, any[]> = {
  [ModuleId.MDRO_BASICS]: [
    {
      id: 'q1',
      question: 'What does MDRO stand for?',
      options: [
        'Multi-Disease Resistant Outbreak',
        'Multi-Drug Resistant Organism',
        'Medical Device Recovery Organization',
        'Major Drug Resistance Operation'
      ],
      correctAnswer: 1,
      explanation: 'MDRO stands for Multi-Drug Resistant Organism, which are bacteria resistant to multiple antibiotics.'
    }
  ]
};
