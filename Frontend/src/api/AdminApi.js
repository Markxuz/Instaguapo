export async function signupAdmin({ Fullname, Email, Password, PhoneNumber, RoleID }) {
  const response = await fetch("http://localhost:5000/api/admins/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Fullname, Email, PhoneNumber, Password, RoleID }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Signup failed.");

  if (data.token) localStorage.setItem("adminToken", data.token);
  return data;
}

export async function verifyAdmin({ Email, VerificationCode }) {
  const response = await fetch("http://localhost:5000/api/admins/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email, VerificationCode }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Verification failed.");
  return data;
}

export async function loginAdmin({ Email, Password }) {
  const response = await fetch("http://localhost:5000/api/admins/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email, Password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed.");

  if (data.token) localStorage.setItem("adminToken", data.token);
  if (data.admin) localStorage.setItem("adminData", JSON.stringify(data.admin));

  return data;
}

export async function getAdminProfile() {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No token found. Please login.");

  const response = await fetch("http://localhost:5000/api/admins/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch profile.");
  return data;
}

export async function updateAdminProfile(profile) {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No token found. Please login.");

  const formData = new FormData();
  formData.append("Fullname", profile.Fullname);
  formData.append("Email", profile.Email);
  formData.append("PhoneNumber", profile.PhoneNumber);
  if (profile.ProfilePhotoFile) formData.append("ProfilePhoto", profile.ProfilePhotoFile);

  const response = await fetch("http://localhost:5000/api/admins/profile", {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update profile.");
  return data;
}

export async function deleteAdminAccount() {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No token found. Please login.");

  const response = await fetch("http://localhost:5000/api/admins/delete", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete account.");
  return data;
}


