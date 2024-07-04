import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";
// Define possible roles
type Role = 'admin' | 'teacher' | 'student';

interface User {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  role: Role; // Use the Role type here
  id: string; // Ensure user ID is included in the token payload
}

interface AuthState {
  token: string | null;
  user: User | null;
  teacherId: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  teacherId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      const decodedToken = jwtDecode<User>(action.payload.token);
      // If you want to ensure `role` is set and then spread the rest of `decodedToken`, ensure `role` is set last.
      // This example assumes `role` is always present in `decodedToken`.
      state.user = { ...decodedToken, role: decodedToken.role };
    },
    setTeacherId(state, action: PayloadAction<string>) {
      state.teacherId = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.teacherId = null;
    },
  },
});

export const { login,setTeacherId, logout } = authSlice.actions;
export default authSlice.reducer;
