import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { createAppointment } from '../../api/appointments';
import { useMutation } from '../../hooks/useApi';
import { formatDate } from '../../utils/format';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import BookingForm from '../../components/appointments/BookingForm';

export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const [created, setCreated] = useState(null);
  const mutation = useMutation(createAppointment);

  const handleSubmit = async (payload) => {
    const result = await mutation.run(payload);
    if (result) setCreated(result.appointment);
  };

  if (created) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-ink-900">Appointment requested</h1>
          <p className="mt-2 text-sm text-ink-500">
            Your request with {created.doctor?.name} for {formatDate(created.appointmentDate)} at {created.appointmentTime} is pending review.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/patient/appointments">
              <Button>View my appointments</Button>
            </Link>
            <Button variant="secondary" onClick={() => setCreated(null)}>Book another</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Book an appointment"
        subtitle="Choose a provider and a time that works for you."
      />
      <Card className="mx-auto max-w-3xl p-6 sm:p-8">
        <BookingForm
          initialDoctorId={searchParams.get('doctor') || ''}
          onSubmit={handleSubmit}
          submitting={mutation.loading}
          submitError={mutation.error}
        />
      </Card>
    </>
  );
}
