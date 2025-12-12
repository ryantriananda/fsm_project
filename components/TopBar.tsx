
import React, { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';

interface Props {
  lang: 'id' | 'en';
  setLang: (lang: 'id' | 'en') => void;
  t: any;
}

export const TopBar: React.FC<Props> = ({ lang, setLang, t }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-500">
         <span className="font-medium text-gray-900">{t.home}</span> / <span className="text-gray-900 font-medium">{t.assetMonitoring}</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Language Selector */}
        <div className="relative">
            <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors border border-transparent hover:border-gray-200"
            >
                <img 
                    src={lang === 'id' ? "https://flagcdn.com/w40/id.png" : "https://flagcdn.com/w40/gb.png"} 
                    alt="Flag" 
                    className="w-6 h-4 object-cover rounded-sm shadow-sm"
                />
                <span className="text-xs font-medium text-gray-700 uppercase">{lang}</span>
                <ChevronDown size={14} className="text-gray-400" />
            </button>

            {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <button 
                        onClick={() => { setLang('id'); setIsLangMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${lang === 'id' ? 'bg-gray-50 font-medium text-black' : 'text-gray-600'}`}
                    >
                        <img src="https://flagcdn.com/w40/id.png" alt="ID" className="w-5 h-auto shadow-sm rounded-sm" />
                        Bahasa
                    </button>
                    <button 
                        onClick={() => { setLang('en'); setIsLangMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${lang === 'en' ? 'bg-gray-50 font-medium text-black' : 'text-gray-600'}`}
                    >
                        <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="w-5 h-auto shadow-sm rounded-sm" />
                        English
                    </button>
                </div>
            )}
        </div>

        <div className="h-8 w-[1px] bg-gray-200"></div>

        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-400 hover:text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">99+</span>
        </div>
        
        <div className="h-8 w-[1px] bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-800">Muhammad Resa</p>
            <p className="text-xs text-gray-500">PT. Modena Indonesia</p>
          </div>
          <img 
            src="https://picsum.photos/id/1005/100/100" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-gray-200 object-cover"
          />
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};
