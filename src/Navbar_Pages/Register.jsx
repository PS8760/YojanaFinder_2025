import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider, githubProvider } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useLanguage } from "../utils/i18n.jsx";

const Register = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password.length < 6) {
      setError(t('passwordTooShort'));
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Step 2: Save the additional user details to your Firestore database
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        location: formData.location,
        gender: formData.gender,
        createdAt: new Date(),
      });

      console.log("Successfully created user and saved data to Firestore");
      alert(t('accountCreatedSuccess'));
      navigate("/login");
    } catch (firebaseError) {
      console.error(
        "Firebase registration error:",
        firebaseError.code,
        firebaseError.message
      );
      if (firebaseError.code === "auth/email-already-in-use") {
        setError(t('emailAlreadyInUse'));
      } else {
        setError(t('accountCreationFailed'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email,
        location: '',
        gender: '',
        provider: 'google',
        createdAt: new Date(),
      });

      console.log("Successfully registered with Google:", user.uid);
      alert(t('googleRegisterSuccess'));
      navigate("/schemes");
    } catch (error) {
      console.error("Google registration error:", error);
      setError(t('googleRegisterFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubRegister = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email,
        location: '',
        gender: '',
        provider: 'github',
        createdAt: new Date(),
      });

      console.log("Successfully registered with GitHub:", user.uid);
      alert(t('githubRegisterSuccess'));
      navigate("/schemes");
    } catch (error) {
      console.error("GitHub registration error:", error);
      setError(t('githubRegisterFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-amber-50 min-h-screen">
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
            {/* Left Side: Welcome & Branding */}
            <div className="md:w-1/2 p-6 md:p-8 bg-gray-900 text-white flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{t('createAccount')}</h1>
              <p className="text-gray-400 mb-6 text-sm md:text-base">
                {t('registerSubtitle')}
              </p>
              <div className="text-2xl md:text-3xl text-blue-500 font-light">
                <span className="font-stretch-125%">Yojana Finder</span>
              </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                {t('register')}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 font-semibold text-gray-800 text-sm"
                    >
                      {t('firstName')}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Abhishek"
                      required
                      className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 font-semibold text-gray-800 text-sm"
                    >
                      {t('lastName')}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Jamdade"
                      required
                      className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-semibold text-gray-800 text-sm"
                  >
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 font-semibold text-gray-800 text-sm"
                  >
                    {t('password')}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block mb-2 font-semibold text-gray-800 text-sm"
                  >
                    {t('location')}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Mumbai, Maharashtra"
                    required
                    className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 font-semibold text-gray-800 text-sm"
                  >
                    {t('gender')}
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                  >
                    <option value="" disabled>
                      {t('selectGender')}
                    </option>
                    <option value="Male">{t('male')}</option>
                    <option value="Female">{t('female')}</option>
                    <option value="Other">{t('other')}</option>
                  </select>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center -my-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 text-sm md:text-base shadow-md hover:shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? t('loading') : t('register')}
                </button>
              </form>

              {/* Social Login Divider */}
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">{t('continueWith')}</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleGoogleRegister}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition duration-300 disabled:opacity-50 text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  {t('continueWithGoogle')}
                </button>

                <button
                  onClick={handleGithubRegister}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 disabled:opacity-50 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {t('continueWithGithub')}
                </button>
              </div>

              <p className="text-center text-gray-600 mt-4 text-sm">
                {t('alreadyHaveAccount')}{" "}
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  {t('loginHere')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;