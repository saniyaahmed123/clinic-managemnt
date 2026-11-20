import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock3, Stethoscope, Users } from 'lucide-react';
import { getAllAppointments, getStats } from '../../api/admin';
import { useApi } from '../../hooks/useApi';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ui/ErrorMessage';
import AppointmentTable from '../../components/appointments/AppointmentTable';
import AppointmentDetailsModal from '../../components/appointments/AppointmentDetailsModal';

export default function AdminDashboard() {
  const statsApi = useApi(useCallback(() => getStats(), []));
  const appointmentsApi = useApi(useCallback(() => getAllAppointments(), []));
  const [selected, setSelected] = useState(null);

  const stats = statsApi.data?.stats || {};
  const appointments = appointmentsApi.data?.appointments || [];
  const pending = appointments.filter((item) => item.status === 'pending').length;

  return (
    <>
      <PageHeader
        title="Admin overview"
        subtitle="A snapshot of clinic activity and appointments."
        actions={
          <Link to="/admin/users">
            <Button><Users className="h-4 w-4" />Manage users</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Patients" value={stats.totalPatients} hint="Registered patients" />
        <StatCard icon={Stethoscope} label="Doctors" value={stats.totalDoctors} tone="accent" hint="Active providers" />
        <StatCard icon={CalendarDays} label="Appointments" value={stats.totalAppointments} hint="All requests" />
        <StatCard icon={Clock3} label="Pending review" value={pending} tone="amber" hint="Need a decision" />
      </div>

      <ErrorMessage message={statsApi.error || appointmentsApi.error} />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink-900">Recent appointments</h2>
            <Link to="/admin/appointments" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          <AppointmentTable
            appointments={appointments.slice(0, 5)}
            loading={appointmentsApi.loading}
            showPatient
            showDoctor
            emptyTitle="No appointments yet"
            emptyDescription="Appointments from all users will appear here."
            renderActions={(row) => (
              <Button variant="ghost" size="sm" onClick={() => setSelected(row)}>Details</Button>
            )}
          />
        </div>

        <Card className="h-fit p-6">
          <h2 className="text-lg font-semibold text-ink-900">Admin actions</h2>
          <p className="mt-1 text-sm text-ink-500">Keep the clinic directory and schedule in order.</p>
          <div className="mt-5 space-y-3">
            <Link to="/admin/users" className="block">
              <Button variant="secondary" className="w-full justify-start"><Users className="h-4 w-4" />Manage users</Button>
            </Link>
            <Link to="/admin/appointments" className="block">
              <Button variant="secondary" className="w-full justify-start"><CalendarDays className="h-4 w-4" />All appointments</Button>
            </Link>
          </div>
        </Card>
      </div>

      <AppointmentDetailsModal appointment={selected} onClose={() => setSelected(null)} showPatient />
    </>
  );
}
