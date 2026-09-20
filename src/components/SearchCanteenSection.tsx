import React, { useState } from 'react';
import { Search, MapPin, Navigation, Clock, Users, Check, Sparkles, Building } from 'lucide-react';
import { CanteenLocation, QueueLevel } from '../types';
import { CANTEEN_LIST } from '../data/canteenData';
import { CanteenLocationModal } from './CanteenLocationModal';

interface SearchCanteenSectionProps {
  selectedCanteen: CanteenLocation;
  onSelectCanteen: (canteen: CanteenLocation) => void;
  activeQueueLevel: QueueLevel;
  onSyncLevelToCanteen?: (level: QueueLevel) => void;
}

export const SearchCanteenSection: React.FC<SearchCanteenSectionProps> = ({
  selectedCanteen,
  onSelectCanteen,
  activeQueueLevel,
  onSyncLevelToCanteen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const filteredCanteens = CANTEEN_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="search-canteen" className="py-12 md:py-16 bg-[#0c142b] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Search className="w-3.5 h-3.5" />
              Multi-Canteen Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Poppins'] flex items-center gap-3">
              <span>Campus Canteen Selector</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                3 Outlets Active
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Search and compare live queue densities across Rathinam Technical Campus cafeterias before making your break-time walk.
            </p>
          </div>

          {/* Location & Directions Button */}
          <button
            id="view-campus-map-btn"
            onClick={() => setIsMapModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c2541] hover:bg-[#253258] border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span>Campus Map & Directions</span>
          </button>
        </div>

        {/* Search input bar */}
        <div className="mb-8 max-w-xl">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="canteen-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search canteen by name (e.g., Main Canteen, Block A, Food Court)..."
              className="w-full pl-11 pr-4 py-3 bg-[#131d38] border border-cyan-500/30 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-0.5 bg-slate-800 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Canteen Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCanteens.map((canteen) => {
            const isSelected = canteen.id === selectedCanteen.id;

            // Status styling based on canteen's current level
            const levelConfig = {
              LOW: { bg: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400', emoji: '🟢' },
              MEDIUM: { bg: 'border-amber-500/40 bg-amber-500/10 text-amber-400', emoji: '🟡' },
              HIGH: { bg: 'border-rose-500/40 bg-rose-500/10 text-rose-400', emoji: '🔴' }
            }[canteen.currentLevel];

            return (
              <div
                key={canteen.id}
                id={`canteen-card-${canteen.id}`}
                onClick={() => {
                  onSelectCanteen(canteen);
                  if (onSyncLevelToCanteen) onSyncLevelToCanteen(canteen.currentLevel);
                }}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md relative ${
                  isSelected
                    ? 'bg-[#1c2541] border-cyan-400 shadow-xl shadow-cyan-500/15 ring-2 ring-cyan-400/40 scale-[1.02]'
                    : 'bg-[#131d38]/80 border-slate-700 hover:border-slate-500 hover:bg-[#1c2541]/70'
                }`}
              >
                {/* Active Indicator Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-400 text-slate-950 flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    SELECTED
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 flex-shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Poppins']">
                      {canteen.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {canteen.floor}
                    </p>
                  </div>
                </div>

                {/* Queue Status Pill */}
                <div className="mb-4 flex items-center justify-between p-2.5 rounded-xl bg-[#0b132b]/80 border border-slate-700/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span>{levelConfig.emoji}</span>
                    <span className="font-bold uppercase tracking-wider text-slate-200">
                      {canteen.currentLevel} Queue
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ~{canteen.estimatedWaitMinutes} min wait
                  </span>
                </div>

                {/* Quick Info list */}
                <div className="space-y-2 text-xs text-slate-300 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Hours:
                    </span>
                    <span className="font-medium text-slate-200">{canteen.operatingHours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      Demo Count:
                    </span>
                    <span className="font-bold text-white">{canteen.peopleWaiting} in line</span>
                  </div>
                </div>

                {/* Bottom Specialty & Directions */}
                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 truncate max-w-[170px]" title={canteen.specialty}>
                    {canteen.specialty}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCanteen(canteen);
                      setIsMapModalOpen(true);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Directions</span>
                    <Navigation className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCanteens.length === 0 && (
          <div className="text-center py-10 bg-[#131d38]/50 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No canteens match your query “{searchQuery}”.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-2 text-cyan-400 text-xs hover:underline font-semibold"
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Selected Canteen Context Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-300">
              Active Dashboard View: <strong className="text-white">{selectedCanteen.name}</strong> ({selectedCanteen.location})
            </span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            {selectedCanteen.walkingTime}
          </span>
        </div>
      </div>

      {/* Campus Map & Directions Modal */}
      <CanteenLocationModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        selectedCanteen={selectedCanteen}
        allCanteens={CANTEEN_LIST}
        onSelectCanteen={(c) => {
          onSelectCanteen(c);
          if (onSyncLevelToCanteen) onSyncLevelToCanteen(c.currentLevel);
        }}
      />
    </section>
  );
};
