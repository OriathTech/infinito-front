"use client"
import { useSearchParams } from 'next/navigation';
import { useContext, useState, useEffect } from "react"
import { useRouter } from 'next/navigation';

import { ProductContext } from "@/context/products/products"
import { ElementsContext } from '@/context/elements/elements';
import { SessionContext } from '@/context/session/session';

import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';
import { CircularProgress } from "@nextui-org/progress";
import { Toaster, toast } from 'sonner';

import ElementDropdown from '../components/ElementDropdown/ElementDropdown';
import ElementTable from '../components/ElementTable/ElementTable';
import UploadImg from '../components/UploadImg/UploadImg';

import styles from "./page.module.css"

const productCategories = [
    { label: "Catering", value: "catering" },
    { label: "Chocolatería", value: "chocolatería" },
    { label: "Desayunos", value: "desayunos" },
    { label: "Frutales", value: "frutales", },
    { label: "Individuales", value: "individuales" },
    { label: "Panificados", value: "panificados" },
    { label: "Postres", value: "postres" },
    { label: "Regalos", value: "regalos" },
    { label: "Salados", value: "salados" },
    { label: "Tartas", value: "tartas" },
    { label: "Temporada", value: "temporada" },
    { label: "Tortas", value: "tortas" }
]

const productStatus = [
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" },
    { label: "Featured", value: "featured" },
]

