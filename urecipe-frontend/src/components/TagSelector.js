// components/TagSelector.js
import React from 'react';

function TagSelector({ availableTags, selectedTags, onTagSelect }) {
  const handleTagChange = (e) => {
    const value = e.target.value;
    if (availableTags.includes(value) && !selectedTags.includes(value)) {
      onTagSelect(value);
    }
  };

  return (
    <div className="tag-selector">
      <input type="text" placeholder="Enter tag..." onChange={handleTagChange} list="tags-list" />
      <datalist id="tags-list">
        {availableTags.map((tag, index) => (
          <option key={index} value={tag} />
        ))}
      </datalist>
    </div>
  );
}

export default TagSelector;