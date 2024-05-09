"use client"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation";

import { ElementsContext } from '@/context/elements/elements';

import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';
import { Toaster, toast } from "sonner";

import styles from "./page.module.css"

const ingredientStatus = [
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" }
]

export default function IngredientCreateAdminPage() {
    const router = useRouter()
    const { postElement } = useContext(ElementsContext);

    // Form Inputs
    const [inputName, setInputName] = useState("");
    const [inputStatus, setInputStatus] = useState([]);
    const [inputPrice, setInputPrice] = useState(0);

    const handleSubmit = async () => {
        if (!inputName || !inputPrice || !Array.from(inputStatus)[0] ) {
            return toast.error("Hay campos incompletos.")
        }

        const info = {
            name: inputName,
            category: "ingredient",
            price: inputPrice,
            status: Array.from(inputStatus)[0]
        }

        try {
            const response = await postElement(info);
            if (response.status === "success") {
                toast.success(response.message);
                router.push(`/admin/ingredients/details?id=${response.payload._id}`)
            } else {
                toast.error(response.message);
            }

        } catch (error) {
            toast.error("Error en el servidor. Intente mas tarde")
        }
    }

    return (

        <div className={`container mx-auto my-4 p-4`} >
            <Toaster position="top-right" richColors/>
            <h1 className={`p-5 ${styles.title}`}>Crear Ingrediente</h1>
            <div className={`flex flex-col md:flex-row justify-around gap-4 p-5`}>
                <div className={`flex flex-col gap-8 ${styles.containerInputs}`}>
                    <Input
                        label="Nombre"
                        type="text"
                        isRequired={true}
                        labelPlacement="outside"
                        placeholder="Ingresa Nombre"
                        defaultValue={inputName}
                        classNames={{
                            base: `${styles.input}`,
                        }}
                        onValueChange={(value) => setInputName(value)}
                    />

                    <Input
                        label="Precio por Gramo"
                        type="number"
                        isRequired={true}
                        labelPlacement="outside"
                        placeholder="Ingresa un precio"
                        defaultValue={inputPrice}
                        classNames={{
                            base: `${styles.input}`,
                        }}
                        onValueChange={(value) => setInputPrice(parseFloat(value))}
                    />
                </div>
                <div className={`flex flex-col gap-8 ${styles.containerInputs}`}>
                    <Input
                        isReadOnly
                        type='text'
                        isRequired={true}
                        label="Categoría"
                        labelPlacement="outside"
                        value={"Ingrediente"}
                        classNames={{
                            base: `${styles.input}`,
                        }}
                    />

                    <Select
                        label="Status"
                        labelPlacement="outside"
                        isRequired={true}
                        placeholder="Selecciona un status"
                        defaultSelectedKeys={inputStatus}
                        classNames={{
                            base: `${styles.input}`,
                        }}
                        onSelectionChange={setInputStatus}
                    >
                        {ingredientStatus.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                                {status.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>

            <div className='flex justify-around flex-col md:flex-row gap-6 md:items-end p-5'>
                <Button className={styles.input} color="primary" variant="solid" onClick={() => handleSubmit()}>
                    Crear Ingrediente
                </Button>
            </div>

        </div>
    )
}