import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creater: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creater id is required!"],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || new model("Prompt", promptSchema);

export default Prompt;
