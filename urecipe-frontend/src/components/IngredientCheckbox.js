import React from 'react';

function IngredientCheckbox({ ingredient, isChecked, onChange }) {
  return (
    <div>
      <input
        type="checkbox"
        id={ingredient}
        checked={isChecked}
        onChange={() => onChange(ingredient)}
      />
      <label htmlFor={ingredient}>{ingredient}</label>
    </div>
  );
}

export default IngredientCheckbox;
