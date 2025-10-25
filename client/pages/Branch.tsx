import { useParams, useNavigate } from "react-router-dom";
import { BRANCHES, CURRICULUM } from "@shared/api";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { ChevronLeft } from "lucide-react";

export default function Branch() {
  const { branchId } = useParams();
  const navigate = useNavigate();

  const branch = branchId && branchId in BRANCHES ? BRANCHES[branchId as keyof typeof BRANCHES] : null;
  const semesters = [1, 2, 3, 4, 5, 6] as const;

  if (!branch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Branch not found</p>
      </div>
    );
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
          <div className="flex items-center gap-3">
            <span className="text-5xl">{branch.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{branch.fullName}</h1>
              <p className="text-blue-100">K-Scheme Curriculum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Select Semester
        </h2>

        {/* Semester Grid */}
        <div className="grid grid-cols-2 gap-4">
          {semesters.map((sem) => (
            <button
              key={sem}
              onClick={() => navigate(`/branch/${branchId}/semester/${sem}`)}
              className="group relative overflow-hidden rounded-2xl p-8 text-center transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 border border-blue-200 dark:border-slate-600"
            >
              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-primary mb-1">
                  {sem}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  Semester
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {sem <= 2
                    ? "First Year"
                    : sem <= 4
                    ? "Second Year"
                    : "Third Year"}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {/* Branch Info */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            About {branch.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {branch.fullName} is a comprehensive diploma program focusing on
            core concepts, practical skills, and industry-relevant expertise
            across {semesters.length} semesters.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
              <p className="text-2xl font-bold text-primary">{semesters.length}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Semesters</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
              <p className="text-2xl font-bold text-primary">60+</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Subjects</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
              <p className="text-2xl font-bold text-primary">3 yrs</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
