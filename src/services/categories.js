// CATEGORIA

import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";

const handleFilterProductsByCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage();
    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products);
            break;
        case "Todo":
            handleRenderList(products);
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el) => el.categories == categoryIn);
            handleRenderList(result);
        default:
            break;
        case "mayorPrecio":
            const resultPreciMayor = products.sort((a,b) => b.precio - a.precio);
            handleRenderList(resultPreciMayor);
            break;
        case "menorPrecio":
            const resultPreciMenor = products.sort((a,b) => a.precio - b.precio);
            handleRenderList(resultPreciMenor);
            break;
    };
};

// RENDER DE LA VISTA CATEGORIAS

export const renderCategories = () => {

    //TOMAMOS ELEMENTOS DE LA LISTA

    const ulList = document.getElementById("listFilter");

    //CREAMOS ESOS ELEMENTOS DENTRO DE LA LISTA

    ulList.innerHTML = `
        <li id="Todo">Todos los productos</li>
        <li id="Hamburguesas">Hamburguesas</li>
        <li id="Papas">Papas</li>
        <li id="Gaseosas">Gaseosas</li>
        <li id="mayorPrecio">Mayor Precio</li>
        <li id="menorPrecio">Menor Precio</li>
    `;

    //AÑADIMOS DINAMICAMENTE EL EVENTO CLICK

    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement) => {
        liElement.addEventListener("click", () => {
            handleClick(liElement);
        });
    });
    
    //VERIFICAMOS Y MANEJAMOS EL ESTILO DEL ELEMENTO ACTIVO
    
    const handleClick = (elemento) => {
        handleFilterProductsByCategory(elemento.id);
        liElements.forEach((el) => {
            if (el.classList.contains("liActive")) {
                el.classList.remove("liActive");
            } else {
                if (elemento == el) {
                    el.classList.add("liActive");
                }
            }
        });
    };
};