"use client"
import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import { Button } from "@nextui-org/button";

import { ArrowLeftIcon } from "../icons/ArrowLeftIcon/ArrowLeftIcon";
import { ArrowRightIcon } from "../icons/ArrowRightIcon/ArrowRightIcon";

import CarouselCard from "./components/CarouselCard/CarouselCard";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import styles from "./Carousel.module.css"


  export default function Carousel() {
    const [domLoaded, setDomLoaded] = useState(false);

    const featuredProducts = [
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
  
    useEffect(() => {
      setDomLoaded(true);
    }, []);
  
    return (
      <div className={`${styles.container} mx-auto`}>
        <h1 className={styles.title}>Productos Destacados</h1>
        <>
          {domLoaded && (
            <>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={20}
                loop={true}
                // autoplay={{
                //   delay: 2000,
                //   disableOnInteraction: false,
                // }}
                pagination={{
                  clickable: true,
                }}
                navigation={{
                  nextEl: `.next`,
                  prevEl: `.prev`,
                  clickable: true,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className={styles.swiper}
              >
                {featuredProducts.map((item, index) => (
                  <SwiperSlide key={item._id} className={styles.slide}>
                    <CarouselCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={`  ${styles.controlsContainer}`}>
                <div className={`prev  ${styles.slider_arrow}`}>
                  <Button className={` ${styles.btn}`} isIconOnly startContent={<ArrowRightIcon />} />
                </div>
  
                <Button as={Link} href="/products" className={styles.button} size="lg" radius="full">
                  Ver más
                </Button>
  
                <div className={`next ${styles.slider_arrow}`}>
                  <Button className={styles.btn} isIconOnly startContent={<ArrowLeftIcon />} />
                </div>
              </div>
            </>
          )}
        </>
      </div>
    );
  }
  