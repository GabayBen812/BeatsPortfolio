import { useState, useEffect } from "react";
import menu_data from "../../data/menu-data";
import { Link } from "react-router-dom";
import { AuthService } from "../../services/authService";
import type { User } from "@supabase/supabase-js";

if (typeof window !== "undefined") {
  import("bootstrap/dist/js/bootstrap.bundle.min.js");
}

const HeaderOne = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [navTitle, setNavTitle] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error getting current user:", error);
        setUser(null);
      }
    };

    getCurrentUser();

    // Listen for auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  //openMobileMenu
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Define different menu items for logged-in vs logged-out users
  const getMenuItems = () => {
    if (user) {
      // Logged-in user menu
      return [
        { id: 1, title: "Home", link: "/user-home", has_dropdown: false },
        { id: 2, title: "Catalog", link: "/catalog", has_dropdown: false },
        { id: 3, title: "Upload", link: "/upload", has_dropdown: false },
        { id: 4, title: "Profile", link: "/profile", has_dropdown: false },
      ];
    } else {
      // Logged-out user menu (original menu)
      return menu_data;
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-overlay z-3 navbar--dark">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand mx-auto d-flex align-items-center"
          >
            <h3 className="mb-0 text-light">
              <span className="text-gradient-primary">EchoLab</span>
            </h3>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
            id="primaryMenu"
          >
            <ul className="navbar-nav justify-content-end align-items-lg-center w-100">
              {getMenuItems().map((item, i) => (
                <li
                  className={`nav-item ${item.has_dropdown ? "has-sub" : ""} ${
                    i === 0 && "active ms-lg-auto"
                  }`}
                  key={item.id}
                >
                  <Link
                    onClick={() => openMobileMenu(item.title)}
                    onMouseOver={() => openMobileMenu(item.title)}
                    className="nav-link fs-14"
                    to={item.link}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="nav-item ms-lg-auto">
                <ul className="list list-row gap-2">
                  {user ? (
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-outline-light text-white fs-14 border-1 rounded-pill"
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to="/login"
                        className="btn btn-primary-gradient text-white fs-14 border-0 rounded-pill"
                      >
                        <span className="d-inline-block">Login</span>
                        <span className="d-inline-block">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderOne;
