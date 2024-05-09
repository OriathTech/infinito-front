
"use client"

import { Button } from '@nextui-org/button';
import { DeleteIcon } from '@/app/admin/components/icons/DeleteIcon/DeleteIcon';

import styles from "./ElementTable.module.css"
import { useEffect } from 'react';

export default function ElementTable({items, updateQuantity, deleteElement}) {

    useEffect(()=> {
        console.log("Items:", items)
    }, [])

    return (
        <div className="overflow-x-auto">
            <table className={`${styles.tabla}`}>
                <thead className={`${styles.tableHead}`}>
                    <tr>
                        <th className={`${styles.tableHeadStart} py-2 px-4`}>Nombre</th>
                        <th className={`py-2 px-4 md-px-4`}>Precio</th>
                        <th className={`py-2 px-4`}>Cantidad</th>
                        <th className={`py-2 px-4`}>Total</th>
                        <th className={`${styles.tableHeadEnd} py-2 px-4`}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {!Array.isArray(items) ? (
                        console.log(typeof (inputExtras))
                    ) : (
                        items.map(item => (
                            <tr key={item._id} className={`${styles.tr} border-b text-center`}>
                                <td className="py-2 px-4">{item.name}</td>
                                <td className="py-2 px-4">{item.price}</td>
                                <td className="py-2 px-4">
                                    <div className={`flex h-full place-content-around justify-evenly items-center`}>
                                        <input
                                            type="number"
                                            value={item.quantity ? item.quantity : 1}
                                            onChange={(e) => updateQuantity(parseInt(e.target.value), item)}
                                            min="1"
                                            max="9999"
                                            inputMode="numeric"
                                            className={`w-16 rounded-lg text-center`}
                                        />
                                    </div>
                                </td>
                                <td className="py-2 px-4">{item.total}</td>
                                <td className="py-2 px-4">
                                    <Button onClick={() => deleteElement(item._id)} className={`p-2 bg-red-500 text-white`} radius="full" isIconOnly>
                                        <DeleteIcon />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}