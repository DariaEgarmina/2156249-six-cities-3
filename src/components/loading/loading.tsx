import './loading.css';

function Loading(): JSX.Element {
  return (
    <div
      className="loading-container"
      aria-label="Загрузка данных"
      role="status"
      data-testid="loading-container"
    >
      <div className="loader__circle" data-testid="loader-circle"></div>
    </div>
  );
}

export default Loading;
