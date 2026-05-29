'use client'
import { useState, useEffect } from 'react';

export type ModalType = 'success' | 'error' | 'warning' | 'confirm';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

const ICONS = {
  success: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  confirm: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const STYLES = {
  success: { icon: 'bg-emerald-100 text-emerald-600', btn: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500' },
  error:   { icon: 'bg-red-100 text-red-600',         btn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500' },
  warning: { icon: 'bg-amber-100 text-amber-600',     btn: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500' },
  confirm: { icon: 'bg-cyan-100 text-cyan-700',       btn: 'bg-cyan-700 hover:bg-cyan-800 focus:ring-cyan-600' },
};

const DEFAULT_LABELS = {
  success: { confirm: 'Ok, entendido' },
  error:   { confirm: 'Fechar' },
  warning: { confirm: 'Entendido' },
  confirm: { confirm: 'Confirmar', cancel: 'Cancelar' },
};

export default function Modal({ isOpen, onClose, type, title, message, confirmLabel, cancelLabel, onConfirm }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const s = STYLES[type];
  const labels = DEFAULT_LABELS[type] as { confirm: string; cancel?: string };
  const isConfirm = type === 'confirm';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={isConfirm ? undefined : onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.25)] p-8 flex flex-col items-center text-center animate-[fadeInScale_0.2s_ease]">
        <div className={"w-16 h-16 rounded-3xl flex items-center justify-center mb-5 shadow-sm " + s.icon}>
          {ICONS[type]}
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-7">{message}</p>
        <div className={"flex gap-3 w-full " + (isConfirm ? "justify-center" : "justify-center")}>
          {isConfirm && (
            <button
              onClick={onClose}
              className="flex-1 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              {cancelLabel || labels.cancel || 'Cancelar'}
            </button>
          )}
          <button
            onClick={() => { onConfirm?.(); onClose(); }}
            className={"flex-1 px-5 py-3 rounded-xl text-white font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 " + s.btn}
          >
            {confirmLabel || labels.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

export function useModal() {
  const [state, setState] = useState<ModalProps>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    onClose: () => {},
  });

  const closeModal = () => setState(prev => ({ ...prev, isOpen: false }));

  const showSuccess = (title: string, message: string) =>
    setState({ isOpen: true, type: 'success', title, message, onClose: closeModal });

  const showError = (title: string, message: string) =>
    setState({ isOpen: true, type: 'error', title, message, onClose: closeModal });

  const showWarning = (title: string, message: string) =>
    setState({ isOpen: true, type: 'warning', title, message, onClose: closeModal });

  const showConfirm = (title: string, message: string, onConfirm: () => void, opts?: { confirmLabel?: string; cancelLabel?: string }) =>
    setState({ isOpen: true, type: 'confirm', title, message, onConfirm, onClose: closeModal, ...opts });

  return { modal: state, closeModal, showSuccess, showError, showWarning, showConfirm };
}
