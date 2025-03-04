
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-purple-100 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/faq">FAQ</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/terms">ToS</Link>
          </Button>
        </div>
        
        <Link to="/" className="text-2xl font-bold text-purple-600">
          SecureChat
        </Link>
        
        <div className="flex items-center space-x-2">
          {currentUser ? (
            <>
              <span className="mr-2 text-sm text-purple-600">
                Hello, {currentUser.username}
              </span>
              <Button variant="outline" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
