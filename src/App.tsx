import React, { useState } from 'react';
import { User, MessageSquare, Settings, Shield, BarChart3, Sparkles, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Browse from './components/Browse';
import SwapRequests from './components/SwapRequests';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { UserProvider } from './context/UserContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'browse', label: 'Explore', icon: Sparkles },
    { id: 'requests', label: 'Swaps', icon: MessageSquare },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Shield }] : [])
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    setIsAdmin(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-15 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-25 animate-bounce"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        
        {/* Header */}
        <header className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    SkillSaathi
                  </h1>
                  <p className="text-white/60 text-sm">Empower. Exchange. Evolve. That’s the SkillSaathi way.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-3 backdrop-blur-lg border border-white/20">
                  <label className="text-white/80 text-sm font-medium">Admin Portal</label>
                  <button
                    onClick={() => setIsAdmin(!isAdmin)}
                    aria-label="Toggle admin mode"
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                      isAdmin ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                        isAdmin ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <button 
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-xl"
                  aria-label="Settings"
                >
                  <Settings className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-xl"
                  aria-label="Logout"
                >
                  <LogOut className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-2 py-4">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-2xl'
                        : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20 backdrop-blur-lg border border-white/20'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fadeIn">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'browse' && <Browse />}
            {activeTab === 'requests' && <SwapRequests />}
            {activeTab === 'admin' && isAdmin && <AdminPanel />}
          </div>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-20">
          <button 
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse"
            aria-label="Send message"
          >
            <MessageSquare className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;