import axios from 'axios'

// Create axios instance with default config
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  // Prevent undici issues in browser
  adapter: typeof window !== 'undefined' ? undefined : undefined
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle refresh token flow
    if (error.response?.status === 401) {
      // Clear invalid tokens
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

// Type-safe request methods
export const apiClient = {
  get: <T>(url: string, config = {}) => 
    api.get<T>(url, config).then(res => res.data),
    
  post: <T>(url: string, data = {}, config = {}) => 
    api.post<T>(url, data, config).then(res => res.data),
    
  put: <T>(url: string, data = {}, config = {}) => 
    api.put<T>(url, data, config).then(res => res.data),
    
  delete: <T>(url: string, config = {}) => 
    api.delete<T>(url, config).then(res => res.data)
}

export default apiClient