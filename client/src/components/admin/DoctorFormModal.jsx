import Modal from '../ui/Modal';
import { Input, Select } from '../ui/Fields';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';

const emptyForm = {
  name: '',
  email: '',
  password: '',
  specialization: '',
  experience: '',
};

export default function DoctorFormModal({ open, onClose, onSubmit, submitting, error }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSubmit({
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
      specialization: form.get('specialization'),
      experience: form.get('experience'),
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add a doctor"
      description="Create a new doctor account for the clinic."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>Cancel</Button>
          <Button type="submit" form="create-doctor-form" loading={submitting}>Create doctor</Button>
        </>
      }
    >
      <form id="create-doctor-form" onSubmit={handleSubmit} className="space-y-4">
        <ErrorMessage message={error} />
        <Input label="Full name" name="name" defaultValue={emptyForm.name} required placeholder="Dr. Jane Smith" />
        <Input label="Email" name="email" type="email" required placeholder="jane@clinic.com" />
        <Input label="Temporary password" name="password" type="password" minLength="6" required placeholder="At least 6 characters" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Specialization" name="specialization" required placeholder="Family Practice" />
          <Input label="Experience (years)" name="experience" type="number" min="0" placeholder="5" />
        </div>
      </form>
    </Modal>
  );
}
