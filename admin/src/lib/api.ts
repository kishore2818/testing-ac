const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'https://adler-contracts-backend.onrender.com'}/api`;

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


