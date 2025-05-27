
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { LogOut, User, Menu, X } from "lucide-react";

interface NavItemProps {
  to: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ to, label, active, onClick }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "px-4 py-2 rounded-full transition-colors font-opensans font-medium",
      active 
        ? "bg-femina-500 text-white" 
        : "text-femina-900 hover:bg-femina-100"
    )}
    onClick={onClick}
  >
    {label}
  </Link>
);

const NavBar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useUser();
  
  const handleTabClick = (path: string) => {
    setActiveTab(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/period-tracker", label: "Period Tracker" },
    { to: "/symptoms", label: "Symptoms" },
    { to: "/pregnancy", label: "Pregnancy" },
    { to: "/insights", label: "Insights" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-femina-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-femina-700 font-bold text-2xl z-50 font-playfair" 
            onClick={() => handleTabClick("/")}
          >
            Femina<span className="text-blush-500">Flow</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                label={item.label}
                active={activeTab === item.to}
                onClick={() => handleTabClick(item.to)}
              />
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="text-sm text-femina-700 mr-2 hidden xl:block font-opensans">
                  <User className="inline-block mr-1" size={16} />
                  {user?.email}
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-femina-700 hover:bg-femina-100 font-opensans">
                  <LogOut className="mr-1" size={16} />
                  <span className="hidden xl:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Button asChild variant="ghost" className="text-femina-700 hover:bg-femina-100 font-opensans font-medium">
                <Link to="/auth">Login / Sign Up</Link>
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-femina-700 hover:bg-femina-100 z-50 relative"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-0 bg-white lg:hidden z-40 animate-fade-in">
            <div className="container mx-auto px-4 pt-20 pb-6 h-full">
              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-4 mb-8">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "px-4 py-3 rounded-xl transition-all duration-300 text-lg font-lora font-medium",
                      activeTab === item.to
                        ? "bg-gradient-to-r from-femina-500 to-blush-500 text-white shadow-lg transform scale-105"
                        : "text-femina-900 hover:bg-femina-50 border border-femina-100"
                    )}
                    onClick={() => handleTabClick(item.to)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Section */}
              <div className="border-t border-femina-100 pt-6">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="text-femina-700 px-4 py-2 bg-femina-50 rounded-lg font-opensans">
                      <User className="inline-block mr-2" size={20} />
                      {user?.email}
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={handleLogout} 
                      className="w-full justify-start text-femina-700 hover:bg-femina-100 text-lg py-3 border border-femina-200 rounded-xl font-opensans"
                    >
                      <LogOut className="mr-2" size={20} />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button 
                    asChild 
                    className="w-full justify-center bg-gradient-to-r from-femina-500 to-blush-500 text-white text-lg py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-opensans font-semibold"
                  >
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      Login / Sign Up
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
