import { ai } from "../config/ai.js";

export const analyzeResume = async (resumeText) => {
  const prompt = `
    You are an expert ATS (Applicant Tracking System) Resume Analyzer with over 10 years of experience evaluating candidate profiles against technical and industry standards.

Your task is to analyze the resume provided below and return a comprehensive analysis formatted strictly as valid JSON.

### Rules & Formatting
- Do NOT include any intro, outro, preamble, markdown code fence blocks outside of the JSON, or conversational filler.
- Your entire response MUST be valid, parseable JSON.
- Ensure all array elements are actionable, concrete, and specific (avoid generic feedback like "add more skills").

### Output Schema
{
  "atsScore": // Integer between 0 and 100 based on ATS 
  "overallScore": 0, // Integer between 0 and 100 based on ATS readability, structure, and content quality
  "strengths": [
    "Specific strong point about experience, formatting, or metrics"
  ],
  "weaknesses": [
    "Specific area of concern or structural flaw"
  ],
  "missingSkills": [
    "High-value keyword or technical skill missing relative to typical industry roles"
  ],
  "suggestions": [
    "Actionable, step-by-step recommendation for improvement"
  ]
}

### Resume:
    [${resumeText}]
    `;

  const response = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
  });

  try {
    return JSON.parse(response.output_text);
  } catch (error) {
    throw new ApiError(500, "Failed to parse AI response");
  }
};
