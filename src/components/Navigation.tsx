import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/events", label: "Events" },
    { to: "/calculator", label: "BMI Calculator" },
    { to: "/workouts", label: "Workouts" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-heading font-bold text-xl">P</span>
            </div>
            <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PROACTIVE
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="px-4 py-2 rounded-lg font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-200"
                activeClassName="!text-primary !bg-primary/10"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-64 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-1 pt-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-200"
                activeClassName="!text-primary !bg-primary/10"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
