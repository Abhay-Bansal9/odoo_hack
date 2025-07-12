import React, { useState } from 'react';
import { Edit3, MapPin, Calendar, Star, Plus, X, Eye, EyeOff, Save, Sparkles, Zap } from 'lucide-react';
import { useUser, Skill } from '../context/UserContext';

const Profile: React.FC = () => {
  const { currentUser, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);
  const [newOfferedSkill, setNewOfferedSkill] = useState({ name: '', level: 'Beginner', category: '' });
  const [newWantedSkill, setNewWantedSkill] = useState({ name: '', level: 'Beginner', category: '' });

  const skillCategories = ['Programming', 'Design', 'Creative', 'Language', 'Business', 'Music', 'Lifestyle', 'Sports'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const availabilityOptions = ['Mornings', 'Afternoons', 'Evenings', 'Weekends', 'Weekdays'];

  const handleSave = () => {
    if (editedUser) {
      updateUser(editedUser);
      setIsEditing(false);
    }
  };

  const addSkill = (type: 'offered' | 'wanted') => {
    if (!editedUser) return;
    
    const newSkill = type === 'offered' ? newOfferedSkill : newWantedSkill;
    if (!newSkill.name || !newSkill.category) return;

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      level: newSkill.level as any,
      category: newSkill.category
    };

    const updatedUser = {
      ...editedUser,
      [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: [
        ...(type === 'offered' ? editedUser.skillsOffered : editedUser.skillsWanted),
        skill
      ]
    };

    setEditedUser(updatedUser);
    
    if (type === 'offered') {
      setNewOfferedSkill({ name: '', level: 'Beginner', category: '' });
    } else {
      setNewWantedSkill({ name: '', level: 'Beginner', category: '' });
    }
  };

  const removeSkill = (type: 'offered' | 'wanted', skillId: string) => {
    if (!editedUser) return;

    const updatedUser = {
      ...editedUser,
      [type === 'offered' ? 'skillsOffered' : 'skillsWanted']: 
        (type === 'offered' ? editedUser.skillsOffered : editedUser.skillsWanted)
          .filter(skill => skill.id !== skillId)
    };

    setEditedUser(updatedUser);
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

  if (!currentUser || !editedUser) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-orange-500/20 rounded-full blur-2xl"></div>
        
        <div className="relative flex items-start justify-between mb-8">
          <div className="flex items-center space-x-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl transform hover:rotate-6 transition-transform duration-500">
                {currentUser.name.charAt(0)}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-transparent border-b-2 border-white/30 focus:border-white focus:outline-none"
                />
              ) : (
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {currentUser.name}
                </h1>
              )}
              
              <div className="flex items-center space-x-6 mt-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.location || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                    placeholder="Your cosmic location"
                    className="text-white/80 bg-transparent border-b border-white/30 focus:border-white focus:outline-none"
                  />
                ) : (
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                    {currentUser.location || 'Location unknown'}
                  </div>
                )}
                
                <div className="flex items-center text-white/80">
                  <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                  Joined {new Date(currentUser.joinDate).toLocaleDateString()}
                </div>
                
                <div className="flex items-center text-white/80">
                  <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
                  {currentUser.rating} ({currentUser.reviewCount} reviews)
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-3 backdrop-blur-lg border border-white/20">
              {editedUser.isPublic ? <Eye className="w-6 h-6 text-green-400" /> : <EyeOff className="w-6 h-6 text-red-400" />}
              <span className="text-white/80 font-medium">
                {editedUser.isPublic ? 'Public Profile' : 'Private Profile'}
              </span>
              {isEditing && (
                <button
                  onClick={() => setEditedUser({ ...editedUser, isPublic: !editedUser.isPublic })}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                    editedUser.isPublic ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                      editedUser.isPublic ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedUser(currentUser);
                  }}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <Edit3 className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-cyan-400" />
            Cosmic Bio
          </h3>
          {isEditing ? (
            <textarea
              value={editedUser.bio || ''}
              onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
              placeholder="Share your story across the SkillSaathi..."
              className="w-full bg-white/10 text-white rounded-2xl p-4 border border-white/20 focus:border-white/40 focus:outline-none resize-none backdrop-blur-lg"
              rows={4}
            />
          ) : (
            <p className="text-white/80 text-lg leading-relaxed">
              {currentUser.bio || 'No cosmic story shared yet.'}
            </p>
          )}
        </div>
      </div>

      {/* Skills Offered */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Sparkles className="w-8 h-8 mr-3 text-cyan-400" />
          Cosmic Abilities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {editedUser.skillsOffered.map((skill, index) => (
            <div 
              key={skill.id} 
              className={`group relative overflow-hidden bg-gradient-to-r ${getSkillColor(skill.category)} rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-500 shadow-xl`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{skill.name}</h4>
                    <p className="text-sm opacity-90 font-medium">{skill.level}</p>
                    <p className="text-xs opacity-75">{skill.category}</p>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => removeSkill('offered', skill.id)}
                      className="opacity-0 group-hover:opacity-100 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-lg">
            <h4 className="text-white font-bold text-lg mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-cyan-400" />
              Add New Cosmic Ability
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Skill name"
                value={newOfferedSkill.name}
                onChange={(e) => setNewOfferedSkill({ ...newOfferedSkill, name: e.target.value })}
                className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg"
              />
              <select
                value={newOfferedSkill.category}
                onChange={(e) => setNewOfferedSkill({ ...newOfferedSkill, category: e.target.value })}
                className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg"
              >
                <option value="">Select dimension</option>
                {skillCategories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                ))}
              </select>
              <select
                value={newOfferedSkill.level}
                onChange={(e) => setNewOfferedSkill({ ...newOfferedSkill, level: e.target.value })}
                className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg"
              >
                {skillLevels.map(level => (
                  <option key={level} value={level} className="bg-gray-800">{level}</option>
                ))}
              </select>
              <button
                onClick={() => addSkill('offered')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl p-3 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Skills Wanted */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Star className="w-8 h-8 mr-3 text-purple-400" />
          Learning Quests
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {editedUser.skillsWanted.map((skill, index) => (
            <div 
              key={skill.id} 
              className="group relative overflow-hidden bg-white/10 border-2 border-dashed border-white/30 hover:border-white/60 rounded-2xl p-6 text-white transition-all duration-500 transform hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{skill.name}</h4>
                  <p className="text-sm opacity-90 font-medium">Seeking {skill.level}</p>
                  <p className="text-xs opacity-75">{skill.category}</p>
                </div>
                {isEditing && (
                  <button
                    onClick={() => removeSkill('wanted', skill.id)}
                    className="opacity-0 group-hover:opacity-100 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-lg">
            <h4 className="text-white font-bold text-lg mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-purple-400" />
              Add New Learning Quest
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Skill name"
                value={newWantedSkill.name}
                onChange={(e) => setNewWantedSkill({ ...newWantedSkill, name: e.target.value })}
                className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg"
              />
              <select
                value={newWantedSkill.category}
                onChange={(e) => setNewWantedSkill({ ...newWantedSkill, category: e.target.value })}
                className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg"
              >
                <option value="">Select dimension</option>
                {skillCategories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                ))}
              </select>
              <select
                value={newWantedSkill.level}
                onChange={(e) => setNewWantedSkill({ ...newWantedSkill, level: e.target.value })}
                className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg"
              >
                {skillLevels.map(level => (
                  <option key={level} value={level} className="bg-gray-800">{level}</option>
                ))}
              </select>
              <button
                onClick={() => addSkill('wanted')}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-3 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-emerald-400" />
          Cosmic Schedule
        </h2>
        
        {isEditing ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {availabilityOptions.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={editedUser.availability.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEditedUser({
                        ...editedUser,
                        availability: [...editedUser.availability, option]
                      });
                    } else {
                      setEditedUser({
                        ...editedUser,
                        availability: editedUser.availability.filter(a => a !== option)
                      });
                    }
                  }}
                  className="w-5 h-5 text-emerald-500 bg-white/10 border-white/30 rounded focus:ring-emerald-500 transition-all duration-300"
                />
                <span className="text-white font-medium group-hover:text-emerald-400 transition-colors duration-300">{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {currentUser.availability.map((time, index) => (
              <span
                key={time}
                className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/30 backdrop-blur-lg"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {time}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;