import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '@/utils/mock-component';
import LoginScreen from './login-screen';
import { makeFakeStore } from '@/utils/mocks';
import { loginAction } from '@/store/auth/api-actions';
import { extractActionsTypes } from '@/utils/mocks';

describe('Page: LoginScreen', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<LoginScreen />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it('should handle user input correctly', async () => {
    const { withStoreComponent } = withStore(<LoginScreen />, makeFakeStore());

    render(withStoreComponent);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should have active submit button', () => {
    const { withStoreComponent } = withStore(<LoginScreen />, makeFakeStore());

    render(withStoreComponent);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('should dispatch loginAction on form submit', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <LoginScreen />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toContain(loginAction.pending.type);
  });
});
