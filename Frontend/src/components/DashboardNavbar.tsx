import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Patients', to: '/patient-profile' },
  { label: 'Appointments', to: '/appointments' },
  { label: 'Reports', to: '/reports' },
  { label: 'Settings', to: '/settings' },
  { label: 'Records', to: '/records' },
  { label: 'AddPatient', to: '/addpatient' }
];

const DashboardNavbar = ({ menuOpen, setMenuOpen }) => (
  <header className="border-b border-gray-900 bg-black/60 backdrop-blur-xl sticky top-0 z-40 shadow-lg">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between min-h-[64px]">
      <div className="flex items-center space-x-2">
        <img
          src="/logo.svg"
          alt="MediSync Logo"
          className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg"
        />
        <span className="text-2xl font-bold text-gray-100 tracking-tight">MediSync</span>
      </div>
      <button
        className="md:hidden flex items-center px-3 py-2 rounded text-gray-200 hover:bg-black/20 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          {menuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>
      {/* Desktop menu with NavLink */}
      <nav className="hidden md:flex items-center space-x-2 md:space-x-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? item.label === 'Patients'
                    ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'text-white bg-black/30 border border-white/20 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-black/20'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
    {/* Mobile dropdown menu with NavLink */}
    {menuOpen && (
      <div className="md:hidden bg-black/90 border-t border-gray-800 px-4 py-2 flex flex-col space-y-2 shadow-xl z-50 backdrop-blur-xl">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? item.label === 'Patients'
                    ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'text-white bg-black/30 border border-white/20 shadow-lg'
                  : 'text-gray-200 hover:bg-black/20'
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    )}
  </header>
);

export default DashboardNavbar;
