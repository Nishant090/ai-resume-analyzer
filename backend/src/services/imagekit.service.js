import { imagekit } from "../config/imageKit.js";

const uploadResume = async (file) => {
  const stringfyBuffer = file.buffer.toString("base64");
  const response = await imagekit.files.upload({
    file: stringfyBuffer,
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/ai-resume-analyzer/resumes",
    useUniqueFileName: true,
  });

  return {
    name: response.name,
    fileId: response.fileId,
    url: response.url,
  };
};

export default uploadResume;
