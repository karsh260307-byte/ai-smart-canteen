import React from 'react';
import { Clock, Users2, Smartphone, Bell, UtensilsCrossed, ChefHat } from 'lucide-react';
import { USER_BENEFITS } from '../data/canteenData';

const getBenefitIcon = (iconName: string) => {
  switch (iconName) {
    case 'Clock':
      return <Clock className="w-6 h-6 text-cyan-400" />;
    case 'Users2':
      return <Users2 className="w-6 h-6 text-sky-400" />;
    case 'Smartphone':
      return <Smartphone className="w-6 h-6 text-blue-400" />;
    case 'Bell':
      return <Bell className="w-6 h-6 text-amber-400" />;
    case 'UtensilsCrossed':
      return <UtensilsCrossed className="w-6 h-6 text-emerald-400" />;
    case 'ChefHat':
      return <ChefHat className="w-6 h-6 text-teal-400" />;
    default:
      return <Clock className="w-6 h-6 text-cyan-400" />;
  }
};

export const UserBenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-[#080e1e] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Positive Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            Benefits
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Real solutions designed for daily campus life, benefiting both students and cafeteria operators.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USER_BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              id={`benefit-${benefit.id}`}
              className="p-6 rounded-2xl bg-[#1c2541]/60 hover:bg-[#1c2541]/90 border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0b132b] border border-slate-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {getBenefitIcon(benefit.icon)}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-['Poppins']">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
