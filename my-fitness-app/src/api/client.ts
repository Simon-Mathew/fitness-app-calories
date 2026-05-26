const BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`);
  }

  return body as T;
}

const client = {
  get:    <T>(path: string)                    => request<T>(path),
  post:   <T>(path: string, data: unknown)     => request<T>(path, { method: 'POST',   body: JSON.stringify(data) }),
  put:    <T>(path: string, data: unknown)     => request<T>(path, { method: 'PUT',    body: JSON.stringify(data) }),
  patch:  <T>(path: string, data: unknown)     => request<T>(path, { method: 'PATCH',  body: JSON.stringify(data) }),
  delete: <T>(path: string)                    => request<T>(path, { method: 'DELETE' }),
};

export default client;
