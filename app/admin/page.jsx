import styles from "./page.module.css"
//Icons

import { MenuIcon } from "./components/icons/MenuIcon/MenuIcon";
import { CakeIcon } from "./components/icons/CakeIcon/CakeIcon";
import { StrawberryIcon } from "./components/icons/StrawberryIcon/StrawberryIcon";
import { BagIcon } from "./components/icons/BagIcon/BagIcon";
import { UserIcon } from "./components/icons/UserIcon/UserIcon";

export default function AdminPanel() {
    return (
        <>
            <h1 className={styles.title}>Bienvenido al panel de control de Catavia</h1>

            <div className={`${styles.textContainerIntro}`}>
                <span className={`flex items-center gap-4 mb-3 ${styles.subTitle}`}><MenuIcon className={styles.svg} />Introducción:</span>                
                <p className={styles.text}>
                Nuestra aplicación se organiza en cuatro secciones esenciales: 
                Productos, Ingredientes, Extras y Usuarios, ofreciéndote la 
                flexibilidad de adaptarlas según tus necesidades. En esta guía,
                explicaremos cada sección y sus funciones para optimizar el manejo 
                de tu plataforma.
                </p>
            </div>

            <div className={`${styles.textContainer} gap-8`}>

                <div>
                    <span className={`flex items-center gap-4 mb-3 ${styles.subTitle}`}>
                        <CakeIcon className={styles.svg} />Productos:
                    </span>  

                    <p className={styles.text}>
                    La sección de Productos te permite gestionar tu catálogo 
                    de manera integral. Aquí, puedes agregar, eliminar o 
                    modificar productos, ajustar su disponibilidad y destacarlos 
                    según tu estrategia comercial. Es esencial tener previamente 
                    cargados los Ingredientes y Extras para una creación eficiente,
                    y además, podrás calcular servicios como luz, gas y mano de 
                    obra basándote en unidades de Extras por minutos de uso.
                    </p>
                </div>
                <div>
                    <span className={`flex items-center gap-4 mb-3 ${styles.subTitle}`}>
                        <StrawberryIcon className={styles.svg} />Ingredientes:
                    </span>  

                    <p className={styles.text}>
                    Los Ingredientes constituyen las materias primas de tus productos.
                    Cualquier cambio de precio en esta sección afectará
                    automáticamente los costos de los productos relacionados. 
                    Antes de eliminar un ingrediente, es crucial verificar 
                    que no esté asociado a ningún producto, requiriendo ajustes 
                    previos en caso necesario. El precio de los ingredientes se 
                    establece en términos de precio por gramo, derivado de la división 
                    de los gramos totales y el precio de compra.
                    </p>
                </div>
                <div>
                    <span className={`flex items-center gap-4 mb-3 ${styles.subTitle}`}>
                        <BagIcon className={styles.svg} />Extras:
                    </span>  

                    <p className={styles.text}>
                    Esta sección incorpora valores adicionales a tus productos, 
                    como servicios (luz, gas, mano de obra) o elementos físicos 
                    (embalajes, tarjetas). Los precios se calculan por unidad: 
                    en el caso de extras físicos, (unidad comprada dividido por 
                    el precio de compra); para servicios, (precio dividido por los minutos). Puedes añadir, 
                    quitar o modificar extras según tus necesidades, provocando ajustes
                    automáticos en los precios de los productos.
                    </p>
                </div>
                <div>
                    <span className={`flex items-center gap-4 mb-3 ${styles.subTitle}`}>
                        <UserIcon className={styles.svg} />Usuarios:
                    </span>  

                    <p className={styles.text}>
                    En la sección de Usuarios, tendrás visibilidad completa sobre 
                    tus clientes registrados. Podrás ver detalles como nombre, edad,
                    fecha de cumpleaños, número de teléfono, correo electrónico y 
                    el historial de compras realizadas mientras estaban logeados
                    en tu página. La capacidad de eliminar usuarios te brinda control 
                    sobre la gestión de clientes en tu plataforma.
                    </p>
                </div>
            </div>
        </>
    )
}