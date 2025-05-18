import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const logout = useAuthStore((state) => (state.logout));
  const authUser = useAuthStore((state) => (state.authUser));

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.flexBetween}>
          <div className={styles.flexGap}>
            <Link to="/" className={styles.logoLink}>
              <div className={styles.logoIcon}>
                <MessageSquare className={styles.icon} />
              </div>
              <h1 className={styles.logoText}>APP NAME</h1>
            </Link>
          </div>

          <div className={styles.flexGapSmall}>
            <Link to={"/settings"} className={styles.btn}>
              <Settings className={styles.iconSmall} />
              <span className={styles.hideOnSmall}>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={styles.btn}>
                  <User className={styles.icon} />
                  <span className={styles.hideOnSmall}>Profile</span>
                </Link>

                <button className={styles.flexGap} onClick={logout}>
                  <LogOut className={styles.icon} />
                  <span className={styles.hideOnSmall}>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
