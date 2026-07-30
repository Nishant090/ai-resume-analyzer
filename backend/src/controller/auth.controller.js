import * as authService from "../services/auth.service.js";


//@POST /api/v1/auth/register
export const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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
//@POST /api/v1/auth/login
export const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        success:true,
        message:"Login successfull",
        user

    })
  } catch (error) {
   
    next(error);
  }
};
//@GET / api/v1/auth/me
export const getMe= async(req,res)=>{
    return res.status(200).json({
        success:true,
        user:{
            id:req.user._id,
            name:req.user.name,
            email:req.user.email
        }
    })
}