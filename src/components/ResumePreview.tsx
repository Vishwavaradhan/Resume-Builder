import { useState, useEffect } from 'react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  template?:
    | 'professional'
    | 'modern'
    | 'creative'
    | 'minimal'
    | 'elegant'
    | 'warm'
    | 'tech';
}

export default function ResumePreview({
  data,
  template = 'professional',
}: ResumePreviewProps) {
  /* ================================
     🔍 UI STATE (NOT PRINTED)
  ================================= */
  const [zoom, setZoom] = useState(1);
  const [localTemplate, setLocalTemplate] = useState(template);

  useEffect(() => {
    setLocalTemplate(template);
  }, [template]);

  /* ================================
     🎨 TEMPLATE OPTIONS (UI ONLY)
  ================================= */
  const templateOptions = [
    { key: 'professional', label: 'Professional' },
    { key: 'modern', label: 'Modern' },
    { key: 'creative', label: 'Creative' },
    { key: 'minimal', label: 'Minimal' },
    { key: 'elegant', label: 'Elegant' },
    { key: 'warm', label: 'Warm' },
    { key: 'tech', label: 'Tech' },
  ] as const;

  /* ================================
     🎨 TEMPLATE STYLES (PDF SAFE)
  ================================= */
  const templates = {
    professional: 'bg-white text-gray-800',
    modern: 'bg-white text-gray-800',
    creative: 'bg-white text-gray-800',
    minimal: 'bg-white text-gray-800',
    elegant: 'bg-white text-gray-800',
    warm: 'bg-white text-gray-800',
    tech: 'bg-slate-900 text-slate-100',
  };

  const headerColors = {
    professional: 'bg-gray-800 text-white',
    modern: 'bg-blue-600 text-white',
    creative: 'bg-teal-600 text-white',
    minimal: 'bg-stone-700 text-white',
    elegant: 'bg-purple-700 text-white',
    warm: 'bg-orange-600 text-white',
    tech: 'bg-slate-800 text-cyan-300',
  };

  const hrColors = {
    professional: 'border-gray-400',
    modern: 'border-blue-500',
    creative: 'border-teal-500',
    minimal: 'border-stone-500',
    elegant: 'border-purple-500',
    warm: 'border-orange-500',
    tech: 'border-cyan-400',
  };

  /* ================================
     🧾 RENDER
  ================================= */
  return (
    <div className="relative max-w-6xl mx-auto px-4 pb-24 print:px-0">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 print:bg-transparent print:shadow-none print:p-0">

        {/* ========= TEMPLATE SWITCHER (UI ONLY) ========= */}
        <div className="print:hidden sticky top-6 z-30 mb-4">
          <div className="flex flex-wrap gap-2 bg-white/90 backdrop-blur-xl rounded-xl shadow px-4 py-3">
            {templateOptions.map((t) => (
              <button
                key={t.key}
                onClick={() => setLocalTemplate(t.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition
                  ${
                    localTemplate === t.key
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========= ZOOM CONTROLS (UI ONLY) ========= */}
        <div className="print:hidden sticky top-24 z-20 mb-4 flex justify-end">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur rounded-xl shadow px-3 py-2">
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
              className="px-2 py-1 rounded hover:bg-gray-100"
            >
              −
            </button>

            <span className="text-sm font-medium w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
              className="px-2 py-1 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* ========= SCALE WRAPPER (UI ONLY) ========= */}
        <div
          className="origin-top transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* ========= 🚨 DO NOT TOUCH THIS DIV ========= */}
          <div
            id="resume-preview"
            className={`${templates[localTemplate]} mx-auto p-8 print:p-6`}
            style={{
              width: '794px',
              minHeight: '1123px',
            }}
          >
            {/* ================= HEADER ================= */}
            <div
              className={`${headerColors[localTemplate]} mb-8`}
              style={{ padding: '24px' }}
            >
              <h1 className="text-3xl font-bold mb-1">
                {data.fullName || 'Your Name'}
              </h1>

              <p className="text-xl mb-3">
                {data.targetJobTitle || 'Target Job Title'}
              </p>

              <div className="text-sm space-y-1">
                {data.email && <div>{data.email}</div>}
                {data.phone && <div>{data.phone}</div>}
                {data.linkedin && <div>{data.linkedin}</div>}
              </div>
            </div>

            {/* ================= SUMMARY ================= */}
            {data.professionalSummary && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Professional Summary
                </h2>
                <hr className={`mb-3 ${hrColors[localTemplate]}`} />
                <p className="leading-relaxed">
                  {data.professionalSummary}
                </p>
              </section>
            )}

            {/* ================= SKILLS ================= */}
            {data.skills.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <hr className={`mb-3 ${hrColors[localTemplate]}`} />
                <div>
                  {data.skills.map((skill, i) => (
                    <span key={i} className="inline-block mr-4 mb-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* ================= WORK EXPERIENCE ================= */}
            {data.workExperience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Work Experience
                </h2>
                <hr className={`mb-3 ${hrColors[localTemplate]}`} />

                {data.workExperience.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-sm opacity-80">{exp.company}</p>
                    <p className="text-sm opacity-70 mb-2">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </p>

                    <ul className="list-disc ml-5 space-y-1">
                      {exp.responsibilities.map(
                        (r, idx) => r && <li key={idx}>{r}</li>
                      )}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* ================= EDUCATION ================= */}
            {data.education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Education
                </h2>
                <hr className={`mb-3 ${hrColors[localTemplate]}`} />

                {data.education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm opacity-80">{edu.school}</p>
                    {edu.field && (
                      <p className="text-sm opacity-70">{edu.field}</p>
                    )}
                    {edu.graduationYear && (
                      <p className="text-sm opacity-70">
                        Graduation Year: {edu.graduationYear}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* ================= PROJECTS ================= */}
            {data.projects.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Projects</h2>
                <hr className={`mb-3 ${hrColors[localTemplate]}`} />

                {data.projects.map((project, i) => (
                  <div key={i} className="mb-3">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm">{project.description}</p>
                  </div>
                ))}
              </section>
            )}

            {/* ================= CERTIFICATIONS ================= */}
            {data.certifications.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Certifications
                </h2>
                <hr className={`mb-3 ${hrColors[localTemplate]}`} />

                {data.certifications.map((cert, i) => (
                  <p key={i}>
                    {cert.name} — {cert.issuer}
                  </p>
                ))}
              </section>
            )}

            {/* ================= ADDITIONAL INFO ================= */}
            {data.additionalInfo && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Additional Information
                </h2>
                <hr className={`mb-3 ${hrColors[localTemplate]}`} />
                <p className="whitespace-pre-line">
                  {data.additionalInfo}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
