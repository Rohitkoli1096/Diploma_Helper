import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { BookOpen, ChevronLeft } from "lucide-react";

export default function Notes() {
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen />
            My Notes
          </h1>
          <p className="text-blue-100">All your downloaded resources in one place</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Downloaded Resources Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Download study materials from subjects to access them offline here.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Subjects
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Coming Soon
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900">
              <span className="text-2xl">💾</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Offline access to downloaded materials
              </p>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900">
              <span className="text-2xl">🔍</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Search across all downloaded files
              </p>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900">
              <span className="text-2xl">📊</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track storage usage and manage downloads
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
