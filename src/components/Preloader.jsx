const Preloader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background">
    <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-4" />
    <p className="text-gray-300 text-sm">Loading your portfolio...</p>
  </div>
);

export default Preloader;
