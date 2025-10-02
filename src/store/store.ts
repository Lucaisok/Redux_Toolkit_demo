import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import booksReducer from '../features/books/booksSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        books: booksReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>

