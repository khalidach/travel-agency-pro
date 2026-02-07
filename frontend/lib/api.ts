const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchClient(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // 🔒 Critical: Ensures HttpOnly cookies are sent/received
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API Request Failed");
  }

  return res.json();
}
