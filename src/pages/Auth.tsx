
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import NavBar from "@/components/NavBar";
import AuthContainer from "@/components/auth/AuthContainer";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  
  // If already logged in, redirect to homepage
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-femina-50">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <AuthContainer />
      </div>
    </div>
  );
};

export default Auth;
