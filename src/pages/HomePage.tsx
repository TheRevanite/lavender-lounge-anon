
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Users, Plus, ArrowRight } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { ChatRoom } from "@/types";

const HomePage = () => {
  const navigate = useNavigate();
  const { rooms, createRoom, joinRoom } = useChat();
  const { currentUser, joinAnonymously } = useAuth();
  
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [joinAccessCode, setJoinAccessCode] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateRoom = async () => {
    if (!roomName) return;
    
    if (!currentUser) {
      if (!username) return;
      await joinAnonymously(username);
    }
    
    const roomId = await createRoom(roomName, isPrivate, isPrivate ? accessCode : undefined);
    setCreateOpen(false);
    
    // Reset form
    setRoomName("");
    setIsPrivate(false);
    setAccessCode("");
    
    navigate(`/chat/${roomId}`);
  };

  const handleJoinRoom = async (roomId: string, accessCode?: string) => {
    if (!currentUser) {
      if (!username) return;
      await joinAnonymously(username);
    }
    
    const success = await joinRoom(roomId, accessCode);
    if (success) {
      setJoinOpen(false);
      setSelectedRoom(null);
      setJoinAccessCode("");
      navigate(`/chat/${roomId}`);
    }
  };

  // Filter rooms based on search term
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock recent chats for the design
  const recentChats = [
    { id: "1", name: "Alice Smith", message: "Let's discuss the project tomorrow", time: "10:30 AM", avatar: "A" },
    { id: "2", name: "Team Encryption", message: "Bob: The new security features are ready", time: "Yesterday", avatar: "T" },
    { id: "3", name: "Charlie Brown", message: "Thanks for the update!", time: "Yesterday", avatar: "C" },
  ];

  // Mock friends for the design
  const friends = [
    { id: "1", name: "Alice Smith", status: "Online" },
    { id: "2", name: "Bob Johnson", status: "Last seen 2h ago" },
    { id: "3", name: "Charlie Brown", status: "Online" },
    { id: "4", name: "David Wilson", status: "Last seen 1d ago" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar - Recent Chats */}
      <div className="w-[360px] border-r border-border p-4 flex flex-col h-[calc(100vh-112px)]">
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Recent Chats</h2>
          <div className="flex gap-2 mb-4">
            <Button className="flex items-center gap-2" size="sm" onClick={() => setCreateOpen(true)}>
              <Users size={16} />
              Create Room
            </Button>
            <Button className="flex items-center gap-2" size="sm" variant="outline" onClick={() => setJoinOpen(true)}>
              <ArrowRight size={16} />
              Join Room
            </Button>
            <Button className="flex items-center" size="icon" variant="outline">
              <Plus size={16} />
            </Button>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search chats..."
              className="search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2 overflow-y-auto flex-1">
          {recentChats.map(chat => (
            <div key={chat.id} className="p-3 hover:bg-muted rounded-lg cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">{chat.name}</h3>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Secure
            <br />
            Messaging
            <br />
            <span className="text-primary">for</span>
            <br />
            <span className="text-primary">Everyone</span>
          </h1>
          
          <p className="text-lg mb-8">
            End-to-end encrypted chat platform that puts your privacy first. 
            Connect securely with anyone, anywhere.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="px-8 py-6 bg-primary/80 hover:bg-primary">
              Start Chatting
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Friends */}
      <div className="w-[280px] border-l border-border p-4 hidden lg:block">
        <h2 className="font-semibold text-lg mb-4">Friends</h2>
        <div className="space-y-4">
          {friends.map(friend => (
            <div key={friend.id} className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {friend.name.charAt(0)}
                </div>
                {friend.status === "Online" && (
                  <div className="absolute bottom-0 right-0 online-indicator"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">{friend.name}</h3>
                <p className="text-xs text-muted-foreground">{friend.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Room Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a New Room</DialogTitle>
            <DialogDescription>
              Create your own chat room and invite others to join.
            </DialogDescription>
          </DialogHeader>
          
          {!currentUser && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Your Username
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter a username"
                className="w-full"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Room Name
            </label>
            <Input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              className="w-full"
            />
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Private Room</span>
            </label>
          </div>
          
          {isPrivate && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Access Code
              </label>
              <Input
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Create an access code"
                className="w-full"
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRoom}>
              Create Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Join Room Dialog */}
      <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join a Chat Room</DialogTitle>
            <DialogDescription>
              {selectedRoom 
                ? `Join the "${selectedRoom.name}" room`
                : "Browse available rooms or enter a room code to join"}
            </DialogDescription>
          </DialogHeader>
          
          {!currentUser && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Your Username
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter a username"
                className="w-full"
              />
            </div>
          )}
          
          {selectedRoom?.isPrivate && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Access Code
              </label>
              <Input
                value={joinAccessCode}
                onChange={(e) => setJoinAccessCode(e.target.value)}
                placeholder="Enter access code"
                className="w-full"
              />
            </div>
          )}
          
          {!selectedRoom && (
            <div className="mb-4 space-y-3 max-h-60 overflow-y-auto">
              {rooms.map(room => (
                <div 
                  key={room.id} 
                  className="p-3 transition-colors rounded-md cursor-pointer hover:bg-purple-100"
                  onClick={() => {
                    if (room.isPrivate) {
                      setSelectedRoom(room);
                    } else {
                      handleJoinRoom(room.id);
                    }
                  }}
                >
                  <div className="font-medium text-purple-800">
                    {room.name} {room.isPrivate && "🔒"}
                  </div>
                  <div className="text-xs text-purple-500">
                    {room.description} • {room.usersCount} users
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setJoinOpen(false);
                setSelectedRoom(null);
                setJoinAccessCode("");
              }}
            >
              Cancel
            </Button>
            {selectedRoom && selectedRoom.isPrivate && (
              <Button 
                onClick={() => handleJoinRoom(selectedRoom.id, joinAccessCode)}
              >
                Join Room
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
