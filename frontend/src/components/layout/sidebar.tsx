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
} from 'lucide-react';
import { useUIStore, useAuthStore } from '@/lib/store';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Assessments', href: '/assessments', icon: ClipboardCheck },
  { name: 'Non-Conformities', href: '/non-conformities', icon: AlertTriangle },
  { name: 'Actions', href: '/actions', icon: FileText },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Standards', href: '/standards', icon: BookOpen },
];

const adminNavigation = [
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, mobileMenuOpen, toggleSidebar, closeMobileMenu } = useUIStore();
  const { user } = useAuthStore();

  const isAdmin = user?.role === 'SYSTEM_ADMIN' || user?.role === 'QUALITY_MANAGER';

  // Close mobile menu on navigation
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeMobileMenu]);

  // Prevent body scroll when mobile menu is open
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

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 z-50 h-screen transition-all duration-300',
          // Desktop: show/hide based on sidebarOpen
          'hidden md:block',
          sidebarOpen ? 'md:w-64' : 'md:w-16'
        )}
      >
        <div className="flex h-full flex-col bg-gray-900">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
            {sidebarOpen && (
              <span className="text-xl font-bold text-white">ISO 9001</span>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'flex items-center px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              );
            })}

            {isAdmin && (
              <>
                <div className="pt-4 mt-4 border-t border-gray-800">
                  {sidebarOpen && (
                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
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
                        'flex items-center px-3 py-2 rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      )}
                    >
                      <item.icon size={20} />
                      {sidebarOpen && <span className="ml-3">{item.name}</span>}
                    </Link>
                  );
                })}
              </>
            )}
          </nav>

          {/* User info */}
          {user && sidebarOpen && (
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{user.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile slide-out drawer */}
      <aside
        className={clsx(
          'fixed left-0 top-0 z-50 h-screen w-64 transition-transform duration-300 ease-in-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col bg-gray-900">
          {/* Mobile header with close button */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
            <span className="text-xl font-bold text-white">ISO 9001</span>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'flex items-center px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <item.icon size={20} />
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}

            {isAdmin && (
              <>
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Administration
                  </p>
                </div>
                {adminNavigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        'flex items-center px-3 py-2 rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      )}
                    >
                      <item.icon size={20} />
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </nav>

          {/* User info */}
          {user && (
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{user.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
