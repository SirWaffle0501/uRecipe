// components/RatingStars.js
import React, { useState } from 'react';

function RatingStars({ onRate }) {
  const [rating, setRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
    onRate(newRating);
  };

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'filled' : ''}
          onClick={() => handleRating(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default RatingStars;