import { useParams, useNavigate } from "react-router-dom";
import { BRANCHES, CURRICULUM, RESOURCE_TYPES, Semester } from "@shared/api";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { ChevronLeft, Download, Eye } from "lucide-react";

export default function Resource() {
  const { subjectId, resourceId, branchId, semester } = useParams();
  const navigate = useNavigate();

  const resource = RESOURCE_TYPES.find((r) => r.id === resourceId);
  const semesterNum = semester ? parseInt(semester) : null;

  const subjects =
    branchId && semesterNum && CURRICULUM[branchId as keyof typeof CURRICULUM]
      ? CURRICULUM[branchId as keyof typeof CURRICULUM][
          semesterNum as Semester
        ]
      : [];

  const subject = subjects.find((s) => s.id === subjectId);
  const branch =
    branchId && branchId in BRANCHES
      ? BRANCHES[branchId as keyof typeof BRANCHES]
      : null;

  if (!subject || !resource || !branch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Resource not found</p>
      </div>
    );
  }

  const mockResources = [
    {
      id: 1,
      title: "Chapter 1: Introduction",
      type: "pdf",
      size: "2.4 MB",
      downloads: 342,
    },
    {
      id: 2,
      title: "Chapter 2: Core Concepts",
      type: "pdf",
      size: "3.1 MB",
      downloads: 298,
    },
    {
      id: 3,
      title: "Exam Preparation Guide",
      type: "pdf",
      size: "1.8 MB",
      downloads: 215,
    },
    {
      id: 4,
      title: "2023 Question Paper",
      type: "pdf",
      size: "890 KB",
      downloads: 512,
    },
    {
      id: 5,
      title: "Solutions & Answers",
      type: "pdf",
      size: "1.2 MB",
      downloads: 389,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 pt-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={() =>
              navigate(
                `/subject/${subjectId}/${branchId}/${semesterNum}`
              )
            }
            className="flex items-center gap-2 mb-4 text-blue-100 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold">{resource.name}</h1>
          <p className="text-blue-100">{subject.name}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        {/* Resource Info */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-slate-600">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{resource.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {resource.name}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {subject.code && `${subject.code} • `}
                {subject.name}
              </p>
            </div>
          </div>
        </div>

        {/* Files/Resources List */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {resource.id === "notes" && "Study Notes"}
          {resource.id === "papers" && "Previous Year Papers"}
          {resource.id === "manuals" && "Practical Manuals"}
          {resource.id === "lectures" && "Video Lectures"}
        </h3>

        <div className="space-y-3">
          {mockResources.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <span>📄 {item.type.toUpperCase()}</span>
                    <span>📦 {item.size}</span>
                    <span>📥 {item.downloads} downloads</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => alert("Opening preview...")}
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                  onClick={() => alert("Downloading...")}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📚 Study Tips
          </h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ✅ Download these materials for offline access
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ✅ Mark as favorite for quick access later
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ✅ Share with classmates to help them study
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
