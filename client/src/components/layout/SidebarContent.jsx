import {
  CalendarDays,
  CalendarPlus,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Stethoscope,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import Avatar from '../ui/Avatar';
import Brand from './Brand';
import { NAV_ITEMS, ROLE_LABELS } from './navigation';

const icons = { CalendarDays, CalendarPlus, ClipboardList, LayoutDashboard, Stethoscope, Users };

export default function SidebarContent({ onNavigate }) {
  const { user, logout } = useAuth();
  const items = NAV_ITEMS[user?.role] || [];

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-ink-100 px-5 py-5">
        <Brand />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5" aria-label="Main navigation">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
          {ROLE_LABELS[user?.role] || 'Workspace'}
        </p>
        {items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-ink-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-ink-50 p-3">
          <Avatar name={user?.name} className="h-9 w-9 text-xs" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-800">{user?.name}</p>
            <p className="truncate text-xs text-ink-500">{ROLE_LABELS[user?.role]}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-rose-50 hover:text-rose-700"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );
}
