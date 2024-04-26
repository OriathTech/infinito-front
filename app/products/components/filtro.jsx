import { useState, useEffect, useMemo } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

import styles from "./filtro.module.css"

export default function Filtro() {

    const categories = {
        line: [
            { value: "todos", label: "Todos" },
            { value: "linea1", label: "Línea 1" },
            { value: "linea2", label: "Línea 2" },
        ],
        style: [
            { value: "todos", label: "Todos" },
            { value: "estilo1", label: "Estilo 1" },
            { value: "estilo2", label: "Estilo 2" },

        ],
        size: [
            { value: "todos", label: "Todos" },
            { value: "pequeño", label: "Pequeño" },
            { value: "grande", label: "Grande" },

        ],
        shape: [
            { value: "todos", label: "Todos" },
            { value: "forma1", label: "Forma 1" },
            { value: "forma2", label: "Forma 2" },

        ],
        finish: [
            { value: "todos", label: "Todos" },
            { value: "acabado1", label: "Acabado 1" },
            { value: "acabado2", label: "Acabado 2" },

        ],
        color: [
            { value: "todos", label: "Todos" },
            { value: "rojo", label: "Rojo" },
            { value: "azul", label: "Azul" },
        ],
    };


    const [selectedCategories, setSelectedCategories] = useState({
        line: "todos",
        style: "todos",
        size: "todos",
        shape: "todos",
        finish: "todos",
        color: "todos"
    });


    const filterProductsByCategories = (products, selectedCategories) => {
        return products.filter(product => {
            return Object.keys(selectedCategories).every(category => {
                if (selectedCategories[category] === "todos") {
                    return true;
                }
                return product[category] === selectedCategories[category];
            });
        });
    };

    return (
        <div>
            <div className={`flex flex-col justify-center items-center px-2  md:flex-row container`}>
                {Object.keys(selectedCategories).map(category => (
                    <span key={category} className={`${styles.containerDropdown} w-full`}>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className={`capitalize w-full ${styles.textLink}`}
                                    color="secondary"
                                    variant="solid"
                                >
                                    {category}: {selectedCategories[category]}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                classNames={{ base: styles.maxHeightDropdown }}
                                aria-label={`Selection for ${category}`}
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={[selectedCategories[category]]}
                                onSelectionChange={(selected) => setSelectedCategories(prevState => ({ ...prevState, [category]: selected }))}
                                items={categories[category]} 
                            >
                                {(item) => (
                                    <DropdownItem
                                        key={item.value}
                                        onPress={() => setSelectedCategories(prevState => ({ ...prevState, [category]: item.value }))}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                ))}
            </div>
        </div>
    );
}
