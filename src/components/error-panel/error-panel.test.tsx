import { render, screen } from '@testing-library/react';
import ErrorPanel from './error-panel';

describe('Component: ErrorPanel', () => {
  it('should render correct with given message', () => {
    const expectedMessage = 'Test error message';
    const errorPanelTestId = 'error-panel';

    render(<ErrorPanel message={expectedMessage} />);

    const errorPanel = screen.getByTestId(errorPanelTestId);
    expect(errorPanel).toBeInTheDocument();
    expect(errorPanel).toHaveTextContent(expectedMessage);
  });
});
