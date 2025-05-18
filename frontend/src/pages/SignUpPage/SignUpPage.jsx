import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import styles from "./SignUp.module.css";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signup(formData);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formBox}>
                    
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formControl}>
                            <label className={styles.label}>
                                <span className={styles.labelText}>Full Name</span>
                            </label>
                            <div className={styles.inputGroup}>
                                <div className={styles.inputIcon}>
                                    <User className={styles.icon} />
                                </div>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Enter your name..."
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.formControl}>
                            <label className={styles.label}>
                                <span className={styles.labelText}>Email</span>
                            </label>
                            <div className={styles.inputGroup}>
                                <div className={styles.inputIcon}>
                                    <Mail className={styles.icon} />
                                </div>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.formControl}>
                            <label className={styles.label}>
                                <span className={styles.labelText}>Password</span>
                            </label>
                            <div className={styles.inputGroup}>
                                <div className={styles.inputIcon}>
                                    <Lock className={styles.icon} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={styles.input}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className={styles.toggleButton}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className={styles.icon} />
                                    ) : (
                                        <Eye className={styles.icon} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className={styles.submitButton} disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className={styles.iconSpin} />
                                    Loading...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className={styles.loginRedirect}>
                        <p className={styles.loginText}>
                            Already have an account?{' '}
                            <Link to="/login" className={styles.loginLink}>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignUpPage;