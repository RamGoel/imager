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

    const contentType = response.headers["content-type"];
    const blob = new Blob([response.data], { type: contentType });

    const url = URL.createObjectURL(blob);
    console.log(url);
    setImageSrc(url);
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
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-white font-bold mb-4">Resize</h1>

      <div className="flex gap-3 items-center justify-start">
        <input
          className="bg-gray-200 p-2 rounded-md"
          type="file"
          onChange={handleImageChange}
        />
        <input
          className=" p-2 rounded-md"
          type="number"
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
        <input
          className=" p-2 rounded-md"
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>

      <button
        className="bg-blue-500 w-[200px] text-white p-2 rounded-md"
        onClick={handleResize}
      >
        Resize
      </button>

      {imageSrc && (
        <Image
          width={300}
          height={300}
          src={imageSrc}
          alt="Resized Image"
          className="mt-3 object-cover"
        />
      )}
    </div>
  );
};

export default Resize;
