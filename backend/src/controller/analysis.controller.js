import * as analysisService from "../services/analysis.service.js";

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        messsage: "Please upload resume",
      });
    }

    const savedAnalysis = await analysisService.analyzeResumeFile(req.file,req.user._id);
    
  
    return res.status(201).json({
      success: true,
      messsage: "Analyzed resume successfully",
      analysis:savedAnalysis
    });
  } catch (error) {
    console.log(error)
    next(err);
  }
};
