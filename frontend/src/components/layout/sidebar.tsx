'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  Settings,
  Users,
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  HelpCircle,
  Shield,
} from 'lucide-react';
import { useUIStore, useAuthStore } from '@/lib/store';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Assessments', href: '/assessments', icon: ClipboardCheck },
  { name: 'Non-Conformities', href: '/non-conformities', icon: AlertTriangle },
  { name: 'Actions', href: '/actions', icon: FileText },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Standards', href: '/standards', icon: BookOpen },
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const adminNavigation = [
  { name: 'Users', href: '/admin/users', icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, mobileMenuOpen, toggleSidebar, closeMobileMenu } = useUIStore();
  const { user } = useAuthStore();

  const isAdmin = user?.role === 'SYSTEM_ADMIN' || user?.role === 'QUALITY_MANAGER';

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeMobileMenu]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex h-full flex-col bg-slate-900">
      {/* Logo area */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-700/50">
        {(sidebarOpen || isMobile) && (
          <div className="flex items-center gap-2">
            <Shield size={22} className="text-emerald-400" />
            <span className="text-lg font-display font-semibold text-white tracking-tight">
              ISO 9001
            </span>
          </div>
        )}
        {isMobile ? (
          <button
            onClick={closeMobileMenu}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group',
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon size={20} className={clsx(
                'flex-shrink-0',
                isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
              )} />
              {(sidebarOpen || isMobile) && (
                <span className="ml-3 text-sm font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <div className="pt-4 mt-4 border-t border-slate-700/50">
              {(sidebarOpen || isMobile) && (
                <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Administration
                </p>
              )}
            </div>
            {adminNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group',
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <item.icon size={20} className={clsx(
                    'flex-shrink-0',
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  )} />
                  {(sidebarOpen || isMobile) && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* User info */}
      {user && (sidebarOpen || isMobile) && (
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-slate-400">{user.role.replace(/_/g, ' ')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Desktop sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 z-50 h-screen transition-all duration-300',
          'hidden md:block',
          sidebarOpen ? 'md:w-64' : 'md:w-16'
        )}
      >
        <NavContent />
      </aside>

      {/* Mobile slide-out drawer */}
      <aside
        className={clsx(
          'fixed left-0 top-0 z-50 h-screen w-64 transition-transform duration-300 ease-in-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <NavContent isMobile />
      </aside>
    </>
  );
}
