// STORE

import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { openModal } from "./modal";

// FUNCION QUE TRAE LOS ELEMENTOS Y LLAMA AL RENDER

export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
};

// FUNCION QUE FILTRA Y RENDERIZA  LA SECCION CON SUS ELEMENTOS

export const handleRenderList = (productosIn) => {
    // FILTRADO DE ARRAYS POR CATEGORIA
    const burgers = productosIn.filter((el) => el.categories == "Hamburguesas");
    const papas = productosIn.filter((el) => el.categories == "Papas");
    const gaseosas = productosIn.filter((el) => el.categories == "Gaseosas");

    //FUNCION QUE RENDERIZA LOS ELEMENTOS DE LA SECCION

    const renderProductGroup = (productos, title) => {
        if (productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `
                <div class="containerTargetItem" id="product-${producto.categories}-${index}">
                    <div>
                        <img src="${producto.imagen}"/>
                        <div>
                            <h2>${producto.nombre}</h2>
                        </div>
                        <div class="targetProps">
                            <p><b>Precio: </b> $ ${producto.precio}</p>
                    <!--    <p><b>Categoría: </b> ${producto.categories}</p> -->
                        </div>
                    </div>
                </div>
                `;
            });

            // RETORNA LA SECCION CON TODOS LOS ELEMENTOS DENTRO

            return `
            <section class="sectionStore">
                <div class="containerTitleSection">
                    <h3>${title}</h3>
                </div>
                <div class="containerProductStore">
                    ${productosHTML.join("")}
                </div>
            </section>
            `
        } else {
            return ""
        }
    };

    // RENDERIZAR CADA UNO DE LOS PRODUCTOS DENTRO DE SU CATEGORIA

    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
    ${renderProductGroup(burgers,"Hamburguesas")}
    ${renderProductGroup(papas,"Papas")}
    ${renderProductGroup(gaseosas,"Gaseosas")}
    `;

    // SE AÑADEN LOS EVENTOS DE MANERA DINAMICA
    
    const addEvents = (productsIn) => {
        if (productsIn) {
            productsIn.forEach((element, index) => {
                const productContainer = document.getElementById(`product-${element.categories}-${index}`);
                productContainer.addEventListener("click", () => {
                   setProductoActivo(element);
                   openModal();
                });
            });
        }
    };
    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);
};