import React from 'react';
import { X, MapPin, Compass, Navigation, Footprints, Info, Building2, Check } from 'lucide-react';
import { CanteenLocation } from '../types';

interface CanteenLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCanteen: CanteenLocation;
  allCanteens: CanteenLocation[];
  onSelectCanteen: (canteen: CanteenLocation) => void;
}

export const CanteenLocationModal: React.FC<CanteenLocationModalProps> = ({
  isOpen,
  onClose,
  selectedCanteen,
  allCanteens,
  onSelectCanteen
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="canteen-location-modal"
        className="w-full max-w-3xl bg-[#0e172e] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-700/80 flex items-center justify-between bg-[#152042]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-['Poppins']">
                Campus Canteen Map & Directions
              </h3>
              <p className="text-xs text-slate-400">
                Rathinam Technical Campus • Prototype Campus Layout
              </p>
            </div>
          </div>
          <button
            id="close-location-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#0b132b] hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Important disclaimer */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0 text-amber-400" />
            <span>
              <strong>Prototype Map Simulation:</strong> Stylized architectural layout for campus demo. No real GPS tracking is performed.
            </span>
          </div>

          {/* Campus Map Graphic (SVG) */}
          <div className="relative rounded-2xl bg-[#080d1a] border border-cyan-500/20 p-4 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-mono text-cyan-400 font-semibold uppercase">
                RTC Campus Zone Grid
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" /> North Facing
              </span>
            </div>

            {/* SVG Interactive Campus Map */}
            <div className="relative w-full aspect-[16/9] max-h-[300px] rounded-xl bg-[#0c142b] border border-slate-800 p-2">
              <svg viewBox="0 0 500 280" className="w-full h-full select-none">
                {/* Background Campus pathways */}
                <path
                  d="M 50 140 L 450 140 M 250 30 L 250 250 M 130 90 L 370 190"
                  stroke="#1e293b"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 140 L 450 140 M 250 30 L 250 250 M 130 90 L 370 190"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                {/* Campus Landmark Buildings */}
                {/* Academic Block A */}
                <rect x="70" y="40" width="110" height="70" rx="8" fill="#132042" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="125" y="75" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Academic Block A</text>
                <text x="125" y="90" fill="#94a3b8" fontSize="8" textAnchor="middle">CS & AI Departments</text>

                {/* Central Admin Quad & Library */}
                <rect x="200" y="90" width="100" height="90" rx="8" fill="#132042" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="250" y="130" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Central Block</text>
                <text x="250" y="145" fill="#94a3b8" fontSize="8" textAnchor="middle">Admin & Central Library</text>

                {/* Student Activity Center (SAC) */}
                <rect x="330" y="160" width="120" height="70" rx="8" fill="#132042" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="390" y="195" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Student Activity Hub</text>
                <text x="390" y="210" fill="#94a3b8" fontSize="8" textAnchor="middle">Auditorium & Gym</text>

                {/* Campus Gate */}
                <rect x="30" y="230" width="80" height="30" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="70" y="250" fill="#64748b" fontSize="8" textAnchor="middle">Main Campus Gate</text>

                {/* Walking path to selected canteen */}
                <path
                  d={`M 70 230 Q 180 170 ${selectedCanteen.mapCoords.x * 5} ${selectedCanteen.mapCoords.y * 2.8}`}
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* Canteen Pins */}
                {allCanteens.map((canteen) => {
                  const isCurSelected = canteen.id === selectedCanteen.id;
                  const cx = canteen.mapCoords.x * 5;
                  const cy = canteen.mapCoords.y * 2.8;

                  return (
                    <g
                      key={canteen.id}
                      className="cursor-pointer"
                      onClick={() => onSelectCanteen(canteen)}
                    >
                      {/* Pulse when selected */}
                      {isCurSelected && (
                        <circle cx={cx} cy={cy} r="18" fill="#00f0ff" opacity="0.3" className="animate-ping" />
                      )}

                      {/* Pin Circle */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isCurSelected ? 12 : 9}
                        fill={isCurSelected ? '#00f0ff' : '#0284c7'}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />

                      {/* Icon letter */}
                      <text
                        x={cx}
                        y={cy + 4}
                        fill="#0b132b"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        🍽️
                      </text>

                      {/* Label Tag */}
                      <rect
                        x={cx - 45}
                        y={cy - 28}
                        width="90"
                        height="18"
                        rx="4"
                        fill="#0b132b"
                        stroke={isCurSelected ? '#00f0ff' : '#475569'}
                        strokeWidth="1"
                      />
                      <text
                        x={cx}
                        y={cy - 16}
                        fill={isCurSelected ? '#00f0ff' : '#ffffff'}
                        fontSize="8"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {canteen.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick selector buttons inside modal */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {allCanteens.map((canteen) => {
                const active = canteen.id === selectedCanteen.id;
                return (
                  <button
                    key={canteen.id}
                    id={`map-select-canteen-${canteen.id}`}
                    onClick={() => onSelectCanteen(canteen)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      active
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-[#131d38] border-slate-700/80 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-['Poppins']">{canteen.name}</span>
                      {active && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{canteen.floor}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Canteen Directions & Detail Box */}
          <div className="p-5 rounded-2xl bg-[#131d38] border border-cyan-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  Directions to {selectedCanteen.name}
                </span>
                <h4 className="text-lg font-bold text-white font-['Poppins'] mt-0.5">
                  {selectedCanteen.building}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5">
                  <Footprints className="w-3.5 h-3.5" />
                  {selectedCanteen.walkingTime}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0b132b] border border-slate-800">
                <span className="text-slate-400 block">Exact Floor / Wing:</span>
                <span className="font-semibold text-slate-200">{selectedCanteen.floor}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0b132b] border border-slate-800">
                <span className="text-slate-400 block">Operating Hours:</span>
                <span className="font-semibold text-slate-200">{selectedCanteen.operatingHours}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0b132b] border border-slate-800 sm:col-span-2">
                <span className="text-slate-400 block">Counter Specialty & Menu Style:</span>
                <span className="font-semibold text-slate-200">{selectedCanteen.specialty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#152042] border-t border-slate-700/80 flex items-center justify-end">
          <button
            id="modal-done-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
