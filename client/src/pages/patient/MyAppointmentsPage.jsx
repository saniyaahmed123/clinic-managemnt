import { useCallback, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { cancelAppointment, getMyAppointments } from '../../api/appointments';
import { useApi, useMutation } from '../../hooks/useApi';
import { capitalize } from '../../utils/format';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ui/ErrorMessage';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import AppointmentTable from '../../components/appointments/AppointmentTable';
import AppointmentDetailsModal from '../../components/appointments/AppointmentDetailsModal';

const filters = ['all', 'pending', 'approved', 'rejected', 'cancelled'];

export default function MyAppointmentsPage() {
  const { data, loading, error, reload } = useApi(useCallback(() => getMyAppointments(), []));
  const cancelMutation = useMutation(cancelAppointment);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);

  const appointments = data?.appointments || [];
  const visible = filter === 'all'
    ? appointments
    : appointments.filter((item) => item.status === filter);

  const handleCancel = async () => {
    const result = await cancelMutation.run(cancelTarget._id);
    if (result) {
      setCancelTarget(null);
      reload();
    }
  };

  return (
    <>
      <PageHeader
        title="My appointments"
        subtitle="Review your requests and track their current status."
      />

      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter appointments">
        {filters.map((item) => {
          const count = item === 'all'
            ? appointments.length
            : appointments.filter((appointment) => appointment.status === item).length;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === item
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-ink-600 ring-1 ring-inset ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {capitalize(item)} ({count})
            </button>
          );
        })}
      </div>

      <ErrorMessage message={error || cancelMutation.error} onRetry={reload} />

      <AppointmentTable
        appointments={visible}
        loading={loading}
        showDoctor
        emptyTitle="No appointments in this view"
        emptyDescription="Try another status or request a new appointment."
        emptyIcon={CalendarDays}
        renderActions={(row) => (
          <>
            <Button variant="ghost" size="sm" onClick={() => setSelected(row)}>Details</Button>
            {row.status === 'pending' && (
              <Button variant="secondary" size="sm" onClick={() => setCancelTarget(row)}>Cancel</Button>
            )}
          </>
        )}
      />

      {!loading && appointments.length > 0 && (
        <p className="mt-4 text-center text-xs text-ink-400">
          Showing {visible.length} of {appointments.length} appointment(s)
        </p>
      )}

      <AppointmentDetailsModal appointment={selected} onClose={() => setSelected(null)} />

      <ConfirmDialog
        open={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        title="Cancel this appointment?"
        description={`Your pending request with ${cancelTarget?.doctor?.name || 'this doctor'} will be cancelled.`}
        confirmLabel="Yes, cancel it"
        tone="danger"
        loading={cancelMutation.loading}
      />
    </>
  );
}
