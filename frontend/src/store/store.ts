import { authApi } from "@/features/auth/authApi";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import { userApi } from "@/features/user/userApi";
import { notificationApi } from "@/features/notifications/notificationApi";
import { adminApi } from "@/features/admin/adminApi";
import { genreApi } from "@/features/genre/genreApi";
import { novelApi } from "@/features/novel/novelApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [novelApi.reducerPath]: novelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(notificationApi.middleware)
      .concat(adminApi.middleware)
      .concat(genreApi.middleware)
      .concat(novelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
