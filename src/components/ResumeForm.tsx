import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ResumeData, WorkExperience, Education, Project, Certification } from '../types/resume';

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void;
  initialData?: ResumeData;
  isLoading?: boolean;
  onBackToDashboard?: () => void;
}

export default function ResumeForm({ onSubmit, initialData, isLoading, onBackToDashboard }: ResumeFormProps) {
  const [formData, setFormData] = useState<ResumeData>(
    initialData || {
      fullName: '',
      targetJobTitle: '',
      email: '',
      phone: '',
      linkedin: '',
      professionalSummary: '',
      skills: [],
      workExperience: [],
      education: [],
      projects: [],
      certifications: [],
      additionalInfo: '',
    }
  );
  useEffect(() => {
  if (initialData) {
    setFormData(initialData);
  } else {
    setFormData({
      fullName: '',
      targetJobTitle: '',
      email: '',
      phone: '',
      linkedin: '',
      professionalSummary: '',
      skills: [],
      workExperience: [],
      education: [],
      projects: [],
      certifications: [],
      additionalInfo: '',
    });
  }
}, [initialData]);


  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          current: false,
          responsibilities: [''],
        },
      ],
    });
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string | boolean | string[]) => {
    const updated = [...formData.workExperience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, workExperience: updated });
  };

  const removeWorkExperience = (index: number) => {
    setFormData({
      ...formData,
      workExperience: formData.workExperience.filter((_, i) => i !== index),
    });
  };

  const addResponsibility = (expIndex: number) => {
    const updated = [...formData.workExperience];
    updated[expIndex].responsibilities.push('');
    setFormData({ ...formData, workExperience: updated });
  };

  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    const updated = [...formData.workExperience];
    updated[expIndex].responsibilities[respIndex] = value;
    setFormData({ ...formData, workExperience: updated });
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const updated = [...formData.workExperience];
    updated[expIndex].responsibilities = updated[expIndex].responsibilities.filter((_, i) => i !== respIndex);
    setFormData({ ...formData, workExperience: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { school: '', degree: '', field: '', graduationYear: '' },
      ],
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, education: updated });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { name: '', description: '', technologies: [], link: '' },
      ],
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, projects: updated });
  };

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index),
    });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        { name: '', issuer: '', year: '' },
      ],
    });
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...formData.certifications];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, certifications: updated });
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
  {/* Header */}
  <div className="sticky top-0 z-40 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 backdrop-blur-md shadow-lg">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-xs text-white/90 font-semibold tracking-wide">
✨ AI-Powered Resume Builder</p>
        <h1 className="text-lg font-bold text-white tracking-tight">
          Build Your Professional Resume
        </h1>
      </div>

      {onBackToDashboard && (
        <button
          type="button"
          onClick={onBackToDashboard}
          className="text-sm text-white bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all hover:scale-105"
        >
          ← Back to Dashboard
        </button>
      )}
    </div>
  </div>

  {/* Form */}
  <form
    onSubmit={handleSubmit}
    className="max-w-6xl mx-auto px-4 py-10 space-y-12"
  >

      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Job Title *</label>
            <input
              type="text"
              required
              value={formData.targetJobTitle}
              onChange={(e) => setFormData({ ...formData, targetJobTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn/Portfolio URL</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Professional Summary</h2>
        <textarea
          value={formData.professionalSummary}
          onChange={(e) => setFormData({ ...formData, professionalSummary: e.target.value })}
          rows={4}
          placeholder="Write a 2-3 sentence summary of your strengths and career goals..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Skills</h2>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            placeholder="Add a skill (e.g., JavaScript, Project Management)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full shadow-sm"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="hover:text-blue-900"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
          <button
            type="button"
            onClick={addWorkExperience}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all transition-colors"
          >
            <Plus size={20} /> Add Experience
          </button>
        </div>
        {formData.workExperience.map((exp, expIndex) => (
          <div key={expIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => removeWorkExperience(expIndex)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateWorkExperience(expIndex, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => updateWorkExperience(expIndex, 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="text"
                  placeholder="e.g., Jan 2020"
                  value={exp.startDate}
                  onChange={(e) => updateWorkExperience(expIndex, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="text"
                  placeholder="e.g., Dec 2022"
                  value={exp.endDate}
                  onChange={(e) => updateWorkExperience(expIndex, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateWorkExperience(expIndex, 'current', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">I currently work here</span>
              </label>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Responsibilities & Achievements</label>
                <button
                  type="button"
                  onClick={() => addResponsibility(expIndex)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add Point
                </button>
              </div>
              {exp.responsibilities.map((resp, respIndex) => (
                <div key={respIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => updateResponsibility(expIndex, respIndex, e.target.value)}
                    placeholder="Describe your responsibility or achievement..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {exp.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResponsibility(expIndex, respIndex)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Education</h2>
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all transition-colors"
          >
            <Plus size={20} /> Add Education
          </button>
        </div>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School/University</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  placeholder="e.g., Bachelor of Science"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                <input
                  type="text"
                  placeholder="e.g., Computer Science"
                  value={edu.field}
                  onChange={(e) => updateEducation(index, 'field', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                <input
                  type="text"
                  placeholder="e.g., 2020"
                  value={edu.graduationYear}
                  onChange={(e) => updateEducation(index, 'graduationYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Projects (Optional)</h2>
          <button
            type="button"
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all transition-colors"
          >
            <Plus size={20} /> Add Project
          </button>
        </div>
        {formData.projects.map((project, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) =>
                    updateProject(
                      index,
                      'technologies',
                      e.target.value.split(',').map((t) => t.trim())
                    )
                  }
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                  placeholder="https://"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Certifications (Optional)</h2>
          <button
            type="button"
            onClick={addCertification}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all transition-colors"
          >
            <Plus size={20} /> Add Certification
          </button>
        </div>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="text"
                  value={cert.year}
                  onChange={(e) => updateCertification(index, 'year', e.target.value)}
                  placeholder="e.g., 2023"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Additional Information (Optional)</h2>
        <textarea
          value={formData.additionalInfo}
          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
          rows={4}
          placeholder="Languages, awards, volunteer work, publications, etc."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-center gap-4">
        {onBackToDashboard && (
          <button
            type="button"
            onClick={onBackToDashboard}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-lg"
          >
            Back to Dashboard
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving Resume...' : initialData?.id ? 'Update Resume' : 'Generate Professional Resume'}
        </button>
      </div>
    </form>
  </div>
  );
}
