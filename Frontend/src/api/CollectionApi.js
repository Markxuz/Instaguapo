// nasa pangalan na get all collection items
export async function getCollectionItems() {
  const response = await fetch("http://localhost:5000/api/admin/items", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch collection items.");
  }

  return data;
}
