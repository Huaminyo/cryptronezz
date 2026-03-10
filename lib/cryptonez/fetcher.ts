import { headers } from "next/headers";

export async function getInternalBaseUrl() {
  const headerStore = await headers();
  const host = headerStore.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  if (host) return `${protocol}://${host}`;
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;

  return "http://localhost:3000";
}

export async function fetchJsonSafe<T>(url: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}
