
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Authentication required. Please sign in.");
  }

  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${data.token}`);

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}
