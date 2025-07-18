const BackgroundDecorations = () => {
return (
    <>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-gray-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Large Background Logo - Full Page Size as Background Image */}
        <div
            className="absolute inset-0 flex items-center justify-center opacity-10"
            style={{
                backgroundImage: "url('/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100vw",
                height: "100vh"
            }}
        />
    </>
);
};

export default BackgroundDecorations;