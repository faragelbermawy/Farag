
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Info, 
  CheckCircle, 
  BrainCircuit, 
  Droplets, 
  ShieldAlert, 
  Sparkles,
  Timer,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Heart,
  Home,
  AlertTriangle,
  Trophy,
  PartyPopper,
  Globe
} from 'lucide-react';
import { MODULES, PPE_DATA } from '../constants';
import { ModuleId, UserProgress } from '../types';

const LearningModule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'steps' | 'video'>('steps');
  const [ppeMode, setPpeMode] = useState<'donning' | 'doffing'>('donning');
  const [showIncentive, setShowIncentive] = useState(false);

  const module = MODULES.find(m => m.id === id);

  if (!module) return <div className="p-8 text-center text-slate-500 font-bold">Module not found</div>;

  const logPpeSuccess = (type: 'donning' | 'doffing') => {
    const saved = localStorage.getItem('mdro_user_progress');
    let progress: UserProgress = saved ? JSON.parse(saved) : {
      completedModules: [],
      quizScores: {},
      handWashStreak: 0,
      lastHandWash: '',
      totalHandWashes: 0,
      ppeDonningCount: 0,
      ppeDoffingCount: 0
    };

    if (type === 'donning') progress.ppeDonningCount = (progress.ppeDonningCount || 0) + 1;
    else progress.ppeDoffingCount = (progress.ppeDoffingCount || 0) + 1;

    localStorage.setItem('mdro_user_progress', JSON.stringify(progress));
    setShowIncentive(true);
    setTimeout(() => setShowIncentive(false), 3000);
  };

  const renderSteps = () => {
    switch (id) {
      case ModuleId.VISITOR_EDUCATION:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Bilingual Intro */}
            <section className="bg-purple-50 p-6 rounded-[2.5rem] border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                 <h4 className="text-xl font-black text-purple-900 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-purple-600" />
                  Why Prevention Matters
                </h4>
                <div className="bg-purple-100 px-3 py-1 rounded-full text-[10px] font-black text-purple-600 flex items-center gap-1">
                   <Globe className="w-3 h-3" /> Bilingual Instructions
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-purple-50 space-y-3">
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Protecting the Patient</p>
                    <p className="text-xs text-slate-500 leading-tight">Prevent transmission of external bacteria to your loved one.</p>
                  </div>
                  <div className="pt-2 border-t border-slate-50 text-right">
                    <p className="font-bold text-slate-800 mb-1 font-arabic" dir="rtl">حماية المريض</p>
                    <p className="text-xs text-slate-500 leading-tight font-arabic" dir="rtl">منع انتقال البكتيريا الخارجية التي قد تضعف مناعة قريبك.</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-purple-50 space-y-3">
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Protecting Your Home</p>
                    <p className="text-xs text-slate-500 leading-tight">Bacteria (MDROs) can follow you back to children and elderly at home.</p>
                  </div>
                  <div className="pt-2 border-t border-slate-50 text-right">
                    <p className="font-bold text-slate-800 mb-1 font-arabic" dir="rtl">حماية نفسك ومنزلك</p>
                    <p className="text-xs text-slate-500 leading-tight font-arabic" dir="rtl">البكتيريا المقاومة قد تلتصق بملابسك وتنتقل لأطفالك في المنزل.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bilingual Steps */}
            <section>
              <h4 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <CheckCircle className="text-emerald-500" /> Steps for Every Visitor | خطوات الزائرين
              </h4>
              <div className="space-y-4">
                {[
                  { 
                    enTitle: "Hand Hygiene on Entry", 
                    arTitle: "نظافة اليدين عند الدخول",
                    enDesc: "Use alcohol sanitizer immediately before touching anything.", 
                    arDesc: "استخدم المعقم الكحولي فوراً قبل لمس أي شيء في الغرفة.",
                    icon: Droplets, color: "text-blue-500 bg-blue-50" 
                  },
                  { 
                    enTitle: "Wear Protective Gown", 
                    arTitle: "ارتداء المئزر الواقي",
                    enDesc: "Creates a barrier to prevent bacteria from adhering to your clothes.", 
                    arDesc: "يخلق حاجزاً يمنع البكتيريا من الالتصاق بملابسك الشخصية.",
                    icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50" 
                  },
                  { 
                    enTitle: "Avoid Patient Bed", 
                    arTitle: "تجنب الجلوس على سرير المريض",
                    enDesc: "The bed is the most contaminated area in the room.", 
                    arDesc: "يعتبر سرير المريض أكثر المناطق تلوثاً بالبكتيريا في الغرفة.",
                    icon: AlertCircle, color: "text-red-500 bg-red-50" 
                  },
                  { 
                    enTitle: "Exit Protocol", 
                    arTitle: "بروتوكول الخروج",
                    enDesc: "Remove PPE inside the room and wash hands before exiting.", 
                    arDesc: "انزع الملابس الواقية داخل الغرفة واغسل يديك قبل الخروج.",
                    icon: Home, color: "text-purple-500 bg-purple-50" 
                  }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm items-center hover:border-blue-100 transition-colors">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${step.color}`}>
                      <step.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{step.enTitle}</p>
                        <p className="text-[11px] text-slate-500 leading-tight">{step.enDesc}</p>
                      </div>
                      <div className="text-right font-arabic" dir="rtl">
                        <p className="font-bold text-slate-800 text-sm">{step.arTitle}</p>
                        <p className="text-[11px] text-slate-500 leading-tight">{step.arDesc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bilingual Final Message */}
            <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex items-start gap-4">
              <Heart className="w-8 h-8 text-amber-600 shrink-0" />
              <div className="flex-1 space-y-2">
                <div>
                  <p className="font-bold text-amber-900 text-sm">A Message to Families</p>
                  <p className="text-[11px] text-amber-800 leading-relaxed">Following these protocols is the highest form of love for your family's safety.</p>
                </div>
                <div className="pt-2 border-t border-amber-200/30 text-right font-arabic" dir="rtl">
                  <p className="font-bold text-amber-900 text-sm">رسالة للعائلات</p>
                  <p className="text-[11px] text-amber-800 leading-relaxed">اتباع هذه الإجراءات هو أسمى صور الحب والحرص على سلامة عائلتك.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case ModuleId.PPE_PROTOCOLS:
        return (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row gap-4 mb-4 p-2 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <button 
                onClick={() => setPpeMode('donning')}
                className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black transition-all text-lg ${ppeMode === 'donning' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'text-slate-400 hover:text-blue-600 hover:bg-white'}`}
              >
                <ShieldCheck className={`w-6 h-6 ${ppeMode === 'donning' ? 'animate-pulse' : ''}`} />
                Donning (Entry)
              </button>
              <button 
                onClick={() => setPpeMode('doffing')}
                className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black transition-all text-lg ${ppeMode === 'doffing' ? 'bg-orange-600 text-white shadow-xl shadow-orange-200' : 'text-slate-400 hover:text-orange-600 hover:bg-white'}`}
              >
                <AlertCircle className={`w-6 h-6 ${ppeMode === 'doffing' ? 'animate-pulse' : ''}`} />
                Doffing (Exit)
              </button>
            </div>

            <div className="min-h-[400px]">
              {ppeMode === 'donning' ? (
                <section key="donning" className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between bg-blue-50/50 p-6 rounded-[2.5rem] border border-blue-100 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-blue-900 leading-tight">Donning Steps</h4>
                        <p className="text-sm text-blue-700 font-bold uppercase tracking-widest mt-1">Proper Clinical Entry</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => logPpeSuccess('donning')}
                      className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                    >
                      <CheckCircle className="w-4 h-4" /> Log Successful Donning
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PPE_DATA.donning.map((step, i) => (
                      <div key={i} className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-xl transition-all overflow-hidden flex flex-col">
                        {step.image && (
                          <div className="h-48 w-full overflow-hidden shrink-0">
                            <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                          </div>
                        )}
                        <div className="p-6 flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-sm text-sm">{i + 1}</div>
                            <div>
                              <p className="font-black text-slate-800 text-lg leading-tight">{step.title}</p>
                              <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <section key="doffing" className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between bg-orange-50/50 p-6 rounded-[2.5rem] border border-orange-100 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-600 text-white p-3 rounded-2xl shadow-lg">
                        <AlertCircle className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-orange-900 leading-tight">Doffing Steps</h4>
                        <p className="text-sm text-orange-700 font-bold uppercase tracking-widest mt-1">Safe Clinical Exit</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => logPpeSuccess('doffing')}
                      className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                    >
                      <CheckCircle className="w-4 h-4" /> Log Successful Doffing
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PPE_DATA.doffing.map((step, i) => (
                      <div key={i} className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-orange-200 hover:shadow-xl transition-all overflow-hidden flex flex-col">
                        {step.image && (
                          <div className="h-48 w-full overflow-hidden shrink-0">
                            <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                          </div>
                        )}
                        <div className="p-6 flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center font-black text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shrink-0 shadow-sm text-sm">{i + 1}</div>
                            <div>
                              <p className="font-black text-slate-800 text-lg leading-tight">{step.title}</p>
                              <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        );
      case ModuleId.HAND_HYGIENE:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h4 className="text-2xl font-black flex items-center gap-2 text-blue-600"><Droplets className="w-6 h-6"/> WHO 5 Moments</h4>
            <div className="grid grid-cols-1 gap-4">
              {[
                { t: "Before touching a patient", d: "Approaching to protect them." },
                { t: "Before clean/aseptic procedures", d: "Immediately before task." },
                { t: "After body fluid exposure risk", d: "After exposure risk." },
                { t: "After touching a patient", d: "When leaving the patient." },
                { t: "After touching surroundings", d: "After touching objects." }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-4xl font-black text-blue-100">0{i+1}</span>
                  <div>
                    <p className="font-bold text-blue-900 text-lg">{item.t}</p>
                    <p className="text-sm text-slate-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="py-20 text-center text-slate-300 font-bold">Content loading...</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 relative">
      {/* Incentive Overlay */}
      {showIncentive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-emerald-600 text-white px-10 py-6 rounded-[3rem] shadow-2xl flex flex-col items-center gap-4 animate-bounce border-4 border-white">
            <PartyPopper className="w-12 h-12" />
            <div className="text-center">
              <p className="text-2xl font-black">Well Done!</p>
              <p className="font-bold opacity-90">Compliance logged successfully +50 XP</p>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold group">
        <div className="p-2 rounded-xl group-hover:bg-blue-50"><ArrowLeft className="w-4 h-4" /></div> Back to Dashboard
      </button>

      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-8">
          <div className="flex-1 space-y-4">
            <div className={`${module.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-slate-200`}><module.icon className="w-10 h-10" /></div>
            <div>
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">{module.title}</h2>
              <p className="text-slate-400 font-medium text-lg mt-1 max-w-xl">{module.shortDesc}</p>
            </div>
          </div>
          <button onClick={() => navigate(`/quiz/${module.id}`)} className="flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95 group">
            <BrainCircuit className="w-6 h-6 group-hover:animate-pulse" /> Test Knowledge
          </button>
        </div>

        <div className="flex bg-slate-50 p-2 rounded-[2rem] mb-12 overflow-x-auto scrollbar-hide">
          {[{ id: 'info', label: 'Guidelines', icon: Info }, { id: 'steps', label: 'Procedures', icon: CheckCircle }, { id: 'video', label: 'Video Training', icon: Play }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-[1.5rem] transition-all whitespace-nowrap font-bold ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'info' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100">
                  <ShieldAlert className="w-10 h-10 text-blue-600 mb-4" />
                  <h4 className="text-xl font-black text-slate-800 mb-2">Evidence-Based Care</h4>
                  <p className="text-slate-600 font-medium">Following these protocols reduces cross-contamination by 70%.</p>
                </div>
                <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
                  <Trophy className="text-emerald-600 w-10 h-10 mb-4" />
                  <h4 className="text-xl font-black text-slate-800 mb-2">Patient Shield Reward</h4>
                  <p className="text-slate-600 font-medium">Log your actual steps in the 'Procedures' tab to earn safety badges.</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'steps' && renderSteps()}
          {activeTab === 'video' && <div className="aspect-video bg-slate-900 rounded-[3rem] overflow-hidden flex items-center justify-center relative group"><img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-60" /><button className="z-10 bg-white p-8 rounded-full shadow-2xl"><Play className="w-10 h-10 text-blue-600 fill-blue-600" /></button></div>}
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
