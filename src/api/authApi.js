import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

console.log("API URL:", API_URL); 

/* -------------------------------------------------------------------------- */
/*                                LOGIN USER                                  */
/* -------------------------------------------------------------------------- */
const loginUserHandler = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, user);
        console.log("Login successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error.response?.data?.message || error.message);
        return { error: error.response?.data?.message || "Failed to login" };
    }
};

/* -------------------------------------------------------------------------- */
/*                               SIGNUP USER                                  */
/* -------------------------------------------------------------------------- */
const signUpHandler = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users/create`, user);
        console.log("Signup successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error signing up:", error.response?.data?.message || error.message);
        return { error: error.response?.data?.message || "Failed to signup" };
    }
};

/* -------------------------------------------------------------------------- */
/*                               REMOVE USER                                   */
/* -------------------------------------------------------------------------- */
const removeUserHandler = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/users/delete/${id}`);
        console.log("User removed:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error removing user:", error.response?.data?.message || error.message);
        return { error: error.response?.data?.message || "Failed to remove user" };
    }
};

/* -------------------------------------------------------------------------- */
/*                                UPDATE USER                                  */
/* -------------------------------------------------------------------------- */
const updateUserHandler = async (user, id) => {
    try {
        const response = await axios.put(`${API_URL}/users/update/${id}`, user);
        console.log("User updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error.response?.data?.message || error.message);
        return { error: error.response?.data?.message || "Failed to update user" };
    }
};

export { loginUserHandler, signUpHandler, removeUserHandler, updateUserHandler };
