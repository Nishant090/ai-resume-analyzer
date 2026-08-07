import * as analysisService from "../services/analysis.service.js";

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        messsage: "Please upload resume",
      });
    }

    const savedAnalysis = await analysisService.analyzeResumeFile(
      req.file,
      req.user._id,
    );

    return res.status(201).json({
      success: true,
      messsage: "Analyzed resume successfully",
      analysis: savedAnalysis,
    });
  } catch (error) {
    next(err);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const history = await analysisService.getHistory(req.user._id);

    res.status(200).json({
      success: true,
      message: "fetched successfully",
      history,
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalysisById = async (req, res, next) => {
  try {
    const analysis = await analysisService.oneAnalysis(
      req.params.id,
      req.user._id,
    );

    res.status(200).json({
      success: true,
      message: "Fetched analysis successfully",
      analysis,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAnalysis = async (req, res, next) => {
  try {
    await analysisService.deleteAnalysis(req.params.id, req.user._id);
    res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
