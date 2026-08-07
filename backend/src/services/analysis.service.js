import { analyzeResume } from "./ai.service.js";
import uploadResume, { deleteResume } from "./imagekit.service.js";
import { extractTextFromPdf } from "./parser.service.js";
import Analysis from "../models/analysis.model.js";

//@POST /api/v1/analysis/uploads
export const analyzeResumeFile = async (file, userId) => {
  const uploadedFile = await uploadResume(file);
  const extractedText = await extractTextFromPdf(file.buffer);
  const analysis = await analyzeResume(extractedText);

  const savedAnalysis = await Analysis.create({
    user: userId,
    originalFileName: file.originalname,
    imagekitUrl: uploadedFile.url,
    imagekitFileId: uploadedFile.fileId,
    extractedText,
    analysis,
  });

  return savedAnalysis;
};

//@GET /api/v1/analysis/history
export const getHistory = async (userId) => {
  const history = await Analysis.find({
    user: userId,
  }).sort({ createdAt: -1 });

  return history;
};

//@GET /api/v1/analysis/:id
export const oneAnalysis = async (analysisId, userId) => {
  const analysis = await Analysis.find({
    _id: analysisId,
    user: userId,
  });

  if (!analysis) {
    throw new ApiError(404, "Analysis not found");
  }
  return analysis;
};

//@DELETE /api/v1/analysis/:id
export const deleteAnalysis = async (analysisId, userId) => {
  const analysis = await Analysis.findOne({
    _id: analysisId,
    user: userId,
  });

  if (!analysis) {
    throw new ApiError(404, "Analysis not found");
  }

  await deleteResume(analysis.imagekitFileId);

  await analysis.deleteOne();
  
  return analysis;
};
