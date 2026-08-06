import api from "../api/axios.js";

export const uploadResume = async (formData) => {
  const response = await api.post("/analysis/uploads", formData);
  return response.data;
};