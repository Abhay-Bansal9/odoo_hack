import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, MessageSquare, Eye, EyeOff, Sparkles, Zap } from 'lucide-react';
import { useUser, User } from '../context/UserContext';

const Browse: React.FC = () => {
  const { users, currentUser, addSwapRequest } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [swapMessage, setSwapMessage] = useState('');
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState('');
  const [selectedRequestedSkill, setSelectedRequestedSkill] = useState('');

  const skillCategories = ['All', 'Programming', 'Design', 'Creative', 'Language', 'Business', 'Music', 'Lifestyle', 'Sports'];

  const filteredUsers = users.filter(user => {
    if (user.id === currentUser?.id) return false;
    if (!user.isPublic) return false;
    
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' ||
      user.skillsOffered.some(skill => skill.category === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

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

  const handleSendRequest = () => {
    if (!selectedUser || !selectedOfferedSkill || !selectedRequestedSkill || !currentUser) return;

    const offeredSkill = currentUser.skillsOffered.find(skill => skill.id === selectedOfferedSkill);
    const requestedSkill = selectedUser.skillsOffered.find(skill => skill.id === selectedRequestedSkill);

    if (!offeredSkill || !requestedSkill) return;

    addSwapRequest({
      fromUserId: currentUser.id,
      toUserId: selectedUser.id,
      offeredSkill,
      requestedSkill,
      status: 'pending',
      message: swapMessage
    });

    setSelectedUser(null);
    setSwapMessage('');
    setSelectedOfferedSkill('');
    setSelectedRequestedSkill('');
  };

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-cyan-400" />
              Explore the SkillSaathi
            </h2>
            <p className="text-white/80 text-lg">Discover cosmic abilities across dimensions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cosmic abilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/10 text-white rounded-2xl border border-white/20 focus:border-white/40 focus:outline-none w-full sm:w-80 backdrop-blur-lg transition-all duration-300"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 text-white rounded-2xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg transition-all duration-300"
            >
              {skillCategories.map(category => (
                <option key={category} value={category === 'All' ? '' : category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredUsers.map((user, index) => (
          <div 
            key={user.id} 
            className="group relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
                      {user.name.charAt(0)}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{user.name}</h3>
                    <div className="flex items-center text-white/60 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {user.location || 'Cosmic wanderer'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-white/80 bg-white/10 rounded-xl px-3 py-1 backdrop-blur-lg">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{user.rating}</span>
                  </div>
                  {user.isPublic ? (
                    <Eye className="w-5 h-5 text-green-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-red-400" />
                  )}
                </div>
              </div>

              {user.bio && (
                <p className="text-white/80 text-sm mb-6 line-clamp-2 leading-relaxed">{user.bio}</p>
              )}

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-cyan-400" />
                  Cosmic Abilities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.slice(0, 3).map((skill) => (
                    <span
                      key={skill.id}
                      className={`bg-gradient-to-r ${getSkillColor(skill.category)} text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg`}
                    >
                      {skill.name}
                    </span>
                  ))}
                  {user.skillsOffered.length > 3 && (
                    <span className="text-white/60 text-xs bg-white/10 px-3 py-1 rounded-full backdrop-blur-lg">
                      +{user.skillsOffered.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                  Availability
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user.availability.slice(0, 2).map((time) => (
                    <span key={time} className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full font-medium border border-emerald-500/30">
                      {time}
                    </span>
                  ))}
                  {user.availability.length > 2 && (
                    <span className="text-white/60 text-xs">+{user.availability.length - 2} more</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(user)}
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-3 rounded-2xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center space-x-2 font-semibold transform hover:scale-105"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Create Portal</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-16">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-12 border border-white/20 shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-white/30" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No cosmic beings found</h3>
            <p className="text-white/70 text-lg">Try exploring different dimensions or adjusting your search</p>
          </div>
        </div>
      )}

      {/* Swap Request Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 max-w-lg w-full shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Create Portal with {selectedUser.name}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Your Cosmic Ability to Offer</label>
                  <select
                    value={selectedOfferedSkill}
                    onChange={(e) => setSelectedOfferedSkill(e.target.value)}
                    className="w-full bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg"
                  >
                    <option value="">Select your ability</option>
                    {currentUser?.skillsOffered.map(skill => (
                      <option key={skill.id} value={skill.id} className="bg-gray-800">
                        {skill.name} ({skill.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Ability You Seek</label>
                  <select
                    value={selectedRequestedSkill}
                    onChange={(e) => setSelectedRequestedSkill(e.target.value)}
                    className="w-full bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg"
                  >
                    <option value="">Select desired ability</option>
                    {selectedUser.skillsOffered.map(skill => (
                      <option key={skill.id} value={skill.id} className="bg-gray-800">
                        {skill.name} ({skill.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Cosmic Message</label>
                  <textarea
                    value={swapMessage}
                    onChange={(e) => setSwapMessage(e.target.value)}
                    placeholder="Share your cosmic intentions and why you'd like to exchange knowledge..."
                    className="w-full bg-white/10 text-white rounded-xl p-4 border border-white/20 focus:border-white/40 focus:outline-none resize-none backdrop-blur-lg"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleSendRequest}
                  disabled={!selectedOfferedSkill || !selectedRequestedSkill}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Send Portal Request
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
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

export default Browse;