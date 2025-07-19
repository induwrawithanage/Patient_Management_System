// Reusable button component for main CTAs
interface YourButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'a' | 'link';
  to?: string;
}

const YourButton: React.FC<YourButtonProps> = ({ children, className = '', as = 'button', to, ...props }) => {
  const base =
    'inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  const color =
    'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-700';
  const fullClass = `${base} ${color} ${className}`;
  if (as === 'link' && to) {
    // @ts-ignore
    return <Link to={to} className={fullClass}>{children}</Link>;
  }
  if (as === 'a' && to) {
    // Only pass anchor-appropriate props (filter out button-only props)
    const {
      autoFocus,
      hrefLang,
      media,
      rel,
      target,
      download,
      referrerPolicy,
      ...rest
    } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={to}
        className={fullClass}
        autoFocus={autoFocus}
        hrefLang={hrefLang}
        media={media}
        rel={rel}
        target={target}
        download={download}
        referrerPolicy={referrerPolicy}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return <button className={fullClass} {...props}>{children}</button>;
};
import { useState, useEffect } from "react";
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  Smartphone,
  ChevronRight,
  Activity,
  Circle
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="bg-white/5 dark:bg-neutral-950/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800 dark:border-gray-900 hover:border-gray-500/50 dark:hover:border-gray-700/60">
      <Icon className="h-10 w-10 text-gray-400 dark:text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};


// ElegantShape for geometric hero
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={"absolute " + (className || "")}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={
            "absolute inset-0 rounded-full bg-gradient-to-r to-transparent " +
            gradient +
            " backdrop-blur-[2px] border-2 border-white/[0.10] shadow-[0_8px_32px_0_rgba(255,255,255,0.08)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.10),transparent_70%)]"
          }
        />
      </motion.div>
    </motion.div>
  );
}

// Homepage Component
const Homepage: React.FC = () => {
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



  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black dark:bg-black transition-colors duration-500">
      {/* Header */}
      <header className="border-b border-gray-900 bg-white/10 dark:bg-black/40 backdrop-blur-xl sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between min-h-[48px]">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center shadow-md">
              <img
                src="/logo.svg"
                alt="MediSync Logo"
                className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg"
              />
            </div>
            <span className="text-2xl font-bold text-gray-100 tracking-tight">MediSync</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-gray-300 hover:text-white font-medium transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2 rounded-full hover:from-black hover:to-gray-800 transition-all duration-300 shadow-md font-semibold border border-gray-900"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Geometric Gray Theme */}
      <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-neutral-950 to-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-black/10 blur-3xl" />
        {/* Geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-gray-400/[0.10]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-gray-500/[0.10]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-gray-300/[0.10]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />
          <ElegantShape
            delay={0.6}
            width={200}
            height={60}
            rotate={20}
            gradient="from-gray-200/[0.10]"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />
          <ElegantShape
            delay={0.7}
            width={150}
            height={40}
            rotate={-25}
            gradient="from-gray-100/[0.10]"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              custom={0}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.01] border border-white/[0.05] mb-8 md:mb-12"
            >
              <Circle className="h-2 w-2 fill-gray-500/80" />
              <span className="text-sm text-gray-300 tracking-wide">
                HealthCare Records
              </span>
            </motion.div>
            <motion.div
              custom={1}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-200">
                  Your Health Records
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white/80 to-gray-600 ">
                  Simplified & Secure
                </span>
              </h1>
            </motion.div>
            <motion.div
              custom={2}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                Take control of your healthcare with our comprehensive digital health record system. Access, manage, and share your medical information securely.
              </p>
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <YourButton as="link" to="/signup" className="group bg-gradient-to-r from-black to-gray-800 text-white border border-gray-900">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform inline-block align-middle" />
              </YourButton>
              <Link 
                to="/login"
                className="border-2 border-gray-900 text-gray-300 hover:bg-black/40 px-6 py-3 rounded-full font-medium transition-colors duration-300"
              >
                Login to Account
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mt-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>24/7 Access</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-[#18181b]/80 pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-950 to-black dark:from-neutral-950 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-100 mb-4 drop-shadow-lg">
              Comprehensive Healthcare Management
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-100 drop-shadow-lg">
                Revolutionizing Healthcare Records
              </h2>
              <p className="text-lg text-gray-400">
                We believe that managing your health should be simple, secure, and accessible. 
                Our digital health record system puts you in control of your medical information 
                while ensuring the highest standards of privacy and security.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">Unified Health Data</h3>
                    <p className="text-gray-400">All your medical records in one secure place</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">Easy Sharing</h3>
                    <p className="text-gray-400">Share records with healthcare providers instantly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">Smart Insights</h3>
                    <p className="text-gray-400">AI-powered health insights and recommendations</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-black to-neutral-900/80 rounded-2xl p-8 shadow-lg border border-gray-900/80 backdrop-blur-xl">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-100">Ready to get started?</h3>
                <p className="text-gray-400">
                  Join thousands of patients who trust us with their healthcare records.
                </p>
                <YourButton as="link" to="/signup" className="w-full sm:w-72 md:w-80 lg:w-96 bg-gradient-to-r from-black to-gray-800 text-white border border-gray-900">
                  Create Your Account
                </YourButton>
                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link 
                    to="/login"
                    className="text-gray-300 hover:underline font-medium"
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
      <footer className="bg-black/95 border-t border-gray-900/80 py-12 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="flex items-center justify-center shadow-md">
                <img
                  src="/logo.svg"
                  alt="MediSync Logo"
                  className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg"
                />
              </div>
              <span className="text-2xl font-bold text-gray-100 tracking-tight">MediSync</span>
            </div>
          <p className="text-gray-500">
            © 2025 HealthCare Records. Secure healthcare management.
          </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;