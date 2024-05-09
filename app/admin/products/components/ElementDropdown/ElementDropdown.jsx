"use client"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

export default function ElementDropdown({ items, addElement }) {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button color="primary" variant="solid">
                    Agregar
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                    <DropdownItem key={item._id} color={"default"} onPress={() => addElement(item)}>
                        {item.name}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}