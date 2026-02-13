
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Info, 
  CheckCircle, 
  BrainCircuit, 
  ShieldCheck, 
  AlertCircle,
  BookOpen,
  MonitorSmartphone,
  ChevronRight,
  Heart
} from 'lucide-react';
import { MODULES, PPE_DATA, MODULE_STEPS } from '../constants';
import { ModuleId } from '../types';

const LearningModule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'steps' | 'video'>('steps');
  const [ppeMode, setPpeMode] = useState<'donning' | 'doffing'>('donning');

  const module = MODULES.find(m => m.id === id);

  if (!module) return <div className="p-8 text-center text-slate-500 font-bold">Module not found</div>;

  const renderSteps = () => {
    // PPE Special Grid (Screenshot 2)
    if (id === ModuleId.PPE_PROTOCOLS) {
      return (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="flex bg-slate-100 p-3 rounded-[3rem] max-w-2xl mx-auto shadow-inner">
            <button 
              onClick={() => setPpeMode('donning')}
              className={`flex-1 flex items-center justify-center gap-3 py-6 rounded-full font-black text-xl transition-all ${ppeMode === 'donning' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200' : 'text-slate-400 hover:text-blue-600'}`}
            >
              <ShieldCheck className="w-7 h-7" /> Donning (Entry)
            </button>
            <button 
              onClick={() => setPpeMode('doffing')}
              className={`flex-1 flex items-center justify-center gap-3 py-6 rounded-full font-black text-xl transition-all ${ppeMode === 'doffing' ? 'bg-orange-600 text-white shadow-2xl shadow-orange-200' : 'text-slate-400 hover:text-orange-600'}`}
            >
              <AlertCircle className="w-7 h-7" /> Doffing (Exit)
            </button>
          </div>

          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-6">
               <div className="bg-blue-600 p-5 rounded-3xl shadow-xl shadow-blue-100">
                 <ShieldCheck className="w-10 h-10 text-white" />
               </div>
               <div>
                 <h4 className="text-3xl font-black text-slate-800">{ppeMode === 'donning' ? 'Donning Steps' : 'Doffing Steps'}</h4>
                 <p className="text-[11px] text-blue-600 font-black uppercase tracking-widest mt-1">PROPER CLINICAL {ppeMode === 'donning' ? 'ENTRY' : 'EXIT'}</p>
               </div>
            </div>
            <button className="bg-emerald-500 text-white px-8 py-5 rounded-[2rem] font-black flex items-center gap-3 shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all">
               <CheckCircle className="w-5 h-5" /> Log Successful {ppeMode === 'donning' ? 'Donning' : 'Doffing'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {(ppeMode === 'donning' ? PPE_DATA.donning : PPE_DATA.doffing).map((step, i) => (
              <div key={i} className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="relative h-72 overflow-hidden">
                   {step.image && <img src={step.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={step.title} />}
                   <div className="absolute top-6 left-6 bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">
                      {i + 1}
                   </div>
                </div>
                <div className="p-8 space-y-3">
                   <h5 className="font-black text-slate-800 text-2xl tracking-tight">{step.title}</h5>
                   <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Visitor Steps (Screenshot 5)
    if (id === ModuleId.VISITOR_EDUCATION) {
      const visitorSteps = MODULE_STEPS[ModuleId.VISITOR_EDUCATION] || [];
      return (
        <div className="space-y-12 animate-in fade-in duration-700">
           <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-50 p-2 rounded-xl text-green-600 border border-green-100">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">Steps for Every Visitor | خطوات الزائرين</h3>
           </div>
           
           <div className="space-y-6">
             {visitorSteps.map((step, i) => {
               const Icon = step.icon || CheckCircle;
               return (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:border-green-200 transition-all flex items-center gap-10 group">
                   <div className="bg-slate-50 p-6 rounded-[2rem] text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                      <Icon className="w-10 h-10" />
                   </div>
                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-1">
                        <h5 className="font-black text-slate-800 text-xl">{step.en}</h5>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.descEn}</p>
                      </div>
                      <div className="text-right space-y-1 font-arabic" dir="rtl">
                        <h5 className="font-black text-slate-800 text-xl">{step.ar}</h5>
                        <p className="text-slate-500 text-sm leading-relaxed">{step.descAr}</p>
                      </div>
                   </div>
                </div>
               );
             })}
           </div>

           <div className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100 flex items-start gap-8 mt-12">
              <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-amber-100 shrink-0">
                 <Heart className="w-10 h-10 text-orange-500 fill-orange-500" />
              </div>
              <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-black text-orange-900 text-xl">A Message to Families</h5>
                      <p className="text-orange-800 font-medium text-sm mt-1 leading-relaxed">Following these protocols is the highest form of love for your family's safety.</p>
                    </div>
                    <div className="text-right font-arabic" dir="rtl">
                      <h5 className="font-black text-orange-900 text-xl">رسالة للعائلات</h5>
                      <p className="text-orange-800 text-sm mt-1 leading-relaxed">اتباع هذه الإجراءات هو أسمى صور الحب والحرص على سلامة عائلتك.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );
    }

    // Default Procedures Tab (for other modules)
    const steps = MODULE_STEPS[id] || [];
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-10">
              {step.img && (
                <div className="w-full md:w-60 h-44 rounded-[2.5rem] overflow-hidden shrink-0 shadow-lg">
                   <img src={step.img} className="w-full h-full object-cover" alt={step.en} />
                </div>
              )}
              <div className="flex-1 space-y-6">
                 <div className="flex justify-between items-center">
                   <span className="bg-slate-100 px-5 py-2 rounded-full text-[11px] font-black text-slate-500 uppercase tracking-widest">STEP 0{i+1}</span>
                   <CheckCircle className="text-green-500 w-6 h-6" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-1">
                      <h5 className="font-black text-slate-800 text-2xl">{step.en}</h5>
                      <p className="text-slate-500 font-medium">{step.descEn}</p>
                    </div>
                    <div className="text-right font-arabic space-y-1" dir="rtl">
                      <h5 className="font-black text-slate-800 text-2xl">{step.ar}</h5>
                      <p className="text-slate-500 font-medium">{step.descAr}</p>
                    </div>
                 </div>
              </div>
            </div>
          ))}
          {steps.length === 0 && (
            <div className="py-24 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <MonitorSmartphone className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Clinical procedures are being updated...</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
           <div className={`${module.color} w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-slate-100`}>
              <module.icon className="w-12 h-12" />
           </div>
           <div>
              <h2 className="text-5xl font-black text-slate-800 tracking-tight">{module.title}</h2>
              <p className="text-slate-400 font-medium text-xl mt-1">{module.shortDesc}</p>
           </div>
        </div>
        <button 
          onClick={() => navigate(`/quiz/${module.id}`)} 
          className="bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-lg flex items-center gap-4 hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95"
        >
          <BrainCircuit className="w-7 h-7" /> Start Exam
        </button>
      </header>

      <div className="flex bg-slate-50 p-2 rounded-[2.5rem] shadow-inner">
        {[
          { id: 'info', label: 'Guidelines', icon: Info }, 
          { id: 'steps', label: 'Procedures', icon: CheckCircle }, 
          { id: 'video', label: 'Video Training', icon: Play }
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id as any)} 
            className={`flex-1 flex items-center justify-center gap-3 py-6 rounded-full font-black text-lg transition-all ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <tab.icon className="w-5 h-5" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'steps' && renderSteps()}
        {activeTab === 'info' && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
             <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                <div className="flex items-start gap-8">
                   <div className="bg-blue-50 p-4 rounded-3xl">
                      <Info className="w-10 h-10 text-blue-600" />
                   </div>
                   <div>
                      <h4 className="text-3xl font-black text-slate-800">Safety Standards</h4>
                      <p className="text-slate-500 text-xl font-medium mt-2 leading-relaxed">Our protocols follow the latest WHO and CDC guidelines for MDRO prevention in Long-Term Care environments.</p>
                   </div>
                </div>
             </div>
          </div>
        )}
        {activeTab === 'video' && (
          <div className="py-32 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
             <Play className="w-20 h-20 text-slate-200 mx-auto mb-6" />
             <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Educational videos coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningModule;
