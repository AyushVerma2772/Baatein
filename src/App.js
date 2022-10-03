import React, { useContext } from 'react';
import './styles/App.css';
import './styles/Responsive.css';
import './styles/MobileRespo.css';
import Register from './components/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'
import ChatRoom from './components/ChatRoom';
import { AuthContext } from './context/AuthContext';

const App = () => {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };



  return (
    <>
      <BrowserRouter>

        <div className="main">
          <Routes>

            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />

            <Route element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            } path="/" />

            <Route element={<Login />} path="*" />

          </Routes>
        </div>

      </BrowserRouter>

    </>
  )
}

export default App