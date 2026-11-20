import { useCallback, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { getAllAppointments } from '../../api/admin';
import { useApi } from '../../hooks/useApi';
import { capitalize } from '../../utils/format';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ui/ErrorMessage';
import AppointmentTable from '../../components/appointments/AppointmentTable';
import AppointmentDetailsModal from '../../components/appointments/AppointmentDetailsModal';

const filters = ['all', 'pending', 'approved', 'rejected', 'cancelled'];

export default function AdminAppointmentsPage() {
  const { data, loading, error, reload } = useApi(useCallback(() => getAllAppointments(), []));
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const appointments = data?.appointments || [];
  const visible = filter === 'all'
    ? appointments
    : appointments.filter((item) => item.status === filter);

  return (
    <>
      <PageHeader
        title="All appointments"
        subtitle="Monitor and manage every appointment in the clinic."
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

      <ErrorMessage message={error} onRetry={reload} />

      <AppointmentTable
        appointments={visible}
        loading={loading}
        showPatient
        showDoctor
        emptyTitle="No appointments in this view"
        emptyDescription="Try another status filter."
        emptyIcon={CalendarDays}
        renderActions={(row) => (
          <Button variant="ghost" size="sm" onClick={() => setSelected(row)}>Details</Button>
        )}
      />

      <AppointmentDetailsModal appointment={selected} onClose={() => setSelected(null)} showPatient />
    </>
  );
}
