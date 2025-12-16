import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { State, AppDispatch } from '@/store';

// Для отправки действий
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Для чтения данных
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
