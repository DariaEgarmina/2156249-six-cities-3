import './error-panel.css';

type ErrorPanelProps = {
  message: string;
};

function ErrorPanel({ message }: ErrorPanelProps): JSX.Element {
  return (
    <div className="error-panel" data-testid="error-panel">
      {message}
    </div>
  );
}

export default ErrorPanel;
