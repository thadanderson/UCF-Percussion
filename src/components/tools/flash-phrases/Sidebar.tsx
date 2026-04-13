"use client";
import React from 'react';
import Link from 'next/link';
import { DATA } from './data';
import { SubCategory } from './types';
import { ListMusic, X, ChevronLeft, Info, BookOpen, Home, LayoutDashboard } from 'lucide-react';
import { FlashLogo } from './FlashLogo';

export type ViewType = 'APP' | 'HOME' | 'GUIDE' | 'SOURCES';

interface SidebarProps {
  currentSubCategory: SubCategory;
  onSelectSubCategory: (sub: SubCategory) => void;
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentSubCategory, onSelectSubCategory, currentView, onSelectView, isOpen, onClose,
}) => {
  const handleLinkClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <>
      {/* Backdrop — absolute within the app container (not fixed to viewport) */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`absolute md:relative top-0 left-0 h-full bg-gray-900 border-r border-gray-800 z-50 transform transition-all duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-0 md:border-r-0 md:overflow-hidden'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800 min-w-[16rem]">
          <div className="flex items-center gap-3 font-bold text-xl text-ucf-gold cursor-pointer group"
            onClick={() => handleLinkClick(() => onSelectView('HOME'))}>
            <FlashLogo className="w-8 h-8" />
            <span className="group-hover:text-ucf-white transition-colors">Flash Phrases</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6 md:hidden" />
            <ChevronLeft className="w-6 h-6 hidden md:block" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 min-w-[16rem]">
          {/* Info links */}
          <div className="mb-6 border-b border-gray-800 pb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Information</h3>
            <ul className="space-y-1">
              {([
                { view: 'HOME' as ViewType, label: 'Home', Icon: Home },
                { view: 'GUIDE' as ViewType, label: 'Guide', Icon: Info },
                { view: 'SOURCES' as ViewType, label: 'Sources', Icon: BookOpen },
              ]).map(({ view, label, Icon }) => (
                <li key={view}>
                  <button onClick={() => handleLinkClick(() => onSelectView(view))}
                    className={`w-full flex items-center gap-3 px-2 py-2 text-sm font-medium rounded-md transition-colors ${currentView === view ? 'bg-gray-800 text-white border border-gray-700' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                    <Icon className="w-4 h-4" /><span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Card categories */}
          {DATA.map((category) => (
            <div key={category.id} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">{category.name}</h3>
              <ul className="space-y-1">
                {category.subCategories.map((sub) => {
                  const isActive = currentView === 'APP' && currentSubCategory.id === sub.id;
                  return (
                    <li key={sub.id}>
                      <button onClick={() => handleLinkClick(() => onSelectSubCategory(sub))}
                        className={`w-full flex items-center gap-3 px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-ucf-gold text-black' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                        <ListMusic className="w-4 h-4" /><span className="text-left">{sub.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 min-w-[16rem] space-y-3">
          <Link href="/dashboard"
            className="flex items-center gap-2 text-gray-500 hover:text-ucf-gold text-xs font-bold uppercase tracking-widest transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Studio Dashboard
          </Link>
          <p className="text-[10px] text-gray-600">
            Created by <a href="https://thadanderson.com" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-ucf-gold transition-colors">Thad Anderson</a>
            <br />Copyright © 2026 · All Rights Reserved
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
