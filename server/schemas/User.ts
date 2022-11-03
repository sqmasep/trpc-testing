import { Schema, model } from "mongoose";

interface UserSchema {
  username: string;
  password: string;
}

const userSchema = new Schema<UserSchema>({
  username: {
    type: String,
    required: [true, "Ce champ est requis"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model("User", userSchema);
