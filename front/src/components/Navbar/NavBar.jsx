import { Link } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../context/AuthContect';

const NavBar = () => {
  const { authToken, userRole, logout } = useAuth();

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {!authToken ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/add-adds">Add Ads</Link></li>
            {userRole === 'ROLE_ADMIN' && (
              <>
                <li><Link to="/add-category">Add Category</Link></li>
                <li><Link to="/manage-categorys">Manage Categorys</Link></li>
                <li><Link to="/manage-ads">Manage Ads</Link></li>
              </>
            )}
            <li>
              <button onClick={logout} className="logout-button">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
