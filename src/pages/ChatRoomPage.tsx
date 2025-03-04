
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { SendIcon, Paperclip, Link2, ArrowLeft } from "lucide-react";

const ChatRoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { activeRoom, messages, joinRoom, leaveRoom, sendMessage, users } = useChat();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    if (roomId && (!activeRoom || activeRoom.id !== roomId)) {
      joinRoom(roomId);
    }

    return () => {
      leaveRoom();
    };
  }, [roomId, currentUser, activeRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!activeRoom) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-50">
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-purple-800">Loading chat room...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Chat Container */}
      <div className="flex flex-col flex-1">
        {/* Chat Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-purple-100 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5 text-purple-600" />
            </Button>
            <div className="ml-2">
              <h1 className="text-lg font-bold text-purple-800">{activeRoom.name}</h1>
              <p className="text-xs text-purple-500">{activeRoom.usersCount} users online</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg) => {
              const isOwnMessage = msg.senderId === currentUser?.id;
              
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      isOwnMessage 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white border border-purple-100 text-gray-800'
                    }`}
                  >
                    {!isOwnMessage && (
                      <div className="mb-1 text-xs font-semibold">
                        {msg.senderName}
                      </div>
                    )}
                    <div>{msg.content}</div>
                    <div className="mt-1 text-xs opacity-70">
                      {format(new Date(msg.timestamp), 'p')}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="sticky bottom-0 px-4 py-3 bg-white border-t border-purple-100">
          <div className="flex max-w-4xl mx-auto">
            {!currentUser?.isAnonymous && (
              <div className="flex space-x-2 mr-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-5 h-5 text-purple-600" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Link2 className="w-5 h-5 text-purple-600" />
                </Button>
              </div>
            )}
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button 
              className="ml-2" 
              size="icon"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <SendIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right sidebar - Room Users */}
      <div className="hidden w-64 bg-white border-l border-purple-100 md:block">
        <div className="p-4">
          <h2 className="mb-4 text-lg font-semibold text-purple-800">Room Members</h2>
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} className="flex items-center">
                <div className="w-2 h-2 mr-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{user.username}</span>
                {user.isAnonymous && (
                  <span className="ml-1 text-xs text-purple-500">(guest)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
