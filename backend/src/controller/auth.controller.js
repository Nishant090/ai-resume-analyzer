import * as authService from "../services/auth.service";

export const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV || "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User register sucessfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
