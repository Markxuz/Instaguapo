const API_URL = "http://localhost:5000/api/favorites";

// Get all favorites of the logged-in user
export const getFavorites = async (token) => {
  if (!token) return [];

  try {
    const res = await fetch(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return [];
  }
};

// Add a favorite
export const addFavorite = async (wearID, token) => {
  if (!token || !wearID) return;

  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ wearID }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error adding favorite:", err);
  }
};

// Remove a favorite
export const removeFavorite = async (wearID, token) => {
  if (!token || !wearID) return;

  try {
    const res = await fetch(`${API_URL}/${wearID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Error removing favorite:", err);
  }
};
