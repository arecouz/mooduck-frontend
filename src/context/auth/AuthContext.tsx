import { createContext } from 'react';
import { AuthContextType } from './types.tsx';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
