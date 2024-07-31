import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      default: "",
      required: true,
    },
    avatar_url: {
      type: String,
      default:
        "https://nr3wrniofl.execute-api.ap-south-1.amazonaws.com/avatars/user_avatar.png",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", UserSchema);
