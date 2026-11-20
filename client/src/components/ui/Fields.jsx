import { cn } from '../../utils/cn';

const fieldClass =
  'block w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:bg-ink-50';

export function Field({ label, htmlFor, error, hint, children, className }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      {children}
      {error ? <p className="text-xs text-rose-600">{error}</p> : hint ? <p className="text-xs text-ink-400">{hint}</p> : null}
    </div>
  );
}

export function Input({ label, error, hint, className, id, ...props }) {
  const fieldId = id || props.name;
  return (
    <Field label={label} htmlFor={fieldId} error={error} hint={hint} className={className}>
      <input id={fieldId} className={cn(fieldClass, error && 'border-rose-300')} {...props} />
    </Field>
  );
}

export function Select({ label, error, hint, className, children, id, ...props }) {
  const fieldId = id || props.name;
  return (
    <Field label={label} htmlFor={fieldId} error={error} hint={hint} className={className}>
      <select id={fieldId} className={cn(fieldClass, error && 'border-rose-300')} {...props}>
        {children}
      </select>
    </Field>
  );
}

export function Textarea({ label, error, hint, className, id, rows = 4, ...props }) {
  const fieldId = id || props.name;
  return (
    <Field label={label} htmlFor={fieldId} error={error} hint={hint} className={className}>
      <textarea id={fieldId} rows={rows} className={cn(fieldClass, 'resize-y', error && 'border-rose-300')} {...props} />
    </Field>
  );
}
