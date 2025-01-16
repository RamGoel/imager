"use client";

import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Resize = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [imageSrc, setImageSrc] = useState<string>("");

  const handleResize = async () => {
    const file = uploadedImage;
    if (!file) {
      toast.error("Please upload an image");
      return;
    }
    try {
      toast.loading("Removing background...");
      const formData = new FormData();
      console.log(file);
      formData.append("file", file);

      const response = await axiosInstance.post(`/remove-bg`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer", // Add this to properly handle binary data
      });
      toast.dismiss();

      const contentType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: contentType });

      const url = URL.createObjectURL(blob);
      console.log(url);
      setImageSrc(url);
    } catch {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl text-white font-bold">Remove Background</h1>
      <hr className="opacity-40" />

      <div className="flex gap-3 items-center justify-start">
        <div className="bg-neutral-800 text-white flex items-center h-[50px] px-4 rounded-md">
          <input type="file" onChange={handleImageChange} />
        </div>
      </div>

      <button
        disabled={!uploadedImage}
        className="bg-blue-500 w-[200px] disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-md"
        onClick={handleResize}
      >
        Remove Background
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
