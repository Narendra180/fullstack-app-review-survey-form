import mongoose from "mongoose";

const submissionSchema = mongoose.Schema({
  usageFrequency: {
    type: String,
    required: true,
    enum: {
      values: ["daily", "weekly", "monthly", "rarely", "first time"],
      message: `{value} is not valid.`
    }
  },
  appGoal: {
    type: String,
    required: true,
    enum: {
      values: ["information", "chat", "entertainment", "buy", "socialize", "other"],
      message: `{value} is not valid.`
    }
  },
  userExperienceRating: {
    type: String,
    required: true,
    enum: {
      values: ["very bad", "bad", "not good", "okay", "good", "very good", "excellent", "outstandin", "exceptional", "perfect"],
      message: `{value} is not valid.`
    }
  },
  improvementSuggestions: {
    type: String,
    default: ""
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(value) {
        const receivedDate = value;
        const presentDate = new Date();
        const presentYear = presentDate.getFullYear();
        const minDate = new Date(presentYear - 100, 0);
        const maxDate = new Date(new Date().setFullYear(presentYear - 5))

        if(receivedDate <= maxDate && receivedDate >= minDate) {
          return true;
        } else {
          return false;
        }
      },
      message: (props) => `${props.value} is not valid, age should be greater than 5 years.`
    }
  }
}, {
  timeStamps: true
});

const SubmissionModel = mongoose.model("Submission", submissionSchema);

export default SubmissionModel;