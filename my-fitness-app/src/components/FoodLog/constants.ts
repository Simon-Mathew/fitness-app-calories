export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export const MEALS: { type: MealType; icon: string }[] = [
  { type: 'Breakfast', icon: '☀️' },
  { type: 'Lunch',     icon: '🥗' },
  { type: 'Dinner',    icon: '🍽️' },
  { type: 'Snack',     icon: '🍎' },
];

export const CALORIE_GOAL = 2000;

export const MACRO_GOALS = {
  protein: 150,  // grams
  carbs:   225,
  fat:     55,
};

export const EMPTY_FORM = {
  name:        '',
  calories:    '',
  protein:     '',
  carbs:       '',
  fat:         '',
  servingSize: '1',
  servingUnit: 'serving',
};
