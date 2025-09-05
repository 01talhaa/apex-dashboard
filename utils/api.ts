import axios from 'axios'

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Your API base URL
  headers: {
    'Content-Type': 'application/json',
    'X-Company-Token': import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN,
    'X-Server-Api-Key': import.meta.env.VITE_API_BASE_URL_X_SERVER_API_KEY,
  },
})

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
