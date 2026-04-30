const API_BASE_URL = 'http://localhost:5001/api';

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

export async function adminLogin(identifier: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/admin/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || 'Failed to sign in');
  return data;
}

export async function fetchAdminProfile() {
  const res = await fetch('/api/admin/profile', { cache: 'no-store' });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || 'Failed to fetch admin profile');
  return data;
}

export async function updateAdminProfile(payload: {
  username: string
  email: string
  currentPassword: string
  newPassword?: string
}) {
  const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || 'Failed to update admin profile');
  return data;
}
