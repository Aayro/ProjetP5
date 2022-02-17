document.addEventListener("DOMContentLoaded", function (event) {

    async function main() {

        let ApiArray = [];

        // Stockage des informations de notre localstorage.
        let localStorageArray = getLocalStorageProduct();

        // Appel de nos fonctions.

        for (let i = 0; i < localStorageArray.length; i++) {
            ApiArray.push(await GetApi(localStorageArray[i]));
        }

        ConcatArray(localStorageArray, ApiArray);

    }
    main()


    function getLocalStorageProduct() {

        let getLocalStorage = [];
        for (let i = 0; i < localStorage.length; i++) {
            getLocalStorage[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));

        }
        return getLocalStorage;

    }

    function GetApi(localStorageArray) {

        return fetch("http://localhost:3000/api/products/" + localStorageArray.id)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    function ConcatArray(localStorageArray, ApiArray) {

        let AllProducts = [];

        for (let i = 0; i < localStorageArray.length; i++) {

            let ObjectProduct = {
                altTxt: ApiArray[i].altTxt,
                colors: localStorageArray[i].color,
                description: ApiArray[i].description,
                imageUrl: ApiArray[i].imageUrl,
                name: ApiArray[i].name,
                price: ApiArray[i].price,
                _id: localStorageArray[i].id,
                qty: localStorageArray[i].qty
            }

            displayproduct(ObjectProduct);

            AllProducts.push(ObjectProduct);
        }

        displayTotalPrice(AllProducts);

    }

    function displayproduct(ObjectProduct) {

        const DOMitems = document.getElementById("cart__items");

        DOMitems.insertAdjacentHTML(
            "beforeend",
            `<article class="cart__item" data-id="${ObjectProduct._id}">
                <div class="cart__item__img">
                    <img src="${ObjectProduct.imageUrl}" alt="${ObjectProduct.altTxt}">
                    </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__titlePrice">
                                <h2>${ObjectProduct.name} ${ObjectProduct.colors}</h2>
                                    <p>${ObjectProduct.price}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${ObjectProduct.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
        );
    };

    function displayTotalPrice(AllProducts) {


    };
});