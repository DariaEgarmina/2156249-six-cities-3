import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIMEOUT_SHOW_ERROR } from '@/const';
import { setError } from './actions';
import { store } from '.';

//Удаление сообщения об ошибке
export const clearErrorAction = createAsyncThunk(
  'error/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
