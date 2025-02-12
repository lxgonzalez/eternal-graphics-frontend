import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../components/auth/userLogin"; // Asegúrate de que la ruta sea correcta
import { UserContext } from "../components/auth/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const result = await userLogin(email, password);

    if (result.success) {
      setUserData(result.userData); // Actualiza el contexto con los datos del usuario
      navigate("/"); // Redirige a la página principal
    } else {
      setErrors({
        ...errors,
        password: result.message || "An error occurred",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-300 to-violet-400">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl overflow-auto">
        <h2 className="text-2xl font-light text-center mb-4 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-300 text-white p-2 rounded-md hover:bg-pink-400 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">Don't have an account?</p>
          <Link to="/register" className="text-violet-400 hover:text-violet-500">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
