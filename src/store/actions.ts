import { createAction } from '@reduxjs/toolkit';
import { CITIES } from '@/const';

export const setCity = createAction<typeof CITIES[number]>('setCity');
