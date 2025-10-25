import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Star, User } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export default function BottomNavigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    { path: "/", label: "Home", icon: <Home className="w-6 h-6" /> },
    { path: "/notes", label: "Notes", icon: <BookOpen className="w-6 h-6" /> },
    {
      path: "/favorites",
      label: "Favorites",
      icon: <Star className="w-6 h-6" />,
    },
    { path: "/profile", label: "Profile", icon: <User className="w-6 h-6" /> },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/" || currentPath === "/login";
    }
    return currentPath.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 md:hidden">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                active
                  ? "text-primary font-semibold"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
