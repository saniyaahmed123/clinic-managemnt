import { cn } from '../../utils/cn';

const tones = {
  primary: { wrap: 'bg-primary-50 text-primary-700', icon: 'text-primary-600' },
  accent: { wrap: 'bg-accent-50 text-accent-700', icon: 'text-accent-600' },
  amber: { wrap: 'bg-amber-50 text-amber-700', icon: 'text-amber-600' },
  rose: { wrap: 'bg-rose-50 text-rose-700', icon: 'text-rose-600' },
};

export default function StatCard({ icon: Icon, label, value, hint, tone = 'primary' }) {
  const styles = tones[tone] || tones.primary;

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-ink-900">{value ?? 0}</p>
          {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
        </div>
        <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', styles.wrap)}>
          <Icon className={cn('h-5 w-5', styles.icon)} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
