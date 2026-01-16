export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  graduationYear: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeData {
  id?: string;
  fullName: string;
  targetJobTitle: string;
  email: string;
  phone: string;
  linkedin: string;
  professionalSummary: string;
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  additionalInfo: string;
  generatedResume?: string;
  generatedCoverLetter?: string;
}
