import { useState, useEffect } from "react";
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  Smartphone,
  ChevronRight,
  Activity
} from "lucide-react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Define interfaces for type safety
interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// FeatureCard component with proper prop types
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-500/50">
      <Icon className="h-10 w-10 text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Login Component
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in", { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>
        <div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Sign In
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Signup Component
const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up", { email, password, name });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h2>
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Homepage Component
const Homepage: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const heroImage = "/background.jpg"; // Reference image from public folder

  const features: Feature[] = [
    {
      icon: FileText,
      title: "Digital Health Records",
      description: "Secure, comprehensive digital health records accessible anytime, anywhere."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "HIPAA-compliant security ensuring your medical data is always protected."
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Access your health information and schedule appointments round the clock."
    },
    {
      icon: Users,
      title: "Care Team Collaboration",
      description: "Seamless communication between you, doctors, and healthcare providers."
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description: "Track vital signs, medications, and health metrics in real-time."
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Full-featured mobile experience for managing health on the go."
    }
  ];

  // Handle image loading
  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">HealthCare Records</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-100" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Health Records,
                  <span className="block bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">Simplified & Secure</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Take control of your healthcare with our comprehensive digital health record system. 
                  Access, manage, and share your medical information securely.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-blue-600 text-white group px-6 py-3 rounded-full hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/login"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium transition-colors duration-300"
                >
                  Login to Account
                </Link>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>24/7 Access</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className={`transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <img 
                  src={heroImage} 
                  alt="Modern healthcare technology background"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-white"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl" />
              </div>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-2xl">
                  <div className="animate-pulse bg-gray-300 h-full w-full rounded-2xl" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to manage your health records, 
              communicate with healthcare providers, and stay on top of your wellness journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Revolutionizing Healthcare Records
              </h2>
              <p className="text-lg text-gray-600">
                We believe that managing your health should be simple, secure, and accessible. 
                Our digital health record system puts you in control of your medical information 
                while ensuring the highest standards of privacy and security.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Unified Health Data</h3>
                    <p className="text-gray-600">All your medical records in one secure place</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Easy Sharing</h3>
                    <p className="text-gray-600">Share records with healthcare providers instantly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Smart Insights</h3>
                    <p className="text-gray-600">AI-powered health insights and recommendations</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-blue-100 rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Ready to get started?</h3>
                <p className="text-gray-600">
                  Join thousands of patients who trust us with their healthcare records.
                </p>
                <Link 
                  to="/signup"
                  className="w-full sm:w-72 md:w-80 lg:w-96 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-full hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-md"
                >
                  Create Your Account
                </Link>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    to="/login"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">HealthCare Records</span>
            </div>
            <p className="text-gray-600">
              © 2025 HealthCare Records. Secure healthcare management.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;