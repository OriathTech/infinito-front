import styles from "./TextImg.module.css"

export default function TextImg() {
    return (
        <div className="w-full mx-auto">

            {/* Contenido 1 */}
            <div className={`text-center w-full`}>
                <h2 className={`${styles.title} text-lg font-semibold mb-8`}>Título Central 1</h2>
                <div className={`${styles.container1}`}>
                    <div className={`flex flex-col w-11/12 justify-end mx-auto md:mx-0 md:mt-0 md:w-1/2 md:justify-center md:items-center ${styles.containerText}`}>
                        <p className="text-sm m-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan,
                            metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum
                            justo nibh eu lectus.
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-5 py-2 px-4 rounded w-full md:w-1/2 mr-2">
                            Botón
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenido 2 */}
            <div className={`text-center w-full`}>
                <h2 className={`${styles.title} text-lg font-semibold my-8`}>Título Central 2</h2>
                <div className={`${styles.container2}`}>
                    <div className={`flex flex-col w-11/12 justify-end mx-auto md:mx-0 md:mt-0 md:w-1/2 md:justify-center md:items-center ${styles.containerText}`}>
                        <p className="text-sm m-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan,
                            metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum
                            justo nibh eu lectus.
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-5 py-2 px-4 rounded w-full md:w-1/2 mr-2">
                            Botón
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
}
