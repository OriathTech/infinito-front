"use client"

import { ArrowLeftIcon } from "@/app/components/icons/ArrowLeftIcon/ArrowLeftIcon";
import { ArrowRightIcon } from "@/app/components/icons/ArrowRightIcon/ArrowRightIcon";

import { useContext, useState, useEffect } from "react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import { Toaster, toast } from "sonner";

import styles from "./page.module.css";

export default function ProductDetailsPage() {
    const product = {
        name: "Producto 1",
        priceCode: "ABC123",
        line: "Linea A",
        style: "Estilo 1",
        size: "Talla M",
        shape: "Redondo",
        finish: "Mate",
        color: ["Rojo", "Azul"],
        thumbnails: "https://staticnew-prod.topdoctors.com.ar/article/7516/image/large/unas-de-acrilico-belleza-y-moda-vs-salud-1628705692.jpg",
    }

    const [domLoaded, setDomLoaded] = useState(false);
    const [quantity, setQuantity] = useState(1);

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

    return (
        <div className={`container mx-auto my-10 pt-7 px-7 ${styles.container}`} >
            <Toaster position="top-right" richColors />
            <div className={`grid mb-2 grid-cols-12 gap-2 ${styles.containerTarjeta}`}>
                <div className={`lg:col-span-5  row-span-4 col-span-12 ${styles.containerImg}`}>
                    <div className={`${styles.containerImg} h-0 `}>
                        <div className={`${styles.containerImg} `}>
                            <img alt="Card background" className={`${styles.img} object-cover rounded-xl`} src={product.thumbnails ? product.thumbnails : "/defaultProduct.png"} />
                        </div>
                    </div>

                </div>
                <div className={`h-full lg:col-span-7 row-span-3 grid grid-cols-1 gap-2 col-span-12 ml-0 lg:ml-6`}>
                    <div className={`col-span-1 row-span-2 `}>
                        <p className={`${styles.title} `}>{product.name}</p>
                        <p className={styles.text}>Linea: {product.line}</p>
                        <p className={styles.text}>Estilo: {product.style}</p>
                        <p className={styles.text}>Tamaño: {product.size}</p>
                        <p className={styles.text}>Forma: {product.shape}</p>
                        <p className={styles.text}>Acabado: {product.finish}</p>
                    </div>

                    <div className={`col-span-1 row-span-6`}>
                        <p className={`mb-3 ${styles.text}`}>
                            <span className={`flex items-center gap-4 ${styles.sub}`}>
                                Recordatorio:
                            </span>
                            Para realizar un pedido de mis productos,
                            te pido amablemente que lo hagas
                            con al menos 3 días de anticipación. De esta manera,
                            puedo asegurarme de prepararlo todo con el cuidado y
                            la atención que mereces.
                        </p>
                        <Input
                            isRequired
                            type="text"
                            label="Ancho de uña en mm"
                            defaultValue=""
                            className="max-w"
                        />
                    </div>

                    <div className={`col-span-1 row-span-2 flex flex-col sm:flex-row sm:place-content-around items-center ${styles.containerCantidad}`}>
                        <p className={`${styles.sub}`}>${product.priceCode}</p>
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
                        <Button className={`${styles.text} ${styles.btn}`} onClick={console.log("hola")} color="primary">
                            Agregar al carrito
                        </Button>
                    </div>

                    <div>
                        <Accordion>
                            <AccordionItem key="1" aria-label="medicion de uña" title="medicion de uña">
                                <p className="mb-2">Opción 1: Para medir, debes comenzar con tus uñas naturales. Con
                                    una cinta métrica, sostén sobre la uña en la parte más ancha, 
                                    generalmente en la mitad de la uña. Debes de sostener la cinta 
                                    horizontalmente y permitir que se doble con la uña natural para 
                                    obtener la medida real, en milímetros.</p>
                                <p className="mb-2">Opción 2: Si utilizas una regla plana no plegable, toma un trozo 
                                    de celofán, colócalo sobre la uña en la parte más ancha, lado a 
                                    lado, horizontalmente. Coge un marcador o bolígrafo y haz una marca 
                                    donde este cada lado de la uña. Luego, puedes quitar la cinta de la 
                                    uña y colocarla sobre la regla. Esto le permitirá medirlo con la curva
                                     natural de su uña.</p>
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="RETIRADA" title="Retirada">
                                <p className="mb-2">1. Mete tus manos en agua caliente (lo más que aguantes sin quemarte)
                                     y jabón durante aproximadamente 5 minutos.</p>
                                <p className="mb-2">2. Retira suavemente la uña con un palito de naranjo. NO fuerces la 
                                    extracción. Si es necesario, continúa remojando las uñas e intenta 
                                    nuevamente.</p>
                                <p className="mb-2">3. Para poder reutilizar tus uñas press on pásale la lima con un 
                                    tono eléctrico para limpiar suavemente cualquier pegamento 
                                    acumulado en la parte posterior de las uñas, de esta forma 
                                    siempre estarán como nuevas y tendrán muchas más vidas.</p>

                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Aplicacion" title="Aplicacion">
                                <p className="mb-2">1. Empuja hacia atrás tus cutículas con el palo de madera de naranjo.</p>
                                <p className="mb-2">2. Con el buffer elimina el brillo de la uña asegurándote de que 
                                    no quede ninguna parte de la uña sin realizar, esto permitirá 
                                    que sus press on se adhieran a tu uña mucho mejor.</p>
                                <p className="mb-2">3. Deshidrata tus uñas con la toallita de alcohol. Esto eliminará 
                                    la humedad y la grasa de tus uñas.</p>
                                <p className="mb-2">USO A CORTO PLAZO: Adhiera cada uña usando las pestañas adhesivas 
                                    para uñas, pegándola las pestañas primero en tus uñas, después 
                                    les quitas la pestaña de plástico y coloca tu uña press on y haz 
                                    presión durante 10/20 segundos.</p>
                                <p className="mb-2">USO A LARGO PLAZO: Aplique una capa delgada de pegamento para uñas
                                     a tu uña natural y en la uña press on (trata de no inundar la 
                                     uña con pegamento y evita que penetre en tu piel), sostén la 
                                     uña press on firmemente en su lugar durante 10/20 segundos.</p>
                            </AccordionItem>
                        </Accordion>
                    </div>

                </div>
            </div>

        </div>

    )
}