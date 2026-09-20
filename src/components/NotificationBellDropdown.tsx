import React, { useState, useRef, useEffect } from 'react';
import { Bell, Sparkles, Check, Trash2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { NotificationAlert } from '../types';

interface NotificationBellDropdownProps {
  notifications: NotificationAlert[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onSelectNotificationAction?: (notification: NotificationAlert) => void;
  onTriggerDemoLowQueueAlert: () => void;
}

export const NotificationBellDropdown: React.FC<NotificationBellDropdownProps> = ({
  notifications,
  onMarkAsRead,
  onClearAll,
  onSelectNotificationAction,
  onTriggerDemoLowQueueAlert
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        id="nav-notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-[#1c2541] hover:bg-[#253258] border border-cyan-500/30 text-slate-200 hover:text-cyan-300 transition-all cursor-pointer"
        aria-label="Queue Notifications"
      >
        <Bell className="w-5 h-5 text-cyan-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[10px] font-extrabold text-slate-950 items-center justify-center">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="notification-dropdown-menu"
          className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0f1b38] border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl z-50 overflow-hidden text-slate-100 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-[#162244] border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white font-['Poppins']">
                Queue Alerts & Updates
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                Demo
              </span>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/80">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-800/60 flex items-center justify-center mx-auto text-slate-500">
                  <Bell className="w-5 h-5" />
                </div>
                <p>No active alerts right now.</p>
                <button
                  onClick={onTriggerDemoLowQueueAlert}
                  className="text-cyan-400 hover:underline text-[11px] font-semibold cursor-pointer block mx-auto"
                >
                  Trigger “Low Queue” Alert Test
                </button>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onMarkAsRead(item.id);
                    if (onSelectNotificationAction) onSelectNotificationAction(item);
                  }}
                  className={`p-3.5 hover:bg-[#152248] transition-colors cursor-pointer text-xs ${
                    !item.read ? 'bg-cyan-950/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-bold text-slate-200">{item.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-300 pl-4 text-[11px] leading-relaxed">
                    {item.message}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Footer Trigger Test */}
          <div className="p-3 bg-[#131d38] border-t border-slate-700/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 text-[10px]">
              Simulated campus push alerts
            </span>
            <button
              onClick={onTriggerDemoLowQueueAlert}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Simulate “Low Queue” Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
