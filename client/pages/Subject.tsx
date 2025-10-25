import { useParams, useNavigate } from "react-router-dom";
import { RESOURCE_TYPES, BRANCHES, CURRICULUM, Semester } from "@shared/api";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { ChevronLeft, Star, Share2 } from "lucide-react";
import { useState } from "react";

export default function Subject() {
  const { subjectId, branchId, semester } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const branch =
    branchId && branchId in BRANCHES
      ? BRANCHES[branchId as keyof typeof BRANCHES]
      : null;

  const semesterNum = semester ? parseInt(semester) : null;
  const subjects =
    branch && semesterNum && CURRICULUM[branchId as keyof typeof CURRICULUM]
      ? CURRICULUM[branchId as keyof typeof CURRICULUM][
          semesterNum as Semester
        ]
      : [];

  const subject = subjects.find((s) => s.id === subjectId);

  if (!branch || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Subject not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 pt-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={() =>
              navigate(`/branch/${branchId}/semester/${semesterNum}`)
            }
            className="flex items-center gap-2 mb-4 text-blue-100 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold">{subject.name}</h1>
          <p className="text-blue-100">
            {branch.fullName} • Semester {semesterNum}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        {/* Subject Info Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-slate-600">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {subject.name}
              </h2>
              {subject.code && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Subject Code: <span className="font-mono font-semibold">{subject.code}</span>
                </p>
              )}
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-600 transition-colors"
            >
              <Star
                className={`w-6 h-6 ${
                  isFavorite
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              />
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Access comprehensive study materials including notes, previous year
            papers, practical manuals, and video lectures.
          </p>
        </div>

        {/* Resources Section */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Study Resources
        </h3>

        <div className="space-y-3 mb-8">
          {RESOURCE_TYPES.map((resource) => (
            <button
              key={resource.id}
              onClick={() =>
                navigate(`/resource/${subjectId}/${resource.id}/${branchId}/${semesterNum}`)
              }
              className="w-full group text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{resource.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {resource.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {resource.id === "notes" &&
                        "Study notes and summaries"}
                      {resource.id === "papers" &&
                        "Past exam papers"}
                      {resource.id === "manuals" &&
                        "Lab practicals guide"}
                      {resource.id === "lectures" &&
                        "Video lectures & tutorials"}
                    </p>
                  </div>
                </div>
                <span className="text-xl text-gray-400 group-hover:text-primary transition-colors">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Additional Info */}
        <div className="pt-8 border-t border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Share Resources
          </h3>
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: subject.name,
                  text: `Study ${subject.name} on Diploma Guide`,
                });
              } else {
                alert("Share feature not supported on this device");
              }
            }}
            variant="outline"
            className="w-full gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share with Friends
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
