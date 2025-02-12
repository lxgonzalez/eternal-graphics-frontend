import { Link } from "react-router-dom";
import useForm from "./../components/auth/userForm";

const Register = () => {
    const {
        formData,
        setFormData,
        errors,
        setErrors,
        isCodeSent,
        isCodeVerified, // Nuevo estado
        handleInputChange,
        handleSendCode,
        handleVerifyCode,
        message,
        handleRegister,
    } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, passwordMatch: true });
            return;
        }
    
        if (!errors.emailVerified) {
            alert("Please verify your email before submitting.");
            return;
        }

        console.log(formData);
    
        handleRegister(); // Llamamos a la función de registro
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-300 to-violet-400">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl overflow-auto">
                <h2 className="text-2xl font-light text-center mb-4 text-gray-800">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="firstName" className="text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                required
                            />
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="lastName" className="text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                required
                            />
                        </div>
                    </div>

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
                    </div>

                    {isCodeSent && !isCodeVerified && (
                        <div>
                            <label htmlFor="verificationCode" className="block text-gray-700 mt-4">Enter the verification code sent to your email</label>
                            <input
                                type="text"
                                id="verificationCode"
                                name="verificationCode"
                                value={formData.verificationCode}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                required
                                disabled={isCodeVerified}  // Deshabilitar si ya ha sido verificado
                            />
                            <button
                                type="button"
                                onClick={handleVerifyCode}
                                className="w-full bg-violet-400 text-white p-2 rounded-md mt-2 hover:bg-violet-500"
                                disabled={isCodeVerified}  // Deshabilitar si ya ha sido verificado
                            >
                                Verify Code
                            </button>
                        </div>
                    )}

                    {!isCodeSent && (
                        <button
                            type="button"
                            onClick={handleSendCode}
                            className="w-full bg-violet-400 text-white p-2 rounded-md mt-2 hover:bg-violet-500"
                        >
                            Send Verification Code
                        </button>
                    )}

                    {errors.emailVerified && <p className="text-green-500 text-xs">Email verified successfully</p>}
                    {!errors.emailVerified && formData.verificationCode && (
                        <p className="text-red-500 text-xs">{message}</p>
                    )}

                    <div className="flex space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="password" className="text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                required
                            />
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                required
                            />
                            {errors.passwordMatch && (
                                <p className="text-red-500 text-xs">Passwords do not match</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-violet-400"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={formData.terms}
                            onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                            className="mr-2"
                            required
                        />
                        <label htmlFor="terms" className="text-gray-700">
                            I agree to the <span className="text-violet-400">Terms and Conditions</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pink-300 text-white p-2 rounded-md hover:bg-pink-400 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-700">Already have an account?</p>
                    <Link to="/login" className="text-violet-400 hover:text-violet-500">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
