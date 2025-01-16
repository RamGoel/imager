import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Imager</h1>
        <p className="text-gray-600 mb-6">
          A group of image manipulation tools
        </p>
        <button
          onClick={() => navigate("/all-tools")}
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-md"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
