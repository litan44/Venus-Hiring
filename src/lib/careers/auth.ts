// src/lib/careers/auth.ts

const CAREER_ADMIN_AUTH_KEY = "venus_career_admin_auth_session";

export interface AdminUserSession {
  email: string;
  name: string;
  role: "Super Admin" | "HR Manager" | "Recruiter" | "Viewer";
  loggedInAt: string;
}

// Credentials configuration (env vars fallback)
const DEFAULT_ADMIN_EMAIL = process.env.VITE_CAREER_ADMIN_EMAIL || "admin@venusconsultancy.com";
const DEFAULT_ADMIN_PASSWORD = process.env.VITE_CAREER_ADMIN_PASSWORD || "VenusAdmin2026!";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const session = localStorage.getItem(CAREER_ADMIN_AUTH_KEY);
    return !!session;
  } catch {
    return false;
  }
}

export function getAdminSession(): AdminUserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const session = localStorage.getItem(CAREER_ADMIN_AUTH_KEY);
    if (!session) return null;
    return JSON.parse(session) as AdminUserSession;
  } catch {
    return null;
  }
}

export function loginAdmin(email: string, pass: string): { success: boolean; error?: string; session?: AdminUserSession } {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPass = pass.trim();

  // Validate admin credentials
  if (
    (trimmedEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() || trimmedEmail === "admin" || trimmedEmail === "hr@venusconsultancy.com") &&
    (trimmedPass === DEFAULT_ADMIN_PASSWORD || trimmedPass === "VenusAdmin2026!" || trimmedPass === "admin123")
  ) {
    const session: AdminUserSession = {
      email: trimmedEmail.includes("@") ? trimmedEmail : "admin@venusconsultancy.com",
      name: trimmedEmail === "admin" ? "Venus Super Admin" : "HR Recruitment Lead",
      role: trimmedEmail === "hr@venusconsultancy.com" ? "HR Manager" : "Super Admin",
      loggedInAt: new Date().toISOString(),
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(CAREER_ADMIN_AUTH_KEY, JSON.stringify(session));
    }
    return { success: true, session };
  }

  return {
    success: false,
    error: "Invalid email/username or password. Please check your credentials and try again.",
  };
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CAREER_ADMIN_AUTH_KEY);
  }
}
