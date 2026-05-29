import Link from 'next/link';
import type { ReactNode } from 'react';

interface Action {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: Action;
}

const DefaultIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
);

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 mb-5 shadow-sm">
        {icon || <DefaultIcon />}
      </div>
      <h3 className="text-lg font-black text-slate-800 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-6">{description}</p>
      )}
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="ms-btn-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="ms-btn-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
