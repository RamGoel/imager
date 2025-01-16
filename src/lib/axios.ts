import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export const getFormDataFromImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
};