export default function ProductDetailsAdminPage() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const { products, getProductById, deleteProduct, updateProduct } = useContext(ProductContext);
    const { ingredients, extras } = useContext(ElementsContext);
    const { session } = useContext(SessionContext);

    const [product, setProduct] = useState(null);

    // Form Inputs
    const [inputName, setInputName] = useState("");
    const [inputDescription, setInputDescription] = useState("")
    const [inputCategory, setInputCategory] = useState([]);
    const [inputStatus, setInputStatus] = useState([]);
    const [inputIngredients, setInputIngredients] = useState([]);
    const [inputExtras, setInputExtras] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        if (productId) {
            const product = getProductById(productId);
            if (product) {
                setProduct(product);
                setInputName(product.name);
                setInputDescription(product.description);
                setInputCategory(product.category);
                setInputStatus([product.status]);

                const elements = product.elements.map((element) => {
                    const total = element.quantity * element.price;
                    return { ...element, total: total };
                });

                const ingredientElements = elements.filter(element => element.category === 'ingredient');
                const extraElements = elements.filter(element => element.category === 'extra');

                setInputIngredients(ingredientElements);
                setInputExtras(extraElements);
            }
        }
    }, [products]);

    useEffect(() => {
        const totalIngredients = inputIngredients.reduce((total, ingredient) => total + ingredient.total, 0);

        const totalExtras = inputExtras.reduce((total, extra) => total + extra.total, 0);

        const totalGeneral = totalIngredients + totalExtras;

        setTotalPrice(totalGeneral);
    }, [inputIngredients, inputExtras]);

    const handleSubmit = async () => {
        const allElements = [...inputIngredients, ...inputExtras];

        const elements = allElements.map(element => {
            const { total, ...elementWithoutTotal } = element;
            return elementWithoutTotal;
        });

        const info = {
            name: inputName,
            description: inputDescription,
            category: Array.from(inputCategory),
            status: Array.from(inputStatus)[0],
            elements: elements
        }

        try {
            const response = await updateProduct(productId, info);
            if (response.status === "success") {
                toast.success(response.message)
                router.push("")
            } else {
                toast.error(response.message)
            }

        } catch (error) {
            toast.error("Hubo un problema en el servidor. Intente mas tarde.")
        }
    }

    const handleDeleteProduct = async () => {
        try {
            const response = await deleteProduct(productId)
            if (response.status === "success") {
                toast.success(response.message)
                router.push("/admin/products")
            } else {
                toast.error(response.message)
            }

        } catch (error) {
            toast.error("Hubo un problema en el servidor. Intente mas tarde")
        }
    }


    const updateQuantityIngredient = (newQuantity, item) => {
        let quantity = newQuantity
        if (isNaN(newQuantity) || newQuantity === 0) {
            quantity = 1
        }
        const updatedArray = inputIngredients.map((ingredient) => {
            if (ingredient._id === item._id) {
                const newTotal = parseFloat((quantity * ingredient.price).toFixed(2))
                return { ...ingredient, quantity: quantity, total: newTotal };
            } else {
                return ingredient;
            }
        });

        setInputIngredients(updatedArray);
    };

    const updateQuantityExtra = (newQuantity, item) => {
        let quantity = newQuantity
        if (isNaN(newQuantity) || newQuantity === 0) {
            quantity = 1
        }
        const updatedArray = inputExtras.map((extra) => {
            if (extra._id === item._id) {
                const newTotal = parseFloat((quantity * extra.price).toFixed(2))
                return { ...extra, quantity: quantity, total: newTotal };
            } else {
                return extra;
            }
        });

        setInputExtras(updatedArray);
    };

    const addIngredient = (ingredient) => {

        const ingredientIndex = inputIngredients.findIndex((i) => i._id === ingredient._id);

        if (ingredientIndex !== -1) {
            return
        };

        const ingredientToAdd = {
            _id: ingredient._id,
            name: ingredient.name,
            price: ingredient.price,
            category: ingredient.category,
            quantity: 1,
            total: ingredient.price
        };

        setInputIngredients((prev) => ([...prev, ingredientToAdd]));
    }

    const addExtra = (extra) => {
        const extraIndex = inputExtras.findIndex((i) => i._id === extra._id);

        if (extraIndex !== -1) {
            return
        };

        const extraToAdd = {
            _id: extra._id,
            name: extra.name,
            price: extra.price,
            category: extra.category,
            quantity: 1,
            total: extra.price
        };

        setInputExtras((prev) => ([...prev, extraToAdd]));
    }

    const deleteIngredient = (id) => {
        setInputIngredients((prevElements) => prevElements.filter((element) => element._id !== id));
    }

    const deleteExtra = (id) => {
        setInputExtras((prevElements) => prevElements.filter((element) => element._id !== id));
    }

    return (
        <>
            <Toaster position="top-right" richColors />
            {!product ? (
                <div className={`grid place-items-center ${styles.containerLoading}`}>
                    <CircularProgress color="primary" size="lg" aria-label="Buscando Producto..." label="Buscando Producto..." />
                </div>
            ) : (
                <div className={`container mx-auto my-4 p-4`} >
                    <h1 className={`p-5 ${styles.title}`}>Modificar Producto</h1>

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
                            <Textarea
                                label="Descripción"
                                type="text"
                                isRequired={true}
                                labelPlacement="outside"
                                placeholder="Ingresa una descripción"
                                defaultValue={inputDescription}
                                classNames={{
                                    base: `${styles.input}`,
                                }}
                                onValueChange={(value) => setInputDescription(value)}
                            />
                        </div>
                        <div className={`flex flex-col gap-8 ${styles.containerInputs}`}>
                            <Select
                                label="Categorías"
                                labelPlacement="outside"
                                isRequired={true}
                                selectionMode="multiple"
                                placeholder="Selecciona Categorías"
                                selectedKeys={inputCategory}
                                classNames={{
                                    base: `${styles.input}`,
                                }}
                                onSelectionChange={setInputCategory}
                            >
                                {productCategories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </Select>

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
                                {productStatus.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>


                    {session?.role === "admin" ? (
                        <>
                            <div className={`flex flex-col xl:flex-row justify-around gap-4 p-5`}>
                                <div className={`flex flex-col gap-4 ${styles.containerInputs} my-4`}>
                                    <div className={`flex flex-row items-center`}>
                                        <h2 className='ml-3 mr-8'>Ingredientes</h2>
                                        <ElementDropdown items={ingredients} addElement={addIngredient} />
                                    </div>
                                    <ElementTable items={inputIngredients} updateQuantity={updateQuantityIngredient} deleteElement={deleteIngredient} />
                                </div>

                                <div className={`flex flex-col gap-4 ${styles.containerInputs} my-4`}>
                                    <div className={`flex flex-row items-center`}>
                                        <h2 className='ml-3 mr-8'>Extras</h2>
                                        <ElementDropdown items={extras} addElement={addExtra} />
                                    </div>
                                    <ElementTable items={inputExtras} updateQuantity={updateQuantityExtra} deleteElement={deleteExtra} />
                                </div>
                            </div>

                            <div className='flex justify-around flex-col md:flex-row gap-6 md:items-end p-5'>
                                <Button
                                    onClick={() => {
                                        toast.warning(`Estas seguro? Se eliminara el producto: ${product.name}`, {
                                            action: {
                                                label: 'Eliminar',
                                                onClick: () => handleDeleteProduct()
                                            },
                                            cancel: {
                                                label: 'Cancelar',
                                                onClick: () => console.log('Cancel!')
                                            },
                                            duration: 10000
                                        })
                                    }} size="sm" color="danger" variant="solid" className={styles.input}>
                                    Eliminar Producto
                                </Button>

                                <Input
                                    isReadOnly
                                    type='number'
                                    label="Total"
                                    placeholder="Total"
                                    labelPlacement="outside"
                                    value={totalPrice}
                                    classNames={{
                                        base: `${styles.input}`,
                                    }}
                                    className="w-fit"
                                />

                                <Button className={styles.input} color="primary" variant="solid" onClick={() => handleSubmit()}>
                                    Guardar Cambios
                                </Button>
                            </div>
                            <UploadImg item={product} />
                        </>

                    ) : (
                        <h2 className={`${styles.title}`}>No tenes los permisos necesarios para modificar el producto.</h2>
                    )}
                </div>
            )}
        </>
    )
}


