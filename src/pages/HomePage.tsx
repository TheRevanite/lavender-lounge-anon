
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { ChatRoom } from "@/types";

const HomePage = () => {
  const navigate = useNavigate();
  const { rooms, createRoom, joinRoom, totalOnline, registeredOnline } = useChat();
  const { currentUser, joinAnonymously } = useAuth();
  
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [joinAccessCode, setJoinAccessCode] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [username, setUsername] = useState("");

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

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Left Sidebar - Recent Active Rooms */}
      <div className="hidden w-64 p-4 bg-white border-r border-purple-100 md:block">
        <h2 className="mb-4 text-lg font-semibold text-purple-800">Recent Active Rooms</h2>
        <div className="space-y-3">
          {rooms.slice(0, 8).map(room => (
            <div 
              key={room.id} 
              className="p-3 transition-colors rounded-md cursor-pointer hover:bg-purple-100"
              onClick={() => {
                if (room.isPrivate) {
                  setSelectedRoom(room);
                  setJoinOpen(true);
                } else {
                  handleJoinRoom(room.id);
                }
              }}
            >
              <div className="font-medium text-purple-800">{room.name}</div>
              <div className="text-xs text-purple-500">{room.usersCount} users online</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-purple-800">Welcome to SecureChat</h1>
          <p className="mt-4 text-lg text-purple-600">
            Join the conversation in our encrypted anonymous chatrooms
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 mt-12 md:flex-row">
            <Button 
              className="w-full py-8 text-lg md:w-48" 
              onClick={() => setCreateOpen(true)}
            >
              Create Room
            </Button>
            <Button 
              className="w-full py-8 text-lg md:w-48" 
              variant="outline" 
              onClick={() => setJoinOpen(true)}
            >
              Join Room
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Online Users */}
      <div className="hidden w-64 p-4 bg-white border-l border-purple-100 md:block">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-purple-800">Users Online</h2>
          <p className="text-purple-600">{totalOnline} ({registeredOnline})</p>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          {/* We would iterate through actual online users here */}
          <p className="text-sm text-purple-600">Active in multiple rooms</p>
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
