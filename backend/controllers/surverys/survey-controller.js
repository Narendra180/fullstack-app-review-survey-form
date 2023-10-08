import SubmissionModel from "../../models/submission-model.js";
import asyncHandler from "express-async-handler";

const getSurveyData = asyncHandler(async (req,res) => {
  const id = req.params.id;
  const submission = await SubmissionModel.findOne({_id: id});
  if(!submission) throw new Error("There is no submission with the given id!");
  res.status(200).json({
    success: true,
    data: submission
  })
})

const saveSurveyData = asyncHandler(async (req,res) => {
  const formData = req.body;
  const submission = await SubmissionModel.create({
    ...formData
  });
  res.status(201).json({
    success: true,
    data: submission
  });
})

export {  
          getSurveyData,
          saveSurveyData
       }