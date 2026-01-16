import { useState, useEffect } from 'react';
import { FileText, Download, Copy, Printer, Eye, Sparkles, ArrowLeft } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import LandingPage from './components/LandingPage';
import html2pdf from 'html2pdf.js';
import AuthPage from './components/AuthPage';
import UserDashboard from './components/UserDashboard';
import { AnimatePresence, motion } from "framer-motion";
import { ResumeData } from './types/resume';
import CareerRecommendationBar from './components/CareerRecommendationBar';
import { supabase } from './lib/supabase';
import { copyToClipboard, downloadAsText } from './utils/export';
type AppView = 'landing' | 'auth' | 'dashboard' | 'form' | 'preview';
function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentStep, setCurrentStep] = useState<'form' | 'preview'>('form');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [template, setTemplate] = useState<
  | 'professional'
  | 'modern'
  | 'creative'
  | 'minimal'
  | 'elegant'
  | 'warm'
  | 'tech'
>('professional');

  const [user, setUser] = useState<any>(null);
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      setUser(session.user);

      setCurrentView((prev) => {
        if (prev === 'form' || prev === 'preview') return prev;
        if (prev === 'auth' || prev === 'landing') return 'dashboard';
        return prev;
      });
    } else {
      setUser(null);
      setCurrentView('landing');
    }
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      setUser(session.user);

      setCurrentView((prev) => {
        if (prev === 'form' || prev === 'preview') return prev;
        if (prev === 'auth' || prev === 'landing') return 'dashboard';
        return prev;
      });
    }

    if (event === 'SIGNED_OUT') {
      setUser(null);
      setCurrentView('landing');
    }
  });

  return () => subscription.unsubscribe();
}, []);


  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNewResume = () => {
    setEditingResumeId(null);
    setResumeData(null);
    setCurrentStep('form');
    setCurrentView('form');
  };

  const handleEditResume = async (resumeId: string) => {
    setIsLoadingResume(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Resume not found');

      const resumeData: ResumeData = {
        id: data.id,
        fullName: data.full_name,
        targetJobTitle: data.target_job_title,
        email: data.email,
        phone: data.phone || '',
        linkedin: data.linkedin || '',
        professionalSummary: data.professional_summary || '',
        skills: data.skills || [],
        workExperience: data.work_experience || [],
        education: data.education || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
        additionalInfo: data.additional_info || '',
      };

      setResumeData(resumeData);
      setEditingResumeId(resumeId);
      setCurrentStep('form');
      setCurrentView('form');
    } catch (error: any) {
      showNotification('Failed to load resume: ' + error.message);
    } finally {
      setIsLoadingResume(false);
    }
  };

  const handleFormSubmit = async (data: ResumeData) => {
    setIsLoading(true);
    try {
      if (editingResumeId) {
        const { error } = await supabase
          .from('resumes')
          .update({
            full_name: data.fullName,
            target_job_title: data.targetJobTitle,
            email: data.email,
            phone: data.phone,
            linkedin: data.linkedin,
            professional_summary: data.professionalSummary,
            skills: data.skills,
            work_experience: data.workExperience,
            education: data.education,
            projects: data.projects,
            certifications: data.certifications,
            additional_info: data.additionalInfo,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingResumeId);

        if (error) throw error;
        showNotification('Resume updated successfully!');
      } else {
        const { error } = await supabase.from('resumes').insert({
          user_id: user.id,
          full_name: data.fullName,
          target_job_title: data.targetJobTitle,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin,
          professional_summary: data.professionalSummary,
          skills: data.skills,
          work_experience: data.workExperience,
          education: data.education,
          projects: data.projects,
          certifications: data.certifications,
          additional_info: data.additionalInfo,
        });

        if (error) throw error;
        showNotification('Resume created successfully!');
      }

      setResumeData(data);
      setCurrentStep('preview');
      setCurrentView('preview');
    } catch (error: any) {
      showNotification('Failed to save resume: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard('resume-preview');
    if (success) {
      showNotification('Resume copied to clipboard!');
    } else {
      showNotification('Failed to copy resume');
    }
  };

  const handleDownload = () => {
    if (resumeData) {
      const element = document.getElementById('resume-preview');
      if (element) {
        downloadAsText(element.innerText, `${resumeData.fullName.replace(/\s/g, '_')}_Resume.txt`);
        showNotification('Resume downloaded!');
      }
    }
  };
  const handleDownloadPDF = () => {
  const element = document.getElementById('resume-preview');

  if (!element) {
    showNotification('Resume preview not found');
    return;
  }

  html2pdf()
    .from(element)
    .set({
      margin: 10,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
    })
    .save();
};

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentView('auth');
    setEditingResumeId(null);
    setResumeData(null);
    showNotification('Signed out successfully!');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentStep('form');
    setEditingResumeId(null);
    setResumeData(null);
  };
  if (currentView === 'landing') {
  return (
    <LandingPage
      onLogin={() => setCurrentView('auth')}
      onGetStarted={() => setCurrentView('auth')}
    />
  );
}


  if (currentView === 'auth') {
    return <AuthPage onAuthSuccess={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'dashboard' && user) {
    return (
      <UserDashboard
        user={user}
        onCreateNew={handleCreateNewResume}
        onEditResume={handleEditResume}
        onLogOut={handleSignOut}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}

      {isLoadingResume && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-600 text-lg">Loading resume...</div>
        </div>
      )}

      {!isLoadingResume && currentStep === 'form' ? (
        <div>
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                <Sparkles size={20} />
                <span className="font-medium">
                  {editingResumeId ? 'Edit Your Resume' : 'AI-Powered Resume Generation'}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {editingResumeId ? 'Update Your Professional Resume' : 'Build Your Professional Resume'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {editingResumeId
                  ? 'Make changes to your resume and they will be saved automatically'
                  : 'Fill out your information below and we\'ll create an ATS-optimized resume tailored to your target role'}
              </p>
            </div>
            <ResumeForm
              onSubmit={handleFormSubmit}
              initialData={resumeData || undefined}
              isLoading={isLoading}
              onBackToDashboard={handleBackToDashboard}
            />
          </main>
        </div>
      ) : (
        <div>
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setCurrentStep('form')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Eye size={20} />
                Edit Resume
              </button>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
  {[
    'professional',
    'modern',
    'creative',
    'minimal',
    'elegant',
    'warm',
    'tech',
  ].map((t) => (
    <button
      key={t}
      onClick={() => setTemplate(t as any)}
      className={`px-3 py-1 rounded-md text-sm capitalize transition-all ${
        template === t
          ? 'bg-blue-600 text-white shadow'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {t}
    </button>
  ))}
</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Copy size={18} />
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download size={18} />
                  Download
                </button>
                <button
  onClick={handleDownloadPDF}
  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
>
  <FileText size={18} />
  Download PDF
</button>

              </div>
            </div>
            {resumeData && (
  <>
    {/* 🔮 Career Recommendation Bar (NOT part of resume / PDF) */}
    <CareerRecommendationBar data={resumeData} />

    {/* 📄 Resume Preview */}
    <ResumePreview data={resumeData} template={template} />
  </>
)}
          </main>
        </div>
      )}

      <footer className="relative mt-20 overflow-hidden">
  {/* Gradient divider */}
  <div className="h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />

  <div className="bg-white/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            ResumePro
          </h3>
          <p className="text-sm text-gray-600 mt-1 max-w-md">
            Create professional, ATS-friendly resumes that actually get interviews.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <button className="hover:text-indigo-600 transition">
            Templates
          </button>
          <button className="hover:text-indigo-600 transition">
            Features
          </button>
          <button className="hover:text-indigo-600 transition">
            Privacy
          </button>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} ResumePro. All rights reserved.</span>

        <span className="flex items-center gap-1">
          Built with ❤️ for job seekers
        </span>
      </div>
    </div>
  </div>
</footer>


      <style>{`
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`}</style>
    </div>
  );
}

export default App;
