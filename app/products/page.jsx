"use client"
import { useContext, useState, useEffect, useMemo } from "react";


import Link from "next/link";

import { Card } from "@nextui-org/card";
import { Pagination } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Image } from "@nextui-org/image";

import styles from "./page.module.css"

export default function ProductsPage() {

    const items = [
        {
            name: "Producto 1",
            priceCode: "ABC123",
            line: "Linea A",
            style: "Estilo 1",
            size: "Talla M",
            shape: "Redondo",
            finish: "Mate",
            color: ["Rojo", "Azul"],
            thumbnails: "https://staticnew-prod.topdoctors.com.ar/article/7516/image/large/unas-de-acrilico-belleza-y-moda-vs-salud-1628705692.jpg",
          },
          {
            name: "Producto 2",
            thumbnails: "https://staticnew-prod.topdoctors.com.ar/article/7516/image/large/unas-de-acrilico-belleza-y-moda-vs-salud-1628705692.jpg",
            priceCode: "DEF456",
            line: "Linea B",
            style: "Estilo 2",
            size: "Talla L",
            shape: "Cuadrado",
            finish: "Brillante",
            color: ["Verde"],
          },
          {
            name: "Producto 3",
            thumbnails: "https://staticnew-prod.topdoctors.com.ar/article/7516/image/large/unas-de-acrilico-belleza-y-moda-vs-salud-1628705692.jpg",
            priceCode: "GHI789",
            line: "Linea C",
            style: "Estilo 1",
            size: "Talla S",
            shape: "Triangular",
            finish: "Mate",
            color: ["Negro", "Blanco"]
          },
        {
            name: "Producto 4",
            priceCode: "ABC123",
            line: "Linea A",
            style: "Estilo 1",
            size: "Talla M",
            shape: "Redondo",
            finish: "Mate",
            color: ["Rojo", "Azul"],
            thumbnails: "https://staticnew-prod.topdoctors.com.ar/article/7516/image/large/unas-de-acrilico-belleza-y-moda-vs-salud-1628705692.jpg",
          },
          {
            name: "Producto 5",
            thumbnails: "https://staticnew-prod.topdoctors.com.ar/article/7516/image/large/unas-de-acrilico-belleza-y-moda-vs-salud-1628705692.jpg",
            priceCode: "DEF456",
            line: "Linea B",
            style: "Estilo 2",
            size: "Talla L",
            shape: "Cuadrado",
            finish: "Brillante",
            color: ["Verde"],
          },
          {
            name: "Producto 6",
            thumbnails: "https://staticnew-prod.topdoctors.com.ar/article/7516/image/large/unas-de-acrilico-belleza-y-moda-vs-salud-1628705692.jpg",
            priceCode: "GHI789",
            line: "Linea C",
            style: "Estilo 1",
            size: "Talla S",
            shape: "Triangular",
            finish: "Mate",
            color: ["Negro", "Blanco"]
          }
        // Agrega más productos aquí según sea necesario
      ];


    return (
        <div className="container">
            <div className={`w-full flex flex-col container mx-auto `}>
                <h1 className="mx-auto my-6">Hola Nena Como te llamas Cuanto Me Amas?</h1>
                <h2 className="mx-auto mb-6 text-justify w-5/6">Lorem, ipsum dolor sit 
                amet consectetur adipisicing elit. Animi unde laudantium accusamus, ab
                 fugit illum ratione eius eum alias earum laboriosam tempora voluptatem
                  corrupti quo atque ex sed, excepturi quisquam?</h2>
            </div>

            <div className="container mx-auto">
                <div className={`${styles.container}`}>
                    {items.map((item, index) => (

                        <Card className={styles.card} shadow="sm" key={item._id} isPressable as={Link} href={`products/details?id=${item._id}`}>
                            <div >
                                <Image alt="Thumbnail Producto Catavia" className={styles.img} src={item.thumbnails ? item.thumbnails : "/defaultProduct.png"} />
                            </div>
                            <div className={styles.footer} >
                                <p className={styles.text}>{item.name}</p>
                            </div>
                        </Card>

                    ))}
                </div>
                {/* <div className="grid place-content-center m-6">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div> */}
            </div>
        </div>
    );
}
