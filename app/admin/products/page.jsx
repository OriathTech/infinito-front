"use client"
import { useState, useMemo, useCallback, useContext } from "react";
import { ProductContext } from "@/context/products/products";
import Link from "next/link";
import styles from "./page.module.css"


import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, Pagination, } from "@nextui-org/react";
import { capitalize } from "../../../utils/utils";

//Icons
import { PlusIcon } from "../components/icons/PlusIcon/PlusIcon";
import { SearchIcon } from "../components/icons/SearchIcon/SearchIcon";
import { ChevronDownIcon } from "../components/icons/ChevronDownIcon/ChevronDownIcon";
import { DeleteIcon } from "../components/icons/DeleteIcon/DeleteIcon";
import { ModifyIcon } from "../components/icons/ModifyIcon/ModifyIcon";
import { Toaster, toast } from "sonner";

const statusColorMap = {
    online: "success",
    offline: "danger",
    featured: "secondary"
};

const columns = [
    { name: "ID", uid: "_id" },
    { name: "NOMBRE", uid: "name", sortable: true },
    { name: "CATEGORIA", uid: "category" },
    { name: "PRECIO", uid: "price", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACCIONES", uid: "actions" }
];

const statusOptions = [
    { name: "Online", uid: "online" },
    { name: "Offline", uid: "offline" },
    { name: "Featured", uid: "featured" }
];

const INITIAL_VISIBLE_COLUMNS = ["name", "category", "price", "status", "actions"];

export default function ProductsTablePage() {
    const { products, deleteProduct } = useContext(ProductContext);

    const [filterValue, setFilterValue] = useState("");
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "name",
        direction: "ascending"
    });
    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    //DeleteElement
    const handleDeleteElement = async (id) => {
        try {
            const response = await deleteProduct(id)
            if (response.status === "success") {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Error en el servidor. Intente mas tarde")
        }
    }

    //filtro por nombre
    const filteredItems = useMemo(() => {
        let filteredProducts = [...products];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                product.category.some((cat) => cat.toLowerCase().includes(filterValue.toLowerCase()))
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredProducts = filteredProducts.filter((product) =>
                Array.from(statusFilter).includes(product.status),
            );
        }

        return filteredProducts;
    }, [products, filterValue, statusFilter]);


    //Numero de paginas
    const pages = Math.ceil(filteredItems.length / rowsPerPage);


    //Paginado
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);


    //Orden de items
    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    //Paginacion
    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    //Formato de los items
    const renderCell = useCallback((product, columnKey) => {
        const cellValue = product[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "category":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue.join(', ')}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="solid">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex gap-3">
                        <Button as={Link} href={`/admin/products/details?id=${product._id}`} size="sm" color="primary" variant="solid">
                            <ModifyIcon size={18} />
                        </Button>

                        <Button onClick={() => {
                            toast.warning(`Estas seguro? Se eliminara el producto: ${product.name}`, {
                                action: {
                                    label: 'Eliminar',
                                    onClick: () => handleDeleteElement(product._id)
                                },
                                cancel: {
                                    label: 'Cancelar',
                                    onClick: () => console.log('Cancel!')
                                },
                                duration: 10000
                            })
                        }} size="sm" color="danger" variant="solid">
                            <DeleteIcon size={20} />
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);


    //Contenido superior
    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 px-6 py-6">
                <div className="flex flex-col-reverse md:flex-row justify-between gap-3 items-center">
                    <Input
                        isClearable
                        className="w-full lg:max-w-[33%]"
                        placeholder="Buscar por nombre..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex justify-center md:justify-end w-full gap-3 ">
                        <Dropdown>
                            <DropdownTrigger className="">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="faded">
                                    Estado
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="faded">
                                    Columnas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-small">Total {products.length} productos</span>
                    <label className="flex items-center text-small">
                        Filas por página:
                        <select
                            className="bg-transparent outline-none text-small mx-1"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        products.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    //Contenido inferior
    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center gap-4">
                <div>
                    <Button color="primary" variant="shadow" as={Link} href="/admin/products/create" endContent={<PlusIcon />}>
                        Nuevo
                    </Button>
                </div>

                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="faded" onPress={onPreviousPage}>
                        Anterior
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="faded" onPress={onNextPage}>
                        Siguiente
                    </Button>
                </div>
            </div>
        );
    }, [items.length, page, pages, hasSearchFilter]);

    return (
        <>
            <Toaster position="top-right" richColors />
            <Table
                aria-label="Tabla de productos con paginación y busqueda."
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: `${styles.wrapper}`,
                    th: `${styles.tableHeader}`,
                    tbody: `${styles.tableBody}`,
                    td: `${styles.tableCell}`,
                    tr: `${styles.tableRow}`,
                    emptyWrapper: `${styles.emptyWrapper}`
                }}
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No se han encontrado productos"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}