import type { GetUser, User } from "@/types/auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: User | GetUser | null;
  authChecked: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | GetUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.authChecked = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.authChecked = true;
    },
  },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
