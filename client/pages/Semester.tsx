import { useParams, useNavigate } from "react-router-dom";
import { BRANCHES, CURRICULUM, Semester } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";
import { ChevronLeft, Search } from "lucide-react";
import { useState, useMemo } from "react";

export default function SemesterPage() {
  const { branchId, semester } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredSubjects = useMemo(() => {
    if (!searchQuery) return subjects;
    return subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subjects, searchQuery]);

  if (!branch || !semesterNum) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid semester</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-32 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 pt-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate(`/branch/${branchId}`)}
            className="flex items-center gap-2 mb-4 text-blue-100 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold">
            {branch.fullName} – {semesterNum} Semester
          </h1>
          <p className="text-blue-100">Subject List</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search Subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 rounded-xl"
          />
        </div>

        {/* Subjects List */}
        <div className="space-y-3">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() =>
                  navigate(`/subject/${subject.id}/${branchId}/${semesterNum}`)
                }
                className="w-full group text-left p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 border border-blue-200 dark:border-slate-600 hover:shadow-md transition-all transform hover:scale-105 active:scale-95"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {subject.name}
                    </h3>
                    {subject.code && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Code: {subject.code}
                      </p>
                    )}
                  </div>
                  <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No subjects found
              </p>
            </div>
          )}
        </div>

        {/* Semester Info */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Semester {semesterNum} Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
              <p className="text-2xl font-bold text-primary">
                {filteredSubjects.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Subjects
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800">
              <p className="text-2xl font-bold text-primary">4</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Resources/Subject
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
