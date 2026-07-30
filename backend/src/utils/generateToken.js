import jwt from "jsonwebtoken";

const generateToken = async (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN || "7d",
  });
};

export default generateToken;
