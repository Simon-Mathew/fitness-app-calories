import { useState } from 'react';
import type { ApiFoodEntry } from '../../types/api';
import './FoodItemRow.css';

interface FoodItemRowProps {
  entry:    ApiFoodEntry;
  onDelete: (id: string) => Promise<void>;
}

export default function FoodItemRow({ entry, onDelete }: FoodItemRowProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try { await onDelete(entry._id); }
    finally { setDeleting(false); }
  };

  const hasMacros = entry.protein > 0 || entry.carbs > 0 || entry.fat > 0;

  return (
    <div className={`food-item ${deleting ? 'food-item--deleting' : ''}`}>
      <div className="food-item__info">
        <span className="food-item__name">{entry.name}</span>
        <span className="food-item__serving">
          {entry.servingSize} {entry.servingUnit}
          {hasMacros && (
            <span className="food-item__macros">
              {entry.protein > 0 && <span>P {entry.protein}g</span>}
              {entry.carbs   > 0 && <span>C {entry.carbs}g</span>}
              {entry.fat     > 0 && <span>F {entry.fat}g</span>}
            </span>
          )}
        </span>
      </div>

      <div className="food-item__right">
        <span className="food-item__cal">{entry.calories} kcal</span>
        <button
          className="food-item__delete"
          onClick={handleDelete}
          disabled={deleting}
          title="Remove"
        >
          ×
        </button>
      </div>
    </div>
  );
}
