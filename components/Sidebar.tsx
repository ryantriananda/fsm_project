
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PenTool, 
  ShoppingCart, 
  FileText, 
  Clock, 
  Users, 
  CreditCard, 
  Home, 
  BookOpen, 
  BarChart, 
  Search,
  ChevronLeft,
  Car,
  Database,
  Wrench,
  Send,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Props {
  activeItem: string;
  onNavigate: (label: string) => void;
  t: any;
}

interface MenuItem {
    label: string;
    key?: string; // Add a key for translation lookup
    icon: React.ReactNode;
    subItems?: MenuItem[];
}

export const Sidebar: React.FC<Props> = ({ activeItem, onNavigate, t }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Kendaraan', 'Master Data', 'Vehicle']);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
        prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  // Define menu structure using keys for translation
  const menuStructure = [
    { key: 'dashboard', icon: <LayoutDashboard size={20} /> },
    { 
        key: 'vehicle', 
        icon: <Car size={20} />,
        subItems: [
            { key: 'assetList', icon: <Database size={18} />, originalLabel: 'Daftar Aset' },
            { key: 'service', icon: <Wrench size={18} />, originalLabel: 'Servis' },
            { key: 'taxKir', icon: <FileText size={18} />, originalLabel: 'Pajak & KIR' },
            { key: 'mutation', icon: <Send size={18} />, originalLabel: 'Mutasi' },
            { key: 'sales', icon: <DollarSign size={18} />, originalLabel: 'Penjualan' },
        ]
    },
    { key: 'atk', icon: <PenTool size={20} /> },
    { key: 'ark', icon: <ShoppingCart size={20} /> },
    { key: 'contract', icon: <FileText size={20} /> },
    { key: 'timesheet', icon: <Clock size={20} /> },
    { key: 'vendor', icon: <Users size={20} /> },
    { key: 'creditCard', icon: <CreditCard size={20} /> },
    { 
      key: 'masterData', 
      icon: <Home size={20} />,
      subItems: [
        { key: 'taxType', icon: <Wrench size={18} />, originalLabel: 'Jenis Pajak' },
        { key: 'paymentType', icon: <Wrench size={18} />, originalLabel: 'Jenis Pembayaran' },
        { key: 'serviceType', icon: <Wrench size={18} />, originalLabel: 'Jenis Servis' },
        { key: 'mutationStatus', icon: <Wrench size={18} />, originalLabel: 'Status Mutasi' },
        { key: 'salesStatus', icon: <Wrench size={18} />, originalLabel: 'Status Penjualan' },
        { key: 'requestStatus', icon: <Wrench size={18} />, originalLabel: 'Status Request' },
        { key: 'mutationType', icon: <Wrench size={18} />, originalLabel: 'Tipe Mutasi' },
        { key: 'vendorType', icon: <Wrench size={18} />, originalLabel: 'Tipe Vendor' },
        { key: 'role', icon: <Wrench size={18} />, originalLabel: 'Role' },
        { key: 'masterVendor', icon: <Users size={18} />, originalLabel: 'Master Vendor' },
      ]
    },
    { key: 'logBook', icon: <BookOpen size={20} /> },
    { key: 'projectMgmt', icon: <BarChart size={20} /> },
  ];

  return (
    <div className="w-64 bg-black text-gray-400 flex flex-col h-screen fixed left-0 top-0 border-r border-gray-800 z-20 transition-all duration-300">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 text-white mb-2">
        <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">M</div>
        <div>
          <h1 className="font-bold text-lg leading-none">MODENA</h1>
          <p className="text-xs text-gray-500">Asset Management</p>
        </div>
      </div>

      {/* Search Menu Input */}
      <div className="px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-600" size={16} />
          <input 
            type="text" 
            placeholder={t.searchMenu} 
            className="w-full bg-[#1a1a1a] text-sm text-gray-300 pl-10 pr-4 py-2 rounded border border-gray-800 focus:outline-none focus:border-gray-600 placeholder-gray-600"
          />
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-1">
        {menuStructure.map((item, index) => {
          const label = t[item.key] || item.key;
          const hasSub = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedMenus.includes(label) || expandedMenus.includes(item.key); // Check both for persistence
          
          // Check if parent is active (exact match on label or activeItem matches one of its children's original labels)
          // Note: navigation logic relies on original labels mostly in App.tsx, we display translated.
          // To keep it simple, we check against the translated label or the key if needed.
          // However, App.tsx state likely holds the 'Original' string (e.g., 'Daftar Aset').
          // We need to match activeItem (which is likely the ID string) to the ID string here.
          
          const isParentActive = activeItem === item.key || activeItem === label;

          if (hasSub) {
              return (
                  <div key={index} className="space-y-1">
                      <button
                        onClick={() => toggleMenu(label)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-[#1a1a1a] hover:text-white text-gray-500`}
                      >
                         <div className="flex items-center gap-4">
                            <span>{item.icon}</span>
                            {label}
                         </div>
                         {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isExpanded && (
                          <div className="space-y-1">
                              {item.subItems!.map((sub, subIndex) => {
                                  const subLabel = t[sub.key] || sub.key;
                                  // Navigate using the Original Label (ID) because App.tsx logic switches on those strings
                                  const navTarget = sub.originalLabel || subLabel; 
                                  const isSubActive = activeItem === navTarget;
                                  
                                  return (
                                    <button
                                        key={subIndex}
                                        onClick={() => onNavigate(navTarget)}
                                        className={`w-full flex items-center gap-4 pl-12 pr-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                                            ${isSubActive
                                            ? 'bg-[#1a1a1a] text-white border-l-4 border-white' 
                                            : 'hover:bg-[#1a1a1a] hover:text-white border-l-4 border-transparent text-gray-500'}`}
                                    >
                                        <span className={`${isSubActive ? 'text-white' : 'text-gray-500'}`}>{sub.icon}</span>
                                        {subLabel}
                                    </button>
                                  )
                              })}
                          </div>
                      )}
                  </div>
              );
          }

          return (
            <button
              key={index}
              onClick={() => onNavigate(t[item.key] || item.key)} // Fallback for simple items
              className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                ${isParentActive
                  ? 'bg-[#1a1a1a] text-white border-l-4 border-white' 
                  : 'hover:bg-[#1a1a1a] hover:text-white border-l-4 border-transparent text-gray-500'}`}
            >
              <span className={`${isParentActive ? 'text-white' : 'text-gray-500'}`}>{item.icon}</span>
              {label}
            </button>
          );
        })}
      </nav>

      {/* Footer / Minimize */}
      <div className="p-4 border-t border-gray-900">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
          <div className="bg-gray-900 p-1 rounded-full">
            <ChevronLeft size={14} />
          </div>
          {t.minimize}
        </button>
      </div>
    </div>
  );
};
