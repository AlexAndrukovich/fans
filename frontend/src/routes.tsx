import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

const Login = lazy(() => import('./pages/LoginPage'));
const User = lazy(() => import('./pages/UserPage'));
const SignUp = lazy(() => import('./pages/Signup'));

const RoutesConfig: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  </Router>
);

export default RoutesConfig;
