import { formatDisplayDate, formatLongDate } from './dateUtils';
import './DateNav.css';

interface DateNavProps {
  dateStr:  string;
  isToday:  boolean;
  onPrev:   () => void;
  onNext:   () => void;
}

export default function DateNav({ dateStr, isToday, onPrev, onNext }: DateNavProps) {
  return (
    <div className="date-nav">
      <button className="date-nav__btn" onClick={onPrev} aria-label="Previous day">
        ‹
      </button>

      <div className="date-nav__center">
        <span className="date-nav__label">{formatDisplayDate(dateStr)}</span>
        <span className="date-nav__sub">{formatLongDate(dateStr)}</span>
      </div>

      <button
        className="date-nav__btn"
        onClick={onNext}
        disabled={isToday}
        aria-label="Next day"
      >
        ›
      </button>
    </div>
  );
}
