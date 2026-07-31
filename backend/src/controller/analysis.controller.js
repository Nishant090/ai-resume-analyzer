import * as analysisService from "../services/analysis.service.js";

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        messsage: "Please upload resume",
      });
    }

    const {uploadedFile, extractedText} = await analysisService.uploadResumeFile(req.file);
    
  

    return res.status(201).json({
      success: true,
      messsage: "Pdf uploaded successfully",
      file:uploadedFile,
      extractedText
    });
  } catch (error) {
    console.log(error)
    next(err);
  }
};
