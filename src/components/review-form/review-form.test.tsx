import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '@/utils/mock-component';
import ReviewForm from './review-form';
import { makeFakeStore } from '@/utils/mocks';
import { NameSpace } from '@/const';
import { MIN_REVIEW_LENGTH } from './const';
import { postCommentAction } from '@/store/reviews/api-actions';
import { extractActionsTypes } from '@/utils/mocks';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm />,
      makeFakeStore({
        [NameSpace.Reviews]: {
          reviews: [],
          isLoading: false,
          isSubmitting: false,
          loadError: null,
          submitError: null,
        },
      }),
    );

    render(withStoreComponent);

    expect(
      screen.getByPlaceholderText(/Tell how was your stay/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
  });

  it('should handle text input correctly', async () => {
    const { withStoreComponent } = withStore(
      <ReviewForm />,
      makeFakeStore({
        [NameSpace.Reviews]: {
          reviews: [],
          isLoading: false,
          isSubmitting: false,
          loadError: null,
          submitError: null,
        },
      }),
    );

    render(withStoreComponent);

    const textarea = screen.getByTestId('review-textarea');
    const testText =
      'This is a test review with enough length to pass validation';

    await userEvent.type(textarea, testText);

    expect(textarea).toHaveValue(testText);
  });

  it('should handle rating selection correctly', async () => {
    const { withStoreComponent } = withStore(
      <ReviewForm />,
      makeFakeStore({
        [NameSpace.Reviews]: {
          reviews: [],
          isLoading: false,
          isSubmitting: false,
          loadError: null,
          submitError: null,
        },
      }),
    );

    render(withStoreComponent);

    const rating5 = screen.getByTestId('rating-5');
    await userEvent.click(rating5);

    expect(rating5).toBeChecked();
  });

  it('should disable submit button when form is invalid', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm />,
      makeFakeStore({
        [NameSpace.Reviews]: {
          reviews: [],
          isLoading: false,
          isSubmitting: false,
          loadError: null,
          submitError: null,
        },
      }),
    );

    render(withStoreComponent);

    const submitButton = screen.getByTestId('submit-review-button');
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    const { withStoreComponent } = withStore(
      <ReviewForm />,
      makeFakeStore({
        [NameSpace.Reviews]: {
          reviews: [],
          isLoading: false,
          isSubmitting: false,
          loadError: null,
          submitError: null,
        },
      }),
    );

    render(withStoreComponent);

    const textarea = screen.getByTestId('review-textarea');
    const rating5 = screen.getByTestId('rating-5');
    const submitButton = screen.getByTestId('submit-review-button');

    await userEvent.type(textarea, 'a'.repeat(MIN_REVIEW_LENGTH + 10));
    await userEvent.click(rating5);

    expect(submitButton).not.toBeDisabled();
  });

  it('should disable submit button during submission', () => {
    const { withStoreComponent } = withStore(
      <ReviewForm />,
      makeFakeStore({
        [NameSpace.Reviews]: {
          reviews: [],
          isLoading: false,
          isSubmitting: true,
          loadError: null,
          submitError: null,
        },
      }),
    );

    render(withStoreComponent);

    const submitButton = screen.getByTestId('submit-review-button');
    expect(submitButton).toBeDisabled();
  });

  it('should dispatch postCommentAction on form submit', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <ReviewForm />,
      makeFakeStore({
        [NameSpace.Reviews]: {
          reviews: [],
          isLoading: false,
          isSubmitting: false,
          loadError: null,
          submitError: null,
        },
      }),
    );

    render(withStoreComponent);

    const textarea = screen.getByTestId('review-textarea');
    const rating5 = screen.getByTestId('rating-5');
    const submitButton = screen.getByTestId('submit-review-button');

    await userEvent.type(textarea, 'a'.repeat(MIN_REVIEW_LENGTH + 10));
    await userEvent.click(rating5);
    await userEvent.click(submitButton);

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toContain(postCommentAction.pending.type);
  });
});
