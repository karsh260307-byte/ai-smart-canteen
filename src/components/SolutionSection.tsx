import React from 'react';
import { Camera, Eye, ScanFace, TrendingUp, Clock, Smartphone, ChevronRight, ArrowDown } from 'lucide-react';
import { AI_SOLUTION_PIPELINE } from '../data/canteenData';

const getPipelineIcon = (iconName: string) => {
  switch (iconName) {
    case 'Camera':
      return <Camera className="w-5 h-5 text-cyan-400" />;
    case 'Eye':
      return <Eye className="w-5 h-5 text-sky-400" />;
    case 'ScanFace':
      return <ScanFace className="w-5 h-5 text-indigo-400" />;
    case 'TrendingUp':
      return <TrendingUp className="w-5 h-5 text-blue-400" />;
    case 'Clock':
      return <Clock className="w-5 h-5 text-emerald-400" />;
    case 'Smartphone':
      return <Smartphone className="w-5 h-5 text-cyan-300" />;
    default:
      return <Camera className="w-5 h-5 text-cyan-400" />;
  }
};

export const SolutionSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#0b132b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            System Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            Our AI Solution
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Our system uses camera/sensor data and Artificial Intelligence to analyse the canteen queue and provide real-time queue information.
          </p>
        </div>

        {/* Flow Representation */}
        <div className="relative">
          {/* Desktop horizontal chain & Mobile vertical stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {AI_SOLUTION_PIPELINE.map((stepItem, index) => (
              <div key={stepItem.step} className="flex flex-col items-center relative">
                {/* Step Card */}
                <div
                  id={`solution-step-${stepItem.step}`}
                  className="w-full h-full p-5 rounded-xl bg-[#1c2541]/70 border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between group backdrop-blur-sm shadow-md hover:shadow-cyan-500/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                        STEP {stepItem.step}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-[#0b132b] border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getPipelineIcon(stepItem.icon)}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5 font-['Poppins']">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator between steps */}
                {index < AI_SOLUTION_PIPELINE.length - 1 && (
                  <>
                    {/* Desktop Right Arrow */}
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className="w-6 h-6 rounded-full bg-[#0b132b] border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    {/* Mobile Down Arrow */}
                    <div className="lg:hidden my-2 flex justify-center text-cyan-400">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack Annotation */}
        <div className="mt-12 p-4 rounded-xl bg-[#131d38]/80 border border-slate-700/60 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-semibold text-white">Student Prototype Framework:</span>
            <span className="text-slate-400">Computer Vision Inference • Edge Camera Sensor • Student Portal</span>
          </div>
          <span className="text-cyan-300 font-mono text-[11px] bg-[#0b132b] px-2.5 py-1 rounded border border-cyan-500/20">
            Pipeline Latency: ~1.2 sec (Demo Mode)
          </span>
        </div>
      </div>
    </section>
  );
};
