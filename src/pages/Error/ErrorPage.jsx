import { useRouteError, useNavigate } from 'react-router-dom';
import { FiHome } from 'react-icons/fi'; // Importing home icon from react-icons

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/home');
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-teal-400"
      onClick={handleNavigation}
    >
      <div
        className="bg-white shadow-lg rounded-lg p-10 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-5 left-5">
          <div className="group relative flex items-center">
            <FiHome
              size={24}
              className="text-blue-500 cursor-pointer"
              onClick={handleNavigation}
            />
            <span className="ml-2 whitespace-nowrap absolute left-full transform -translate-y-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Home Page
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! 404 Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          <i className="text-italic m-5">{error.statusText || error.message}</i>
        </p>
        {/* You can add more content or buttons as needed */}
      </div>
    </div>
  );
}
