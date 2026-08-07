import api from "../api/axios.js";

export const getAnalysisFromId = async (id) => {
  const response = await api.get(`/analysis/${id}`);
  return response.data;
};

