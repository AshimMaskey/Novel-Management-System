import React from "react";
import { Star } from "lucide-react";

interface Review {
  id: string;
  username: string;
  profileImage?: string;
  review: string;
  rating: number;
  reviewNum: number;
  date?: string;
}

const NovelReview: React.FC = () => {
  // Mock data for demonstration
  const reviews: Review[] = [
    {
      id: "1",
      username: "Sarah Johnson",
      review:
        "Absolutely loved this product! The quality exceeded my expectations and the customer service was outstanding. Would definitely recommend to anyone looking for a reliable solution.",
      rating: 5,
      reviewNum: 1,
      date: "2 days ago",
    },
    {
      id: "2",
      username: "Mike Chen",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      review:
        "Good value for money. The product works as advertised, though there are a few minor issues with the user interface. Overall satisfied with the purchase.",
      rating: 4,
      reviewNum: 2,
      date: "1 week ago",
    },
    {
      id: "3",
      username: "Emily Rodriguez",
      review:
        "Not what I expected. The product description was misleading and it took longer than promised to arrive. Customer support was helpful in resolving issues though.",
      rating: 2,
      reviewNum: 3,
      date: "2 weeks ago",
    },
    {
      id: "4",
      username: "David Kumar",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      review:
        "Excellent build quality and fast shipping. The features work exactly as described and the price point is very competitive. Highly recommend!",
      rating: 5,
      reviewNum: 4,
      date: "3 weeks ago",
    },
    {
      id: "5",
      username: "Lisa Thompson",
      review:
        "Decent product overall. Does the job but nothing exceptional. Installation was straightforward and it has been working reliably for the past month.",
      rating: 3,
      reviewNum: 5,
      date: "1 month ago",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Customer Reviews
        </h2>
        <p className="text-gray-600">See what our customers are saying</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                {review.profileImage ? (
                  <img
                    src={review.profileImage}
                    alt={`${review.username}'s profile`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {getInitials(review.username)}
                    </span>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {review.username}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({review.rating}/5)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="hidden sm:inline">
                      Review #{review.reviewNum}
                    </span>
                    <span className="sm:hidden">#{review.reviewNum}</span>
                    {review.date && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>{review.date}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="ml-0 sm:ml-15">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {review.review}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="hover:text-blue-600 transition-colors flex items-center gap-1">
                    <span>Helpful</span>
                  </button>
                  <button className="hover:text-blue-600 transition-colors">
                    Reply
                  </button>
                </div>

                <div className="text-xs text-gray-400">
                  Review #{review.reviewNum}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default NovelReview;
