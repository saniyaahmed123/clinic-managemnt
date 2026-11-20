import { cn } from '../../utils/cn';
import { getInitials } from '../../utils/format';

const tones = [
  'bg-primary-100 text-primary-700',
  'bg-accent-100 text-accent-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-700',
];

export default function Avatar({ name = '', className, textClassName }) {
  const index = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % tones.length;

  return (
    <div
      className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold',
        tones[index],
        className
      )}
      aria-hidden="true"
    >
      <span className={textClassName}>{getInitials(name) || '?'}</span>
    </div>
  );
}
