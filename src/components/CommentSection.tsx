import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface Comment {
  id: string;
  user: string;
  rating: number;
  content: string;
  date: string;
}

interface CommentSectionProps {
  recipeId: string;
}

export function CommentSection({ recipeId }: CommentSectionProps) {
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Ayşe Y.',
      rating: 5,
      content: 'Harika bir tarif! Ailem çok beğendi.',
      date: '2024-03-15'
    },
    {
      id: '2',
      user: 'Mehmet K.',
      rating: 4,
      content: 'Lezzetli ama biraz daha az tuz kullanılabilir.',
      date: '2024-03-14'
    }
  ]);

  return (
    <section className="mt-12 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Yorumlar</h2>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{comment.user}</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < comment.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{comment.content}</p>
            <span className="text-sm text-gray-500 mt-2 block">
              {new Date(comment.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      <form className="mt-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Puanınız
          </label>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                type="button"
                className="text-gray-300 hover:text-yellow-400"
              >
                <Star className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Yorumunuz
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="Bu tarif hakkında ne düşünüyorsunuz?"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Yorum Yap
        </button>
      </form>
    </section>
  );
}