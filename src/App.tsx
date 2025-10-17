import { useState, useEffect } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { PatientDashboard } from './components/PatientDashboard';
import { AIChat } from './components/AIChat';
import { DoctorDashboard } from './components/DoctorDashboard';
import { EmployerDashboard } from './components/EmployerDashboard';
import { ThemeToggle } from './components/ThemeToggle';

type Screen = 'onboarding' | 'patient' | 'chat' | 'doctor' | 'employer';
type UserRole = 'patient' | 'doctor' | 'employer' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isDark, setIsDark] = useState(() => {
    // Check for saved theme preference or default to light
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    switch (role) {
      case 'patient':
        setCurrentScreen('patient');
        break;
      case 'doctor':
        setCurrentScreen('doctor');
        break;
      case 'employer':
        setCurrentScreen('employer');
        break;
    }
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onRoleSelect={handleRoleSelect} />;
      case 'patient':
        return <PatientDashboard onNavigate={handleNavigate} />;
      case 'chat':
        return <AIChat onNavigate={handleNavigate} />;
      case 'doctor':
        return <DoctorDashboard onNavigate={handleNavigate} />;
      case 'employer':
        return <EmployerDashboard onNavigate={handleNavigate} />;
      default:
        return <OnboardingScreen onRoleSelect={handleRoleSelect} />;
    }
  };

  return (
    <div className="size-full relative">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>
      
      {renderScreen()}
    </div>
  );
}