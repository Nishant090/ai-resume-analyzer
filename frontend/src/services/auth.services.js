import api from "../api/axios.js"

export const register = async(userData)=>{
    const response = await api.post("/auth/register",userData)
    return response.data
}

export const login = async(credentials)=>{
    const response = await api.post("/auth/login",credentials)
    console.log(response)
    return response.data
}

export const logout = async()=>{
    const response = await api.post("/auth/logout")
    return response.data
}

export const getUserData = async()=>{
    const response = await api.get("/auth/me")
    return response.data
}