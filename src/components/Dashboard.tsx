import React from 'react';
import { TrendingUp, Users, Calendar, Star, MessageSquare, Target, Zap, Award, Rocket } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
  const { currentUser, swapRequests, users } = useUser();

  const userSwapRequests = swapRequests.filter(req => 
    req.fromUserId === currentUser?.id || req.toUserId === currentUser?.id
  );

  const pendingRequests = userSwapRequests.filter(req => req.status === 'pending');
  const completedSwaps = userSwapRequests.filter(req => req.status === 'completed');
  const activeSwaps = userSwapRequests.filter(req => req.status === 'accepted');

  const stats = [
    {
      label: 'Skills Mastered',
      value: currentUser?.skillsOffered.length || 0,
      icon: Target,
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      label: 'Learning Goals',
      value: currentUser?.skillsWanted.length || 0,
      icon: Rocket,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20'
    },
    {
      label: 'Active Swaps',
      value: pendingRequests.length,
      icon: Zap,
      color: 'from-orange-400 to-red-500',
      bgColor: 'from-orange-500/20 to-red-500/20'
    },
    {
      label: 'Achievements',
      value: completedSwaps.length,
      icon: Award,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'from-emerald-500/20 to-teal-500/20'
    }
  ];

  const recentActivity = [
    { type: 'swap_request', message: 'Maria sent you a photography swap request', time: '2 hours ago', icon: '📸' },
    { type: 'swap_accepted', message: 'David accepted your data science request', time: '1 day ago', icon: '🎯' },
    { type: 'rating', message: 'You received a 5-star rating from Sarah', time: '2 days ago', icon: '⭐' },
    { type: 'profile_view', message: '3 people viewed your profile', time: '3 days ago', icon: '👀' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/30 to-orange-500/30 rounded-full blur-2xl"></div>
        
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Welcome back, {currentUser?.name}! 🚀
            </h2>
            <p className="text-white/80 text-lg max-w-2xl">
              Your skill-swapping journey continues in the SkillSaathi. Ready to unlock new dimensions of knowledge?
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Star className="w-8 h-8 text-white fill-current" />
              </div>
              <div>
                <span className="text-3xl font-bold text-white">{currentUser?.rating}</span>
                <p className="text-white/70">{currentUser?.reviewCount} cosmic reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative">
                <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-white/70 font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Swaps & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Swaps */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Calendar className="w-7 h-7 mr-3 text-cyan-400" />
            Active Dimensions
          </h3>
          <div className="space-y-4">
            {activeSwaps.length > 0 ? (
              activeSwaps.map((swap, index) => (
                <div 
                  key={swap.id} 
                  className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white text-lg">{swap.offeredSkill.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400 bg-green-400/20 px-3 py-1 rounded-full font-medium">
                        In Progress
                      </span>
                    </div>
                  </div>
                  <p className="text-white/70">
                    Swapping for <span className="text-cyan-400 font-medium">{swap.requestedSkill.name}</span>
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-white/30" />
                </div>
                <p className="text-white/60 text-lg">No active dimensions yet</p>
                <p className="text-white/40 text-sm">Start exploring to create your first swap!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-7 h-7 mr-3 text-purple-400" />
            Cosmic Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-white text-sm leading-relaxed">{activity.message}</p>
                  <p className="text-white/50 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6">Launch Pad</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl p-6 text-left hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <Users className="w-8 h-8 mb-3" />
              <h4 className="font-bold text-lg mb-2">Explore Universe</h4>
              <p className="text-sm opacity-90">Discover amazing skills across dimensions</p>
            </div>
          </button>
          
          <button className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-6 text-left hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <MessageSquare className="w-8 h-8 mb-3" />
              <h4 className="font-bold text-lg mb-2">Create Portal</h4>
              <p className="text-sm opacity-90">Send a skill swap request</p>
            </div>
          </button>
          
          <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-6 text-left hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <Star className="w-8 h-8 mb-3" />
              <h4 className="font-bold text-lg mb-2">Enhance Profile</h4>
              <p className="text-sm opacity-90">Add new cosmic abilities</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;