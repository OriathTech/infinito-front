"use client"

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Toaster, toast } from "sonner";

import { ArrowLeftIcon } from "@/app/components/icons/ArrowLeftIcon/ArrowLeftIcon";
import { ArrowRightIcon } from "@/app/components/icons/ArrowRightIcon/ArrowRightIcon";

import styles from "./page.module.css"


export default function Cart() {

  const router = useRouter()

  const [cart, setCart] = useState({
    products: [
      {
        productId: "60f35a1d6f84eb4e6a7354c9",
        name: "Product 1",
        width: 100,
        price: 10,
        quantity: 2,
      },
      {
        productId: "60f35a1d6f84eb4e6a7354ca",
        name: "Product 2",
        width: 150,
        price: 15,
        quantity: 1,
      },
    ],
    deliveryFee: 5,
  });

  const calculateTotalPrice = (item) => {
    return (
      (cart.products.find((product) => product.productId === item.productId)
        ?.quantity || 0) * item.price
    );
  };

  const calculateTotal = () => {
    let total = 0;
    cart.products.forEach((item) => {
      total += calculateTotalPrice(item);
    });
    return total;
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 100) {
      updateQuantityProduct(productId, newQuantity);
    }
  };

  const handleDeleteProductCart = (id) => {
    const response = deleteProductCart(id)
    if (response.status === "success") {
      toast.success(response.message)
      console.log(cart);
    }
  }

  const updateQuantityProduct = (productId, newQuantity) => {
    const updatedProducts = cart.products.map((product) => {
      if (product.productId === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setCart({ ...cart, products: updatedProducts });
    toast.success("Cantidad actualizada correctamente");
  };

  const [postalCode, setPostalCode] = useState("");
  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleAcceptPostalCode = () => {
    if (postalCode !== "") {
      const updatedProducts = [...cart.products, { name: "Envío", price: 1500, quantity: 1 }];
      setCart({ ...cart, products: updatedProducts });
      toast.success("Envío agregado correctamente");
    } else {
      toast.error("Por favor ingresa un código postal válido");
    }
  };

  return (
    <div className={`${styles.container} container mx-auto my-5 p-4`}>
      <Toaster position="top-right" richColors />
      <h1 className={`${styles.title} mb-5`}>Carrito de compras</h1>
      <div className="grid place-content-center">
        {cart.products.length === 0 ? (
          <div className="overflow-x-auto grid place-content-center">
            <p className={`${styles.text} py-2 px-4 mb-8`}>No hay productos en el carrito. Por favor, agregue algunos productos.</p>
            <Button className={`${styles.text} py-2 px-4 mb-5`} radius="full" color="secondary" as={Link} href="/products">
              Volver al Catálogo
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className={`${styles.table}`}>
                <thead className={`${styles.tableHead}`}>
                  <tr>
                    <th className={`${styles.tableHeadStart} py-2 px-4`}>Producto</th>
                    <th className={`py-2 px-4 md-px-4`}>Nombre</th>
                    <th className={`py-2 px-4`}>Ancho</th>
                    <th className={`py-2 px-4`}>Precio Individual</th>
                    <th className={`py-2 px-4`}>Cantidad</th>
                    <th className={`py-2 px-4`}>Precio Total</th>
                    <th className={`${styles.tableHeadEnd} py-2 px-4`}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map(item => (
                    <tr key={item.productId} className={`${styles.text} ${styles.tr} border-b text-center`}>
                      <td className="py-2 px-4"><img src={item.thumnail ? item.thumnail : "/defaultProduct.png"} alt="Producto" className={`${styles.img} h-20 w-20 rounded-lg object-cover mx-auto`} /></td>
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.width}mm</td>
                      <td className="py-2 px-4">${item.price}</td>
                      <td className="py-7 px-4 flex justify-center">
                        <Button className={styles.arrowBtn} isIconOnly startContent={<ArrowRightIcon />} onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)} />
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
                          min="1"
                          max="100"
                          inputMode="numeric"
                          className={`w-16 rounded-lg text-center ${styles.input}`}
                        />
                        <Button className={styles.arrowBtn} isIconOnly startContent={<ArrowLeftIcon />} onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)} />
                      </td>
                      <td className="py-2 px-4">${calculateTotalPrice(item)}</td>
                      <td className="py-2 px-4"><Button className={`${styles.text} ${styles.btn} p-2 bg-red-500 text-white`} onClick={() => handleDeleteProductCart(item.productId)} radius="full" isIconOnly> <ArrowRightIcon />  </Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center my-5">
                <Input type="Number" label="Codigo Postal" color="secondary" placeholder="Ingresa tu codigo postal" value={postalCode} onChange={handlePostalCodeChange} />
                <Button className={`${styles.text} ${styles.btn} bg-blue-500 text-white ml-5`} onClick={handleAcceptPostalCode} radius="full">Aceptar</Button>
            </div>
            <div className="flex justify-center flex-wrap items-center md:justify-end md:gap-4">
              <div className="flex justify-center items-center my-3" >
                <Button className={`${styles.text} ${styles.btn}  bg-red-500 text-white`} onClick={console.log("deleteAllProductsCart")} radius="full"> <ArrowRightIcon /> Eliminar </Button>

                <span className={`${styles.text} px-2 md:px-4`}> Total: ${calculateTotal()}</span>

                <Button className={`${styles.text} ${styles.btn} text-white`} onClick={console.log("handleCheckout")} as={Link} href="/cart/checkout" radius="full" color="success"> Checkout </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
