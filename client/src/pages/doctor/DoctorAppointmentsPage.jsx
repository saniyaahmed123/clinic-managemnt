import { useCallback, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { getDoctorAppointments } from '../../api/appointments';
import { useApi } from '../../hooks/useApi';
import { capitalize } from '../../utils/format';
import PageHeader from '../../components/ui/PageHeader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import AppointmentTable from '../../components/appointments/AppointmentTable';
import AppointmentDetailsModal from '../../components/appointments/AppointmentDetailsModal';
import AppointmentActions from '../../components/appointments/AppointmentActions';

const filters = ['pending', 'approved', 'rejected', 'cancelled', 'all'];

export default function DoctorAppointmentsPage() {
  const { data, loading, error, reload } = useApi(useCallback(() => getDoctorAppointments(), []));
  const [filter, setFilter] = useState('pending');
  const [selected, setSelected] = useState(null);

  const appointments = data?.appointments || [];
  const visible = filter === 'all'
    ? appointments
    : appointments.filter((item) => item.status === filter);

  return (
    <>
      <PageHeader
        title="Appointment requests"
        subtitle="Approve or reject requests assigned to you."
      />

      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter requests">
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
        emptyTitle="No requests in this view"
        emptyDescription="Choose another status to see more appointments."
        emptyIcon={ClipboardList}
        renderActions={(row) => (
          <AppointmentActions appointment={row} onChanged={reload} onView={setSelected} />
        )}
      />

      <AppointmentDetailsModal appointment={selected} onClose={() => setSelected(null)} showPatient />
    </>
  );
}
