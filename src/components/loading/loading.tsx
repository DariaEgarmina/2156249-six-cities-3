import './loading.css';

function Loading(): JSX.Element {
  return (
    <div
      className="loading-container"
      aria-label="Загрузка данных"
      role="status"
    >
      <div className="loader__circle"></div>
    </div>
  );
}

export default Loading;
