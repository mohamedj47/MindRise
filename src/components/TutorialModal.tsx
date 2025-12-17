
import React, { useEffect, useRef } from 'react';
import { X, Youtube, Mic, Camera, List, Sparkles } from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// كود الفيديو
const VIDEO_ID = "fqWGC1n9pBs";

// رابط موسيقى جديد ومباشر (Sad Piano) - رابط أكثر استقراراً
const BG_MUSIC_URL = "https://cdn.pixabay.com/audio/2021/11/25/audio_91572d4221.mp3";

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // تشغيل الموسيقى عند فتح النافذة
  useEffect(() => {
    if (isOpen) {
        // إنشاء عنصر الصوت
        const audio = new Audio(BG_MUSIC_URL);
        audio.volume = 0.2; // رفع الصوت قليلاً ليكون مسموعاً
        audio.loop = true;
        audio.preload = 'auto';
        audioRef.current = audio;

        // محاولة التشغيل
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio autoplay prevented:", error);
                // محاولة أخرى عند تفاعل المستخدم مع الصفحة
                const handleUserInteraction = () => {
                    audio.play();
                    document.removeEventListener('click', handleUserInteraction);
                };
                document.addEventListener('click', handleUserInteraction);
            });
        }
    }

    return () => {
        // تنظيف وإيقاف الصوت عند الإغلاق
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300 font-sans" dir="rtl">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col relative animate-in zoom-in-95 duration-300 max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all"
        >
          <X size={24} />
        </button>

        {/* Video Section */}
        <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center text-center group">
            {VIDEO_ID ? (
                <iframe 
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&autoplay=1`} 
                    title="شرح استخدام التطبيق"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <div className="p-6 flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-red-900/50 animate-pulse group-hover:scale-110 transition-transform cursor-pointer">
                        <Youtube size={32} className="fill-current md:w-10 md:h-10" />
                    </div>
                    <h3 className="text-white text-lg md:text-xl font-bold mb-2">فيديو شرح التطبيق</h3>
                    <p className="text-slate-300 text-xs md:text-sm max-w-md">
                        سيتم إضافة فيديو قريباً لشرح كيفية استخدام المميزات.
                    </p>
                </div>
            )}
        </div>

        {/* Quick Guide Steps */}
        <div className="p-6 bg-slate-50 flex-1 overflow-y-auto">
            <h3 className="text-xl font-black text-slate-800 mb-4 text-center">مميزات ستجعلك تتفوق 🚀</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg shrink-0">
                        <Mic size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">اسأل بصوتك</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">اضغط على الميكروفون وتحدث مع المعلم كأنك في حصة خاصة.</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg shrink-0">
                        <Camera size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">صور مسألتك</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">أي سؤال في الكتاب يوقفك؟ صوره وهنشرحهولك فوراً.</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg shrink-0">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">استمع للشرح</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">اضغط "استمع" لتقرأ لك المعلمة الشرح بصوت بشري واضح.</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg shrink-0">
                        <List size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">مكتبة الدروس</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">تصفح فهرس المنهج كاملاً واختر الدرس لبدء الشرح.</p>
                    </div>
                </div>
            </div>

            <button 
                onClick={onClose}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
            >
                ابدأ رحلة التفوق الآن
            </button>
        </div>
      </div>
    </div>
  );
};

