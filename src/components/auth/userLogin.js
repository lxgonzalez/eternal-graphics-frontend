
const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;

export const userLogin = async (email, password) => {
    try {
        const res = await fetch(`${API_GATEWAY}/client/email/${email}`);
        const userData = await res.json();

        if (userData.message === "Client does not exist") {
            return { success: false, message: "The user does not exist" };
        }

        if (userData.password === password) {
            localStorage.setItem("user", JSON.stringify(userData));
            return { success: true, userData };
        } else {
            return { success: false, message: 'Invalid password' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};
