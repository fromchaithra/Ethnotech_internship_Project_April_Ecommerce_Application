import React, { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '../services/cartAPI'
import { useAuth } from './AuthContext'
import { toast } from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  const fetchCart = async () => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      const response = await cartAPI.getCart()
      setCartItems(response.data)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await cartAPI.addToCart(productId, quantity)
      setCartItems(prev => [...prev, response.data])
      toast.success('Added to cart!')
    } catch (error) {
      toast.error('Failed to add to cart')
    }
  }

  const removeFromCart = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId)
      setCartItems(prev => prev.filter(item => item.productId !== productId))
      toast.success('Removed from cart!')
    } catch (error) {
      toast.error('Failed to remove from cart')
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      // Implementation for update quantity
      await cartAPI.updateQuantity(productId, quantity)
      setCartItems(prev => 
        prev.map(item => 
          item.productId === productId ? { ...item, quantity } : item
        )
      )
    } catch (error) {
      toast.error('Failed to update quantity')
    }
  }

  const clearCart = async () => {
    try {
      await cartAPI.clearCart()
      setCartItems([])
      toast.success('Cart cleared!')
    } catch (error) {
      toast.error('Failed to clear cart')
    }
  }

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    }
  }, [isAuthenticated])

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalAmount,
    loading,
    totalItems: cartItems.length
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}