import { useState } from 'react';
import { updateAppointmentStatus } from '../../api/appointments';
import { useMutation } from '../../hooks/useApi';
import Button from '../ui/Button';
import ConfirmDialog from '../ui/ConfirmDialog';

export default function AppointmentActions({ appointment, onChanged, onView }) {
  const mutation = useMutation(updateAppointmentStatus);
  const [rejecting, setRejecting] = useState(false);

  const changeStatus = async (status) => {
    const result = await mutation.run(appointment._id, status);
    if (result) onChanged?.();
    return Boolean(result);
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => onView(appointment)}>Details</Button>
      {appointment.status === 'pending' && (
        <>
          <Button size="sm" loading={mutation.loading} onClick={() => changeStatus('approved')}>
            Approve
          </Button>
          <Button variant="danger" size="sm" onClick={() => setRejecting(true)} disabled={mutation.loading}>
            Reject
          </Button>
        </>
      )}
      {mutation.error && <p className="w-full text-xs text-rose-600">{mutation.error}</p>}
      <ConfirmDialog
        open={rejecting}
        onClose={() => setRejecting(false)}
        onConfirm={async () => {
          const ok = await changeStatus('rejected');
          if (ok) setRejecting(false);
        }}
        title="Reject this request?"
        description="The patient will see this appointment as rejected."
        confirmLabel="Reject request"
        tone="danger"
        loading={mutation.loading}
      />
    </>
  );
}
