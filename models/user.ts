import {Schema, model, models} from "mongoose";

const userSchema = new Schema(
  {
    name: {type: String},
    username: {type: String, unique: true, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    password: {type: String, required: true},
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {type: String},
  },
  {timestamps: true},
);

export const User = models.User || model("User", userSchema);
