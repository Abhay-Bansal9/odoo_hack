import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Trash2, Star, MessageSquare, Filter, Zap, Award, Target } from 'lucide-react';
import { useUser } from '../context/UserContext';

const SwapRequests: React.FC = () => {
  const { currentUser, users, swapRequests, updateSwapRequest, deleteSwapRequest } = useUser();
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');
  const [ratingModalRequest, setRatingModalRequest] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const userSwapRequests = swapRequests.filter(request => {
    const isUserInvolved = request.fromUserId === currentUser?.id || request.toUserId === currentUser?.id;
    
    if (!isUserInvolved) return false;
    
    if (filter === 'sent' && request.fromUserId !== currentUser?.id) return false;
    if (filter === 'received' && request.toUserId !== currentUser?.id) return false;
    if (statusFilter !== 'all' && request.status !== statusFilter) return false;
    
    return true;
  });

  const getUserById = (id: string) => users.find(user => user.id === id);

  const handleAccept = (requestId: string) => {
    updateSwapRequest(requestId, { status: 'accepted' });
  };

  const handleReject = (requestId: string) => {
    updateSwapRequest(requestId, { status: 'rejected' });
  };

  const handleComplete = (requestId: string) => {
    setRatingModalRequest(requestId);
  };

  const submitRating = () => {
    if (ratingModalRequest) {
      updateSwapRequest(ratingModalRequest, { 
        status: 'completed',
        rating,
        feedback
      });
      setRatingModalRequest(null);
      setRating(5);
      setFeedback('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'accepted': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getSkillColor = (category: string) => {
    const colors = {
      Programming: 'from-blue-400 to-cyan-500',
      Design: 'from-purple-400 to-pink-500',
      Creative: 'from-pink-400 to-rose-500',
      Language: 'from-green-400 to-emerald-500',
      Business: 'from-orange-400 to-yellow-500',
      Music: 'from-indigo-400 to-purple-500',
      Lifestyle: 'from-teal-400 to-cyan-500',
      Sports: 'from-red-400 to-pink-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="space-y-8">
      {/* Header & Filters */}
      <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-cyan-400" />
              Cosmic Portals
            </h2>
            <p className="text-white/80 text-lg">Manage your interdimensional skill exchanges</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-white/10 text-white rounded-2xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg transition-all duration-300"
            >
              <option value="all" className="bg-gray-800">All Portals</option>
              <option value="sent" className="bg-gray-800">Sent by Me</option>
              <option value="received" className="bg-gray-800">Received</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-white/10 text-white rounded-2xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg transition-all duration-300"
            >
              <option value="all" className="bg-gray-800">All Status</option>
              <option value="pending" className="bg-gray-800">Pending</option>
              <option value="accepted" className="bg-gray-800">Active</option>
              <option value="completed" className="bg-gray-800">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Request Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Portals', 
            value: userSwapRequests.length, 
            color: 'from-cyan-500 to-blue-600',
            icon: Target
          },
          { 
            label: 'Pending', 
            value: userSwapRequests.filter(r => r.status === 'pending').length, 
            color: 'from-yellow-500 to-orange-600',
            icon: Clock
          },
          { 
            label: 'Active', 
            value: userSwapRequests.filter(r => r.status === 'accepted').length, 
            color: 'from-green-500 to-emerald-600',
            icon: Zap
          },
          { 
            label: 'Completed', 
            value: userSwapRequests.filter(r => r.status === 'completed').length, 
            color: 'from-purple-500 to-pink-600',
            icon: Award
          }
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

      {/* Requests List */}
      <div className="space-y-6">
        {userSwapRequests.length > 0 ? (
          userSwapRequests.map((request, index) => {
            const otherUser = getUserById(
              request.fromUserId === currentUser?.id ? request.toUserId : request.fromUserId
            );
            const isSentByMe = request.fromUserId === currentUser?.id;
            
            if (!otherUser) return null;

            return (
              <div 
                key={request.id} 
                className="group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 shadow-xl hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg">
                            {otherUser.name.charAt(0)}
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-xl">
                            {isSentByMe ? `Portal sent to ${otherUser.name}` : `Portal from ${otherUser.name}`}
                          </h3>
                          <p className="text-white/60">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(request.status)} backdrop-blur-lg`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <Target className="w-5 h-5 mr-2 text-cyan-400" />
                          {isSentByMe ? 'You offer:' : 'They offer:'}
                        </h4>
                        <div className={`bg-gradient-to-r ${getSkillColor(request.offeredSkill.category)} rounded-2xl p-4 text-white shadow-lg`}>
                          <div className="font-bold text-lg">{request.offeredSkill.name}</div>
                          <div className="text-sm opacity-90">{request.offeredSkill.level}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-purple-400" />
                          {isSentByMe ? 'You want:' : 'They want:'}
                        </h4>
                        <div className={`bg-gradient-to-r ${getSkillColor(request.requestedSkill.category)} rounded-2xl p-4 text-white shadow-lg`}>
                          <div className="font-bold text-lg">{request.requestedSkill.name}</div>
                          <div className="text-sm opacity-90">{request.requestedSkill.level}</div>
                        </div>
                      </div>
                    </div>

                    {request.message && (
                      <div className="bg-white/10 rounded-2xl p-4 mb-6 backdrop-blur-lg border border-white/20">
                        <h4 className="text-white font-semibold mb-2">Cosmic Message:</h4>
                        <p className="text-white/80 leading-relaxed">{request.message}</p>
                      </div>
                    )}

                    {request.status === 'completed' && request.rating && (
                      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 mb-6 border border-blue-500/30 backdrop-blur-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                            <span className="text-white font-semibold text-lg">Cosmic Rating: {request.rating}/5</span>
                          </div>
                        </div>
                        {request.feedback && (
                          <p className="text-white/80 mt-3 leading-relaxed">{request.feedback}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-3 min-w-[180px]">
                    {request.status === 'pending' && !isSentByMe && (
                      <>
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Accept Portal</span>
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
                        >
                          <XCircle className="w-5 h-5" />
                          <span>Reject</span>
                        </button>
                      </>
                    )}

                    {request.status === 'pending' && isSentByMe && (
                      <button
                        onClick={() => deleteSwapRequest(request.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span>Delete Portal</span>
                      </button>
                    )}

                    {request.status === 'accepted' && (
                      <button
                        onClick={() => handleComplete(request.id)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
                      >
                        <Star className="w-5 h-5" />
                        <span>Complete</span>
                      </button>
                    )}

                    <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg font-semibold">
                      <MessageSquare className="w-5 h-5" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-12 border border-white/20 shadow-xl">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-12 h-12 text-white/30" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No cosmic portals found</h3>
              <p className="text-white/70 text-lg">Start exploring the SkillSaathi to create your first portal!</p>
            </div>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {ratingModalRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 max-w-lg w-full shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Complete Cosmic Portal
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Cosmic Rating (1-5 stars)</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`w-12 h-12 transition-all duration-300 hover:scale-110 ${
                          star <= rating ? 'text-yellow-400' : 'text-white/30'
                        }`}
                      >
                        <Star className="w-full h-full fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Cosmic Feedback (optional)</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your interdimensional experience..."
                    className="w-full bg-white/10 text-white rounded-2xl p-4 border border-white/20 focus:border-white/40 focus:outline-none resize-none backdrop-blur-lg"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={submitRating}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-2xl transition-all duration-500 font-semibold"
                >
                  Complete Portal
                </button>
                <button
                  onClick={() => setRatingModalRequest(null)}
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

export default SwapRequests;