import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import Brand from './Brand';
import { DarkModeToggle } from './DarkModeToggle';

const NavBar = () => {
  const { user } = useAuth();

  if (!user) throw Error('something went wrong');

  return (
    <header className="sticky top-0 z-50 border-b-2 bg-yellow-300 dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left side: Brand  */}
        <div className="flex items-center gap-6">
          <Brand size="lg" />
        </div>

        {/* Center nav links */}
        <nav className="flex gap-8 text-2xl font-bold">
          <Link to="/account" className="hover:underline">
            {user.email}
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/logout" className="hover:underline">
            Log out
          </Link>
        </nav>

        {/* Right side: Toggle */}
        <div>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
