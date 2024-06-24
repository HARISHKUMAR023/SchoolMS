// Define the shape of the auth state
export interface AuthState {
    user: {
      role: string;
    } | null;
  }
  
  // Define the root state type
  export interface RootState {
    auth: AuthState;
  }
  