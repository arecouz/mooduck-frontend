import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import Brand from "./Brand";
import { DarkModeToggle } from "./DarkModeToggle";
import { supabase } from "../utils/supabaseClient";

const NavBar = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) throw Error("something went wrong");

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error", error.message);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 bg-yellow-300 dark:bg-gray-800">
      <div className="flex items-center justify-between px-6 py-3">
        {/* LEFT: Brand + Account (wraps only when there's no space) */}
        <div
          className="
            flex flex-wrap items-center content-center
            gap-x-3 gap-y-0.5
            min-w-0
          "
        >
          <Brand size="sm" />

          {/* Keep the full email visible; it will move to the next flex line when needed */}
          <Link
            to="/account"
            className="
              font-bold hover:underline
              text-sm md:text-base
              leading-tight
              whitespace-nowrap
            "
            title={user.email}
          >
            {user.email}
          </Link>
        </div>

        {/* DESKTOP NAV (hidden on small screens) */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-bold">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <button onClick={logOut} className="hover:underline">
            Log out
          </button>
          <DarkModeToggle />
        </nav>

        {/* MOBILE MENU TOGGLE (shown on small screens) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-yellow-200 dark:hover:bg-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden flex flex-col gap-4 px-6 py-4 text-lg font-bold border-t-2 bg-yellow-200 dark:bg-gray-900"
        >
          <Link
            to="/dashboard"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              logOut();
            }}
            className="hover:underline text-left"
          >
            Log out
          </button>

          {/* Dark mode toggle is inside the mobile menu */}
          <DarkModeToggle />
        </div>
      )}
    </header>
  );
};

export default NavBar;
