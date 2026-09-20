import React from 'react';
import { Cpu, Users, Clock, LineChart, Camera, Brain, UserCheck, ArrowRight, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { AI_WORK_CARDS } from '../data/canteenData';

const getAiCardIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu':
      return <Cpu className="w-6 h-6 text-cyan-400" />;
    case 'Users':
      return <Users className="w-6 h-6 text-sky-400" />;
    case 'Clock':
      return <Clock className="w-6 h-6 text-emerald-400" />;
    case 'LineChart':
      return <LineChart className="w-6 h-6 text-indigo-400" />;
    default:
      return <Cpu className="w-6 h-6 text-cyan-400" />;
  }
};

export const AiAnalysisSection: React.FC = () => {
  const diagramSteps = [
    { label: 'Camera', sub: 'Ceiling Video Feed', icon: Camera, color: 'text-cyan-400' },
    { label: 'AI Model', sub: 'CV Object Detection', icon: Brain, color: 'text-sky-400' },
    { label: 'Queue Count', sub: 'Zone Headcount', icon: Users, color: 'text-indigo-400' },
    { label: 'Waiting Time', sub: 'Service Algorithmic Rate', icon: Clock, color: 'text-emerald-400' },
    { label: 'User', sub: 'Student App Screen', icon: UserCheck, color: 'text-cyan-300' },
  ];

  return (
    <section id="ai-analysis" className="py-16 md:py-24 bg-[#080e1e] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Core Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            How Artificial Intelligence Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A targeted, domain-specific AI pipeline engineered specifically for college cafeteria queue analysis.
          </p>
        </div>

        {/* 4 Cards Required by prompt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {AI_WORK_CARDS.map((card) => (
            <div
              key={card.id}
              id={`ai-work-card-${card.id}`}
              className="p-6 rounded-2xl bg-[#1c2541]/70 hover:bg-[#1c2541]/90 border border-slate-700 hover:border-cyan-500/40 transition-all flex flex-col justify-between backdrop-blur-sm group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0b132b] border border-slate-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getAiCardIcon(card.icon)}
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide mb-2 font-['Poppins']">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-200 font-medium mb-3 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Special clarification box, especially for Computer Vision */}
              {card.id === 'ai-1' ? (
                <div className="mt-4 p-3 rounded-lg bg-[#0b132b]/90 border border-cyan-500/30 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Detects vehicles or general objects? No.</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Only detects students in queue.</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
                  {card.clarification}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Processing Diagram: Camera → AI Model → Queue Count → Waiting Time → User */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#131d38]/90 border border-cyan-500/30 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60">
              AI INFERENCE PIPELINE DIAGRAM
            </span>
            <h3 className="text-xl font-bold text-white mt-2 font-['Poppins']">
              Camera → AI Model → Queue Count → Waiting Time → User
            </h3>
          </div>

          {/* Diagram Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {diagramSteps.map((step, index) => {
              const IconComp = step.icon;
              return (
                <div key={step.label} className="relative flex flex-col items-center">
                  <div className="w-full p-4 rounded-xl bg-[#0b132b]/90 border border-slate-700/80 text-center hover:border-cyan-500/40 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#1c2541] border border-slate-700 flex items-center justify-center mx-auto mb-2">
                      <IconComp className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div className="text-sm font-bold text-white font-['Poppins']">
                      {step.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                      {step.sub}
                    </div>
                  </div>

                  {/* Arrow for desktop */}
                  {index < diagramSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-cyan-400">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>Edge processing designed for privacy: frames discarded immediately after counting</span>
            </div>
            <div className="font-mono text-cyan-300">
              Deterministic Queue Algorithm: t_wait = count × avg_service_time
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
