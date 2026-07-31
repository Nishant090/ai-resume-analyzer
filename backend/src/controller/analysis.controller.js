import * as analysisService from "../services/analysis.service.js";
import { APIError } from "@imagekit/nodejs";

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        messsage: "Please upload resume",
      });
    }

    const uploadedFile = await analysisService.uploadResumeFile(req.file);

    return res.status(201).json({
      success: true,
      messsage: "Pdf uploaded successfully",
      uploadedFile,
    });
  } catch (error) {
    console.log(error)
    next(err);
  }
};
