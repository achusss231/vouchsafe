import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (data: {
    name: string;
    email: string;
    password: string;
    role: 'EMPLOYEE' | 'EMPLOYER';
    designation?: string;
  }) => api.post('/auth/register', data),
};

// Employee endpoints
export const employeeAPI = {
  getDashboard: () => api.get('/employees/dashboard'),

  search: (designation?: string) =>
    api.get('/employees/search', { params: { designation } }),

  getProfile: (id: string) => api.get(`/employees/profile/${id}`),

  deactivate: () => api.post('/employees/deactivate'),

  reactivate: () => api.post('/employees/reactivate'),
};

// Employer endpoints
export const employerAPI = {
  getDashboard: () => api.get('/employers/dashboard'),
};

// Job endpoints
export const jobAPI = {
  sendRequest: (employeeId: string, details?: string) =>
    api.post('/jobs/request', { employeeId, details }),
};

// Vouch endpoints
export const vouchAPI = {
  create: (data: { employeeId: string; rating: number; comment?: string }) =>
    api.post('/vouches', data),
};

export default api;
