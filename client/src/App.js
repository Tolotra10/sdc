import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import About from './pages/About';
import { DataProvider } from './components/DataContext';
import Form from './pages/Form';
import UserList from './pages/UserList';
import Help from './pages/Help';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-gray-50  [&_*::-webkit-scrollbar]:w-2
      [&_*::-webkit-scrollbar-track]:bg-gray-100 
      [&_*::-webkit-scrollbar-track]:rounded-lg
      [&_*::-webkit-scrollbar-thumb]:bg-gray-400
      [&_*::-webkit-scrollbar-thumb]:rounded-lg
      [&_*::-webkit-scrollbar-thumb:hover]:bg-gray-500">
          <Routes>
            {/* Routes publiques */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes protégées */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route
              path="/userList"
              element={
                <PrivateRoute>
                  <UserList />
                </PrivateRoute>
              }
            />
            <Route
              path="/form"
              element={
                <PrivateRoute>
                  <Form />
                </PrivateRoute>
              }
            />
            <Route
              path="/help"
              element={
                <PrivateRoute>
                  <Help />
                </PrivateRoute>
              }
            />

            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;