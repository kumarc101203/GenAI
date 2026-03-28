const {GoogleGenAI, Type} = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_API_KEY
})

const questionSchema = {
    type: Type.OBJECT,
    properties: {
        question:  { type: Type.STRING, description: "The question that can be asked during the interview" },
        intention: { type: Type.STRING, description: "The intention of the interviewer behind asking this question" },
        answer:    { type: Type.STRING, description: "How to answer the question, what points to cover, what to avoid, what approach to take, etc." }
    },
    required: ["question", "intention", "answer"]
}

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description. A higher score indicates a better match."
        },
        strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of the candidate's strengths based on their resume, self-description, and how well they match the job description."
        },
        weaknesses: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of the candidate's weaknesses or areas for improvement based on their resume, self-description, and how well they match the job description."
        },
        suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of actionable suggestions for the candidate to improve their chances of success in the interview."
        },
        technicalQuestions: {
            type: Type.ARRAY,
            items: questionSchema,
            description: "Technical questions to assess the candidate's technical knowledge, problem-solving skills, and ability to apply knowledge to real-world scenarios."
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            items: questionSchema,
            description: "Behavioral questions to assess the candidate's soft skills, cultural fit, and how they handle various work situations."
        },
        skillGaps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill:    { type: Type.STRING, description: "The skill in which the candidate is lacking or has room for improvement" },
                    severity: { type: Type.STRING, enum: ["low", "medium", "high"], description: "The severity of the skill gap, indicating how critical it is for the job role" }
                },
                required: ["skill", "severity"]
            },
            description: "Skill gaps are areas where the candidate may lack proficiency or experience."
        },
        preparationPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day:   { type: Type.NUMBER, description: "The day number in the preparation plan" },
                    focus: { type: Type.STRING, description: "The main focus or theme for the day, such as 'Data Structures', 'System Design', 'Behavioral Questions', etc." },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of specific tasks the candidate should complete on that day" }
                },
                required: ["day", "focus", "tasks"]
            },
            description: "A day-by-day preparation plan with actionable steps to prepare for the interview."
        }
    },
    required: ["matchScore", "strengths", "weaknesses", "suggestions", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
}

async function generateInterviewReport({resume, selfDescription, jobDescription}){
    
    const prompt = `Generate a comprehensive interview report for a candidate based on the following information:
    Candidate's Resume: ${resume}
    Candidate's Self-Description: ${selfDescription}
    Job Description: ${jobDescription}`
    
    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents : prompt,
        config : {
            responseMimeType : "application/json",
            responseSchema : interviewReportSchema
        }
    })

    return JSON.parse(response.text)
}

module.exports = generateInterviewReport

