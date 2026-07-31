import uploadResume from "./imagekit.service.js";

export const uploadResumeFile = async (file) => {
  const uploadFile = await uploadResume(file);

  return uploadFile;
};
