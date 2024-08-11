// Define the shape of the auth state
export interface AuthState {
  user: {
    role: string;
  } | null;
}

// Define the shape of the visibility state
export interface VisibilityState {
  [component: string]: boolean;
}

// Define the root state type
export interface RootState {
  auth: AuthState;
  visibility: VisibilityState; // Ensure visibility state is included
}
