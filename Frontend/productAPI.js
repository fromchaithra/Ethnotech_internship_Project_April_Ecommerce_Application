import api from './api'

export const productAPI = {
  getAll: () => api.get('/products'),
  search: (query) => api.get(`/products/search?q=${encodeURIComponent(query)}`),
  getById: (id) => api.get(`/products/${id}`),
}