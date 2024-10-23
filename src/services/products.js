// PRODUCT

import Swal from "sweetalert2";
import { productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage";
import { closeModal } from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";

// GUARDAR

const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener("click", () => {
    handleSaveOrModifyElements();
});

// FUNCION DE GUARDAR

const handleSaveOrModifyElements = () => {
    const nombre = document.getElementById("nombre").value;
    const imagen = document.getElementById("img").value;
    const precio = document.getElementById("precio").value;
    const categories = document.getElementById("categoria").value;
    let object = null;
    if (productoActivo) {
        object = {
            ...productoActivo,
            nombre,
            imagen,
            precio,
            categories,
        }
    } else {
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories,
        };
    }
    Swal.fire({
        title: "Finalizado!",
        text: "Producto guardado correctamente!",
        icon: "success"
    });
    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();
};

// ELIMINAR ELEMENTO

export const handleDeleteProduct = () => {

    Swal.fire({
        title: "¿Estás seguro que desea eliminar el elemento?",
        text: "Si lo eliminas será permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id);
            
            // SETEAR UN NUEVO ARRAY
        
            localStorage.setItem("products", JSON.stringify(result));
            const newProducts = handleGetProductLocalStorage();
            handleRenderList(newProducts);
            closeModal();

            Swal.fire({
                title: "Eliminado!",
                text: "El elemento ha sido eliminado!",
                icon: "success"
            });
        } else {
            closeModal();
        }
      });

    
};