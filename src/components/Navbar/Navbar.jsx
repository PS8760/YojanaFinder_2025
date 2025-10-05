import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useLanguage } from "../../utils/i18n.jsx";
import LanguageSelector from "../LanguageSelector";

const Navbar = () => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load user profile data
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);



  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get user display name
  const getUserDisplayName = () => {
    if (userProfile?.firstName) {
      return `${userProfile.firstName} ${userProfile.lastName || ''}`.trim();
    }
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <header className="relative top-4 h-auto left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-2xl shadow-lg">
        {/* Logo / Brand Name */}
        <div className="font-stretch-125% text-2xl md:text-3xl text-blue-500">
          <Link
            to="/"
            className="hover:text-blue-700 transition-colors duration-300"
          >
            Yojana Finder
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-500 hover:text-blue-700 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center font-stretch-125% text-lg space-x-8"
        >
          <Link
            to="/"
            className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300 group"
          >
            {t('home')}
            <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/schemes"
            className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300 group"
          >
            {t('schemes')}
            <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/aboutus"
            className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300 group"
          >
            {t('aboutUs')}
            <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/contact"
            className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300 group"
          >
            {t('contact')}
            <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <LanguageSelector />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition-colors duration-300"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:block">{getUserDisplayName()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowUserMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="nav-link relative text-blue-500 hover:text-blue-700 transition-colors duration-300 group"
            >
              {t('login')}
              <span className="underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-gray-800 rounded-2xl shadow-lg p-4">
          <nav className="flex flex-col space-y-4 font-stretch-125% text-lg">
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/schemes"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Schemes
            </Link>
            <Link
              to="/aboutus"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <span className="text-blue-500">{getUserDisplayName()}</span>
                </div>
                <Link
                  to="/profile"
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300 py-2 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 transition-colors duration-300 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('loginRegister')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
