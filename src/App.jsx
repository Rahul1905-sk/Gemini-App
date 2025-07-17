import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { useAuthStore } from './stores/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} />
        <Route path="/" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/auth" />}>
          <Route index element={<HomePage />} />
          <Route path="chat/:id" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;