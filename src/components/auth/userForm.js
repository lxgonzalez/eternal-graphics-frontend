import { useState } from "react";

const URL_API_REGISTER = `${import.meta.env.VITE_API_GATEWAY}/register`;
const useForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        terms: false,
        verificationCode: "",
    });

    const [errors, setErrors] = useState({
        passwordMatch: false,
        emailVerified: false,
    });

    const [isCodeSent, setIsCodeSent] = useState(false);
    const [message, setMessage] = useState("");
    const [isCodeVerified, setIsCodeVerified] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === "confirmPassword") {
            setErrors({
                ...errors,
                passwordMatch: value !== formData.password,
            });
        }
    };

    const handleSendCode = async () => {
        try {
            const response = await fetch(`${URL_API_REGISTER}/send-email`, {
                method: "POST",
                body: JSON.stringify({ email: formData.email }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                if (result.valid != null) {
                    setIsCodeSent(false);
                } else {
                    setIsCodeSent(true);
                }
            }
        } catch (error) {
            console.error("Error sending verification code", error);
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await fetch(`${URL_API_REGISTER}/validate-code`, {
                method: "POST",
                body: JSON.stringify({ email: formData.email, code: formData.verificationCode }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);

                if (result.valid) {
                    setErrors({ ...errors, emailVerified: true });
                    setIsCodeVerified(true);
                } else {
                    setErrors({ ...errors, emailVerified: false });
                }
                setMessage(result.message);
            } else {
                console.error("Error en la validación del código", response.statusText);
            }
        } catch (error) {
            console.error("Error verifying code", error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch(`${URL_API_REGISTER}/register-user`, {
                method: "POST",
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    dob: formData.dob,
                }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                console.log("Registration successful:", formData.email);

                // Guardar usuario en localStorage
                localStorage.setItem('user', JSON.stringify(formData.email));
                window.location.href = "/";
            } else {
                console.error("Error registering user", response.statusText);
            }

        } catch (error) {
            console.error("Error during registration", error);
        }
    };


    return {
        formData,
        setFormData,
        errors,
        setErrors,
        isCodeSent,
        handleInputChange,
        handleSendCode,
        handleVerifyCode,
        message,
        isCodeVerified,
        handleRegister
    };
};

export default useForm;
