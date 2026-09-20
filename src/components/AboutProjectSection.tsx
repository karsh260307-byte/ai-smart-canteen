import React from 'react';
import { GraduationCap, User, BookOpen, Calendar, Building, Sparkles, Quote, Award } from 'lucide-react';
import { PROJECT_DETAILS } from '../data/canteenData';

export const AboutProjectSection: React.FC = () => {
  return (
    <section id="about-project" className="py-16 md:py-24 bg-[#080e1e] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Academic Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Poppins']">
            AI Immersion Project
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Student developer project under Artificial Intelligence &amp; Data Science curriculum.
          </p>
        </div>

        {/* Project Profile Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#1c2541] to-[#0f182e] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Subtle Background Badge */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Student Avatar / Badge */}
            <div className="md:col-span-4 text-center">
              <div className="relative w-28 h-28 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full rounded-2xl bg-[#0b132b] flex flex-col items-center justify-center text-cyan-300">
                  <GraduationCap className="w-12 h-12 text-cyan-400" />
                  <span className="text-[10px] font-mono mt-1 text-slate-300">STUDENT</span>
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-white font-['Poppins']">
                {PROJECT_DETAILS.studentName}
              </h3>
              <p className="text-xs font-semibold text-cyan-400">
                Lead Student Developer
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[11px] text-cyan-300 font-mono">
                <Award className="w-3.5 h-3.5" />
                <span>AI Immersion 2026</span>
              </div>
            </div>

            {/* Right Column: Academic Information Table */}
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Field 1: Project */}
                <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#0b132b]/80 border border-slate-700/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Project</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {PROJECT_DETAILS.projectTitle}
                  </div>
                </div>

                {/* Field 2: Student */}
                <div className="p-3.5 rounded-xl bg-[#0b132b]/80 border border-slate-700/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Student</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {PROJECT_DETAILS.studentName}
                  </div>
                </div>

                {/* Field 3: Class */}
                <div className="p-3.5 rounded-xl bg-[#0b132b]/80 border border-slate-700/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Class</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {PROJECT_DETAILS.studentClass}
                  </div>
                </div>

                {/* Field 4: Batch */}
                <div className="p-3.5 rounded-xl bg-[#0b132b]/80 border border-slate-700/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Batch</span>
                  </div>
                  <div className="text-sm font-bold text-cyan-300 mt-1 font-mono">
                    {PROJECT_DETAILS.batch}
                  </div>
                </div>

                {/* Field 5: College */}
                <div className="p-3.5 rounded-xl bg-[#0b132b]/80 border border-slate-700/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>College</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {PROJECT_DETAILS.college}
                  </div>
                </div>
              </div>

              {/* Short Statement required by prompt */}
              <div className="p-4 rounded-xl bg-[#131d38] border border-cyan-500/30 flex items-start gap-3 mt-4">
                <Quote className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base italic text-slate-200 font-medium leading-relaxed">
                  “{PROJECT_DETAILS.statement}”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
