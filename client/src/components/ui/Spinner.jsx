import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Spinner({ label = 'Loading', fullPage = false }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 text-sm text-ink-500',
        fullPage ? 'min-h-[60vh]' : 'py-10'
      )}
      role="status"
    >
      <Loader2 className="h-5 w-5 animate-spin text-primary-600" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
