const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-6">Page not found</p>
        <a
          href="/dashboard"
          className="text-blue-500 underline hover:text-blue-600"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
