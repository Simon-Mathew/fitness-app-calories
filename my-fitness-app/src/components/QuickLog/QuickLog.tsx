import './QuickLog.css';

interface Action {
  icon: string;
  label: string;
}

const ACTIONS: Action[] = [
  { icon: '🏃', label: 'Log Run'    },
  { icon: '💧', label: 'Add Water'  },
  { icon: '🍎', label: 'Log Meal'   },
  { icon: '😴', label: 'Log Sleep'  },
  { icon: '🏋️', label: 'Workout'    },
  { icon: '📏', label: 'Weigh In'   },
];

export default function QuickLog() {
  return (
    <section className="ql-panel">
      <div className="ql-panel__header">
        <div>
          <h2 className="ql-panel__title">Quick Log</h2>
          <p className="ql-panel__subtitle">Tap to record an activity</p>
        </div>
      </div>

      <div className="ql-grid">
        {ACTIONS.map(({ icon, label }) => (
          <button key={label} className="ql-btn">
            <span className="ql-btn__icon">{icon}</span>
            <span className="ql-btn__label">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
