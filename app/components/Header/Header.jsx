"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import {Badge} from "@nextui-org/badge";

import { useState } from "react";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { NextIcon } from "../icons/NextIcon/nextIcon.jsx";
import { CartIcon } from "../icons/CartIcon/CartIcon.jsx";
import { SessionIcon } from "../icons/SessionIcon/SessionIcon.jsx";

import styles from './Header.module.css'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInvisible, setIsInvisible] = useState(false);

    const menuItems = [
        "products",
        "tutorials",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className= {styles.navbar} >
            <NavbarContent className="hidden sm:flex gap-4">
                <NavbarItem>
                    <Link className={styles.link} href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={styles.link} href="/products">
                        Productos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={styles.link} href="/tutorials">
                        Tutoriales
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="center">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <NextIcon height={"5rem"} width={"5rem"}/>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                <Badge color="primary" content={69} isInvisible={isInvisible} className="mt-1" shape="circle">
                    <Button className={styles.button} as={Link} href="/cart" isIconOnly size="lg" startContent={<CartIcon />}></Button>
                </Badge>
                </NavbarItem>
                <Dropdown className={styles.dropdown}>
                                <DropdownTrigger>
                                    <Button className={styles.button} isIconOnly size="lg"> <SessionIcon height={"5rem"} width={"5rem"} fill="#8cc63e"/> </Button>
                                </DropdownTrigger>
                                <DropdownMenu classNames={{
                                    base: `${styles.menuBase}`,
                                    list: `${styles.menuList}`
                                }} aria-label="Acciones de Sesión">
                                    <DropdownItem as={Link} href="/login" key="login" className={styles.menuLink}>Iniciar Sesión</DropdownItem>
                                    <DropdownItem as={Link} href="/register" key="register" className={styles.menuLink}>Registrarse</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={"foreground"}
                            className={`${styles.menuLink} w-full`}
                            href={`${item}`}
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}