import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import type { ReactElement } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import CreateEditPage from "./pages/CreateEditPage";
import { AuthProvider, useAuth } from "./hooks/useAuth";

function PrivateRoute({ element }: { element: ReactElement }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/admin"
              element={<PrivateRoute element={<AdminPage />} />}
            />
            <Route
              path="/create"
              element={<PrivateRoute element={<CreateEditPage />} />}
            />
            <Route
              path="/edit/:id"
              element={<PrivateRoute element={<CreateEditPage />} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
