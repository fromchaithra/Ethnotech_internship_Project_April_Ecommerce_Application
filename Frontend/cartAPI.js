import api from './api'

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post(`/cart/add/${productId}`, null, {
    params: { quantity }
  }),
  removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
  clearCart: () => api.delete('/cart/clear'),
  updateQuantity: (productId, quantity) => api.put(`/cart/update/${productId}`, { quantity }),
}