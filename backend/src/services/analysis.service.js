import uploadResume from "./imagekit.service.js";
import { extractTextFromPdf } from "./parser.service.js";

export const uploadResumeFile = async (file) => {
  const uploadedFile = await uploadResume(file);
  const extractedText = await extractTextFromPdf(file.buffer)


  return {
    uploadedFile,
    extractedText
  }
};
