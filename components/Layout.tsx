
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShieldAlert, 
  MessageSquare, 
  Timer, 
  Share2, 
  Award, 
  ClipboardList,
  QrCode,
  X,
  Trees,
  CheckCircle,
  Copy,
  ExternalLink,
  Globe,
  Link as LinkIcon,
  AlertCircle,
  Info,
  Smartphone
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [showQR, setShowQR] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/learning', icon: BookOpen, label: 'Learning' },
    { path: '/assistant', icon: MessageSquare, label: 'AI Assistant' },
    { path: '/registry', icon: ClipboardList, label: 'Visitor Log' },
    { path: '/reminders', icon: Timer, label: 'Tracker' },
  ];

  /**
   * THE FINAL FIX: 
   * This function gets the pure base URL without appending extra protocols or fragments.
   */
  const getAppUrl = () => {
    try {
      // Use origin which is always correct (e.g., https://name.goog)
      const origin = window.location.origin;
      // Get pathname but remove index.html if present
      let pathname = window.location.pathname.split('index.html')[0];
      
      // Combine them safely
      let cleanUrl = origin + pathname;
      
      // Remove trailing slash for aesthetic and stability
      if (cleanUrl.endsWith('/')) {
        cleanUrl = cleanUrl.slice(0, -1);
      }
      
      return cleanUrl;
    } catch (e) {
      // Fallback that avoids concatenating words
      return window.location.href.split('#')[0].split('?')[0];
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
        showToast('Link Copied! تم نسخ الرابط');
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
        showToast('Link Copied! تم نسخ الرابط');
      } catch (f) {
        showToast('Please copy manually.');
      }
      document.body.removeChild(textArea);
    }
  };

  const shareOnWhatsApp = () => {
    const url = getAppUrl();
    const message = `🏥 *MDRO LTC 5 - Infection Control Portal*\nOfficial platform for Almoosa Health staff.\n\n🔗 Open App:\n${url}\n\nنظام مكافحة العدوى - مستشفى الموسى`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = () => {
    const url = getAppUrl();
    const shareData = {
      title: 'MDRO LTC 5 - Almoosa Health',
      text: 'Infection Control & Safety Portal',
      url: url,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => copyToClipboard(url));
    } else {
      copyToClipboard(url);
    }
  };

  const currentPublicUrl = getAppUrl();
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentPublicUrl)}`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-bold tracking-tight">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 z-40 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-xl">
            <Trees className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-slate-800 text-xs tracking-tighter uppercase">Almoosa LTC 5</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowQR(true)} className="p-2 bg-slate-100 rounded-xl text-green-600 active:scale-90 transition-transform">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:relative md:w-72 bg-white border-t md:border-t-0 md:border-r border-slate-200 z-50">
        <div className="p-8 hidden md:block">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <div className="w-20 h-20 bg-green-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-green-100">
              <Trees className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 leading-tight">Almoosa Health</h1>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-[0.3em] mt-1">Rehabilitation & LTC</p>
            </div>
          </div>
          <button 
            onClick={() => setShowQR(true)} 
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-5 rounded-[2rem] text-xs font-black mb-6 active:scale-95 transition-all shadow-xl shadow-slate-200 hover:bg-slate-800"
          >
             <Share2 className="w-4 h-4" /> Publish & Share App
          </button>
        </div>
        
        <div className="flex flex-col h-full justify-between pb-2 md:pb-8">
          <ul className="flex md:flex-col justify-around md:justify-start p-2 md:p-4 gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/learning' && location.pathname.startsWith('/learning/'));
              const Icon = item.icon;
              return (
                <li key={item.path} className="shrink-0">
                  <Link
                    to={item.path}
                    className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 px-3 py-3 md:px-5 md:py-4 rounded-[1.5rem] transition-all ${
                      isActive ? 'bg-green-50 text-green-700 font-bold' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-[9px] md:text-sm font-black tracking-tight uppercase">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <main className="flex-1 overflow-auto pb-24 md:pb-0 h-screen scroll-smooth">
        <div className="max-w-6xl mx-auto p-4 md:p-12">
          {children}
          <footer className="mt-20 mb-10 text-center border-t border-slate-100 pt-10">
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
               Official Safety Hub • <span className="text-green-600">Almoosa Rehabilitation & LTC</span>
            </p>
          </footer>
        </div>
      </main>

      {/* Share Modal */}
      {showQR && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowQR(false)} />
          <div className="relative bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl border border-white p-8 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                 <div className="bg-green-600 p-4 rounded-3xl shadow-xl shadow-green-200">
                   <Share2 className="w-6 h-6 text-white" />
                 </div>
                 <div className="text-left">
                   <p className="font-black text-xl text-slate-800 leading-tight">Public App Link</p>
                   <p className="text-[10px] text-green-600 font-black uppercase tracking-widest mt-1">Verified & Ready</p>
                 </div>
              </div>
              <button onClick={() => setShowQR(false)} className="p-2 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 rounded-2xl">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-[2.5rem] mb-6 flex flex-col items-center border border-slate-100 shadow-inner">
               <div className="bg-white p-6 rounded-[2.5rem] shadow-xl mb-6 border border-slate-50">
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 mix-blend-multiply" />
               </div>
               
               <div className="w-full space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">App Address | عنوان التطبيق</p>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm group">
                    <LinkIcon className="w-5 h-5 text-slate-300 shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[11px] text-slate-500 font-mono font-bold truncate">{currentPublicUrl}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(currentPublicUrl)}
                      className="text-green-600 hover:text-green-700 bg-green-50 p-3 rounded-2xl transition-all active:scale-90"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
               </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={shareOnWhatsApp}
                className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all active:scale-95 shadow-xl shadow-emerald-100"
              >
                Share on WhatsApp | مشاركة عبر واتساب
              </button>
              
              <button 
                onClick={handleShare}
                className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
              >
                Other Apps | تطبيقات أخرى
              </button>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex gap-4 text-left">
                <Smartphone className="w-8 h-8 text-blue-600 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p className="text-[11px] text-blue-800 font-black uppercase tracking-tight">Pro Tip | نصيحة:</p>
                  <p className="text-[10px] text-blue-700 leading-relaxed font-bold">
                    Open this link on your phone, then tap "Share" and select "Add to Home Screen" to use it like a real app.<br/>
                    <span className="font-arabic font-bold text-xs" dir="rtl">افتح الرابط من جوالك، اختر "مشاركة" ثم "إضافة إلى الشاشة الرئيسية" ليصبح تطبيقاً ثابتاً.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
