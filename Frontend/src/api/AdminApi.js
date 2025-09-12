export async function signupAdmin({ Fullname, Email, Password, PhoneNumber, RoleID }) {
  const response = await fetch("http://localhost:5000/api/admins/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Fullname, Email, PhoneNumber, Password, RoleID }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed. Please try again.");
  }

  return data;
}

export async function verifyAdmin({ Email, VerificationCode }) {
  const response = await fetch("http://localhost:5000/api/admins/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: Email, VerificationCode }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Verification failed. Please try again.");
  }

  return data;
}

export async function loginAdmin ({ Email, Password }) {
  const response = await fetch("http://localhost:5000/api/admins/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email, Password }),
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed. Please try again.");
  }
  return data;
}
