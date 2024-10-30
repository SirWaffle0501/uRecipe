// components/CommentForm.js
import React, { useState } from 'react';

function CommentForm({ onCommentSubmit }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;