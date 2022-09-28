export default function setAuthFromLocalToken() {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    }
  }
  return {}
}
