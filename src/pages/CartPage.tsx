import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { QuantitySelector } from '../components/RecipeDetail/ShoppingList/QuantitySelector';

export function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalAmount,
    isAuthenticated
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Sepetiniz boş
          </h2>
          <p className="text-gray-600 mb-6">
            Tariflerdeki malzemeleri sepetinize ekleyerek alışverişe başlayabilirsiniz
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white 
                     rounded-md hover:bg-orange-700 transition-colors duration-200"
          >
            Tariflere göz at
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/"
        className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Alışverişe devam et
      </Link>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-semibold">Alışveriş Sepeti</h1>
        </div>

        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item.id} className="p-6 flex items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <div className="mt-1 flex items-center gap-4">
                  <QuantitySelector
                    quantity={item.quantity}
                    maxQuantity={10}
                    onChange={(quantity) => updateQuantity(item.id, quantity)}
                    store={item.store}
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="ml-6">
                <div className="text-lg font-medium">
                  ₺{(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  ₺{item.price.toFixed(2)} / adet
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Toplam</div>
              <div className="text-2xl font-bold">₺{totalAmount.toFixed(2)}</div>
            </div>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg
                       hover:bg-orange-700 transition-colors duration-200"
            >
              {isAuthenticated ? 'Ödemeye Geç' : 'Giriş Yap ve Devam Et'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}