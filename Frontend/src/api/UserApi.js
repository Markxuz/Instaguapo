
export async function signupUser({ fullname, email, password, phonenumber }) {
  const response = await fetch("http://localhost:5000/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, email, password, phonenumber }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed. Please try again.");
  }

  return data;
}


export async function loginUser({ email, password }) {
  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed. Please try again.");
  }

  return data;
}


export async function forgotPassword(email) {
  const response = await fetch("http://localhost:5000/api/users/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error sending reset link");
  }

  return data;
}

export async function verifyEmail({ email, code }) {
  const response = await fetch("http://localhost:5000/api/users/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Verification failed. Try again.");
  }

  return data;
}
export async function deleteAccount() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/users/delete", {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete account");
  }

  return data;
}
