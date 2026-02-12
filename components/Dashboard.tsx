
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
  const [hasRegistered, setHasRegistered] = useState(false);
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
    const savedVisitors = localStorage.getItem('mdro_visitors');
    if (savedVisitors) setHasRegistered(true);

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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-12">
      <section className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-200 border border-slate-800">
        <div className="absolute top-0 right-0 -m-12 opacity-10 rotate-12"><Trees className="w-96 h-96 text-green-500" /></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="space-y-6 max-w-xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-green-500/20"><Trees className="w-3 h-3" /> Almoosa Health</div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5"><Code2 className="w-3 h-3 text-green-400" /> Designed by Elbermawy LTC</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">Mastering Clinical <span className="text-green-500">Infection Control</span></h1>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">Protecting Almoosa patients through education, adherence, and MDRO prevention excellence.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => navigate('/learning/hand-hygiene')} className="bg-green-600 text-white px-8 py-4 rounded-[1.5rem] font-bold flex items-center gap-2 hover:bg-green-500 transition-all active:scale-95 shadow-xl shadow-green-600/20"><PlayCircle className="w-5 h-5" /> Start Learning</button>
              <button onClick={() => navigate('/reminders')} className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-[1.5rem] font-bold hover:bg-white/20 transition-all">Track Hygiene</button>
            </div>
          </div>
          <div className="hidden lg:block shrink-0 p-8 bg-white/5 rounded-[3rem] border border-white/5 backdrop-blur-sm">
             <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/40"><Trees className="w-12 h-12 text-white" /></div>
                <div className="space-y-1">
                   <p className="text-sm font-black uppercase tracking-widest">Safety Score</p>
                   <p className="text-3xl font-black text-green-400">{totalXP}</p>
                   <p className="text-[8px] text-slate-500 mt-2 tracking-widest uppercase">Patient Shield Hero</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* English Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-600 text-white p-8 rounded-[2.5rem] flex items-center gap-6 shadow-xl border border-emerald-500">
           <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-md shrink-0"><Hand className="w-10 h-10" /></div>
           <div>
             <h3 className="text-xl font-black">Hand Washing Logs</h3>
             <p className="text-4xl font-black mt-1">{progress.totalHandWashes || 0}</p>
             <p className="text-xs font-bold opacity-80 uppercase tracking-widest mt-1">Total Verified Sessions</p>
           </div>
        </div>
        <div className="bg-blue-600 text-white p-8 rounded-[2.5rem] flex items-center gap-6 shadow-xl border border-blue-500">
           <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-md shrink-0"><ShieldCheck className="w-10 h-10" /></div>
           <div>
             <h3 className="text-xl font-black">PPE Compliance</h3>
             <p className="text-4xl font-black mt-1">{(progress.ppeDonningCount || 0) + (progress.ppeDoffingCount || 0)}</p>
             <p className="text-xs font-bold opacity-80 uppercase tracking-widest mt-1">Donning & Doffing Logs</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Flame className="text-green-600 w-8 h-8" /></div>
          <div><p className="text-2xl font-black text-slate-800">{progress.handWashStreak || 0} Days</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Safety Streak</p></div>
        </div>
        <div className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Medal className="text-blue-600 w-8 h-8" /></div>
          <div><p className="text-2xl font-black text-slate-800">{totalXP.toLocaleString()} XP</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Safety Rank</p></div>
        </div>
        <div className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all md:col-span-1 sm:col-span-2">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><CheckCircle2 className="text-indigo-600 w-8 h-8" /></div>
          <div><p className="text-2xl font-black text-slate-800">{completedCount} / {totalModules}</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Certificates</p></div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-8 px-4">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Learning Path</h3>
          <button onClick={() => navigate('/learning')} className="text-green-600 text-sm font-black flex items-center gap-2 hover:underline uppercase tracking-widest">Explore All <ArrowUpRight className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isCompleted = progress.completedModules.includes(mod.id);
            return (
              <button key={mod.id} onClick={() => navigate(`/learning/${mod.id}`)} className={`group flex items-center gap-6 p-6 bg-white hover:bg-slate-50 border border-slate-100 rounded-[2.5rem] transition-all text-left shadow-sm hover:shadow-md active:scale-95 ${isCompleted ? 'border-green-200 bg-green-50/10' : ''}`}>
                <div className={`${mod.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3`}><Icon className="w-8 h-8" /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-slate-800 group-hover:text-green-600 transition-colors text-lg">{mod.title}</h4>
                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </div>
                  <p className="text-sm text-slate-400 font-medium mt-1 leading-snug">{mod.shortDesc}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all text-slate-300"><ChevronRight className="w-6 h-6" /></div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
