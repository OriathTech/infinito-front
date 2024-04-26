"use client"
import { useContext, useState, useEffect, useMemo } from "react";
import Filtro from "./components/filtro";


import Link from "next/link";

import { Card } from "@nextui-org/card";
import { Pagination } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Image } from "@nextui-org/image";

import styles from "./page.module.css"

export default function ProductsPage() {
  const filtrados = [
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

  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  const pages = Math.ceil(filtrados.length / productsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    return filtrados.slice(start, end);
  }, [page, filtrados]);

  return (
    <div className="container mx-auto">
      <div className={`w-full flex flex-col container mx-auto `}>
        <h1 className={`${styles.text } mx-auto my-6 px-6`}>Hola Nena Como te llamas Cuanto Me Amas?</h1>
        <h2 className={`${styles.text }  mx-auto mb-6 text-justify w-5/6`}>Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Animi unde laudantium accusamus, ab
          fugit illum ratione eius eum alias earum laboriosam tempora voluptatem
          corrupti quo atque ex sed, excepturi quisquam?</h2>
      </div>
      
      <div>
        <Filtro/>
      </div>

      <div className="container mx-auto">
        <div className={`${styles.container}`}>
          {items.map((item, index) => (

            <Card className={styles.card} shadow="sm" key={item.name} isPressable as={Link} href={`products/details?id=${item._id}`}>
              <div >
                <Image alt="Thumbnail Producto Catavia" className={styles.img} src={item.thumbnails ? item.thumbnails : "/defaultProduct.png"} />
              </div>
              <div className={styles.footer}>
                <div><p className={styles.textName}>{item.name}</p></div>
                <div><p className={styles.textcart}>Tamaño: {item.size}</p></div>
                <div><p className={styles.textcart}>Forma: {item.shape}</p></div>
                <div><p className={styles.textcart}>Estilo: {item.style}</p></div>
                <div><p className={styles.textName}>${item.priceCode}</p></div>
              </div>
            </Card>

          ))}
        </div>
        <div className="grid place-content-center m-6">
          <Pagination
            isCompact
            showControls
            showShadow
            classNames={{
              cursor: `${styles.pagination}`,
          }}
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
