'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ToastItem {
  id: number;
  type: 'success' | 'error';
  message: string;
}

let toastId = 0;
let globalAddToast: ((item: Omit<ToastItem, 'id'>) => void) | null = null;

export function showToast(type: ToastItem['type'], message: string) {
  globalAddToast?.({ type, message });
}

const DURATION = 4000;

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addToast = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { ...item, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, DURATION);
  }, []);

  useEffect(() => {
    globalAddToast = addToast;
    return () => {
      globalAddToast = null;
    };
  }, [addToast]);

  if (!mounted || toasts.length === 0) return null;

  return createPortal(
    <div
      style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99998 }}
      className="flex flex-col items-end gap-2"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slide-in flex items-center gap-2.5 rounded-[14px] border px-4 py-3 text-[13px] font-medium shadow-[0_8px_24px_rgba(1,24,41,0.12)] ${
            toast.type === 'success'
              ? 'border-[#b8e6d0] bg-white text-[#1f8f6f]'
              : 'border-[#f5d0d3] bg-white text-[#d15b64]'
          }`}
        >
          <span className="text-[16px]">{toast.type === 'success' ? '\u2713' : '\u2717'}</span>
          {toast.message}
        </div>
      ))}
    </div>,
    document.body,
  );
}
