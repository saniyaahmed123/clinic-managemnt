import Modal from '../ui/Modal';
import StatusBadge from '../ui/StatusBadge';
import Avatar from '../ui/Avatar';
import { formatDate } from '../../utils/format';

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</p>
      <p className="mt-1 text-sm text-ink-800">{value || '-'}</p>
    </div>
  );
}

export default function AppointmentDetailsModal({ appointment, onClose, showPatient = false }) {
  return (
    <Modal
      open={Boolean(appointment)}
      onClose={onClose}
      title="Appointment details"
      description="Review the visit information and current status."
      size="lg"
    >
      {appointment && (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4 rounded-lg bg-ink-50 p-4">
            <div className="flex items-center gap-3">
              <Avatar name={appointment.doctor?.name} />
              <div>
                <p className="font-semibold text-ink-800">{appointment.doctor?.name || '-'}</p>
                <p className="text-sm text-ink-500">{appointment.doctor?.specialization}</p>
              </div>
            </div>
            <StatusBadge status={appointment.status} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Detail label="Date" value={formatDate(appointment.appointmentDate)} />
            <Detail label="Time" value={appointment.appointmentTime} />
            {showPatient && <Detail label="Patient" value={appointment.patient?.name} />}
            {showPatient && <Detail label="Patient email" value={appointment.patient?.email} />}
            {typeof appointment.experience === 'number' && (
              <Detail label="Experience" value={`${appointment.experience} years`} />
            )}
            <Detail label="Requested" value={formatDate(appointment.createdAt)} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-400">Reason for visit</p>
            <p className="mt-1 rounded-lg border border-ink-100 bg-ink-50 p-3 text-sm text-ink-700">
              {appointment.reason}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
