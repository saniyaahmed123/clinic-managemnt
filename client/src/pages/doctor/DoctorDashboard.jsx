import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck2, CalendarClock, CalendarDays, ClipboardList } from 'lucide-react';
import { getDoctorAppointments } from '../../api/appointments';
import { useApi } from '../../hooks/useApi';
import { toDateInputValue } from '../../utils/format';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ui/ErrorMessage';
import AppointmentTable from '../../components/appointments/AppointmentTable';
import AppointmentDetailsModal from '../../components/appointments/AppointmentDetailsModal';
import AppointmentActions from '../../components/appointments/AppointmentActions';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useApi(useCallback(() => getDoctorAppointments(), []));
  const [selected, setSelected] = useState(null);

  const appointments = data?.appointments || [];
  const today = toDateInputValue();
  const pending = appointments.filter((item) => item.status === 'pending').length;
  const approved = appointments.filter((item) => item.status === 'approved').length;
  const todaysVisits = appointments.filter(
    (item) => toDateInputValue(item.appointmentDate) === today && item.status === 'approved'
  ).length;

  return (
    <>
      <PageHeader
        title={`Good day, Dr. ${user?.name?.split(' ').slice(-1)[0] || ''}`}
        subtitle="Review incoming requests and manage your schedule."
        actions={
          <Link to="/doctor/appointments">
            <Button>All requests</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarDays} label="Total appointments" value={appointments.length} />
        <StatCard icon={CalendarClock} label="Pending requests" value={pending} tone="amber" hint="Need your review" />
        <StatCard icon={CalendarCheck2} label="Approved visits" value={approved} tone="accent" />
        <StatCard icon={ClipboardList} label="Today's visits" value={todaysVisits} hint={today} />
      </div>

      <ErrorMessage message={error} onRetry={reload} />

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">Recent requests</h2>
          <Link to="/doctor/appointments" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            View all
          </Link>
        </div>
        <AppointmentTable
          appointments={appointments.slice(0, 5)}
          loading={loading}
          showPatient
          emptyTitle="No appointment requests"
          emptyDescription="New patient requests will appear here."
          renderActions={(row) => (
            <AppointmentActions appointment={row} onChanged={reload} onView={setSelected} />
          )}
        />
      </div>

      <AppointmentDetailsModal appointment={selected} onClose={() => setSelected(null)} showPatient />
    </>
  );
}
