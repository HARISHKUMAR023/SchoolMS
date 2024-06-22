import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import axiosInstance from '../api/axiosInstance';

interface AuthContextProps {
  user: User | null;
  roles: string[];
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setUser(user);
          const token = await user.getIdToken();
          const response = await axiosInstance.get('/auth/roles', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setRoles(response.data.roles);
        } catch (error) {
          console.error('Error fetching user roles:', error);
          setRoles([]);
        }
      } else {
        setUser(null);
        setRoles([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Navigate to dashboard after login
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Navigate to login after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user?.getIdToken();

      await axiosInstance.post('/auth/register', {
        uid: userCredential.user?.uid,
        email: userCredential.user?.email,
        roles: ['user'],
      }, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });
      navigate('/dashboard'); // Navigate to dashboard after registration
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, roles, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
