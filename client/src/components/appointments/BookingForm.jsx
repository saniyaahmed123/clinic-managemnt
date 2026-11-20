import { CalendarCheck2 } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { getDoctors } from '../../api/doctors';
import { Input, Select, Textarea } from '../ui/Fields';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import { TIME_SLOTS } from '../../utils/constants';
import { toDateInputValue } from '../../utils/format';

export default function BookingForm({ initialDoctorId, onSubmit, submitting, submitError }) {
  const { data, loading, error, reload } = useApi(() => getDoctors(), []);
  const doctors = data?.doctors || [];

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSubmit({
      doctor: form.get('doctor'),
      appointmentDate: form.get('appointmentDate'),
      appointmentTime: form.get('appointmentTime'),
      reason: form.get('reason'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ErrorMessage message={error || submitError} onRetry={reload} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Doctor" name="doctor" defaultValue={initialDoctorId || ''} required disabled={loading}>
          <option value="" disabled>Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name} - {doctor.specialization || 'General Practice'}
            </option>
          ))}
        </Select>

        <Input
          label="Appointment date"
          name="appointmentDate"
          type="date"
          min={toDateInputValue()}
          defaultValue={toDateInputValue()}
          required
        />

        <Select label="Time" name="appointmentTime" defaultValue="09:00" required>
          {TIME_SLOTS.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </Select>

        <div className="flex items-end">
          <p className="rounded-lg bg-primary-50 px-4 py-2.5 text-xs text-primary-700">
            Slots are shown in 30-minute intervals from 08:00 to 17:30.
          </p>
        </div>
      </div>

      <Textarea
        label="Reason for visit"
        name="reason"
        placeholder="Briefly describe what you would like to discuss"
        required
      />

      <Button type="submit" loading={submitting} className="w-full sm:w-auto" disabled={loading}>
        <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
        Confirm appointment
      </Button>
    </form>
  );
}
