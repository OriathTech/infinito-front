"use client"
import Link from "next/link";
import styles from "./AdminNavbar.module.css"
import { usePathname } from "next/navigation";

//Icons
import { CakeIcon } from "../icons/CakeIcon/CakeIcon";
import { StrawberryIcon } from "../icons/StrawberryIcon/StrawberryIcon";
import { BagIcon } from "../icons/BagIcon/BagIcon";
import { UserIcon } from "../icons/UserIcon/UserIcon";
import { MenuIcon } from "../icons/MenuIcon/MenuIcon";

export default function AdminNavbar() {
    const pathname = usePathname()

    return (
        <div className={`${styles.navbar} px-6 py-6 w-4/5`}>
            <ul className={`${styles.navbarNav}`}>
                <li className={styles.navItem}>
                    <Link href="/admin" className={`${styles.navLink} ${pathname === '/admin' ? styles.active : ''}`} prefetch={true}>
                        <MenuIcon className={styles.svg} />
                        <span className={styles.linkText}>Inicio</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/admin/products" className={`${styles.navLink} ${pathname === '/admin/products' ? styles.active : ''}`} prefetch={true}>
                        <CakeIcon className={styles.svg} />
                        <span className={styles.linkText}>Productos</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/admin/ingredients" className={`${styles.navLink} ${pathname === '/admin/ingredients' ? styles.active : ''}`} prefetch={true}>
                        <StrawberryIcon className={styles.svg} />
                        <span className={styles.linkText}>Ingredientes</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/admin/extras" className={`${styles.navLink} ${pathname === '/admin/extras' ? styles.active : ''}`} prefetch={true}>
                        <BagIcon />
                        <span className={styles.linkText}>Extras</span>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/admin/users" className={`${styles.navLink} ${pathname === '/admin/users' ? styles.active : ''}`} prefetch={true}>
                        <UserIcon />
                        <span className={styles.linkText}>Usuarios</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
