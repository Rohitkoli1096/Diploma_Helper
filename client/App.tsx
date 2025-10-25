import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Branch from "./pages/Branch";
import Semester from "./pages/Semester";
import Subject from "./pages/Subject";
import Resource from "./pages/Resource";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/branch/:branchId" element={<Branch />} />
          <Route
            path="/branch/:branchId/semester/:semester"
            element={<Semester />}
          />
          <Route
            path="/subject/:subjectId/:branchId/:semester"
            element={<Subject />}
          />
          <Route
            path="/resource/:subjectId/:resourceId/:branchId/:semester"
            element={<Resource />}
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notes" element={<Notes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
