import { Image } from "@nextui-org/image";
import { NextIcon } from "../icons/NextIcon/nextIcon";
import styles from "./InfoCardSection.module.css"

export default function InfoCardSection() {
    return (
        <div className={styles.container}>
            <div className={`${styles.banner} w-full`}>
                <div className={`${styles.icon}`}>
                    <NextIcon height={"48px"} width={"48px"}/>
                    <h3>Title 1</h3>
                    <p>Description 1Description 1Description 1Description 1Description 1</p>
                </div>
                <div className={`${styles.icon}`}>
                    <NextIcon height={"48px"} width={"48px"}/>
                    <h3>Title 2</h3>
                    <p>Description 2Description 1Description 1Description 1Description 1</p>
                </div>
            </div>
            <div className={`${styles.banner} w-full`}>
                <div className={`${styles.icon}`}>
                    <NextIcon height={"48px"} width={"48px"}/>
                    <h3>Title 1</h3>
                    <p>Description 1Description 1Description 1Description 1Description 1</p>
                </div>
                <div className={`${styles.icon}`}>
                    <NextIcon height={"48px"} width={"48px"}/>
                    <h3>Title 2</h3>
                    <p>Description 2Description 1Description 1Description 1Description 1</p>
                </div>
            </div>

        </div>
    );
}