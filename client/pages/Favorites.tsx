import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { Star, ChevronLeft } from "lucide-react";

export default function Favorites() {
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
            <Star className="fill-yellow-400 text-yellow-400" />
            Favorites
          </h1>
          <p className="text-blue-100">Your saved subjects and resources</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        <div className="text-center py-16">
          <Star className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Favorites Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Start exploring subjects and save your favorites by clicking the
            star icon!
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explore Subjects
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            How to Use Favorites
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900">
              <span className="text-2xl">1️⃣</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click the star icon on any subject to save it
              </p>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900">
              <span className="text-2xl">2️⃣</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access all your favorites from this page
              </p>
            </div>
            <div className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-900">
              <span className="text-2xl">3️⃣</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quick access to your most-used resources
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
