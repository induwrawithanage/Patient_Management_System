import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaSpinner } from "react-icons/fa";

const LoginForm = ({ navigateToDashboard, handleForgetPassword, handleSignupNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post("http://localhost:3000/doctor/login", {
        email,
        password,
      });

      console.log("Login success:", response.data);
      setErrors({ general: "✅ Login successful!" });

      // Example: Navigate to doctor dashboard after login
      if (navigateToDashboard) {
        navigateToDashboard();
      }

    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setErrors({
          general: error.response.data.message || "Login failed",
          email: error.response.data.errors?.email,
          password: error.response.data.errors?.password,
        });
      } else {
        setErrors({ general: "Server not responding. Please try again later." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full bg-black/20 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-800/60 transform transition-all duration-500 ${isFormFocused ? 'scale-105 shadow-3xl' : 'scale-100'}`}>
      <div className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-100">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to access your events</p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className={`p-4 rounded-lg border transition-all duration-300 ${
            errors.general.includes('✅') 
              ? 'bg-green-500/20 border-green-500/50 text-green-300' 
              : 'bg-red-500/20 border-red-500/50 text-red-300'
          }`}>
            <p className="text-sm font-medium text-center">{errors.general}</p>
          </div>
        )}

        <form 
          className="space-y-6" 
          onSubmit={handleLogin}
          onFocus={() => setIsFormFocused(true)}
          onBlur={() => setIsFormFocused(false)}
        >
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className={`relative transform transition-all duration-300 ${emailFocused ? 'scale-105' : 'scale-100'}`}>
              <FaEnvelope className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${emailFocused ? 'text-gray-200' : 'text-gray-500'}`} />
              <input
                type="email"
                name="email"
                className={`w-full pl-12 pr-4 py-3 bg-black/30 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm flex items-center space-x-1 animate-shake">
                <span>⚠️</span>
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className={`relative transform transition-all duration-300 ${passwordFocused ? 'scale-105' : 'scale-100'}`}>
              <FaLock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${passwordFocused ? 'text-gray-200' : 'text-gray-500'}`} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`w-full pl-12 pr-12 py-3 bg-black/30 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-200 transition-colors duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm flex items-center space-x-1 animate-shake">
                <span>⚠️</span>
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-gray-100 transition-all duration-300 transform ${
              isLoading 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 hover:scale-105 active:scale-95'
            } focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl`}
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </div>
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center pt-4 border-t border-gray-600/50">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={handleSignupNavigate}
              className="text-gray-400 hover:text-gray-200 font-medium transition-colors duration-300 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
