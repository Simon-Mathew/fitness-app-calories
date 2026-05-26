import { useState } from 'react';
import type { ApiFoodEntry } from '../../types/api';
import type { NewFoodEntry } from '../../api/food';
import type { MealType } from './constants';
import FoodItemRow from './FoodItemRow';
import AddFoodForm from './AddFoodForm';
import './MealSection.css';

interface MealSectionProps {
  meal:     { type: MealType; icon: string };
  entries:  ApiFoodEntry[];
  dateStr:  string;
  onAdd:    (data: NewFoodEntry) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function MealSection({
  meal,
  entries,
  dateStr,
  onAdd,
  onDelete,
}: MealSectionProps) {
  const [formOpen, setFormOpen] = useState(false);
  const total = entries.reduce((sum, e) => sum + e.calories, 0);

  return (
    <div className="meal-section">

      <div className="meal-section__header">
        <div className="meal-section__title-row">
          <span className="meal-section__icon">{meal.icon}</span>
          <span className="meal-section__name">{meal.type}</span>
        </div>
        <span className="meal-section__total">
          {total > 0 ? `${total} kcal` : '—'}
        </span>
      </div>

      {entries.length > 0 && (
        <div className="meal-section__items">
          {entries.map(e => (
            <FoodItemRow key={e._id} entry={e} onDelete={onDelete} />
          ))}
        </div>
      )}

      {formOpen ? (
        <AddFoodForm
          mealType={meal.type}
          dateStr={dateStr}
          onAdd={onAdd}
          onCancel={() => setFormOpen(false)}
        />
      ) : (
        <button
          className="meal-section__add-btn"
          onClick={() => setFormOpen(true)}
        >
          + Add Food
        </button>
      )}

    </div>
  );
}
