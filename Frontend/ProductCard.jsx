import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { toast } from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product.id)
  }

  return (
    <Link 
      to={`/products/${product.id}`}
      className="product-card h-full"
    >
      <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden group-hover:bg-white p-4">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=No+Image'}
          alt={product.title}
          className="h-48 w-48 object-contain group-hover:scale-105 transition-transform duration-300 rounded-lg"
          loading="lazy"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-blue-600">
            ₹{product.price?.toFixed(2)}
          </div>
          
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium text-gray-700">4.5</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            product.stockQuantity > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 group-hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard