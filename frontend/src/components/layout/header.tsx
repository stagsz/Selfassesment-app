'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Bell, CheckCircle, Clock, LogOut, Menu, Search } from 'lucide-react';
import { useAuthStore, useUIStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Placeholder notifications for MVP - these will be replaced with real data later
const placeholderNotifications = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'NCR requires attention',
    message: 'Non-conformity #NCR-2024-001 is overdue for resolution',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'info' as const,
    title: 'Assessment assigned',
    message: 'You have been assigned as Lead Auditor for Q1 Internal Audit',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'success' as const,
    title: 'Corrective action verified',
    message: 'CA-2024-015 has been verified and closed',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'info' as const,
    title: 'Assessment due soon',
    message: 'Surveillance Audit is due in 3 days',
    time: '1 day ago',
    read: true,
  },
];

function NotificationIcon({ type }: { type: 'warning' | 'info' | 'success' }) {
  switch (type) {
    case 'warning':
      return <AlertTriangle size={16} className="text-yellow-500" />;
    case 'success':
      return <CheckCircle size={16} className="text-green-500" />;
    default:
      return <Clock size={16} className="text-blue-500" />;
  }
}

export function Header() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  const { sidebarOpen, openMobileMenu } = useUIStore();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const unreadCount = placeholderNotifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [notificationsOpen]);

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-white border-b border-gray-200 transition-all duration-300 left-0 md:left-16 ${
        sidebarOpen ? 'md:left-64' : 'md:left-16'
      }`}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Mobile menu button */}
        <button
          onClick={openMobileMenu}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder="Search assessments, actions..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile search button */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg sm:hidden">
            <Search size={20} />
          </button>

          {/* Notifications dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 text-xs font-medium text-white bg-red-500 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-gray-500">{unreadCount} unread</span>
                  )}
                </div>

                {/* Notification list */}
                <div className="max-h-96 overflow-y-auto">
                  {placeholderNotifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <Bell size={24} className="mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    <ul>
                      {placeholderNotifications.map((notification) => (
                        <li
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 ${
                            !notification.read ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <NotificationIcon type={notification.type} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="flex-shrink-0">
                                <span className="w-2 h-2 bg-blue-500 rounded-full block" />
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu - hide details on mobile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-700">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.organization?.name}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
