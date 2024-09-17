import React from 'react';
import RoutesConfig from './routes';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => (
  <UserProvider>
    <RoutesConfig />
  </UserProvider>
);

export default App;
