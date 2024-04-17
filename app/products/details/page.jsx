"use client"

import { useContext, useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { ProductContext } from '@/context/products/products';
import { CartContext } from '@/context/cart/cart';

import { Button } from "@nextui-org/button";
import { Toaster, toast } from "sonner";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { ArrowLeftIcon } from '@/app/components/icons/ArrowLeftIcon/ArrowLeftIcon';
import { ArrowRightIcon } from '@/app/components/icons/ArrowRightIcon/ArrowRightIcon';
import { ExclamationIcon } from '@/app/components/icons/ExclamationIcon/Exclamation';
import { StrawberryIcon } from "@/app/admin/components/icons/StrawberryIcon/StrawberryIcon";

import styles from "./page.module.css";

export default function ProductDetailsPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { getProductById, products } = useContext(ProductContext);
    const { addProductCart } = useContext(CartContext);
    const [product, setProduct] = useState({});
    const [domLoaded, setDomLoaded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const prod = getProductById(id)
        setProduct(prod)
    }, [products])

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const handleAddToCart = () => {
        const response = addProductCart(product, quantity);
        if (response.status === "success") {
            toast.success(response.message)
        }
    };
    const updateQuantity = (operation) => {
        if (operation === 'suma' && quantity < 100) {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else if (operation === 'resta' && quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const inputQuantityValue = (event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            if (newValue < 100 && newValue >= 1) {
                setQuantity(newValue);
            }
        }
    };

    const descriptionIngredients = (ingredients) => {
        if (!ingredients || ingredients.length === 0) {
            return "No hay ingredientes disponibles.";
        }

        const ingredientNombre = ingredients
            .filter(ingredient => ingredient.category === "ingredient")
            .map(ingredient => ingredient.name);
        const nombres = ingredientNombre.join(", ");

        return nombres ? `Este producto está hecho con ${nombres}.` : "No hay ingredientes disponibles.";
    };

    return (
        <div className={`container mx-auto my-10 p-7 border-4 ${styles.container}`} >
            <Toaster position="top-right" richColors/>
            {product && (
                <div className={`grid mb-2 grid-cols-12 gap-2 ${styles.containerTarjeta}`}>
                    <div className={`lg:col-span-5  row-span-4 col-span-12 ${styles.containerImg}`}>
                        <div className={`${styles.containerImg} h-0 `}>
                            <div className={`${styles.containerImg} `}>
                                <>
                                    {domLoaded && (
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={20}
                                            loop={true}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            navigation={true}
                                            modules={[Pagination, Navigation]}
                                            className={styles.swiper}
                                        >
                                            <SwiperSlide className={styles.slide}>
                                                <img alt="Card background" className={`${styles.img} object-cover rounded-xl`} src={product.thumbnails?.first.url ? product.thumbnails.first.url : "/defaultProduct.png"} />
                                            </SwiperSlide>
                                            {product.thumbnails?.second.url && (
                                                <SwiperSlide className={styles.slide}>
                                                    <img alt="Card background" className={`${styles.img} object-cover rounded-xl`} src={product.thumbnails.second.url} />
                                                </SwiperSlide>
                                            )}
                                            {product.thumbnails?.third.url && (
                                                <SwiperSlide className={styles.slide}>
                                                    <img alt="Card background" className={`${styles.img} object-cover rounded-xl`} src={product.thumbnails.third.url} />
                                                </SwiperSlide>
                                            )}
                                        </Swiper>
                                    )}
                                </>
                            </div>
                        </div>

                    </div>
                    <div className={`h-full lg:col-span-7 row-span-3 grid grid-cols-1 gap-2 col-span-12 ml-0 lg:ml-6`}>
                        <div className={`col-span-1 row-span-2 `}>
                            <p className={`${styles.title} `}>{product.name}</p>
                            <>
                                {domLoaded && (product.description ? (
                                    <p className={styles.text}>{product.description}</p>
                                ) : null
                                )}
                            </>
                            <br />
                            <p className={`mb-3 ${styles.text}`}>
                                <span className={`flex items-center gap-4 ${styles.sub}`}>
                                    <StrawberryIcon />Ingredientes:
                                </span>
                                {descriptionIngredients(product.elements)}
                            </p>
                        </div>

                        <div className={`col-span-1 row-span-6`}>
                            <p className={`mb-3 ${styles.text}`}>
                                <span className={`flex items-center gap-4 ${styles.sub}`}>
                                    <ExclamationIcon height={"2rem"} />Recordatorio:
                                </span>
                                Para realizar un pedido de mis productos,
                                te pido amablemente que lo hagas
                                con al menos 3 días de anticipación. De esta manera,
                                puedo asegurarme de prepararlo todo con el cuidado y
                                la atención que mereces.
                            </p>
                        </div>

                        <div className={`col-span-1 row-span-2 flex flex-col sm:flex-row sm:place-content-around items-center ${styles.containerCantidad}`}>
                            <p className={`${styles.sub}`}>Precio Unitario ${product.price}</p>
                            <div className={`flex h-full place-content-around justify-evenly items-center`}>
                                <button onClick={() => updateQuantity('resta')} className={`w-8  h-8`}><ArrowRightIcon /></button>
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={inputQuantityValue}
                                    className={`mx-2 w-16  rounded-lg text-center ${styles.num}`}
                                />
                                <button onClick={() => updateQuantity('suma')} className={`w-8  h-8`}><ArrowLeftIcon /></button>
                            </div>
                            <div className={""}>
                                <p className={`${styles.sub}`}>Total: {quantity * product.price}</p>
                            </div>
                            <Button className={`${styles.text} ${styles.btn}`} onClick={handleAddToCart} color="primary">
                                Agregar al carrito
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>

    )
}