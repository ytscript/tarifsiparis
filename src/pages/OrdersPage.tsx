import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock, Store, MapPin } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';

export function OrdersPage() {
  const { orders } = useOrders();

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
          <h1 className="text-3xl font-bold text-gray-900">Siparişlerim</h1>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Henüz siparişiniz bulunmuyor
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
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {order.address}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium
                    ${order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'processing'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status === 'delivered'
                      ? 'Teslim Edildi'
                      : order.status === 'processing'
                      ? 'Hazırlanıyor'
                      : 'Yolda'}
                  </div>
                </div>

                {Object.entries(order.items).map(([store, items]) => (
                  <div key={store} className="mb-6 last:mb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Store className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{store}</span>
                    </div>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600">
                                {item.quantity} adet
                              </p>
                            </div>
                          </div>
                          <div className="text-lg font-medium">
                            ₺{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="border-t mt-6 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Toplam Tutar</span>
                    <span className="text-xl font-bold">
                      ₺{order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}