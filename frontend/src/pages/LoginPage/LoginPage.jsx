import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const login = useAuthStore((state) => (state.login));
  const isLoggingIn = useAuthStore((state) => (state.isLoggingIn));

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className={styles.page}>
      <div className={styles.leftSide}>
        <div className={styles.formWrapper}>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formControl}>
              <label className={styles.label}>
                <span className={styles.labelText}>Email</span>
              </label>
              <div className={styles.inputWrapper}>
                <div className={styles.iconLeft}>
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
              <div className={styles.inputWrapper}>
                <div className={styles.iconLeft}>
                  <Lock className={styles.icon} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className={styles.iconRightBtn}
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

            <button type="submit" className={styles.btnPrimary} disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className={`${styles.icon} ${styles.spin}`} />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className={styles.textCenter}>
            <p className={styles.textSecondary}>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className={styles.linkPrimary}>
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
