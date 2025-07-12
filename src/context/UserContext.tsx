import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

export interface User {
  id: string;
  name: string;
  location?: string;
  profilePhoto?: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: string[];
  isPublic: boolean;
  rating: number;
  reviewCount: number;
  joinDate: string;
  bio?: string;
  isBanned?: boolean;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  offeredSkill: Skill;
  requestedSkill: Skill;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  createdAt: string;
  rating?: number;
  feedback?: string;
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  swapRequests: SwapRequest[];
  setCurrentUser: (user: User | null) => void;
  updateUser: (user: User) => void;
  addSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt'>) => void;
  updateSwapRequest: (id: string, updates: Partial<SwapRequest>) => void;
  deleteSwapRequest: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Chota Bheem',
    location: 'India, Dholakpur',
    skillsOffered: [
      { id: '1', name: 'React Development', level: 'Expert', category: 'Programming' },
      { id: '2', name: 'UI/UX Design', level: 'Advanced', category: 'Design' }
    ],
    skillsWanted: [
      { id: '3', name: 'Cooking Ladoo', level: 'Beginner', category: 'Creative' },
      { id: '4', name: 'Hindi', level: 'Intermediate', category: 'Language' }
    ],
    availability: ['Weekends', 'Evenings'],
    isPublic: true,
    rating: 4.8,
    reviewCount: 24,
    joinDate: '2025-07-12',
    bio: 'Passionate developer designer and fighter looking to expand creative skills.'
  },
  {
    id: '2',
    name: 'Shizuka',
    location: 'Japan, Tokyo',
    skillsOffered: [
      { id: '5', name: 'Photography', level: 'Expert', category: 'Creative' },
      { id: '6', name: 'japanese', level: 'Expert', category: 'Language' }
    ],
    skillsWanted: [
      { id: '7', name: 'Web Development', level: 'Beginner', category: 'Programming' },
      { id: '8', name: 'Digital Marketing', level: 'Intermediate', category: 'Business' }
    ],
    availability: ['Weekends', 'Mornings'],
    isPublic: true,
    rating: 4.9,
    reviewCount: 31,
    joinDate: '2025-07-12',
    bio: 'Professional photographer and language tutor interested in tech skills.'
  },
  {
    id: '3',
    name: 'Shinchan',
    location: 'Japan, Kasukabe',
    skillsOffered: [
      { id: '9', name: 'Data Science', level: 'Expert', category: 'Programming' },
      { id: '10', name: 'Machine Learning', level: 'Advanced', category: 'Programming' }
    ],
    skillsWanted: [
      { id: '11', name: 'Guitar', level: 'Beginner', category: 'Music' },
      { id: '12', name: 'Cooking', level: 'Intermediate', category: 'Lifestyle' }
    ],
    availability: ['Evenings', 'Weekends'],
    isPublic: true,
    rating: 4.7,
    reviewCount: 18,
    joinDate: '2025-07-12',
    bio: 'Data scientist seeking creative and practical life skills.'
  }
];

const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    fromUserId: '2',
    toUserId: '1',
    offeredSkill: { id: '5', name: 'Photography', level: 'Expert', category: 'Creative' },
    requestedSkill: { id: '1', name: 'React Development', level: 'Expert', category: 'Programming' },
    status: 'pending',
    message: 'Hi! I\'d love to teach you photography in exchange for React lessons.',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    fromUserId: '3',
    toUserId: '1',
    offeredSkill: { id: '9', name: 'Data Science', level: 'Expert', category: 'Programming' },
    requestedSkill: { id: '2', name: 'UI/UX Design', level: 'Advanced', category: 'Design' },
    status: 'accepted',
    message: 'Interested in learning design principles from you!',
    createdAt: '2024-01-10T14:20:00Z'
  }
];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>(mockSwapRequests);

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  const addSwapRequest = (request: Omit<SwapRequest, 'id' | 'createdAt'>) => {
    const newRequest: SwapRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSwapRequests(prev => [...prev, newRequest]);
  };

  const updateSwapRequest = (id: string, updates: Partial<SwapRequest>) => {
    setSwapRequests(prev => prev.map(request => 
      request.id === id ? { ...request, ...updates } : request
    ));
  };

  const deleteSwapRequest = (id: string) => {
    setSwapRequests(prev => prev.filter(request => request.id !== id));
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      users,
      swapRequests,
      setCurrentUser,
      updateUser,
      addSwapRequest,
      updateSwapRequest,
      deleteSwapRequest
    }}>
      {children}
    </UserContext.Provider>
  );
};