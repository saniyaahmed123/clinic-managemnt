import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, CalendarPlus, CheckCircle2, Clock3, Stethoscope } from 'lucide-react';
import { getMyAppointments } from '../../api/appointments';
import { getDoctors } from '../../api/doctors';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ui/ErrorMessage';
import AppointmentTable from '../../components/appointments/AppointmentTable';
import AppointmentDetailsModal from '../../components/appointments/AppointmentDetailsModal';

export default function PatientDashboard() {
  const { user } = useAuth();
  const appointmentsApi = useApi(useCallback(() => getMyAppointments(), []));
  const doctorsApi = useApi(useCallback(() => getDoctors(), []));
  const [selected, setSelected] = useState(null);

  const appointments = appointmentsApi.data?.appointments || [];
  const pending = appointments.filter((item) => item.status === 'pending').length;
  const approved = appointments.filter((item) => item.status === 'approved').length;

  return (
    <>
      <PageHeader
        title={`Hello, ${user?.name?.split(' ')[0] || 'there'}`}
        subtitle="Here is a quick look at your care and upcoming visits."
        actions={
          <Link to="/patient/book">
            <Button><CalendarPlus className="h-4 w-4" />Book appointment</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarDays} label="My appointments" value={appointments.length} hint="All time" />
        <StatCard icon={Clock3} label="Pending requests" value={pending} tone="amber" hint="Awaiting doctor review" />
        <StatCard icon={CheckCircle2} label="Approved visits" value={approved} tone="accent" hint="Ready to attend" />
        <StatCard icon={Stethoscope} label="Available doctors" value={doctorsApi.data?.count || 0} hint="Active providers" />
      </div>

      <ErrorMessage message={appointmentsApi.error} onRetry={appointmentsApi.reload} />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink-900">Recent appointments</h2>
            <Link to="/patient/appointments" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          <AppointmentTable
            appointments={appointments.slice(0, 5)}
            loading={appointmentsApi.loading}
            showDoctor
            emptyTitle="No appointments yet"
            emptyDescription="Browse our doctors and request your first visit."
            renderActions={(row) => (
              <Button variant="ghost" size="sm" onClick={() => setSelected(row)}>Details</Button>
            )}
          />
        </div>

        <Card className="h-fit p-6">
          <h2 className="text-lg font-semibold text-ink-900">Quick actions</h2>
          <p className="mt-1 text-sm text-ink-500">Everything you need for your next visit.</p>
          <div className="mt-5 space-y-3">
            <Link to="/patient/doctors" className="block">
              <Button variant="secondary" className="w-full justify-start">
                <Stethoscope className="h-4 w-4" />Find a doctor
              </Button>
            </Link>
            <Link to="/patient/book" className="block">
              <Button variant="secondary" className="w-full justify-start">
                <CalendarPlus className="h-4 w-4" />Request an appointment
              </Button>
            </Link>
            <Link to="/patient/appointments" className="block">
              <Button variant="ghost" className="w-full justify-start">
                <CalendarDays className="h-4 w-4" />Track appointment status
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <AppointmentDetailsModal appointment={selected} onClose={() => setSelected(null)} />
    </>
  );
}
