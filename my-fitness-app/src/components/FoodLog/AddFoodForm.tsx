import { useState } from 'react';
import type { NewFoodEntry } from '../../api/food';
import type { MealType } from './constants';
import { EMPTY_FORM } from './constants';
import './AddFoodForm.css';

interface AddFoodFormProps {
  mealType: MealType;
  dateStr:  string;
  onAdd:    (data: NewFoodEntry) => Promise<void>;
  onCancel: () => void;
}

export default function AddFoodForm({ mealType, dateStr, onAdd, onCancel }: AddFoodFormProps) {
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError,  setFormError]  = useState('');

  const set = (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.name.trim()) {
      setFormError('Food name is required.');
      return;
    }
    const cal = Number(form.calories);
    if (!form.calories || isNaN(cal) || cal < 0) {
      setFormError('Please enter valid calories.');
      return;
    }

    setSubmitting(true);
    try {
      await onAdd({
        date:        new Date(dateStr + 'T12:00:00').toISOString(),
        mealType,
        name:        form.name.trim(),
        calories:    cal,
        protein:     Number(form.protein)     || 0,
        carbs:       Number(form.carbs)       || 0,
        fat:         Number(form.fat)         || 0,
        servingSize: Number(form.servingSize) || 1,
        servingUnit: form.servingUnit.trim()  || 'serving',
      });
      setForm(EMPTY_FORM);
      onCancel();
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit} noValidate>

      {/* Row 1: name + calories */}
      <div className="add-form__row add-form__row--main">
        <input
          className="add-form__input add-form__input--name"
          placeholder="Food name (e.g. Grilled Chicken)"
          value={form.name}
          onChange={set('name')}
          autoFocus
        />
        <div className="add-form__cal-group">
          <input
            className="add-form__input add-form__input--cal"
            type="number"
            placeholder="Calories"
            min={0}
            value={form.calories}
            onChange={set('calories')}
          />
          <span className="add-form__unit-label">kcal</span>
        </div>
      </div>

      {/* Row 2: macros + serving (all optional) */}
      <div className="add-form__row add-form__row--macros">
        {([
          { field: 'protein' as const, label: 'Protein', unit: 'g' },
          { field: 'carbs'   as const, label: 'Carbs',   unit: 'g' },
          { field: 'fat'     as const, label: 'Fat',     unit: 'g' },
        ]).map(({ field, label, unit }) => (
          <label key={field} className="add-form__macro-label">
            <span>{label}</span>
            <div className="add-form__macro-wrap">
              <input
                type="number" min={0} placeholder="0"
                className="add-form__input add-form__input--macro"
                value={form[field]}
                onChange={set(field)}
              />
              <span className="add-form__unit-label">{unit}</span>
            </div>
          </label>
        ))}

        <label className="add-form__macro-label">
          <span>Serving</span>
          <div className="add-form__macro-wrap">
            <input
              type="number" min={0} step="0.1" placeholder="1"
              className="add-form__input add-form__input--macro"
              value={form.servingSize}
              onChange={set('servingSize')}
            />
            <input
              type="text" placeholder="serving"
              className="add-form__input add-form__input--serving-unit"
              value={form.servingUnit}
              onChange={set('servingUnit')}
            />
          </div>
        </label>
      </div>

      {formError && <p className="add-form__error">{formError}</p>}

      <div className="add-form__actions">
        <button type="button" className="add-form__btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="add-form__btn-submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Add Food'}
        </button>
      </div>

    </form>
  );
}
