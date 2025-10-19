export async function getFormalWear() {
  const response = await fetch("http://localhost:5000/api/formalwear", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch formal wear.");
  }

  return data;
}

export async function addFormalWear(formalWear) {
  const formData = new FormData();
  for (const key in formalWear) {
    formData.append(key, formalWear[key]);
  }

  const response = await fetch("http://localhost:5000/api/formalwear", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add formal wear.");
  }

  return data;
}

export async function updateFormalWear({ id, updates }) {
  const formData = new FormData();
  for (const key in updates) {
    formData.append(key, updates[key]);
  }

  const response = await fetch(`http://localhost:5000/api/formalwear/${id}`, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update formal wear.");
  }

  return data;
}

export async function deleteFormalWear(id) {
  const response = await fetch(`http://localhost:5000/api/formalwear/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete formal wear.");
  }

  return data;
}
