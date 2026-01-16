import { ResumeData } from '../types/resume';
import { Target, TrendingUp } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export default function CareerRecommendationBar({ data }: Props) {
  // 🧠 Rule-based logic
  const skills = data.skills.map((s) => s.toLowerCase());

  let recommendation = {
    role: 'Software Engineer',
    score: 70,
    reason: 'General software engineering skills detected.',
  };

  if (
    skills.includes('python') ||
    skills.includes('machine learning') ||
    skills.includes('data science')
  ) {
    recommendation = {
      role: 'Data Scientist',
      score: 90,
      reason:
        'Strong alignment with data analysis, machine learning, and Python skills.',
    };
  } else if (
    skills.includes('react') ||
    skills.includes('javascript')
  ) {
    recommendation = {
      role: 'Frontend Developer',
      score: 85,
      reason:
        'Excellent fit for frontend frameworks and UI development.',
    };
  } else if (
    skills.includes('node') ||
    skills.includes('backend') ||
    skills.includes('api')
  ) {
    recommendation = {
      role: 'Backend Developer',
      score: 80,
      reason:
        'Backend systems and API experience detected.',
    };
  }

  const confidence =
    recommendation.score >= 85
      ? 'High Confidence'
      : recommendation.score >= 75
      ? 'Medium Confidence'
      : 'Exploratory';

  return (
    <div className="print:hidden mb-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-[1px] shadow-xl">
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-6 text-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/20">
                <Target size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-wide">
                  Career Recommendation
                </h2>
                <p className="text-sm opacity-90">
                  Based on your skills profile
                </p>
              </div>
            </div>

            <span className="px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium">
              {confidence}
            </span>
          </div>

          {/* Role */}
          <div className="mb-4">
            <p className="text-2xl font-semibold">
              {recommendation.role}
            </p>
            <p className="text-sm opacity-90 mt-1">
              {recommendation.reason}
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm opacity-90">
              <span className="flex items-center gap-1">
                <TrendingUp size={14} />
                Match Strength
              </span>
              <span>{recommendation.score}%</span>
            </div>

            <div className="h-3 w-full rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-lime-300 transition-all duration-700 ease-out"
                style={{ width: `${recommendation.score}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
