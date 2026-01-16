import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  FileText,
  LayoutDashboard,
} from "lucide-react";

import FloatingAIButton from "../components/FloatingAIButton";

interface Resume {
  id: string;
  full_name: string;
  target_job_title: string;
  created_at: string;
  updated_at: string;
}

interface UserDashboardProps {
  user: any;
  onCreateNew: () => void;
  onEditResume: (resumeId: string) => void;
  onLogOut: () => void;
}

export default function UserDashboard({
  user,
  onCreateNew,
  onEditResume,
  onLogOut,
}: UserDashboardProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Used to force AI reset on logout
  const [aiKey, setAiKey] = useState(0);

  useEffect(() => {
    if (user) loadResumes();
  }, [user]);

  const loadResumes = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("resumes")
        .select("id, full_name, target_job_title, created_at, updated_at")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (resumeId: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", resumeId);

      if (error) throw error;
      setResumes((prev) => prev.filter((r) => r.id !== resumeId));
    } catch (err: any) {
      alert("Failed to delete resume: " + err.message);
    }
  };

  const handleLogout = () => {
    setAiKey((k) => k + 1); // reset AI
    onLogOut();
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    // ❌ overflow-hidden REMOVED (THIS FIXES EVERYTHING)
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">

      {/* Background Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* HEADER */}
      <header className="relative z-20 sticky top-0 backdrop-blur-xl bg-white/70 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <FileText />
              ResumeCraft
            </div>

            <nav className="hidden md:flex items-center gap-3">
              <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium">
                <LayoutDashboard size={18} />
                Dashboard
              </span>

              <button
                onClick={onCreateNew}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              >
                <Plus size={18} />
                New Resume
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-800">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500">Logged in</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-24 text-lg text-gray-600">
            Loading your resumes...
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur rounded-2xl border border-dashed shadow-sm">
            <p className="text-gray-600 mb-6 text-lg">
              You haven't created any resumes yet
            </p>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 transition"
            >
              <Plus size={20} />
              Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white/80 backdrop-blur rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {resume.full_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {resume.target_job_title}
                  </p>

                  <div className="text-xs text-gray-500 mb-5 space-y-1">
                    <p>Created: {formatDate(resume.created_at)}</p>
                    <p>Updated: {formatDate(resume.updated_at)}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditResume(resume.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                      <Edit2 size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🤖 Floating AI Assistant (GLOBAL, NOT CLIPPED) */}
      <FloatingAIButton key={aiKey} />
    </div>
  );
}
