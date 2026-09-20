import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2, Sparkles, Info } from 'lucide-react';

export const CanteenRatingSection: React.FC = () => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto-reset after a few seconds so reviewers can test again
      setSubmitted(false);
      setFeedback('');
    }, 4000);
  };

  return (
    <section id="canteen-rating" className="py-16 md:py-20 bg-[#0a1125] relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#131d38]/80 border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              Student Experience
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Poppins']">
              Canteen & Queue Rating
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Rate your break-time dining experience and provide simulated suggestions to improve counter throughput.
            </p>

            {/* Prototype notice */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">
              <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
              <span>
                <strong>Prototype Interaction:</strong> This is a frontend demo interface; no real collected analytics or database records are stored.
              </span>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Your simulated {rating}-star rating has been recorded in the demo session. This prototype interaction helps demonstrate student-facing survey features.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating UI */}
              <div className="flex flex-col items-center justify-center gap-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Select Rating (1 to 5 Stars)
                </span>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isFilled = (hoverRating || rating) >= starVal;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        id={`rating-star-${starVal}`}
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-2 text-3xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                        aria-label={`Rate ${starVal} stars`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            isFilled
                              ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <span className="text-xs font-bold text-cyan-300">
                  {rating === 1 && '⭐ Needs Immediate Improvement'}
                  {rating === 2 && '⭐⭐ Fair Queue Speed'}
                  {rating === 3 && '⭐⭐⭐ Good Service'}
                  {rating === 4 && '⭐⭐⭐⭐ Very Fast & Organized'}
                  {rating === 5 && '⭐⭐⭐⭐⭐ Excellent Smart Experience!'}
                </span>
              </div>

              {/* Feedback Text Area */}
              <div>
                <label
                  htmlFor="feedback-textarea"
                  className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
                >
                  Optional Suggestions / Comments (Prototype)
                </label>
                <div className="relative">
                  <textarea
                    id="feedback-textarea"
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="e.g. Queue cleared quickly today during lunch break, nice samosas..."
                    className="w-full p-4 rounded-2xl bg-[#0b132b] border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
                  />
                  <MessageSquare className="w-4 h-4 absolute right-4 bottom-4 text-slate-600" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-[11px] text-slate-500 text-center sm:text-left">
                  Demo Submission • Feedback resets automatically for presentation
                </span>

                <button
                  type="submit"
                  id="submit-feedback-btn"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Feedback</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
