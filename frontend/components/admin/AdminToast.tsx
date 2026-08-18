"use client";
import { useEffect, useState } from "react";

export interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface AdminToastProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const ICONS = {
  success: (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 min-w-[280px] max-w-sm animate-slideIn">
      <div className="flex-shrink-0 mt-0.5">{ICONS[toast.type]}</div>
      <p className="text-sm text-gray-700 flex-1 leading-relaxed">{toast.message}</p>
      <button onClick={() => onDismiss(toast.id)} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } } .animate-slideIn { animation: slideIn 0.3s ease-out; }`}</style>
    </div>
  );
}

export default function AdminToast({ toasts, onDismiss }: AdminToastProps) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2 items-end">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />)}
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (type: Toast["type"], message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  return {
    toasts,
    dismiss,
    success: (msg: string) => push("success", msg),
    error:   (msg: string) => push("error", msg),
    info:    (msg: string) => push("info", msg),
  };
}
