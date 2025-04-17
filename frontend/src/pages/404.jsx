import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300">
            Go to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;