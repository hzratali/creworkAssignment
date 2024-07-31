import mongoose, { Types } from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      required: true,
      default: "",
    },
    priority: {
      type: String,
      default: "",
    },
    deadline: {
      type: Date,
      required: false,
    },
    user: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model("tasks", TaskSchema);
