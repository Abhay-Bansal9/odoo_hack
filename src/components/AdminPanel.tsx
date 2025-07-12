import React, { useState } from 'react';
import { Shield, Users, AlertTriangle, MessageSquare, Download, Send, Ban, CheckCircle, XCircle, Zap, Crown, Eye } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AdminPanel: React.FC = () => {
  const { users, swapRequests, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [platformMessage, setPlatformMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Command Center', icon: Crown },
    { id: 'users', label: 'Cosmic Beings', icon: Users },
    { id: 'content', label: 'Content Guardian', icon: AlertTriangle },
    { id: 'swaps', label: 'Portal Monitor', icon: Eye },
    { id: 'reports', label: 'Data Crystals', icon: Download }
  ];

  const bannedUsers = users.filter(user => user.isBanned);
  const activeUsers = users.filter(user => !user.isBanned);
  const pendingSwaps = swapRequests.filter(req => req.status === 'pending');
  const completedSwaps = swapRequests.filter(req => req.status === 'completed');

  const handleBanUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      updateUser({ ...user, isBanned: true });
    }
  };

  const handleUnbanUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      updateUser({ ...user, isBanned: false });
    }
  };

  const sendPlatformMessage = () => {
    alert(`Cosmic message broadcasted: ${platformMessage}`);
    setPlatformMessage('');
    setShowMessageModal(false);
  };

  const generateReport = (type: string) => {
    alert(`Generating ${type} data crystal...`);
  };

  const flaggedContent = [
    { id: '1', type: 'skill', content: 'Inappropriate cosmic ability description', user: 'User123', status: 'pending' },
    { id: '2', type: 'profile', content: 'Spam in bio dimension', user: 'SpamUser', status: 'pending' },
    { id: '3', type: 'message', content: 'Inappropriate portal message', user: 'BadActor', status: 'resolved' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-orange-500/20 rounded-full blur-2xl"></div>
        
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 flex items-center">
              <Crown className="w-10 h-10 mr-4 text-yellow-400" />
              Cosmic Command Center
            </h2>
            <p className="text-white/80 text-lg">Master control over the SkillSaathi dimensions</p>
          </div>
          <button
            onClick={() => setShowMessageModal(true)}
            className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl flex items-center space-x-3 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 font-semibold"
          >
            <Send className="w-5 h-5" />
            <span>Broadcast Message</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 shadow-xl">
        <div className="flex overflow-x-auto">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-8 py-6 whitespace-nowrap border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-300 bg-gradient-to-r from-cyan-500/10 to-purple-500/10'
                    : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Cosmic Beings', value: users.length, icon: Users, color: 'from-blue-500 to-cyan-600' },
                { label: 'Active Portals', value: pendingSwaps.length, icon: Zap, color: 'from-green-500 to-emerald-600' },
                { label: 'Banished Users', value: bannedUsers.length, icon: Ban, color: 'from-red-500 to-pink-600' },
                { label: 'Completed Exchanges', value: completedSwaps.length, icon: CheckCircle, color: 'from-purple-500 to-indigo-600' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 shadow-xl"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <p className="text-white/70 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-7 h-7 mr-3 text-cyan-400" />
                Cosmic Activity Stream
              </h3>
              <div className="space-y-4">
                {[
                  { action: 'New cosmic being registration', user: 'John Doe', time: '2 hours ago', icon: '🌟' },
                  { action: 'Portal request created', user: 'Maria Rodriguez', time: '4 hours ago', icon: '🌀' },
                  { action: 'Content flagged for review', user: 'System Guardian', time: '6 hours ago', icon: '⚠️' },
                  { action: 'User profile enhanced', user: 'David Chen', time: '1 day ago', icon: '✨' }
                ].map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{activity.icon}</div>
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-white/60 text-sm">by {activity.user}</p>
                      </div>
                    </div>
                    <span className="text-white/50 text-sm">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="space-y-8">
            {/* Active Users */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="w-7 h-7 mr-3 text-green-400" />
                Active Cosmic Beings ({activeUsers.length})
              </h3>
              <div className="space-y-4">
                {activeUsers.map((user, index) => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-lg">
                          {user.name.charAt(0)}
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{user.name}</h4>
                        <p className="text-white/60">{user.location || 'Cosmic wanderer'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-white/80 font-medium">{user.skillsOffered.length} abilities offered</p>
                        <p className="text-white/60 text-sm">Rating: {user.rating}/5</p>
                      </div>
                      <button
                        onClick={() => handleBanUser(user.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg font-medium"
                      >
                        Banish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Banned Users */}
            {bannedUsers.length > 0 && (
              <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl p-8 border border-red-500/20 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Ban className="w-7 h-7 mr-3 text-red-400" />
                  Banished Beings ({bannedUsers.length})
                </h3>
                <div className="space-y-4">
                  {bannedUsers.map((user, index) => (
                    <div 
                      key={user.id} 
                      className="flex items-center justify-between p-6 bg-red-500/10 border border-red-500/20 rounded-2xl"
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-lg">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">{user.name}</h4>
                          <p className="text-red-300 text-sm font-medium">Banished from SkillVerse</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnbanUser(user.id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg font-medium"
                      >
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'content' && (
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <AlertTriangle className="w-7 h-7 mr-3 text-yellow-400" />
              Content Guardian System
            </h3>
            <div className="space-y-6">
              {flaggedContent.map((content, index) => (
                <div 
                  key={content.id} 
                  className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="w-6 h-6 text-yellow-400" />
                      <span className="text-white font-semibold text-lg capitalize">{content.type} Alert</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        content.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' : 'bg-green-500/20 text-green-300 border border-green-500/30'
                      }`}>
                        {content.status}
                      </span>
                    </div>
                    <span className="text-white/60">by {content.user}</span>
                  </div>
                  <p className="text-white/80 mb-4 leading-relaxed">{content.content}</p>
                  {content.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg font-medium">
                        Approve
                      </button>
                      <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg font-medium">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'swaps' && (
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Eye className="w-7 h-7 mr-3 text-purple-400" />
              Portal Monitoring System
            </h3>
            <div className="space-y-6">
              {swapRequests.slice(0, 10).map((swap, index) => {
                const fromUser = users.find(u => u.id === swap.fromUserId);
                const toUser = users.find(u => u.id === swap.toUserId);
                
                return (
                  <div 
                    key={swap.id} 
                    className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <MessageSquare className="w-6 h-6 text-blue-400" />
                        <span className="text-white font-semibold text-lg">
                          {fromUser?.name} → {toUser?.name}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          swap.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                          swap.status === 'accepted' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                          swap.status === 'completed' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                          {swap.status}
                        </span>
                      </div>
                      <span className="text-white/60 text-sm">
                        {new Date(swap.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-white/80 mb-3">
                      <span className="font-semibold text-cyan-400">{swap.offeredSkill.name}</span> ↔ <span className="font-semibold text-purple-400">{swap.requestedSkill.name}</span>
                    </div>
                    {swap.message && (
                      <p className="text-white/70 text-sm italic leading-relaxed">"{swap.message}"</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Download className="w-7 h-7 mr-3 text-emerald-400" />
                Generate Data Crystals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => generateReport('user-activity')}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-2xl text-left hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <Download className="w-8 h-8 mb-3" />
                    <h4 className="font-bold text-lg mb-2">User Activity Crystal</h4>
                    <p className="text-sm opacity-90">Download cosmic engagement data</p>
                  </div>
                </button>
                
                <button
                  onClick={() => generateReport('swap-stats')}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl text-left hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <Download className="w-8 h-8 mb-3" />
                    <h4 className="font-bold text-lg mb-2">Portal Statistics</h4>
                    <p className="text-sm opacity-90">Export interdimensional exchange rates</p>
                  </div>
                </button>
                
                <button
                  onClick={() => generateReport('feedback-logs')}
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-2xl text-left hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <Download className="w-8 h-8 mb-3" />
                    <h4 className="font-bold text-lg mb-2">Feedback Crystals</h4>
                    <p className="text-sm opacity-90">Get cosmic ratings and reviews</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Platform Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 max-w-lg w-full shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Broadcast Cosmic Message
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Message to All Dimensions</label>
                  <textarea
                    value={platformMessage}
                    onChange={(e) => setPlatformMessage(e.target.value)}
                    placeholder="Enter your cosmic announcement (e.g., maintenance notification, feature updates, dimensional shifts)..."
                    className="w-full bg-white/10 text-white rounded-2xl p-4 border border-white/20 focus:border-white/40 focus:outline-none resize-none backdrop-blur-lg"
                    rows={5}
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={sendPlatformMessage}
                  disabled={!platformMessage.trim()}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Broadcast Message
                </button>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-xl transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;