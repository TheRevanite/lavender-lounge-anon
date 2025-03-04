
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Sun } from "lucide-react";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-primary">
          SecureChat
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Button variant="ghost" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/chat">Chats</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/settings">Settings</Link>
          </Button>
        </div>
        
        <Button variant="outline" size="icon" className="rounded-full bg-accent/10">
          <Sun className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="border-t border-border py-2 px-4">
        <div className="container mx-auto flex items-center space-x-8">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/faq" className="flex items-center gap-2">
              <span className="rounded-full h-6 w-6 flex items-center justify-center border border-muted-foreground/30">?</span>
              FAQ
            </Link>
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/terms" className="flex items-center gap-2">
              <span className="rounded-full h-6 w-6 flex items-center justify-center border border-muted-foreground/30">📄</span>
              Terms & Conditions
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
