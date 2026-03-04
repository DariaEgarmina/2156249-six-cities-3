import { OfferState } from './types';
import {
  offerSlice,
  clearOffer,
  clearError,
  clearNearbyLoadError,
  clearNearbyToastError,
} from './slice';
import { makeFakeFullOffer, makeFakeOffers, makeFakeOffer } from '@/mocks';
import { fetchOfferAction, fetchNearbyOffersAction } from './api-actions';
import { changeFavoriteStatusAction } from '../favorites';

describe('offerSlice', () => {
  const initialState: OfferState = {
    offer: null,
    nearbyOffers: [],
    isLoading: false,
    error: null,
    nearbyLoadError: null,
    nearbyToastError: null,
  };

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = offerSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return same state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offerSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should reset offer and nearbyOffers with "clearOffer" action', () => {
      const stateWithData = {
        ...initialState,
        offer: makeFakeFullOffer('1'),
        nearbyOffers: makeFakeOffers(1),
      };

      const result = offerSlice.reducer(stateWithData, clearOffer());

      expect(result.offer).toBeNull();
      expect(result.nearbyOffers).toEqual([]);
    });

    it('should clear error with "clearError" action', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error',
      };

      const result = offerSlice.reducer(stateWithError, clearError());

      expect(result.error).toBeNull();
    });

    it('should clear nearbyLoadError with "clearNearbyLoadError" action', () => {
      const stateWithError = {
        ...initialState,
        nearbyLoadError: 'Some nearby error',
      };

      const result = offerSlice.reducer(stateWithError, clearNearbyLoadError());

      expect(result.nearbyLoadError).toBeNull();
    });

    it('should clear nearbyToastError with "clearNearbyToastError" action', () => {
      const stateWithError = {
        ...initialState,
        nearbyToastError: 'Some toast error',
      };

      const result = offerSlice.reducer(
        stateWithError,
        clearNearbyToastError(),
      );

      expect(result.nearbyToastError).toBeNull();
    });
  });

  describe('extra reducers', () => {
    describe('fetchOfferAction', () => {
      it('should set isLoading to true and clear errors with "fetchOfferAction.pending" action', () => {
        const action = { type: fetchOfferAction.pending.type };
        const result = offerSlice.reducer(initialState, action);

        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
        expect(result.nearbyOffers).toEqual([]);
        expect(result.nearbyLoadError).toBeNull();
        expect(result.nearbyToastError).toBeNull();
      });

      it('should set offer and stop loading with "fetchOfferAction.fulfilled" action', () => {
        const mockOffer = makeFakeFullOffer('1');
        const action = {
          type: fetchOfferAction.fulfilled.type,
          payload: mockOffer,
        };
        const result = offerSlice.reducer(initialState, action);

        expect(result.offer).toEqual(mockOffer);
        expect(result.isLoading).toBe(false);
      });

      it('should set error and stop loading with "fetchOfferAction.rejected" action', () => {
        const errorMessage = 'Failed to load offer';
        const action = {
          type: fetchOfferAction.rejected.type,
          error: { message: errorMessage },
        };
        const result = offerSlice.reducer(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.error).toBe(errorMessage);
      });
    });

    describe('fetchNearbyOffersAction', () => {
      it('should set nearbyOffers with "fetchNearbyOffersAction.fulfilled" action', () => {
        const mockNearbyOffers = makeFakeOffers(3);
        const action = {
          type: fetchNearbyOffersAction.fulfilled.type,
          payload: mockNearbyOffers,
        };
        const result = offerSlice.reducer(initialState, action);

        expect(result.nearbyOffers).toEqual(mockNearbyOffers);
      });

      it('should set nearbyLoadError and nearbyToastError with "fetchNearbyOffersAction.rejected" action', () => {
        const errorMessage = 'Failed to load nearby places';
        const action = {
          type: fetchNearbyOffersAction.rejected.type,
          error: { message: errorMessage },
        };
        const result = offerSlice.reducer(initialState, action);

        expect(result.nearbyLoadError).toBe(errorMessage);
        expect(result.nearbyToastError).toBe(errorMessage);
      });
    });

    describe('changeFavoriteStatusAction.fulfilled', () => {
      it('should update offer.isFavorite if it matches updated offer', () => {
        const mockOffer = makeFakeFullOffer('1');
        const stateWithOffer = {
          ...initialState,
          offer: mockOffer,
        };

        const updatedOffer = {
          ...mockOffer,
          isFavorite: !mockOffer.isFavorite,
        };
        const action = {
          type: changeFavoriteStatusAction.fulfilled.type,
          payload: updatedOffer,
        };

        const result = offerSlice.reducer(stateWithOffer, action);

        expect(result.offer?.isFavorite).toBe(!mockOffer.isFavorite);
      });

      it('should update nearby offer if it matches updated offer', () => {
        const mockNearbyOffers = makeFakeOffers(2);
        const stateWithNearby = {
          ...initialState,
          nearbyOffers: mockNearbyOffers,
        };

        const updatedOffer = { ...makeFakeOffer('1'), isFavorite: true };
        const action = {
          type: changeFavoriteStatusAction.fulfilled.type,
          payload: updatedOffer,
        };

        const result = offerSlice.reducer(stateWithNearby, action);

        expect(result.nearbyOffers[0].isFavorite).toBe(true);
        expect(result.nearbyOffers[1].isFavorite).toBe(false);
      });

      it('should not change state if offer not found', () => {
        const mockOffer = makeFakeFullOffer('1');
        const mockNearbyOffers = makeFakeOffers(2);
        const stateWithData = {
          ...initialState,
          offer: mockOffer,
          nearbyOffers: mockNearbyOffers,
        };

        const updatedOffer = { ...makeFakeOffer('999'), isFavorite: true };
        const action = {
          type: changeFavoriteStatusAction.fulfilled.type,
          payload: updatedOffer,
        };

        const result = offerSlice.reducer(stateWithData, action);

        expect(result.offer).toEqual(mockOffer);
        expect(result.nearbyOffers).toEqual(mockNearbyOffers);
      });
    });
  });
});
