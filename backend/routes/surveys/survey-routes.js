import express from "express";
import { saveSurveyData, getSurveyData } from "../../controllers/surverys/survey-controller.js";

const router = express.Router();

router.route("/")
      .post(saveSurveyData)

router.route("/:id")
      .get(getSurveyData)
export default router;