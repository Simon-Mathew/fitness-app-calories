export function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function formatDisplayDate(dateStr: string): string {
  const today     = toDateString(new Date());
  const yesterday = toDateString(new Date(Date.now() - 86_400_000));
  if (dateStr === today)     return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month:   'long',
    day:     'numeric',
  });
}

export function formatLongDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day:   'numeric',
    year:  'numeric',
  });
}
