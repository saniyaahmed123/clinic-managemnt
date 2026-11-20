import { cn } from '../../utils/cn';
import Spinner from './Spinner';
import EmptyState from './EmptyState';

export default function DataTable({
  columns,
  rows,
  loading,
  emptyTitle = 'Nothing here yet',
  emptyDescription,
  emptyIcon,
  keyField = '_id',
  onRetry,
  className,
}) {
  if (loading) return <Spinner label="Loading records" />;

  if (!rows?.length) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
        action={onRetry ? <button className="text-sm font-semibold text-primary-600" onClick={onRetry}>Refresh</button> : null}
      />
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-xl border border-ink-100 bg-white shadow-card', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-ink-100 text-left text-sm">
          <thead className="bg-ink-50/80">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500',
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.map((row) => (
              <tr key={row[keyField]} className="transition-colors hover:bg-primary-50/40">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn('px-4 py-3 align-middle text-ink-700', column.className)}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
