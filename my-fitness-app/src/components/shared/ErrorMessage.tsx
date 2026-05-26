import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-msg">
      <span className="error-msg__icon">⚠️</span>
      <p className="error-msg__text">{message}</p>
      {onRetry && (
        <button className="error-msg__retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
