import api from "../api/axios.js";

export const getAnalysisFromId = async (id) => {
  const response = await api.get(`/analysis/${id}`);
  return response.data;
};

export const getAllAnalyses = async () => {
  const response = await api.get(`/analysis/history`);
  console.log(response.data)
  return response.data;
};

export const deleteAnalysis = async (id) => {
  const response = await api.delete(`/analysis/${id}`);
  return response.data;
};
