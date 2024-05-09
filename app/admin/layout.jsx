import AdminNavbar from "./components/AdminNavbar/AdminNavbar"
import styles from "./layout.module.css"

export default function AdminLayout({ children }) {
    return (
        <main className={styles.main}>
            <AdminNavbar />
            <div className={`${styles.container} w-4/5 lg:w-3/5 xl:w-8/12 mx-auto mt-4 mb-8`}>
                {children}
            </div>
        </main>
    )
}
