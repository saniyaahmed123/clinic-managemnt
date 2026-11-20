import { AlertCircle } from 'lucide-react';
import Button from './Button';

export default function ErrorMessage({ message, onRetry, retryLabel = 'Try again' }) {
  if (!message) return null;

  return (
    <div
      className="flex flex-col items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between"
      role="alert"
    >
      <div className="flex items-start gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
