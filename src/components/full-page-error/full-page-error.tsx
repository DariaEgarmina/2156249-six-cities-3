import './full-page-error.css';

type FullPageErrorProps = {
  error: string | null;
};

function FullPageError({ error }: FullPageErrorProps): JSX.Element {
  return (
    <div className="full-page-error">
      <h1 className="full-page-error__title">Something went wrong</h1>
      <p className="full-page-error__text">{error || 'Failed to load data'}</p>
      <button
        onClick={() => window.location.reload()}
        className="full-page-error__button"
        type="button"
      >
        Try again
      </button>
    </div>
  );
}

export default FullPageError;
