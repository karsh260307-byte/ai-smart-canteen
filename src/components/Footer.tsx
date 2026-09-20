import React from 'react';
import { Sparkles, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060a14] border-t border-cyan-500/20 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800 text-center md:text-left">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white font-['Poppins']">
                Smart Canteen <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              AI Immersion Project | Rathinam Technical Campus
            </p>
          </div>

          {/* Thank You Note required by prompt */}
          <div className="p-4 rounded-2xl bg-[#131d38]/80 border border-cyan-500/30 text-center">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold">
              AI Immersion Project Submission
            </span>
            <h4 className="text-xl font-extrabold text-white mt-0.5 font-['Poppins']">
              Thank You
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Designed &amp; Developed by Gokul (Batch C29)
            </p>
          </div>

          {/* Back to top */}
          <div>
            <button
              id="footer-scroll-top-btn"
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c2541] hover:bg-[#253256] text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            <p>© 2026 Smart Canteen AI • Academic Prototype Demonstration</p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-1">
              <button onClick={() => onScrollTo('live-queue')} className="hover:text-cyan-300 transition-colors">Live Queue</button>
              <span>•</span>
              <button onClick={() => onScrollTo('ai-queue-prediction')} className="hover:text-cyan-300 text-cyan-400 font-medium transition-colors">AI Queue Prediction</button>
              <span>•</span>
              <button onClick={() => onScrollTo('food-menu')} className="hover:text-cyan-300 transition-colors">Food Menu</button>
              <span>•</span>
              <button onClick={() => onScrollTo('my-order')} className="hover:text-cyan-300 transition-colors">My Order</button>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with dedication for campus student convenience</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
