import { useState } from 'react';
import { LogOut, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { NAV_ITEMS, ROLE_LABELS } from './navigation';

export default function Topbar({ onMenu }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const items = NAV_ITEMS[user?.role] || [];
  const current = items.find((item) => item.end ? pathname === item.to : pathname.startsWith(item.to));

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-100 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenu}
          className="rounded-lg p-2 text-ink-600 transition-colors hover:bg-ink-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs font-medium text-ink-400">{ROLE_LABELS[user?.role]} workspace</p>
          <h2 className="text-sm font-semibold text-ink-800 sm:text-base">{current?.label || 'Overview'}</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-ink-800">{user?.name}</p>
          <p className="text-xs text-ink-500">{user?.email}</p>
        </div>
        <Avatar name={user?.name} className="h-9 w-9 text-xs" />
        <Button
          variant="secondary"
          size="sm"
          loading={loggingOut}
          onClick={async () => {
            setLoggingOut(true);
            await logout();
            setLoggingOut(false);
            navigate('/login', { replace: true });
          }}
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}
