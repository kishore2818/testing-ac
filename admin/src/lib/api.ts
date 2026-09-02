const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'https://adler-contracts-backend.onrender.com'}/api`;

// ── Auth helpers ──────────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginAdmin(password: string): Promise<{ token: string }> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Invalid password');
  }
  return res.json();
}

export async function verifyToken(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to change password');
  }
}

export function logoutAdmin() {
  localStorage.removeItem('adminToken');
  // Also clear the cookie the middleware reads
  document.cookie = 'adminToken=; Max-Age=0; path=/';
}

// ── Project routes ────────────────────────────────────────────────────────────

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function createProject(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export async function updateProject(id: string, formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}

export async function deleteProject(id: string) {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
}

// ── Review routes ─────────────────────────────────────────────────────────────

export async function fetchReviews() {
  const res = await fetch(`${API_BASE_URL}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function createReview(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to create review');
  return res.json();
}

export async function updateReview(id: string, formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update review');
  return res.json();
}

export async function deleteReview(id: string) {
  const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete review');
  return res.json();
}
