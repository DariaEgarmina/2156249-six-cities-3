import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '@/utils/mock-component';
import SortingForm from './sorting-form';
import { makeFakeStore } from '@/utils/mocks';
import { setActiveSort } from '@/store/offers/slice';
import { extractActionsTypes } from '@/utils/mocks';

describe('Component: SortingForm', () => {
  const currentSort = 'Popular';

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <SortingForm currentSort={currentSort} />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('sort-options-list')).toBeInTheDocument();
  });

  it('should open and close options list when toggle is clicked', async () => {
    const { withStoreComponent } = withStore(
      <SortingForm currentSort={currentSort} />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const toggle = screen.getByTestId('sort-toggle');
    const optionsList = screen.getByTestId('sort-options-list');

    expect(optionsList).not.toHaveClass('places__options--opened');

    await userEvent.click(toggle);
    expect(optionsList).toHaveClass('places__options--opened');

    await userEvent.click(toggle);
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should highlight active sort option', () => {
    const { withStoreComponent } = withStore(
      <SortingForm currentSort={currentSort} />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const activeOption = screen.getByTestId(`sort-option-${currentSort}`);
    expect(activeOption).toHaveClass('places__option--active');
  });

  it('should dispatch setActiveSort and close list when option is clicked', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <SortingForm currentSort={currentSort} />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const toggle = screen.getByTestId('sort-toggle');
    await userEvent.click(toggle);

    const newSort = 'PriceLowToHigh';
    const option = screen.getByTestId(`sort-option-${newSort}`);
    await userEvent.click(option);

    const optionsList = screen.getByTestId('sort-options-list');
    expect(optionsList).not.toHaveClass('places__options--opened');

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toContain(setActiveSort(newSort).type);
  });
});
