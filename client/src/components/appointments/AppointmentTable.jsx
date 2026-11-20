import { CalendarDays, ClipboardList } from 'lucide-react';
import DataTable from '../ui/DataTable';
import StatusBadge from '../ui/StatusBadge';
import { formatDate } from '../../utils/format';

export default function AppointmentTable({
  appointments,
  loading,
  showPatient = false,
  showDoctor = false,
  renderActions,
  emptyTitle = 'No appointments yet',
  emptyDescription = 'Appointments will appear here once they are created.',
}) {
  const columns = [
    {
      key: 'patient',
      header: 'Patient',
      className: 'hidden md:table-cell',
      headerClassName: 'hidden md:table-cell',
      render: (row) => (
        <div>
          <p className="font-medium text-ink-800">{row.patient?.name || '-'}</p>
          <p className="text-xs text-ink-500">{row.patient?.email}</p>
        </div>
      ),
    },
    {
      key: 'doctor',
      header: 'Doctor',
      render: (row) => (
        <div>
          <p className="font-medium text-ink-800">{row.doctor?.name || '-'}</p>
          <p className="text-xs text-ink-500">{row.doctor?.specialization}</p>
        </div>
      ),
    },
    {
      key: 'appointmentDate',
      header: 'Date',
      render: (row) => (
        <span className="whitespace-nowrap">
          {formatDate(row.appointmentDate)}
        </span>
      ),
    },
    {
      key: 'appointmentTime',
      header: 'Time',
      render: (row) => <span className="font-medium">{row.appointmentTime}</span>,
    },
    {
      key: 'reason',
      header: 'Reason',
      className: 'hidden lg:table-cell max-w-xs',
      headerClassName: 'hidden lg:table-cell',
      render: (row) => <span className="line-clamp-2 text-ink-600">{row.reason}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ].filter((column) => {
    if (column.key === 'patient' && !showPatient) return false;
    if (column.key === 'doctor' && !showDoctor) return false;
    return true;
  });

  if (renderActions) {
    columns.push({
      key: 'actions',
      header: 'Actions',
      render: (row) => <div className="flex flex-wrap gap-2">{renderActions(row)}</div>,
    });
  }

  return (
    <DataTable
      columns={columns}
      rows={appointments}
      loading={loading}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      emptyIcon={showPatient ? ClipboardList : CalendarDays}
    />
  );
}
