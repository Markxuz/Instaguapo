// src/api/adminSettingsApi.js
const API_URL = "http://localhost:5000/api/admin/settings";

/**
 * Get current hero image (returns { heroImage: 'filename.jpg' } or { heroImage: null })
 * token is optional for GET but included if required by your backend verifyToken
 */
export async function getHeroImage() {
    try {
        const res = await fetch(`${API_URL}/hero-image`);
        if (!res.ok)  return{ heroImage: null };
        return res.json();
    }catch (error) {
        return { heroImage: null};
    }
}
/**
 * Update / upload hero image
 * file = File object
 * returns JSON from backend, expected { heroImage: 'filename.jpg', message: '...' }
 */
export async function updateHeroImage(token, file) {
  const formData = new FormData();
  formData.append("HeroImage", file);

  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/hero-image`, {
    method: "PUT",
    headers,
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update hero image");
  return data;
}
