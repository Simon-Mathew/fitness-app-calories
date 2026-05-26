import './Spinner.css';

interface SpinnerProps {
  /** Message shown below the spinner */
  message?: string;
}

export default function Spinner({ message }: SpinnerProps) {
  return (
    <div className="spinner-wrap">
      <div className="spinner" />
      {message && <p className="spinner-msg">{message}</p>}
    </div>
  );
}
