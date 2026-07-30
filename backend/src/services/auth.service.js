import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/apiError.js";
 

//Register User
export const register = async ({ name, email, password }) => {
  // all fields are required

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // checking existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
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
//Login User
export const login = async ({ email, password }) => {

  // all fields are required
  if (!email || !password) {
    throw new ApiError(400, "email and password field are required");
  }
  const user = await User.findOne({ email }).select("+password");

  // checking user
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  //comparing password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id)

  return {
    user:{
      id:user._id,
      email:user.email,
      name:user.name
    },
    token
  }
};
