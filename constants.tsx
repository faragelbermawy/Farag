
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
      title: 'Gown (المئزر)', 
      description: 'Fully cover torso from neck to knees, arms to end of wrists, and wrap around the back. Fasten in back of neck and waist.',
      image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: 'Mask (القناع)', 
      description: 'Secure ties or elastic bands at middle of head and neck. Fit flexible band to nose bridge. Fit snug to face and below chin.',
      image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: 'Goggles/Shield (النظارات)', 
      description: 'Place over face and eyes and adjust to fit comfortably but securely.',
      image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: 'Gloves (القفازات)', 
      description: 'Extend to cover wrist of isolation gown completely. Ensure no skin is exposed.',
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600'
    }
  ],
  doffing: [
    { 
      title: 'Gloves (القفازات)', 
      description: 'Grasp the outside of the glove with the opposite gloved hand; peel off. Slide fingers under remaining glove at wrist and peel off.',
      image: 'https://images.unsplash.com/photo-1583311622870-0d23528f3fc4?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: 'Goggles/Shield (النظارات)', 
      description: 'Remove from back by lifting head band or ear pieces without touching the front surface.',
      image: 'https://images.unsplash.com/photo-1584622781564-1d9876a1c742?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: 'Gown (المئزر)', 
      description: 'Unfasten ties. Pull away from neck and shoulders, touching inside of gown only. Turn inside out and fold into a bundle.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=600'
    },
    { 
      title: 'Mask (القناع)', 
      description: 'Grasp bottom ties/elastics, then top ones, and remove without touching the front. Discard immediately.',
      image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=600'
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
      explanation: 'MDRO stands for Multi-Drug Resistant Organism, which are bacteria that have developed resistance to multiple antibiotics.'
    }
  ],
  [ModuleId.VISITOR_EDUCATION]: [
    {
      id: 'v1',
      question: 'Why should visitors wear PPE in isolation rooms?',
      options: [
        'To look professional',
        'To prevent carrying MDROs to other patients or home',
        'To keep the hospital clean',
        'It is not necessary for family members'
      ],
      correctAnswer: 1,
      explanation: 'PPE creates a barrier that prevents bacteria (MDROs) from attaching to your clothes and skin, protecting you and your family at home.'
    }
  ]
};
