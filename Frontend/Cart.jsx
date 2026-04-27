import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Trash2, Minus, Plus, CreditCard } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalAmount, clearCart } = useCart()
  const navigate = useNavigate()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const totalAmount = getTotalAmount()

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center py-20">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-8">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h3>
          <p className="text-lg text-gray-600 mb-8">
            You haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-xl text-gray-600 mt-2">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-6">
                <img
                  src={item.productImage || 'https://via.placeholder.com/120x120'}
                  alt={item.productTitle}
                  className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.productTitle}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    ₹{item.productPrice?.toFixed(2)}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-xl">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      
                      <span className="font-bold text-lg min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors hover:scale-110"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-2">
                    Total: ₹{(item.totalPrice || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>Total Items:</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-900 pt-2 border-t">
                <span>Total Amount:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 block"
            >
              <CreditCard className="h-6 w-6" />
              <span>Proceed to Checkout</span>
            </Link>
            
            <button
              onClick={clearCart}
              className="w-full mt-4 p-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart