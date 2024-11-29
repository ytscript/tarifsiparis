import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Heart, ShoppingCart, User } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { useCartContext } from '../contexts/CartContext';

export function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthContext();
  const { totalItems: cartItems } = useCartContext();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-orange-600">
              <ChefHat className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold">Lezzet</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/favorites"
              className={`inline-flex items-center px-4 py-2 rounded-md
                       transition-all duration-200 gap-2
                       ${location.pathname === '/favorites'
                         ? 'bg-red-50 text-red-600'
                         : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                       }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  location.pathname === '/favorites' ? 'fill-current' : ''
                }`}
              />
            </Link>

            <Link
              to="/cart"
              className="inline-flex items-center px-4 py-2 rounded-md
                       transition-all duration-200 gap-2 relative
                       text-gray-600 hover:bg-orange-50 hover:text-orange-600"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white
                               rounded-full text-xs flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="inline-flex items-center px-4 py-2 rounded-md
                                transition-all duration-200 gap-2
                                text-gray-600 hover:bg-gray-50">
                  <User className="w-5 h-5" />
                  <span>{user?.name}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-200 transform origin-top-right">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profilim
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Siparişlerim
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-orange-600 hover:text-orange-700
                           transition-colors duration-200"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md
                           hover:bg-orange-700 transition-colors duration-200"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}