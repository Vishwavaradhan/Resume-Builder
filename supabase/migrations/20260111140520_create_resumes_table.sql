/*
  # AI Resume Builder Schema

  1. New Tables
    - `resumes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `full_name` (text)
      - `target_job_title` (text)
      - `email` (text)
      - `phone` (text)
      - `linkedin` (text)
      - `professional_summary` (text)
      - `skills` (jsonb) - array of skills
      - `work_experience` (jsonb) - array of work experiences
      - `education` (jsonb) - array of education entries
      - `projects` (jsonb) - array of projects
      - `certifications` (jsonb) - array of certifications
      - `additional_info` (text)
      - `generated_resume` (text) - AI generated content
      - `generated_cover_letter` (text) - AI generated cover letter
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `resumes` table
    - Add policies for authenticated users to manage their own resumes
*/

CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  target_job_title text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  linkedin text DEFAULT '',
  professional_summary text DEFAULT '',
  skills jsonb DEFAULT '[]'::jsonb,
  work_experience jsonb DEFAULT '[]'::jsonb,
  education jsonb DEFAULT '[]'::jsonb,
  projects jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  additional_info text DEFAULT '',
  generated_resume text DEFAULT '',
  generated_cover_letter text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resumes"
  ON resumes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes"
  ON resumes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes"
  ON resumes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes"
  ON resumes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS resumes_user_id_idx ON resumes(user_id);
CREATE INDEX IF NOT EXISTS resumes_created_at_idx ON resumes(created_at DESC);