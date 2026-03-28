const mongoose = require("mongoose");


/**
 * job description : String
 * resume text : String
 * self description : String
 * 
 * - matchScore : Number
 * 
 * technical questions : 
 *          [{
 *             question : "",
 *             intention : "",
 *             answer : "",
 *          }]
 * behavioral questions : [
 *         {
 *            question : "",
 *           intention : "",
 *          answer : "",
 *         }]
 * Skill gap analysis : [{
 *           skill : "",
 *           severity : {
 *             type : String,
 *            enum : ["low", "medium", "high"]}
 *        }]
 * preparation plan : [{
 *          Day : Number,
 *          focus : String,
 *          tasks : [String]
 * }]
 * 
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required :  [true, "Question is required"]
    },
    intention : {
        type : String,
        required :  [true, "Intention is required"]
    },
    answer : {
        type : String,
        required :  [true, "Answer is required"]
    }
},{
    _id : false
}) 


const behavioralQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required :  [true, "Question is required"]
    },
    intention : {
        type : String,
        required :  [true, "Intention is required"]
    },
    answer : {
        type : String,
        required :  [true, "Answer is required"]
    }
},{
    _id : false
})

const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true, "Skill is required"]
    },
    severity : {
        type : String,
        enum : ["low", "medium", "high"],
        required : [true, "Severity is required"]
    }
},{
    _id : false
})

const preparationPlanSchema = new mongoose.Schema({
    day : {
        type : Number,
        required : [true, "Day is required"]
    },
    focus : {
        type : String,
        required : [true, "Focus is required"]
    },
    tasks : [{
        type : String,
        required : [true, "At least one task is required"]
    }]
},{
    _id : false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String, 
        required : [true, "Job description is required"]
 },
    resumeText : {
        type : String, 
    },
    selfDescription : {
        type : String, 
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100,
    },
    strengths : [{ type: String }],
    weaknesses : [{ type: String }],
    suggestions : [{ type: String }],
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGapAnalysis : [skillGapSchema],
    preparationPlan : [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true  
    }
},{
    timestamps : true
})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema);

module.exports = interviewReportModel;