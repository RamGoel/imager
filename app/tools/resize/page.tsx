"use client";

import { axiosInstance } from "@/lib/axios";
import { getImageDimensions } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Resize = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [imageSrc, setImageSrc] = useState<string>("");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const handleResize = async () => {
    const file = uploadedImage;
    if (!file || !width || !height) {
      toast.error("Please upload an image and set width and height");
      return;
    }
    try {
      toast.loading("Resizing image...");
      const formData = new FormData();
      console.log(file);
      formData.append("file", file);

      const response = await axiosInstance.post(
        `/resize?width=${width}&height=${height}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer", // Add this to properly handle binary data
        }
      );
      toast.dismiss();

      const contentType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: contentType });

      const url = URL.createObjectURL(blob);
      console.log(url);
      setImageSrc(url);
      setUploadedImage(null);
      setWidth(0);
      setHeight(0);
    } catch {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const dimensions = await getImageDimensions(file);
      setWidth(dimensions.width);
      setHeight(dimensions.height);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl text-white font-bold">Resize Image</h1>
      <hr className="opacity-40" />

      <div className="flex gap-3 items-center justify-start">
        <div className="bg-neutral-800 text-white flex items-center h-[50px] px-4 rounded-md">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <input
          className="bg-neutral-800 text-white h-[50px] px-4 rounded-md"
          type="number"
          value={width}
          placeholder="Width"
          onChange={(e) => setWidth(Number(e.target.value))}
        />
        <input
          className="bg-neutral-800 text-white h-[50px] px-4 rounded-md"
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>

      <button
        disabled={!uploadedImage || !width || !height}
        className="bg-blue-500 w-[200px] disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-md"
        onClick={handleResize}
      >
        Resize
      </button>

      {imageSrc && (
        <div>
          <Image
            width={300}
            height={300}
            src={imageSrc}
            alt="Resized Image"
            className="mt-3 object-cover"
          />
          <button
            onClick={() => {
              const a = document.createElement("a");
              a.href = imageSrc;
              a.download = "resized.png";
              a.click();
            }}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default Resize;
