import { pool } from "@/lib/db";

export async function initCareerDatabase(): Promise<void> {
  let client;
  try {
    client = await pool.connect();

    // 1. Create career_jobs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS career_jobs (
        id VARCHAR(100) PRIMARY KEY,
        title TEXT NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        department VARCHAR(100) NOT NULL,
        location VARCHAR(150) NOT NULL,
        employment_type VARCHAR(100) NOT NULL,
        experience_level VARCHAR(100) NOT NULL,
        salary_range VARCHAR(100),
        description TEXT NOT NULL,
        about_role TEXT,
        responsibilities TEXT,
        qualifications TEXT,
        nice_to_have TEXT,
        benefits TEXT,
        status VARCHAR(50) DEFAULT 'Published',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 2. Create career_applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS career_applications (
        id VARCHAR(100) PRIMARY KEY,
        job_id VARCHAR(100) NOT NULL,
        job_title TEXT NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        location VARCHAR(150),
        current_title VARCHAR(150),
        current_company VARCHAR(150),
        experience_years VARCHAR(50) NOT NULL,
        linkedin_url TEXT,
        portfolio_url TEXT,
        resume_file_name TEXT,
        resume_file_size VARCHAR(50),
        resume_file_type VARCHAR(50),
        is_resume_built_live BOOLEAN DEFAULT false,
        cover_letter TEXT,
        consent_given BOOLEAN DEFAULT true,
        status VARCHAR(50) DEFAULT 'New',
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log("[Career DB] Tables created/verified successfully.");
  } catch (err) {
    console.error("[Career DB Init Warning]:", err);
  } finally {
    if (client) client.release();
  }
}
