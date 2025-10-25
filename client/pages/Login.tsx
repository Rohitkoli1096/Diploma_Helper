import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BRANCHES } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store user info in localStorage (simple auth simulation)
    const userInfo = {
      fullName: isRegistering ? fullName : "Student",
      email,
      branch: isRegistering ? selectedBranch : "",
      isLoggedIn: true,
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            Diploma Guide
          </h1>
          <p className="text-xl font-semibold text-primary mb-1">K-Scheme</p>
          <p className="text-gray-600 dark:text-gray-400">
            Smart Syllabus, Notes & Learning Hub
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full"
                    required={isRegistering}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Your Branch
                  </label>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BRANCHES).map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.icon} {branch.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all h-auto"
              disabled={!email || !password || (isRegistering && (!fullName || !selectedBranch))}
            >
              {isRegistering ? "Create Account" : "Continue"}
            </Button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isRegistering ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-primary font-semibold hover:underline"
              >
                {isRegistering ? "Sign In" : "Register"}
              </button>
            </p>
          </div>

          {/* Guest Login */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <Button
              onClick={() => {
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify({
                    fullName: "Guest",
                    email: "guest@diploma.guide",
                    branch: "COMP",
                    isLoggedIn: true,
                  })
                );
                navigate("/");
              }}
              variant="outline"
              className="w-full"
            >
              Continue as Guest
            </Button>
          </div>
        </div>

        {/* Illustration */}
        <div className="mt-12 text-center text-gray-400 dark:text-gray-600">
          <p className="text-sm">📚 Your learning journey starts here</p>
        </div>
      </div>
    </div>
  );
}
