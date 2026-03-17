import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '@/utils/mock-component';
import CitiesTabs from './cities-tabs';
import { makeFakeStore } from '@/utils/mocks';
import { CITIES } from '@/const';
import { setCity } from '@/store/offers/slice';
import { extractActionsTypes } from '@/utils/mocks';

describe('Component: CitiesTabs', () => {
  const activeCity = CITIES[0];

  it('should render all cities', () => {
    const { withStoreComponent } = withStore(
      <CitiesTabs cities={CITIES} activeCity={activeCity} />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should highlight active city', () => {
    const { withStoreComponent } = withStore(
      <CitiesTabs cities={CITIES} activeCity={activeCity} />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const activeTab = screen.getByTestId(`city-tab-${activeCity}`);
    expect(activeTab).toHaveClass('tabs__item--active');
  });

  it('should dispatch setCity when city tab is clicked', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <CitiesTabs cities={CITIES} activeCity={activeCity} />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const cityToClick = CITIES[1];
    const tab = screen.getByTestId(`city-tab-${cityToClick}`);
    await userEvent.click(tab);

    const actions = extractActionsTypes(mockStore.getActions());
    const setCityAction = setCity(cityToClick);

    expect(actions).toContain(setCityAction.type);
  });
});
