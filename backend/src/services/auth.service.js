import User from "../models/user.model";
import generateToken from "../utils/generateToken";

export const register = async ({ name, email, password }) => {
  // all fields are required
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }
  // checking existing user

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};
