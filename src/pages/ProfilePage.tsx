import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, ArrowLeft, Edit2, Save, X } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';

export function ProfilePage() {
  const { user, isAuthenticated } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user profile logic here
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Lütfen giriş yapın
          </h2>
          <Link
            to="/login"
            className="text-orange-600 hover:text-orange-700"
          >
            Giriş yap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Ana sayfaya dön
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Profilim</h1>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                   bg-orange-600 text-white hover:bg-orange-700
                   transition-colors duration-200"
        >
          {isEditing ? (
            <>
              <X className="w-5 h-5" />
              İptal
            </>
          ) : (
            <>
              <Edit2 className="w-5 h-5" />
              Düzenle
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profil Fotoğrafı URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3
                         bg-orange-600 text-white rounded-lg
                         hover:bg-orange-700 transition-colors duration-200"
              >
                <Save className="w-5 h-5" />
                Kaydet
              </button>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-orange-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {user?.name}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-900 mb-4">
                    Favori Tariflerim
                  </h3>
                  <Link
                    to="/favorites"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Favorilere git →
                  </Link>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-900 mb-4">
                    Siparişlerim
                  </h3>
                  <Link
                    to="/orders"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Siparişlere git →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}