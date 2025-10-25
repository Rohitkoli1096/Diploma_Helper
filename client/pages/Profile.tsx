import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BRANCHES } from "@shared/api";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut, Moon, Sun } from "lucide-react";

interface UserInfo {
  fullName: string;
  email: string;
  branch: string;
  isLoggedIn: boolean;
}

export default function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [darkMode, setDarkMode] = useState(false);

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

    // Check for dark mode preference
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const branchInfo = userInfo?.branch
    ? BRANCHES[userInfo.branch as keyof typeof BRANCHES]
    : null;

  if (!userInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 pt-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-4 text-blue-100 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-blue-100">Manage your account</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 mb-8 border border-blue-200 dark:border-slate-600 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl mx-auto mb-4">
            👤
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {userInfo.fullName}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            {userInfo.email}
          </p>
          {branchInfo && (
            <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-700 px-4 py-2 rounded-full">
              <span className="text-2xl">{branchInfo.icon}</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {branchInfo.fullName}
              </span>
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Settings
          </h3>

          <div className="space-y-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Dark Mode
                </span>
              </div>
              <span
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  darkMode ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    darkMode ? "translate-x-6" : ""
                  }`}
                />
              </span>
            </button>

            {/* Edit Profile */}
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all">
              <span className="font-semibold text-gray-900 dark:text-white">
                Edit Profile
              </span>
              <span className="text-xl">→</span>
            </button>

            {/* Notification Settings */}
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all">
              <span className="font-semibold text-gray-900 dark:text-white">
                Notifications
              </span>
              <span className="text-xl">→</span>
            </button>

            {/* Download Settings */}
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all">
              <span className="font-semibold text-gray-900 dark:text-white">
                Offline Downloads
              </span>
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-slate-800 mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            About App
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>App Version</span>
              <span className="font-semibold">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span className="font-semibold">Today</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-all h-auto gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
