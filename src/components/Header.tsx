import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex flex-col justify-between items-center sm:flex-row gap-2">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Blog
        </Link>
        <nav className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/create" className="text-gray-700 hover:text-blue-600">
                Criar Post
              </Link>
              <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 hover:cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Registrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
