import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Items API
export const itemsApi = {
  getAll: () => api.get('/items'),
  getById: (id: string) => api.get(`/items/${id}`),
  create: (data: { name: string; description: string }) => api.post('/items', data),
  update: (id: string, data: { name: string; description: string }) => api.put(`/items/${id}`, data),
  delete: (id: string) => api.delete(`/items/${id}`),
}; 