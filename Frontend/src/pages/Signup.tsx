import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/Signup/SignupForm";
import BackgroundDecorations from "../components/Signup/BackgroundDecorations";
import LogoHeader from "../components/Signup/LogoHeader";

const Signup = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  type SignupErrors = {
    name?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  };
  
  const [errors, setErrors] = useState<SignupErrors>({});
  const [passwordStrength, setPasswordStrength] = useState(""); // Not used, can be removed
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Removed unused calculatePasswordStrength

  const getPasswordStrengthColor = (strength: string) => {
    switch (strength) {
      case "Strong": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "Weak": return "text-orange-400";
      case "Very Weak": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  useEffect(() => {
    const newErrors: SignupErrors = {};

    if (name && name.length < 8) {
      newErrors.name = "Name must be at least 8 characters";
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }

    if (phoneNumber && !/^94\d{9}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must start with 94 followed by 9 digits";
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password) {
      if (
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[!@#$%^&*]/.test(password)
      ) {
        newErrors.password =
          "Must include lowercase, uppercase, and special character";
      }
    }

    setErrors(newErrors);
    // No return value needed
  }, [name, phoneNumber, email, password, setErrors]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
      <BackgroundDecorations />
      <div className={`w-full max-w-2xl mx-auto p-6 relative z-10 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <LogoHeader />
        <SignupForm
          name={name}
          setName={setName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errors={errors}
          setErrors={setErrors}
          passwordStrength={passwordStrength}
          getPasswordStrengthColor={getPasswordStrengthColor}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          isNameValid={isNameValid}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          navigate={navigate}
        />
      </div>
    </section>
  );
}

export default Signup;