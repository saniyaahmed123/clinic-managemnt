import { cn } from '../../utils/cn';
import { STATUS_STYLES } from '../../utils/constants';
import { capitalize } from '../../utils/format';

export default function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        STATUS_STYLES[status] || STATUS_STYLES.cancelled
      )}
    >
      {capitalize(status || 'unknown')}
    </span>
  );
}
