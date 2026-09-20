import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Sparkles, X } from 'lucide-react';
import { NotificationAlert } from '../types';

interface NotificationAlertToastProps {
  toast: NotificationAlert | null;
  onDismiss: () => void;
  onViewQueue: () => void;
}

export const NotificationAlertToast: React.FC<NotificationAlertToastProps> = ({
  toast,
  onDismiss,
  onViewQueue
}) => {
  if (!toast) return null;

  return (
    <div
      id="notification-live-toast"
      className="fixed bottom-6 right-6 z-50 max-w-md w-[92vw] sm:w-auto p-4 rounded-2xl bg-[#0f1b38] border border-cyan-400/50 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 text-emerald-400">
          <Bell className="w-5 h-5 animate-bounce" />
        </div>
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {toast.title}
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800">
              Demo Alert
            </span>
          </div>
          <p className="text-sm font-medium text-white mt-1">
            {toast.message}
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <button
              id="toast-action-btn"
              onClick={() => {
                onViewQueue();
                onDismiss();
              }}
              className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              View Queue
            </button>
            <button
              id="toast-dismiss-text-btn"
              onClick={onDismiss}
              className="px-2 py-1 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
        <button
          id="toast-close-btn"
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
