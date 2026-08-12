const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

export type ApiErrorBody = {
  success?: boolean;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
};

export async function apiPost<T>(
  path: string,
  body: Record<string, unknown>
): Promise<{ ok: true; data: T } | { ok: false; message: string; errors?: ApiErrorBody["errors"] }> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = (await res.json().catch(() => ({}))) as ApiErrorBody & { data?: T };

    if (!res.ok) {
      const fromFields = json.errors?.map((e) => e.message).join(", ");
      return {
        ok: false,
        message: fromFields || json.message || "Request failed",
        errors: json.errors,
      };
    }

    return { ok: true, data: json.data as T };
  } catch {
    return {
      ok: false,
      message: "Unable to reach the server. Please ensure the backend is running on port 5000.",
    };
  }
}

export { API_BASE_URL };
