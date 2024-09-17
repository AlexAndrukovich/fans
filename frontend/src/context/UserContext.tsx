import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface User {
  id: number;
  email: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

interface UserContextProps extends UserState {
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

type UserAction = { type: 'SET_USER'; payload: User };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user: User) => dispatch({ type: 'SET_USER', payload: user });

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
