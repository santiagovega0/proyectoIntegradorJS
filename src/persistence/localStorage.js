// LOCAL STORAGE

// TRAER PRODUCTOS LOCALSTORAGE

export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products) {
        return products;
    } else {
        return [];
    }
};

// GUARDAR EN LOCALSTORAGE

// RECIBIR UN PRODUCTO

export const setInLocalStorage = (productIn) => {
    if (productIn) {

        // TRAER LOS ELEMENTOS

        let productsInLocal = handleGetProductLocalStorage();
        console.log(productIn);
        const existingIndex = productsInLocal.findIndex((productsLocal) => productsLocal.id == productIn.id);
        
        // VERIFICAR SI EL ELEMENTO EXISTE

        if (existingIndex !== -1) {

            // SI EXISTE DEBE REEMPLAZARSE

            productsInLocal[existingIndex] = productIn;
        } else {

            // SI NO AGREGARSE

            productsInLocal.push(productIn);
        }

        // SETEAR EL NUEVO ARRAY

        localStorage.setItem("products", JSON.stringify(productsInLocal));
    }
};