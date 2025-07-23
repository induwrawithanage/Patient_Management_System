import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';

export default function Settings() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      <DashboardNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 mt-8">
          <h1 className="text-3xl font-bold text-cyan-200 mb-6">Settings</h1>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-lg text-cyan-100 font-medium">Dark Mode</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-900/40 text-cyan-300 text-sm font-semibold">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg text-cyan-100 font-medium">Notifications</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-900/40 text-cyan-300 text-sm font-semibold">On</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg text-cyan-100 font-medium">Language</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-900/40 text-cyan-300 text-sm font-semibold">English</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg text-cyan-100 font-medium">Account Type</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-900/40 text-cyan-300 text-sm font-semibold">Doctor</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg text-cyan-100 font-medium">App Version</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-900/40 text-cyan-300 text-sm font-semibold">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}