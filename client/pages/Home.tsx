import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BRANCHES } from "@shared/api";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface UserInfo {
  fullName: string;
  email: string;
  branch: string;
  isLoggedIn: boolean;
}

export default function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showAllBranches, setShowAllBranches] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      setUserInfo(user);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  if (!userInfo) {
    return null;
  }

  const branchesArray = Object.values(BRANCHES);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 pt-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Diploma Guide</h1>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-blue-100">Welcome, {userInfo.fullName} 👋</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Select Your Branch
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Choose a branch to view its curriculum and resources
        </p>

        {/* Branch Grid */}
        <div className="grid grid-cols-2 gap-4">
          {branchesArray
            .slice(0, showAllBranches ? branchesArray.length : 6)
            .map((branch) => (
              <button
                key={branch.id}
                onClick={() => navigate(`/branch/${branch.id}`)}
                className="group relative overflow-hidden rounded-2xl p-6 text-center transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${branch.color}15, ${branch.color}08)`,
                  border: `2px solid ${branch.color}20`,
                }}
              >
                {/* Background gradient effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${branch.color}20, transparent)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-5xl mb-3">{branch.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                    {branch.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {branch.id}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
        </div>

        {!showAllBranches && branchesArray.length > 6 && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowAllBranches(true)}
              variant="outline"
              className="w-full"
            >
              Show More Branches
            </Button>
          </div>
        )}

        {/* Features Preview */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            App Features
          </h3>
          <div className="space-y-3">
            <FeatureItem icon="📘" title="Complete Syllabus" description="Access K-Scheme curriculum for all semesters" />
            <FeatureItem icon="📄" title="Previous Year Papers" description="Download past exam papers and solutions" />
            <FeatureItem icon="🧪" title="Practical Manuals" description="Step-by-step practical guidelines" />
            <FeatureItem icon="🎥" title="Video Lectures" description="Embedded YouTube lecture links" />
            <FeatureItem icon="⭐" title="Save Favorites" description="Bookmark important subjects and resources" />
            <FeatureItem icon="🌙" title="Dark Mode" description="Easy on the eyes, study anytime" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1 text-left">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
          {title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
