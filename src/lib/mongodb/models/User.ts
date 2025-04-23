import mongoose, { InferSchemaType } from "mongoose";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

const userSchema = new mongoose.Schema({
  supabaseId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: Role, default: Role.USER },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export type UserType = InferSchemaType<typeof userSchema>;

export default User;
