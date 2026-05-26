import { useState } from 'react';
import { useFoodLog } from '../../hooks/useFoodLog';
import type { ApiFoodEntry } from '../../types/api';
import type { NewFoodEntry } from '../../api/food';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import './FoodLog.css';

// ── Constants ──────────────────────────────────────────────────────────────

type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

const MEALS: { type: MealType; icon: string }[] = [
  { type: 'Breakfast', icon: '☀️' },
  { type: 'Lunch',     icon: '🥗' },
  { type: 'Dinner',    icon: '🍽️' },
  { type: 'Snack',     icon: '🍎' },
];

const CALORIE_GOAL = 2000;
const MACRO_GOALS  = { protein: 150, carbs: 225, fat: 55 }; // grams

// ── Date helpers ───────────────────────────────────────────────────────────

function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function formatDisplay(dateStr: string): string {
  const today     = toDateString(new Date());
  const yesterday = toDateString(new Date(Date.now() - 86400000));
  if (dateStr === today)     return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

// ── Empty form state ───────────────────────────────────────────────────────

const EMPTY_FORM = {
  name:        '',
  calories:    '',
  protein:     '',
  carbs:       '',
  fat:         '',
  servingSize: '1',
  servingUnit: 'serving',
};

// ── Add Food Form ──────────────────────────────────────────────────────────

interface AddFoodFormProps {
  mealType:  MealType;
  dateStr:   string;
  onAdd:     (data: NewFoodEntry) => Promise<void>;
  onCancel:  () => void;
}

function AddFoodForm({ mealType, dateStr, onAdd, onCancel }: AddFoodFormProps) {
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError,  setFormError]  = useState('');

  const set = (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.name.trim()) { setFormError('Food name is required.'); return; }
    const cal = Number(form.calories);
    if (!form.calories || isNaN(cal) || cal < 0) {
      setFormError('Please enter valid calories.'); return;
    }

    setSubmitting(true);
    try {
      await onAdd({
        date:        new Date(dateStr).toISOString(),
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
    <form className="add-food-form" onSubmit={handleSubmit}>
      <div className="add-food-form__row add-food-form__row--main">
        <input
          className="add-food-form__input add-food-form__input--name"
          placeholder="Food name  (e.g. Grilled Chicken)"
          value={form.name}
          onChange={set('name')}
          autoFocus
        />
        <div className="add-food-form__calories-group">
          <input
            className="add-food-form__input add-food-form__input--number"
            type="number"
            placeholder="Calories"
            min={0}
            value={form.calories}
            onChange={set('calories')}
          />
          <span className="add-food-form__unit">kcal</span>
        </div>
      </div>

      <div className="add-food-form__row add-food-form__row--macros">
        <label className="add-food-form__macro-label">
          <span>Protein</span>
          <div className="add-food-form__macro-input-wrap">
            <input
              type="number" min={0} placeholder="0"
              className="add-food-form__input add-food-form__input--macro"
              value={form.protein} onChange={set('protein')}
            />
            <span className="add-food-form__unit">g</span>
          </div>
        </label>
        <label className="add-food-form__macro-label">
          <span>Carbs</span>
          <div className="add-food-form__macro-input-wrap">
            <input
              type="number" min={0} placeholder="0"
              className="add-food-form__input add-food-form__input--macro"
              value={form.carbs} onChange={set('carbs')}
            />
            <span className="add-food-form__unit">g</span>
          </div>
        </label>
        <label className="add-food-form__macro-label">
          <span>Fat</span>
          <div className="add-food-form__macro-input-wrap">
            <input
              type="number" min={0} placeholder="0"
              className="add-food-form__input add-food-form__input--macro"
              value={form.fat} onChange={set('fat')}
            />
            <span className="add-food-form__unit">g</span>
          </div>
        </label>
        <label className="add-food-form__macro-label">
          <span>Serving</span>
          <div className="add-food-form__macro-input-wrap">
            <input
              type="number" min={0} step="0.1" placeholder="1"
              className="add-food-form__input add-food-form__input--macro"
              value={form.servingSize} onChange={set('servingSize')}
            />
            <input
              type="text" placeholder="serving"
              className="add-food-form__input add-food-form__input--unit-text"
              value={form.servingUnit} onChange={set('servingUnit')}
            />
          </div>
        </label>
      </div>

      {formError && <p className="add-food-form__error">{formError}</p>}

      <div className="add-food-form__actions">
        <button type="button" className="add-food-form__cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="add-food-form__submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Add Food'}
        </button>
      </div>
    </form>
  );
}

// ── Food item row ──────────────────────────────────────────────────────────

function FoodItemRow({
  entry,
  onDelete,
}: {
  entry:    ApiFoodEntry;
  onDelete: (id: string) => Promise<void>;
}) {
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

// ── Meal section ───────────────────────────────────────────────────────────

function MealSection({
  meal,
  entries,
  dateStr,
  onAdd,
  onDelete,
}: {
  meal:     { type: MealType; icon: string };
  entries:  ApiFoodEntry[];
  dateStr:  string;
  onAdd:    (data: NewFoodEntry) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const total = entries.reduce((s, e) => s + e.calories, 0);

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
        <button className="meal-section__add-btn" onClick={() => setFormOpen(true)}>
          + Add Food
        </button>
      )}
    </div>
  );
}

// ── Daily summary strip ────────────────────────────────────────────────────

function DailySummary({ entries }: { entries: ApiFoodEntry[] }) {
  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein:  acc.protein  + e.protein,
      carbs:    acc.carbs    + e.carbs,
      fat:      acc.fat      + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const calPct  = Math.min(Math.round((totals.calories / CALORIE_GOAL)       * 100), 100);
  const remaining = Math.max(CALORIE_GOAL - totals.calories, 0);

  return (
    <div className="daily-summary">
      <div className="daily-summary__calories">
        <div className="daily-summary__cal-ring-wrap">
          <svg viewBox="0 0 80 80" className="daily-summary__ring">
            <circle cx="40" cy="40" r="34" className="daily-summary__ring-track" />
            <circle
              cx="40" cy="40" r="34"
              className="daily-summary__ring-fill"
              strokeDasharray={`${calPct * 2.136} 213.6`}
              strokeDashoffset="0"
              transform="rotate(-90 40 40)"
            />
          </svg>
          <div className="daily-summary__cal-center">
            <span className="daily-summary__cal-value">{totals.calories}</span>
            <span className="daily-summary__cal-unit">kcal</span>
          </div>
        </div>
        <div className="daily-summary__cal-labels">
          <p className="daily-summary__goal-line">
            Goal: <strong>{CALORIE_GOAL} kcal</strong>
          </p>
          <p className="daily-summary__remaining">
            {remaining > 0
              ? <><strong>{remaining} kcal</strong> remaining</>
              : <span style={{ color: '#f97316' }}>Goal reached 🎉</span>
            }
          </p>
        </div>
      </div>

      <div className="daily-summary__macros">
        {([
          { label: 'Protein', value: totals.protein, goal: MACRO_GOALS.protein, color: '#a855f7' },
          { label: 'Carbs',   value: totals.carbs,   goal: MACRO_GOALS.carbs,   color: '#f97316' },
          { label: 'Fat',     value: totals.fat,      goal: MACRO_GOALS.fat,     color: '#38bdf8' },
        ] as const).map(m => (
          <div key={m.label} className="daily-summary__macro">
            <div className="daily-summary__macro-header">
              <span className="daily-summary__macro-label">{m.label}</span>
              <span className="daily-summary__macro-value">{m.value}g <span className="daily-summary__macro-goal">/ {m.goal}g</span></span>
            </div>
            <div className="daily-summary__macro-track">
              <div
                className="daily-summary__macro-fill"
                style={{
                  width: `${Math.min(Math.round((m.value / m.goal) * 100), 100)}%`,
                  background: m.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main FoodLog ───────────────────────────────────────────────────────────

export default function FoodLog() {
  const [dateStr, setDateStr] = useState(toDateString(new Date()));

  const { entries, loading, error, addEntry, deleteEntry, refetch } = useFoodLog(dateStr);

  const shiftDay = (delta: number) => {
    const d = new Date(dateStr + 'T12:00:00');
    d.setDate(d.getDate() + delta);
    setDateStr(toDateString(d));
  };

  const entriesByMeal = (meal: MealType) =>
    entries.filter(e => e.mealType === meal);

  const isToday = dateStr === toDateString(new Date());

  return (
    <div className="food-log">
      {/* ── Date nav ── */}
      <div className="food-log__date-nav">
        <button className="food-log__day-btn" onClick={() => shiftDay(-1)}>‹</button>
        <div className="food-log__date-center">
          <span className="food-log__date-label">{formatDisplay(dateStr)}</span>
          <span className="food-log__date-sub">{new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <button
          className="food-log__day-btn"
          onClick={() => shiftDay(1)}
          disabled={isToday}
        >›</button>
      </div>

      {loading ? (
        <Spinner message="Loading food log…" />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          <DailySummary entries={entries} />

          <div className="food-log__meals">
            {MEALS.map(meal => (
              <MealSection
                key={meal.type}
                meal={meal}
                entries={entriesByMeal(meal.type)}
                dateStr={dateStr}
                onAdd={addEntry}
                onDelete={deleteEntry}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
