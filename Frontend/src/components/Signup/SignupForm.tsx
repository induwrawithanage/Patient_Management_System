import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaCheck, FaSpinner } from "react-icons/fa";
import axios from "axios"; // Make sure axios is imported

interface SignupFormProps {
  name: string;
  setName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  passwordStrength: string;
  getPasswordStrengthColor: (strength: string) => string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  isNameValid: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  focusedField: string;
  setFocusedField: (field: string) => void;
  navigate: (path: string) => void;
}

const SignupForm = ({
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errors,
  setErrors,
  passwordStrength,
  getPasswordStrengthColor,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isNameValid,
  isLoading,
  setIsLoading,
  focusedField,
  setFocusedField,
  navigate,
}: SignupFormProps) => {
  const isFormInvalid =
    Object.keys(errors).length > 0 ||
    !name ||
    !phoneNumber ||
    !email ||
    !password ||
    !confirmPassword;

  // Handle form submit here (no separate handleSubmit prop needed)
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:3000/doctor/signup", {
        fullname: name,
        phone: phoneNumber,
        email,
        password,
      });

      console.log("Signup success:", response.data);
      setErrors({ general: "✅ Account created successfully! Redirecting to login..." });

      // Show push notification for signup success
      if (window.Notification && Notification.permission === "granted") {
        new Notification("Signup successful! Redirecting to login...");
      } else if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Signup successful! Redirecting to login...");
          }
        });
      }

      // Delay navigation to login page
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Signup error:", error);
      // Type guard for AxiosError
      if (axios.isAxiosError(error) && error.response) {
        setErrors({
          general: error.response.data.message || "Signup failed",
          email: error.response.data.errors?.email,
          password: error.response.data.errors?.password,
          phoneNumber: error.response.data.errors?.phoneNumber,
          name: error.response.data.errors?.name,
        });
      } else {
        setErrors({ general: "Server not responding. Please try again later." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-800/60">
      <div className="p-8 space-y-4">

        {/* General Error/Success Message */}
        {errors.general && (
          <div className={`p-4 rounded-lg border transition-all duration-300 ${
            errors.general.includes('✅')
              ? 'bg-green-500/20 border-green-500/50 text-green-300'
              : 'bg-red-500/20 border-red-500/50 text-red-300'
          }`}>
            <p className="text-sm font-medium text-center">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">

          {/* Name & Email Fields in Parallel */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
            {/* Name */}
            <div className="flex-1 space-y-2">
              <label className="block text-sm font-medium text-gray-400">Full Name</label>
              <div className={`relative transform transition-all duration-300 ${focusedField === 'name' ? 'scale-105' : 'scale-100'}`}>
                <FaUser className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-gray-200' : 'text-gray-500'}`} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full pl-12 pr-12 py-3 bg-black/30 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter your full name"
                />
                {name && isNameValid && (
                  <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                )}
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm flex items-center space-x-1 animate-shake">
                  <span>⚠️</span><span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex-1 space-y-2">
              <label className="block text-sm font-medium text-gray-400">Email Address</label>
              <div className={`relative transform transition-all duration-300 ${focusedField === 'email' ? 'scale-105' : 'scale-100'}`}>
                <FaEnvelope className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-gray-200' : 'text-gray-500'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full pl-12 pr-12 py-3 bg-black/30 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'
                  }`}
                  placeholder="Enter your email"
                />
                {email && !errors.email && /\S+@\S+\.\S+/.test(email) && (
                  <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                )}
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center space-x-1 animate-shake">
                  <span>⚠️</span><span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Phone Number</label>
            <div className={`relative transform transition-all duration-300 ${focusedField === 'phone' ? 'scale-105' : 'scale-100'}`}>
              <FaPhone className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'phone' ? 'text-gray-200' : 'text-gray-500'}`} />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField('')}
                className={`w-full pl-12 pr-12 py-3 bg-black/30 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 ${
                  errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                placeholder="Enter phone number (94XXXXXXXXX)"
                maxLength={11}
              />
              {phoneNumber && !errors.phoneNumber && /^94\d{9}$/.test(phoneNumber) && (
                <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              )}
            </div>
            {errors.phoneNumber && (
              <p className="text-red-400 text-sm flex items-center space-x-1 animate-shake">
                <span>⚠️</span><span>{errors.phoneNumber}</span>
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Password</label>
            <div className={`relative transform transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : 'scale-100'}`}>
              <FaLock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'password' ? 'text-gray-200' : 'text-gray-500'}`} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                className={`w-full pl-12 pr-12 py-3 bg-black/30 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                placeholder="Enter password"
                disabled={!isNameValid}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-200 transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm flex items-center space-x-1 animate-shake">
                <span>⚠️</span><span>{errors.password}</span>
              </p>
            )}
            {password && passwordStrength && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Password Strength:</span>
                <span className={`text-sm font-medium ${getPasswordStrengthColor(passwordStrength)}`}>
                  {passwordStrength}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">Confirm Password</label>
            <div className={`relative transform transition-all duration-300 ${focusedField === 'confirmPassword' ? 'scale-105' : 'scale-100'}`}>
              <FaLock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'confirmPassword' ? 'text-gray-200' : 'text-gray-500'}`} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField('')}
                className={`w-full pl-12 pr-12 py-3 bg-black/30 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
                placeholder="Confirm your password"
                disabled={!isNameValid}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-200 transition-colors duration-300"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm flex items-center space-x-1 animate-shake">
                <span>⚠️</span><span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isFormInvalid || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-gray-100 transition-all duration-300 transform ${
              isFormInvalid || isLoading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 hover:scale-105 active:scale-95'
            } focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl`}
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </div>
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-gray-700/50">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-gray-200 font-medium transition-colors duration-300 hover:underline"
              type="button"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
