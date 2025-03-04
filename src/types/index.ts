
export interface User {
  id: string;
  username: string;
  isAnonymous: boolean;
  isOnline: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  usersCount: number;
  isPrivate: boolean;
  accessCode?: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  roomId: string;
  isMedia?: boolean;
  mediaUrl?: string;
}
