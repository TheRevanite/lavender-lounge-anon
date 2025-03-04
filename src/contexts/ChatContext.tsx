
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatRoom, Message, User } from '@/types';
import { useAuth } from './AuthContext';

interface ChatContextType {
  rooms: ChatRoom[];
  activeRoom: ChatRoom | null;
  messages: Message[];
  users: User[];
  totalOnline: number;
  registeredOnline: number;
  createRoom: (name: string, isPrivate: boolean, accessCode?: string) => Promise<string>;
  joinRoom: (roomId: string, accessCode?: string) => Promise<boolean>;
  leaveRoom: () => void;
  sendMessage: (content: string, isMedia?: boolean, mediaUrl?: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [totalOnline, setTotalOnline] = useState<number>(0);
  const [registeredOnline, setRegisteredOnline] = useState<number>(0);

  useEffect(() => {
    // Mock data for rooms
    const mockRooms: ChatRoom[] = [
      {
        id: '1',
        name: 'General Chat',
        description: 'Talk about anything',
        createdBy: 'system',
        createdAt: new Date(),
        usersCount: 24,
        isPrivate: false,
      },
      {
        id: '2',
        name: 'Tech Talk',
        description: 'Discuss the latest in technology',
        createdBy: 'system',
        createdAt: new Date(),
        usersCount: 15,
        isPrivate: false,
      },
      {
        id: '3',
        name: 'Private Discussion',
        description: 'Invite-only room',
        createdBy: 'system',
        createdAt: new Date(),
        usersCount: 5,
        isPrivate: true,
        accessCode: '1234',
      },
    ];
    setRooms(mockRooms);

    // Mock total online users
    setTotalOnline(196);
    setRegisteredOnline(150);

    // Mock online users
    const mockUsers: User[] = Array(15).fill(null).map((_, i) => ({
      id: `user-${i}`,
      username: `User${i}`,
      isAnonymous: i % 3 === 0,
      isOnline: true,
    }));
    setUsers(mockUsers);
  }, []);

  const createRoom = async (name: string, isPrivate: boolean, accessCode?: string): Promise<string> => {
    if (!currentUser) throw new Error('Must be logged in to create a room');
    
    const newRoom: ChatRoom = {
      id: `room-${Date.now()}`,
      name,
      createdBy: currentUser.id,
      createdAt: new Date(),
      usersCount: 1,
      isPrivate,
      accessCode,
    };
    
    setRooms([...rooms, newRoom]);
    return newRoom.id;
  };

  const joinRoom = async (roomId: string, accessCode?: string): Promise<boolean> => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return false;
    
    if (room.isPrivate && room.accessCode !== accessCode) {
      return false;
    }
    
    setActiveRoom(room);
    
    // Mock messages for the room
    const mockMessages: Message[] = Array(15).fill(null).map((_, i) => ({
      id: `msg-${i}`,
      content: `This is message ${i} in room ${roomId}`,
      senderId: `user-${i % 5}`,
      senderName: `User${i % 5}`,
      timestamp: new Date(Date.now() - i * 60000),
      roomId,
    }));
    
    setMessages(mockMessages);
    return true;
  };

  const leaveRoom = () => {
    setActiveRoom(null);
    setMessages([]);
  };

  const sendMessage = async (content: string, isMedia?: boolean, mediaUrl?: string) => {
    if (!currentUser || !activeRoom) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      senderId: currentUser.id,
      senderName: currentUser.username,
      timestamp: new Date(),
      roomId: activeRoom.id,
      isMedia,
      mediaUrl,
    };
    
    setMessages([...messages, newMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        rooms,
        activeRoom,
        messages,
        users,
        totalOnline,
        registeredOnline,
        createRoom,
        joinRoom,
        leaveRoom,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
