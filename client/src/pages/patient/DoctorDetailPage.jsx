import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BriefcaseMedical, CalendarPlus, Mail } from "lucide-react";
import { getDoctorById } from "../../api/doctors";
import { useApi } from "../../hooks/useApi";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import ErrorMessage from "../../components/ui/ErrorMessage";

export default function DoctorDetailPage() {
  const { id } = useParams();
  const { data, loading, error, reload } = useApi(
    useCallback(() => getDoctorById(id), [id]),
  );
  const doctor = data?.doctor;

  return (
    <>
      <PageHeader
        title="Doctor profile"
        subtitle="Review the provider details before requesting a visit."
        actions={
          <Link to="/patient/doctors">
            <Button variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to doctors
            </Button>
          </Link>
        }
      />

      <ErrorMessage message={error} onRetry={reload} />
      {loading ? (
        <Spinner label="Loading doctor profile" />
      ) : doctor ? (
        <Card className="mx-auto max-w-3xl overflow-hidden">
          <div className="flex flex-col items-center gap-5 border-b border-ink-100 bg-gradient-to-br from-primary-50 to-accent-50 p-8 sm:flex-row sm:text-left">
            <div className="rounded-full bg-white p-2 shadow-sm">
              <Avatar
                name={doctor.name}
                className="h-20 w-20 text-xl"
                textClassName="text-xl"
              />
            </div>
            <div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary-700">
                {doctor.specialization || "General Practice"}
              </span>
              <h2 className="mt-3 text-2xl font-bold text-ink-900">
                {doctor.name}
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                SITE.name Medical Center provider
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <div className="rounded-lg bg-ink-50 p-4">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-400">
                <BriefcaseMedical className="h-4 w-4 text-accent-600" />
                Experience
              </p>
              <p className="mt-2 text-lg font-semibold text-ink-800">
                {typeof doctor.experience === "number"
                  ? `${doctor.experience} years`
                  : "Not listed"}
              </p>
            </div>
            <div className="rounded-lg bg-ink-50 p-4">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-400">
                <Mail className="h-4 w-4 text-accent-600" />
                Contact
              </p>
              <p className="mt-2 break-all text-sm font-medium text-ink-800">
                {doctor.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-ink-100 p-6">
            <Link to={`/patient/book?doctor=${doctor._id}`}>
              <Button>
                <CalendarPlus className="h-4 w-4" />
                Book with this doctor
              </Button>
            </Link>
            <Link to="/patient/doctors">
              <Button variant="secondary">See all doctors</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="p-8 text-center text-sm text-ink-500">
          Doctor not found.
        </Card>
      )}
    </>
  );
}
