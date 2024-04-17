"use client"
import styles from "./CarouselCard.module.css"
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

export default function CarouselCard(item) {
    return (
        <Card as={Link} href={`/products/details?id=${item.item._id}`} className={styles.card} isPressable>
            <div className={styles.body}>
                <Image
                    width={200}
                    height={200}
                    className={styles.cardImg}
                    alt={item.item.name}
                    src={item.item.thumbnails ? item.item.thumbnails : "/defaultProduct.png"}
                />
            </div>
            <div className={styles.footer}>
                <div><p className={styles.textName}>{item.item.name}</p></div>
                <div><p className={styles.text}>Tamaño: {item.item.size}</p></div>
                <div><p className={styles.text}>Forma: {item.item.shape}</p></div>
                <div><p className={styles.text}>Estilo: {item.item.style}</p></div>
                <div><p className={styles.textName}>${item.item.priceCode}</p></div>
            </div>
        </Card>
    );
}