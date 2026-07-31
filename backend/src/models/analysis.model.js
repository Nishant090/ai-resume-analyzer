import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: Object.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalFileName: {
      type: String,
      required: true,
    },
    imagekitUrl: {
      type: String,
      required: true,
    },
    imagekitFileId: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      required: true,
    },

    analysis: {
      overallScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      strengths: {
        type: [String],
        default: [],
      },
      weaknesses: {
        type: [String],
        default: [],
      },
      missingSkills: {
        type: [String],
        default: [],
      },
      suggestions: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true },
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
