import { analyzeResume } from "./ai.service.js";
import uploadResume from "./imagekit.service.js";
import { extractTextFromPdf } from "./parser.service.js";
import Analysis from "../models/analysis.model.js";

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
