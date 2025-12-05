import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

export const store = configureStore({reducer});
//Redux Toolkit (configureStore) анализирует редьюсер
// и автоматически определяет, какие экшены он может обрабатывать
//=> store "знает" про типы экшенов

// Типы для использования в компонентах, добавила тут, чтобы не циклической зависимости от папки types
// куда лучше добавить?
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


//ReturnType<typeof store.getState> означает:
//store.getState() — функция, возвращающая { city: 'Paris', offersList: [] }
//typeof store.getState — тип этой функции
//ReturnType<...> — берём то, что функция возвращает
//State = { city: string, offersList: Offer[] }

// typeof store.dispatch означает:
// "Моя функция dispatch будет принимать экшены, которые разрешены в моём store"
// В данном случае это:
// setCity(payload: string)
// uploadOffers(payload: Offer[])

