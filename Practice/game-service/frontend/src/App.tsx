import { Outlet, NavLink } from "react-router-dom";
import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1 className={styles.logo}>🎮 GameStore</h1>
                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                        end
                    >
                        Каталог
                    </NavLink>
                    <NavLink
                        to="/create"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.active}` : styles.link
                        }
                    >
                        + Добавить игру
                    </NavLink>
                </nav>
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default App;