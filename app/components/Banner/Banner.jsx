import styles from "./Banner.module.css"

export default function Banner() {
    return (
        <div className={`${styles.background} mx-auto`}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Infinito Nails</h1>
            </div>
        </div>
    );
}





