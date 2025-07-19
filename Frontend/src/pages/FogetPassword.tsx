import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackgroundDecorations from "../components/Login/BackgroundDecorations";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ email?: string; phone?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  // Animate in
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const validate = () => {
    const tempErrors: { email?: string; phone?: string } = {};
    if (!email) tempErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) tempErrors.email = "Invalid email format";
    if (!phone) tempErrors.phone = "Phone number is required";
    else if (!/^94\d{9}$/.test(phone)) tempErrors.phone = "Phone must start with 94 and have 11 digits";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors({});
    setSuccess("");
    try {
      const response = await fetch("http://localhost:3000/doctor/forgetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("✅ Password reset instructions sent to your email.");
        setTimeout(() => navigate("/resetpassword"), 2000);
      } else {
        setErrors({ general: data.message || "❌ Failed to send reset instructions" });
      }
    } catch (error) {
      setErrors({ general: "🔌 Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
      <BackgroundDecorations />
      <div className={`w-full max-w-md mx-auto p-6 relative z-10 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-black/20 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-800/60">
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-tight drop-shadow-lg">Forgot Password</h2>
            <p className="text-gray-400 text-center mb-4 text-sm">Enter your registered email and phone number to receive password reset instructions.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && <div className="p-3 rounded-lg border bg-green-500/20 border-green-500/50 text-green-300 text-center animate-fade-in">{success}</div>}
              {errors.general && <div className="p-3 rounded-lg border bg-red-500/20 border-red-500/50 text-red-300 text-center animate-fade-in">{errors.general}</div>}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-black/30 border text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'}`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-400 text-sm animate-shake mt-1">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-black/30 border text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'}`}
                  placeholder="Enter your phone number (e.g. 947XXXXXXXX)"
                  disabled={isLoading}
                  autoComplete="tel"
                />
                {errors.phone && <p className="text-red-400 text-sm animate-shake mt-1">{errors.phone}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-black hover:bg-gray-900 text-white font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
                disabled={isLoading}
              >
                {isLoading ? <span className="flex items-center justify-center"><span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>Sending...</span> : "Send Reset Instructions"}
              </button>
              <button
                type="button"
                className="w-full py-3 rounded-lg bg-black hover:bg-gray-900 text-white font-medium mt-2 transition-all duration-300 border border-gray-700"
                onClick={() => navigate("/resetpassword")}
                disabled={isLoading}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
