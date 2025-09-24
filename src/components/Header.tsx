'use client';

import { useAppStore } from '@/lib/store';
import { Users, BarChart3, ShoppingCart, ToggleLeft, ToggleRight } from 'lucide-react';

const roleConfig = {
  ops: { label: 'Head of Ops', icon: Users, color: 'text-primary' },
  engineer: { label: 'Engineer', icon: BarChart3, color: 'text-secondary' },
  marketer: { label: 'Marketer', icon: ShoppingCart, color: 'text-warning' },
};

export default function Header() {
  const { currentRole, isV1View, setRole, toggleV1View } = useAppStore();
  const currentRoleConfig = roleConfig[currentRole];
  const Icon = currentRoleConfig.icon;

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-text">Forecasting 2.0</h1>
            </div>
            
            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center space-x-2 text-sm text-text-secondary">
              <span>Portfolio</span>
              <span>/</span>
              <span className="text-text">Overview</span>
            </nav>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* V1/V2 Toggle */}
            <button
              onClick={toggleV1View}
              className="flex items-center space-x-2 px-3 py-2 rounded-md border border-border hover:bg-gray-50 transition-colors"
            >
              {isV1View ? (
                <>
                  <ToggleLeft className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">V1 View</span>
                </>
              ) : (
                <>
                  <ToggleRight className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary">V2 View</span>
                </>
              )}
            </button>

            {/* Role Switcher */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {Object.entries(roleConfig).map(([role, config]) => {
                const Icon = config.icon;
                const isActive = currentRole === role;
                
                return (
                  <button
                    key={role}
                    onClick={() => setRole(role as any)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white text-text shadow-sm'
                        : 'text-text-secondary hover:text-text'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


