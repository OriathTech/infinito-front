"use client"

import { Button } from '@nextui-org/button';
import { ProductContext } from '@/context/products/products';

import { useState, useContext } from 'react';
import { Toaster, toast } from 'sonner';

import { PickerOverlay } from 'filestack-react';

import styles from "./UploadImg.module.css"
import { link } from '@nextui-org/theme';

export default function UploadImg({item}) {
  const {updateThumbnail, deleteThumbnail} = useContext(ProductContext)

  const [showPicker, setShowPicker] = useState({state:false, position:"first"});

  const handleDeleteThumbnail = async (productId, position) => {
    try {
      const response = await deleteThumbnail(productId, position);
      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error en el servidor. Intente mas tarde")
    }
  }

  return (
    <div className={`container mx-auto my-4 p-4`}>
      <Toaster position="top-right" richColors />
      <h2 className={`mb-4 ${styles.text}`}>Imágenes</h2>
      <p className={`mb-4 ${styles.text}`}>La imagen número 1 es la que se mostrará en las tarjetas de productos.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <!-- Imagen 1 --> */}
        <div className="bg-gray-200 p-2 md:p-4 rounded-lg">
          <h3 className={`mb-2 ${styles.text}`}>Imagen 1</h3>
          <div className='grid place-content-center'>
            <img src={item.thumbnails?.first.url ? item.thumbnails.first.url : "/defaultProduct.png"} alt="Imagen 1" className="mb-2" />
          </div>
          <div className="flex justify-around">
            <Button className='px-4 py-2' color="warning" onClick={() => handleDeleteThumbnail(item._id, "first")}>
              Borrar
            </Button>

            {
              showPicker.state && (
                <PickerOverlay
                  apikey={process.env.NEXT_PUBLIC_FILESTACK_API_KEY}
                  pickerOptions={{
                    accept: ["image/*"],
                    maxFiles: 1,
                    imageDim:[1000, 1000],
                    viewType:"grid",
                    transformations: {
                      crop: {
                        aspectRatio: 1/1,
                        force: true
                      }
                    },

                  }}
                  onUploadDone={async (res) => {
                    console.log(res);
                    const url = JSON.stringify(res.filesUploaded[0].url)
                    const response = await updateThumbnail(item._id, showPicker.position ,{url:url});
                    if (response.status==="success"){
                      toast.success(response.message)
                      setShowPicker((prevPicker)=>({
                        ...prevPicker,
                        state:false
                      }))

                    }else{
                      toast.error(response.message)
                      setShowPicker(false)
                    }
                  }}
                />
              )
            }

            <Button className='px-4 py-2' color="primary" onClick={() => setShowPicker({state:true, position:"first"})}>
              Cargar
            </Button>

          </div>
        </div>

        {/* <!-- Imagen 2 --> */}
        <div className="bg-gray-200 p-2 md:p-4 rounded-lg">
          <h3 className={`mb-2 ${styles.text}`}>Imagen 2</h3>
          <div className='grid place-content-center'>
            <img src={item.thumbnails?.second.url ? item.thumbnails.second.url : "/defaultProduct.png"} alt="Imagen 2" className="mb-2" />
          </div>
          <div className="flex justify-around">
            <Button className='px-4 py-2' color="warning" onClick={() => handleDeleteThumbnail(item._id, "second")}>
              Borrar
            </Button>

            <Button className='px-4 py-2' color="primary" onClick={() => setShowPicker({state:true, position:"second"})}>
              Cargar
            </Button>
          </div>
        </div>

        {/* <!-- Imagen 3 --> */}
        <div className="bg-gray-200 p-2 md:p-4 rounded-lg">
          <h3 className={`mb-2 ${styles.text}`}>Imagen 3</h3>
          <div className='grid place-content-center'>
            <img src={item.thumbnails?.third.url ? item.thumbnails.third.url : "/defaultProduct.png"} alt="Imagen 3" className="mb-2" />
          </div>
          <div className="flex justify-around">
            <Button className='px-4 py-2' color="warning" onClick={() => handleDeleteThumbnail(item._id, "third")}>
              Borrar
            </Button>

            <Button className='px-4 py-2' color="primary" onClick={() => setShowPicker({state:true, position:"third"})}>
              Cargar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}