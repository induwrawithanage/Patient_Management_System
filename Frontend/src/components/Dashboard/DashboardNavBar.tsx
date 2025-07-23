import React from 'react';

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Patients', href: '/patients' },
  { label: 'Appointments', href: '/appointments' },
  { label: 'Reports', href: '/reports' },
  { label: 'Settings', href: '/settings' },
  { label: 'Records', href: '/records' },
];

const DashboardNavBar: React.FC = () => {
  return (
    <header className="border-b border-gray-900 bg-white/10 dark:bg-black/40 backdrop-blur-xl sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between min-h-[64px]">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.svg"
            alt="MediSync Logo"
            className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg"
          />
          <span className="text-2xl font-bold text-gray-100 tracking-tight">MediSync</span>
        </div>
        <nav className="hidden md:flex items-center space-x-2 md:space-x-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default DashboardNavBar;
