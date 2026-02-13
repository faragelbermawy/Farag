
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Flame, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  PlayCircle,
  Zap,
  Award,
  ClipboardList,
  Trees,
  Code2,
  Medal,
  Hand
} from 'lucide-react';
import { MODULES } from '../constants';
import { UserProgress } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<UserProgress>({
    completedModules: [],
    quizScores: {},
    handWashStreak: 0,
    lastHandWash: '',
    totalHandWashes: 0,
    ppeDonningCount: 0,
    ppeDoffingCount: 0
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem('mdro_user_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  const quizXP = (Object.values(progress.quizScores) as number[]).reduce((acc: number, score: number) => acc + (score * 100), 0);
  const totalXP = quizXP + 
                  ((progress.totalHandWashes || 0) * 10) + 
                  ((progress.ppeDonningCount || 0) * 50) + 
                  ((progress.ppeDoffingCount || 0) * 50);

  const completedCount = progress.completedModules.length;
  const totalModules = MODULES.length;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Dark Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -m-16 opacity-10 rotate-12">
          <Trees className="w-[30rem] h-[30rem] text-green-500" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-8 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em]">
                <Trees className="w-4 h-4" /> ALMOOSA HEALTH
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border border-white/5">
                <Code2 className="w-4 h-4 text-green-400" /> DESIGNED BY ELBERMAWY LTC
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Mastering Clinical <br/>
              <span className="text-green-500">Infection Control</span>
            </h1>
            
            <p className="text-slate-400 text-xl font-medium leading-relaxed">
              Protecting Almoosa patients through education, adherence, and MDRO prevention excellence.
            </p>
            
            <div className="flex flex-wrap gap-5 pt-4">
              <button 
                onClick={() => navigate('/learning/hand-hygiene')} 
                className="bg-green-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 hover:bg-green-500 transition-all active:scale-95 shadow-xl shadow-green-600/20"
              >
                <PlayCircle className="w-6 h-6" /> Start Learning
              </button>
              <button 
                onClick={() => navigate('/reminders')} 
                className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-white/20 transition-all"
              >
                Track Hygiene
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-600 text-white p-10 rounded-[3rem] flex items-center gap-8 shadow-xl border border-emerald-500">
           <div className="bg-white/20 p-6 rounded-[2rem] backdrop-blur-md shrink-0">
             <Hand className="w-12 h-12" />
           </div>
           <div>
             <h3 className="text-2xl font-black uppercase tracking-tight">Hand Washing Logs</h3>
             <p className="text-5xl font-black mt-1">{progress.totalHandWashes || 0}</p>
             <p className="text-[11px] font-bold opacity-80 uppercase tracking-widest mt-2">TOTAL VERIFIED SESSIONS</p>
           </div>
        </div>
        <div className="bg-blue-600 text-white p-10 rounded-[3rem] flex items-center gap-8 shadow-xl border border-blue-500">
           <div className="bg-white/20 p-6 rounded-[2rem] backdrop-blur-md shrink-0">
             <ShieldCheck className="w-12 h-12" />
           </div>
           <div>
             <h3 className="text-2xl font-black uppercase tracking-tight">PPE Compliance</h3>
             <p className="text-5xl font-black mt-1">{(progress.ppeDonningCount || 0) + (progress.ppeDoffingCount || 0)}</p>
             <p className="text-[11px] font-bold opacity-80 uppercase tracking-widest mt-2">DONNING & DOFFING LOGS</p>
           </div>
        </div>
      </div>

      {/* Minor Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-green-50 rounded-[1.5rem] flex items-center justify-center">
            <Flame className="text-green-600 w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-800">{progress.handWashStreak || 0} Days</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">SAFETY STREAK</p>
          </div>
        </div>
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center">
            <Medal className="text-blue-600 w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-800">{totalXP} XP</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">SAFETY RANK</p>
          </div>
        </div>
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center">
            <CheckCircle2 className="text-indigo-600 w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-800">{completedCount} / {totalModules}</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">CERTIFICATES</p>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <section>
        <div className="flex items-center justify-between mb-10 px-4">
          <h3 className="text-4xl font-black text-slate-800 tracking-tight">Learning Path</h3>
          <button onClick={() => navigate('/learning')} className="text-green-600 text-[11px] font-black flex items-center gap-2 uppercase tracking-[0.2em]">EXPLORE ALL <ArrowUpRight className="w-4 h-4" /></button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isCompleted = progress.completedModules.includes(mod.id);
            return (
              <button 
                key={mod.id} 
                onClick={() => navigate(`/learning/${mod.id}`)} 
                className={`group flex items-center gap-8 p-8 bg-white border border-slate-100 rounded-[3rem] transition-all text-left shadow-sm hover:shadow-xl active:scale-[0.98] ${isCompleted ? 'border-green-200' : ''}`}
              >
                <div className={`${mod.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110`}>
                  <Icon className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-black text-slate-800 text-xl tracking-tight">{mod.title}</h4>
                    {isCompleted && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                  </div>
                  <p className="text-slate-400 font-medium text-sm mt-1">{mod.shortDesc}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <ChevronRight className="w-7 h-7" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
