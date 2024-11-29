import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipping' | 'delivered';
  items: Record<string, OrderItem[]>;
  totalAmount: number;
  address: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Simulate fetching orders from API
    const mockOrders: Order[] = [
      {
        id: '1',
        date: '2024-03-15',
        status: 'delivered',
        items: {
          'Getir': [
            {
              id: 'g1',
              name: 'Kırmızı Mercimek',
              price: 29.90,
              quantity: 2,
              imageUrl: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=200'
            }
          ],
          'Yemeksepeti': [
            {
              id: 'y2',
              name: 'Soğan',
              price: 11.90,
              quantity: 1,
              imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=200'
            }
          ]
        },
        totalAmount: 71.70,
        address: 'Örnek Mahallesi, İstanbul'
      },
      {
        id: '2',
        date: '2024-03-14',
        status: 'processing',
        items: {
          'Migros': [
            {
              id: 'm5',
              name: 'Zeytinyağı',
              price: 179.90,
              quantity: 1,
              imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200'
            }
          ]
        },
        totalAmount: 179.90,
        address: 'Yeni Mahalle, Ankara'
      }
    ];

    setOrders(mockOrders);
  }, [isAuthenticated]);

  return { orders };
}