"use client"

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import style from "./page.module.css"

export default function App() {

  return (
    <div className="p-10 container">
      <h1 className={`${style.title} ml-3 mb-4`}>Infinito Nails</h1>

      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Medición de las Uñas"
          className={`${style.text} bg-gray-100 rounded-lg shadow-md pl-4 `}
        >
          <div className="mb-8 my-4 mr-4">

            <p className={`${style.text} mb-2`}>
              Puedes medir tus uñas de una de las siguientes maneras:
            </p>
            <ol className="list-decimal ml-6">
              <li className={`${style.text} mb-2`}>Opción 1: Con una cinta métrica, sostén sobre la uña en la parte más ancha y permite que se doble con la uña natural para obtener la medida real, en milímetros.</li>
              <li className={`${style.text} mb-2`}>Opción 2: Utilizando una regla plana no plegable, toma un trozo de celofán, colócalo sobre la uña en la parte más ancha y haz una marca donde este cada lado de la uña. Luego, mide con la curva natural de su uña.</li>
            </ol>
            <p className={`${style.text} mb-2`}>
              Apunta la medida de tus uñas en milímetros y escríbela en el apartado de comentarios del proceso de compra.
            </p>
            <Accordion>
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Video"
                className="bg-gray-300 rounded-lg shadow-md px-4 max-w-3xl"
              >
                <div className={`${style.videoContainer} p-4`}>
                  <iframe
                    className={style.video}
                    src="https://www.youtube.com/embed/mOqDGE8qUQQ?si=7b9P3E0c0fjBpWZ9"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Pedidos Personalizados"
          className={`${style.text} bg-gray-100 rounded-lg shadow-md pl-4 `}
        >
          <div className="mb-8">
            <p className={`${style.text} mb-2`}>
              En Infinito Nails hacemos realidad las uñas de tus sueños. Si no encuentras lo que te gusta en nuestro catálogo, ¡solo tienes que ponerte en contacto con nosotros y contarnos qué es lo que quieres!
            </p>
            <p className={`${style.text} mb-2`}>
              Si deseas realizar un pedido de un diseño personalizado, escríbenos a través de WhatsApp al 111111111 y nos pondremos en contacto contigo lo antes posible. Incluye en tu mensaje ideas de diseño con preferencia de forma y longitud. Si tienes fotos, envíanoslas también para que tengamos la mayor información posible sobre lo que deseas.
            </p>
            <p className={`${style.text} mb-2`}>
              Cuando tengamos toda la información, te enviaremos un presupuesto con el coste de tus uñas. Una vez aceptado el presupuesto, te enviaremos la factura y el enlace del pago. El pago debe hacerse dentro de las 24 horas siguientes.
            </p>
          </div>
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title="Aplicacion"
          className={`${style.text} bg-gray-100 rounded-lg shadow-md pl-4 `}
        >
          <div className="mb-8">
            <ol className="list-decimal ml-6">
              <li className={`${style.text} mb-2`}>Empuja hacia atrás tus cutículas con el palo de madera.</li>
              <li className={`${style.text} mb-2`}>Con el buffer, elimina el brillo de la uña asegurándote de que no quede ninguna parte sin realizar, esto permitirá que las press on se adhieran a tu uña mucho mejor.</li>
              <li className={`${style.text} mb-2`}>Deshidrata tus uñas con la toallita de alcohol. Esto eliminará la humedad y la grasa de tus uñas.</li>
              <ul className={`${style.text} mb-2`}>Uso a corto plazo: Adhiere cada uña usando las pestañas adhesivas para uñas. </ul>
              <ul className={`${style.text} mb-2`}>Uso a largo plazo: Aplica una capa delgada de pegamento para uñas a tu uña natural y en la uña press on. Sostén la uña press on firmemente en su lugar.</ul>
            </ol>
            <Accordion>
              <AccordionItem
                key="4"
                aria-label="Accordion 4"
                title="Video"
                className="bg-gray-300 rounded-lg shadow-md px-4 max-w-3xl"
              >
                <div className={`${style.videoContainer} p-4`}>
                  <iframe
                    className={style.video}
                    src="https://www.youtube.com/embed/Dp2p5mx4_1k?si=x-zBw0TsX_Txisjk"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </AccordionItem>

        <AccordionItem
          key="4"
          aria-label="Accordion 4"
          title="Retirada"
          className={`${style.text} bg-gray-100 rounded-lg shadow-md pl-4 `}
        >
          <div className="mb-8">
            <ol className="list-decimal ml-6">
              <li className={`${style.text} mb-2`}>Mete tus manos en agua caliente (lo más que aguantes sin quemarte) y jabón durante aproximadamente 15 minutos.</li>
              <li className={`${style.text} mb-2`}>Retira suavemente la uña con un palito de naranjo. No fuerces la extracción. Si es necesario, continúa remojando las uñas e intenta nuevamente.</li>
              <li className={`${style.text} mb-2`}>Para poder reutilizar tus uñas press on, pasa la lima con un tono eléctrico para limpiar suavemente cualquier pegamento acumulado en la parte posterior de las uñas.</li>
            </ol>
            <Accordion>
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Video"
                className="bg-gray-300 rounded-lg shadow-md px-4 max-w-3xl"
              >
                <div className={`${style.videoContainer} p-4`}>
                  <iframe
                    className={style.video}
                    src="https://www.youtube.com/embed/JD-6sX4ZhO8?si=HpkIu_Mwg1wwj2xn"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
