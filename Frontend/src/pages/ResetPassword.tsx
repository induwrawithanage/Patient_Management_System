import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundDecorations from "../components/Login/BackgroundDecorations";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState<{ otp?: string; newPassword?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const validate = () => {
    const tempErrors: { otp?: string; newPassword?: string } = {};
    if (!otp) tempErrors.otp = "OTP is required";
    else if (!/^\d{6}$/.test(otp)) tempErrors.otp = "OTP must be a 6-digit number";
    if (!newPassword) tempErrors.newPassword = "New password is required";
    else if (newPassword.length < 6) tempErrors.newPassword = "Password must be at least 6 characters";
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
      const response = await fetch("http://localhost:3000/doctor/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, newpassword: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("✅ Password has been reset successfully. Redirecting to login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setErrors({ general: data.message || "❌ Failed to reset password" });
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
            <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-tight drop-shadow-lg">Reset Password</h2>
            <p className="text-gray-400 text-center mb-4 text-sm">Enter the OTP sent to your email and your new password.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && <div className="p-3 rounded-lg border bg-green-500/20 border-green-500/50 text-green-300 text-center animate-fade-in">{success}</div>}
              {errors.general && <div className="p-3 rounded-lg border bg-red-500/20 border-red-500/50 text-red-300 text-center animate-fade-in">{errors.general}</div>}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-black/30 border text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'}`}
                  placeholder="Enter the 6-digit OTP"
                  disabled={isLoading}
                  autoComplete="one-time-code"
                />
                {errors.otp && <p className="text-red-400 text-sm animate-shake mt-1">{errors.otp}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-black/30 border text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${errors.newPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 hover:border-gray-600'}`}
                  placeholder="Enter your new password"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                {errors.newPassword && <p className="text-red-400 text-sm animate-shake mt-1">{errors.newPassword}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-black hover:bg-gray-900 text-white font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
                disabled={isLoading}
              >
                {isLoading ? <span className="flex items-center justify-center"><span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>Resetting...</span> : "Reset Password"}
              </button>
              <button
                type="button"
                className="w-full py-3 rounded-lg bg-black hover:bg-gray-900 text-white font-medium mt-2 transition-all duration-300 border border-gray-700"
                onClick={() => navigate("/")}
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

export default ResetPassword;
