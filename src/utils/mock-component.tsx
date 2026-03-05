import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

export function withHistory(component: JSX.Element) {
  return (
    <MemoryRouter>
      <HelmetProvider>{component}</HelmetProvider>
    </MemoryRouter>
  );
}
