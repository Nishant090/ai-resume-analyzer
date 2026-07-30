import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/apiError.js";

export const register = async ({ name, email, password }) => {
  // all fields are required
  
  if (!name || !email || !password) {
    throw new ApiError(400,"All fields are required");
  }

  // checking existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409,"User already exists");
  }

  //creating user
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
