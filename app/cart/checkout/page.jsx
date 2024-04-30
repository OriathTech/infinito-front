"use client"

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Link from "next/link";
import styles from "./page.module.css";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    province: "",
    city: "",
    street: "",
    number: "",
    floor: "",
    apartment: "",
    postalCode: "",
    observations: "",
  });

  const cart = {
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
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  };

  const calculateTotalWithShipping = () => {
    return calculateTotalPrice() + cart.deliveryFee;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={`${styles.container} container mx-auto my-5 p-4`}>
      <h2 className="my-5 pl-2">Checkout</h2>
      <div className="my-5 pl-2">
        <Accordion>
          <AccordionItem
            className="bg-stone-200 rounded-xl px-5"
            key="1"
            aria-label="Resumen del pedido"
            title="Resumen del pedido"
          >
            <p>Total de la compra: ${calculateTotalPrice()}</p>
            <p>Costo de envío: ${cart.deliveryFee}</p>
            <p>Total con envío: ${calculateTotalWithShipping()}</p>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <h3 className="my-5 pl-2">Detalles del envio</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Nombre y Apellido"
            placeholder="Nombre y Apellido"
            className="my-5"
            value={formData.name}
            name="name"
            onChange={handleChange}
            required
          />
          <div className="flex my-5 gap-5">
            <Input
              type="text"
              label="Provincia"
              placeholder="Provincia"
              value={formData.province}
              name="province"
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Ciudad"
              placeholder="Ciudad"
              value={formData.city}
              name="city"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex my-5 gap-5">
            <Input
              type="text"
              label="calle"
              placeholder="calle"
              value={formData.street}
              name="street"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              label="Numero"
              placeholder="Numero"
              value={formData.number}
              name="number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex my-5 gap-5">
            <Input
              type="text"
              label="piso"
              placeholder="piso"
              value={formData.floor}
              name="floor"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              label="Depto"
              placeholder="Depto"
              value={formData.apartment}
              name="apartment"
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              label="codigo postal"
              placeholder="codigo postal"
              value={formData.postalCode}
              name="postalCode"
              onChange={handleChange}
              required
            />
          </div>
          <Input
            type="text"
            label="observaciones"
            placeholder="observaciones"
            value={formData.observations}
            name="observations"
            onChange={handleChange}
            required
          />
          <div className="flex mt-5 justify-between">
            <Button
              className={`${styles.text} ${styles.btn} text-white`}
              type="submit"
              radius="full"
              color="success"
            >
              {" "}
              Confirmar Pedido{" "}
            </Button>
            <Button
              className={`${styles.text} ${styles.btn} text-white`}
              type="button"
              onClick={() => console.log("handleCheckout")}
              radius="full"
              color="success"
            >
              {" "}
              Confirmar Pedido{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
