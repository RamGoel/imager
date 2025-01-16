import { axiosInstance, getFormDataFromImage } from "../../lib/axios";
import { tools } from "../../lib/data";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getImageDimensions } from "../../lib/utils";

const Resize = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [result, setResult] = useState<string | null>(null);

  const tool = tools.find((tool) => tool.slug === "image-resizer");

  const handleResize = async () => {
    if (!uploadedImage || !dimensions.width || !dimensions.height) {
      toast.error("Please upload an image and set dimensions");
      return;
    }
    toast.loading("Resizing image...");
    const formData = await getFormDataFromImage(uploadedImage);

    axiosInstance
      .post(`/resize`, formData, {
        params: { width: dimensions.width, height: dimensions.height }, // Query parameters
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.dismiss();
          const contentType = res.headers["content-type"];
          console.log(contentType);

          const blob = new Blob([res.data], { type: contentType });
          console.log(blob);
          const url = URL.createObjectURL(blob);
          console.log(url);
          setResult(url);
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.error);
        console.log(err);
      });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;

    if (selectedFile) {
      setUploadedImage(selectedFile);
      const dimensions = await getImageDimensions(selectedFile);
      setDimensions(dimensions);
    }
  };

  return (
    <div className="bg-gray-100 h-screen p-6">
      <h1 className="text-2xl font-bold mb-2">{tool?.name}</h1>
      <p className="text-gray-600">{tool?.description}</p>

      <form action="" className="flex flex-col gap-2 mt-5">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 rounded-md border border-gray-300"
        />
        <input
          type="number"
          value={dimensions.width}
          placeholder="Width"
          onChange={(e) =>
            setDimensions({ ...dimensions, width: Number(e.target.value) })
          }
          className="w-full p-2 rounded-md border border-gray-300"
        />
        <input
          type="number"
          placeholder="Height"
          value={dimensions.height}
          onChange={(e) =>
            setDimensions({ ...dimensions, height: Number(e.target.value) })
          }
          className="w-full p-2 rounded-md border border-gray-300"
        />
      </form>

      {uploadedImage && (
        <div>
          <img
            className="w-[300px] mt-4 h-[300px] object-cover"
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded"
          />
          <button
            disabled={!uploadedImage}
            onClick={handleResize}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Resize
          </button>
        </div>
      )}

      {result && (
        <div>
          <img
            className="w-[300px] mt-4 h-[300px] object-cover"
            src={result}
            alt="Resized"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => window.open(result, "_blank")}
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default Resize;
