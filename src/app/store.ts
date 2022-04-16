import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../containers/appSlice';

export const store = configureStore({
	reducer: {
		contracts: appReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
