const LogoHeaderPatient = () => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-2 transform hover:scale-105 transition-transform duration-300">
      <img 
        src="/logo.svg" 
        alt="MediSync Logo" 
        className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg"
      />
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
        Join with MediSync (Patients)
      </h1>
    </div>
  );
};

export default LogoHeaderPatient;