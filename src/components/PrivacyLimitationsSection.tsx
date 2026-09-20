import React from 'react';
import { ShieldCheck, AlertTriangle, EyeOff, Lock, ServerOff, Video, Sliders } from 'lucide-react';
import { PRIVACY_AND_LIMITATIONS } from '../data/canteenData';

export const PrivacyLimitationsSection: React.FC = () => {
  return (
    <section id="responsible-ai" className="py-16 md:py-24 bg-[#080e1e] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Ethics & Reliability
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            Responsible AI
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Designing campus technology with student data protection and transparent engineering boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Privacy Commitment (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1c2541] to-[#0e172e] border border-cyan-500/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center mb-6 text-cyan-300">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Student Privacy Guarantee
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-4 font-['Poppins']">
                Anonymous Queue Counting
              </h3>

              <blockquote className="p-4 rounded-xl bg-[#0b132b]/80 border-l-4 border-cyan-400 text-slate-200 text-sm leading-relaxed mb-6">
                “{PRIVACY_AND_LIMITATIONS.privacy}”
              </blockquote>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <EyeOff className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>No facial recognition algorithms deployed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>No personal student IDs or biometric records stored</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ServerOff className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Temporary video stream frames are immediately destroyed</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700/80 text-[11px] text-cyan-300 font-mono flex items-center justify-between">
              <span>Campus Ethics Compliance</span>
              <span className="text-emerald-400 font-semibold">Privacy-by-Design</span>
            </div>
          </div>

          {/* Right Column: Engineering Limitations (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#131d38]/90 border border-slate-700/80 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Realistic Engineering Boundaries
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 font-['Poppins']">
              System Limitations
            </h3>

            <div className="space-y-3.5">
              {PRIVACY_AND_LIMITATIONS.limitations.map((item, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-[#0b132b]/80 border border-slate-700/70 hover:border-amber-500/30 transition-colors flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 rounded-xl bg-[#1c2541]/70 border border-cyan-500/20 text-xs text-slate-300 flex items-center justify-between">
              <span className="italic">Prototype notice: Hardware integration in progress for lab validation.</span>
              <span className="font-mono text-cyan-400 text-[11px]">Academic Stage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
