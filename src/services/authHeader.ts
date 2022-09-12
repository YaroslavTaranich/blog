export default function authHeader() {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    }
  }
  return {}
}
