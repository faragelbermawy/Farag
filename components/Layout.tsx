
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Timer, 
  Share2, 
  ClipboardList,
  X,
  Trees,
  CheckCircle,
  Copy,
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [showQR, setShowQR] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'DASHBOARD' },
    { path: '/learning', icon: BookOpen, label: 'LEARNING' },
    { path: '/assistant', icon: MessageSquare, label: 'AI ASSISTANT' },
    { path: '/registry', icon: ClipboardList, label: 'VISITOR LOG' },
    { path: '/reminders', icon: Timer, label: 'TRACKER' },
  ];

  const getAppUrl = () => {
    try {
      return window.location.origin + window.location.pathname;
    } catch (e) {
      return window.location.href.split('#')[0];
    }
  };

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast('Link Copied! تم النسخ');
      } else {
        throw new Error('Fallback');
      }
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast('Link Copied! تم النسخ');
      } catch (f) {
        showToast('Please copy manually');
      }
      document.body.removeChild(textArea);
    }
  };

  const currentPublicUrl = getAppUrl();
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentPublicUrl)}`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans">
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-bold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 bg-white border-b border-slate-100 z-40 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-green-700 p-2 rounded-xl">
            <Trees className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-slate-800 text-[10px] tracking-tight uppercase">MDRO REHABILITATION</span>
        </div>
        <button onClick={() => setShowQR(true)} className="p-2 bg-slate-100 rounded-xl text-green-700">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:relative md:w-80 bg-white border-t md:border-t-0 md:border-r border-slate-200 z-50">
        <div className="p-10 hidden md:block">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <div className="w-24 h-24 bg-green-700 rounded-full flex items-center justify-center shadow-xl shadow-green-100">
              <Trees className="w-14 h-14 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">Almoosa Health</h1>
              <p className="text-[11px] text-green-700 font-black uppercase tracking-widest mt-1">LTC & REHAB</p>
            </div>
          </div>
          <button 
            onClick={() => setShowQR(true)} 
            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-full text-xs font-black mb-12 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
             <Share2 className="w-4 h-4" /> Share App Link
          </button>
        </div>
        
        <div className="flex flex-col h-full justify-between pb-4 md:pb-12">
          <ul className="flex md:flex-col justify-around md:justify-start p-2 md:p-6 gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/learning' && location.pathname.startsWith('/learning/'));
              const Icon = item.icon;
              return (
                <li key={item.path} className="w-full">
                  <Link
                    to={item.path}
                    className={`flex flex-col md:flex-row items-center gap-1 md:gap-5 px-3 py-4 md:px-6 md:py-5 rounded-[2rem] transition-all ${
                      isActive ? 'bg-green-50 text-green-700 font-bold' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-[8px] md:text-[11px] font-black tracking-widest uppercase">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <main className="flex-1 overflow-auto pb-24 md:pb-0 h-screen bg-white">
        <div className="max-w-6xl mx-auto p-4 md:p-14">
          <div className="flex justify-between items-center mb-8 md:hidden">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">MDRO REHABILITATION</span>
            <div className="flex items-center gap-2 text-slate-400">
                <Share2 className="w-4 h-4" />
            </div>
          </div>
          {children}
        </div>
      </main>

      {/* Share Modal */}
      {showQR && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowQR(false)} />
          <div className="relative bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl p-10 animate-in zoom-in-95">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                 <div className="bg-green-700 p-4 rounded-3xl">
                   <Share2 className="w-6 h-6 text-white" />
                 </div>
                 <div className="text-left">
                   <p className="font-black text-xl text-slate-800">Share Portal</p>
                   <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest">Infection Control Excellence</p>
                 </div>
              </div>
              <button onClick={() => setShowQR(false)} className="p-2 text-slate-300 hover:text-red-500 bg-slate-50 rounded-2xl">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-slate-50 p-8 rounded-[3rem] mb-8 flex flex-col items-center border border-slate-100">
               <div className="bg-white p-6 rounded-[2.5rem] shadow-xl mb-6">
                  <img src={qrCodeUrl} alt="QR Code" className="w-44 h-44" />
               </div>
               <p className="text-[11px] text-slate-500 font-mono font-bold truncate w-full text-center bg-white p-4 rounded-2xl border border-slate-100">{currentPublicUrl}</p>
            </div>

            <button 
              onClick={() => copyToClipboard(currentPublicUrl)}
              className="w-full bg-slate-900 text-white py-6 rounded-full font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              Copy Link Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
