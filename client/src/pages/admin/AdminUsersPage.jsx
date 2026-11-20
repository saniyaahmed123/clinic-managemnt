import { useCallback, useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import {
  createDoctor,
  deleteUser,
  getUsers,
  toggleUserStatus,
} from '../../api/admin';
import { useApi, useMutation } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';
import { capitalize, formatDate } from '../../utils/format';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import Avatar from '../../components/ui/Avatar';
import ErrorMessage from '../../components/ui/ErrorMessage';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import DoctorFormModal from '../../components/admin/DoctorFormModal';

const roleStyles = {
  admin: 'bg-violet-50 text-violet-700',
  doctor: 'bg-primary-50 text-primary-700',
  patient: 'bg-accent-50 text-accent-700',
};

const filters = ['all', 'patient', 'doctor', 'admin'];

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const usersApi = useApi(useCallback(() => getUsers(), []));
  const toggleMutation = useMutation(toggleUserStatus);
  const deleteMutation = useMutation(deleteUser);
  const createMutation = useMutation(createDoctor);
  const [filter, setFilter] = useState('all');
  const [deleting, setDeleting] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const users = usersApi.data?.users || [];
  const visible = filter === 'all' ? users : users.filter((user) => user.role === filter);

  const handleToggle = async (id) => {
    const result = await toggleMutation.run(id);
    if (result) usersApi.reload();
  };

  const handleDelete = async () => {
    const result = await deleteMutation.run(deleting._id);
    if (result) {
      setDeleting(null);
      usersApi.reload();
    }
  };

  const handleCreate = async (payload) => {
    const result = await createMutation.run({
      ...payload,
      experience: payload.experience === '' ? undefined : Number(payload.experience),
    });
    if (result) {
      setModalOpen(false);
      usersApi.reload();
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} className="h-9 w-9 text-xs" />
          <div>
            <p className="font-medium text-ink-800">{row.name}</p>
            <p className="text-xs text-ink-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyles[row.role] || roleStyles.patient}`}>
          {capitalize(row.role || 'patient')}
        </span>
      ),
    },
    {
      key: 'specialization',
      header: 'Specialty',
      className: 'hidden md:table-cell',
      headerClassName: 'hidden md:table-cell',
      render: (row) => row.specialization || <span className="text-ink-400">-</span>,
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (row) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          row.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
        }`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Joined',
      className: 'hidden lg:table-cell',
      headerClassName: 'hidden lg:table-cell',
      render: (row) => <span className="whitespace-nowrap">{formatDate(row.createdAt)}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => row._id === currentUser?._id ? (
        <span className="text-xs text-ink-400">You</span>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            loading={toggleMutation.loading}
            onClick={() => handleToggle(row._id)}
          >
            {row.isActive ? 'Deactivate' : 'Activate'}
          </Button>
          <Button variant="danger" size="sm" onClick={() => setDeleting(row)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Manage users"
        subtitle="Add doctors and control account access."
        actions={
          <Button onClick={() => setModalOpen(true)}><UserPlus className="h-4 w-4" />Add doctor</Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter users">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === item
                ? 'bg-primary-600 text-white'
                : 'bg-white text-ink-600 ring-1 ring-inset ring-ink-200 hover:bg-ink-50'
            }`}
          >
            {item === 'all' ? 'All' : capitalize(item)} ({item === 'all' ? users.length : users.filter((user) => user.role === item).length})
          </button>
        ))}
      </div>

      <ErrorMessage
        message={usersApi.error || toggleMutation.error || deleteMutation.error || createMutation.error}
        onRetry={usersApi.reload}
      />

      <DataTable
        columns={columns}
        rows={visible}
        loading={usersApi.loading}
        emptyTitle="No users found"
        emptyDescription="Try another role filter or add a new doctor."
        emptyIcon={Users}
      />

      <DoctorFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        submitting={createMutation.loading}
        error={createMutation.error}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title={`Delete ${deleting?.name || 'this user'}?`}
        description="This permanently removes the account and cannot be undone."
        confirmLabel="Delete user"
        tone="danger"
        loading={deleteMutation.loading}
      />
    </>
  );
}
