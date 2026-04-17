const BASE_URL = 'http://localhost:3000/api'

export async function api(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.error || errorData?.message || `서버 오류: ${response.status}`)
  }

  return response.json()
}
