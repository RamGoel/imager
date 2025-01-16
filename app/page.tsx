import Link from "next/link";

const Landing = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-5xl text-center text-black font-bold mb-4">
          Imager
        </h1>
        <p className="text-gray-600 text-center mb-6">
          A group of image manipulation tools
        </p>
        <Link href="/tools">
          <button className="bg-blue-500 w-full text-white px-4 py-2 rounded-md">
            Get Started
          </button>
        </Link>
        <p className="text-gray-600 text-sm mt-4 text-center">
          Created by{" "}
          <Link href="https://ramgoel.com" className="text-blue-500 underline">
            @RamGoel
          </Link>{" "}
          using Next15 & FastAPI
        </p>
      </div>
    </div>
  );
};

export default Landing;

