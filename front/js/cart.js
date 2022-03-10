document.addEventListener("DOMContentLoaded", function (event) {

    async function main() {

        let ApiArray = [];

        // Stockage des informations de notre localstorage.
        let localStorageArray = getLocalStorageProduct();

        // Appel de nos fonctions.

        for (let i = 0; i < localStorageArray.length; i++) {
            ApiArray.push(await GetApi(localStorageArray[i]));
        }

        let AllProducts = ConcatArray(localStorageArray, ApiArray);

        Displayproduct(AllProducts);

        DisplayTotalPrice(AllProducts);

        Listen(AllProducts);

        validation();
    }
    main()


    function getLocalStorageProduct() {

        let getLocalStorage = [];
        for (let i = 0; i < localStorage.length; i++) {
            getLocalStorage[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
        return getLocalStorage;
    }

    async function GetApi(localStorageArray) {

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
            };
            AllProducts.push(ObjectProduct);
        }
        return AllProducts;
    }

    function Displayproduct(AllProducts) {

        const DOMitems = document.getElementById("cart__items");

        for (product of AllProducts) {


            DOMitems.insertAdjacentHTML(
                "beforeend",
                `<article class="cart__item" data-id="${product._id}" data-color="${product.colors}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.colors}</p>
                    <p>${product.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}"">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
            );
        }
    }

    function DisplayTotalPrice(AllProducts) {

        let totalPrice = 0;
        let totalQty = 0;

        for (product of AllProducts) {
            totalPrice += parseInt(product.qty * product.price);
            totalQty += parseInt(product.qty);
        }

        const DtotalQty = document.getElementById("totalQuantity");
        const DtotalPrice = document.getElementById("totalPrice");

        DtotalQty.innerText = totalQty;
        DtotalPrice.innerText = totalPrice;
    }

    function Listen(AllProducts) {
        EcouteQuantity(AllProducts);
        EcouteDeleteProduct(AllProducts);
    }



    function EcouteQuantity(AllProducts) {

        let qtyinput = document.querySelectorAll(".itemQuantity");

        qtyinput.forEach(function (input) {
            input.addEventListener("change", function (inputEvent) {
                let inputQty = inputEvent.target.value;

                const productName = input
                    .closest("div.cart__item__content")
                    .querySelector("div.cart__item__content__description > h2").innerText;

                const productcouleur = input
                    .closest("div.cart__item__content")
                    .querySelector("div.cart__item__content__description > p").innerText;

                const productNameColor = productName + " " + productcouleur;

                let localstorageKey = JSON.parse(localStorage.getItem(productNameColor));

                localstorageKey.qty = inputQty;

                localStorage.setItem(productNameColor, JSON.stringify(localstorageKey));

                const result = AllProducts.find(AllProduct => AllProduct.name === localstorageKey.name && AllProduct.colors === localstorageKey.color)

                result.qty = inputQty;

                DisplayTotalPrice(AllProducts);
            });
        });
    }

    function EcouteDeleteProduct(AllProducts) {

        let deleteLink = document.querySelectorAll(".deleteItem");

        deleteLink.forEach(function (input) {
            input.addEventListener("click", function () {

                const productName = input
                    .closest("div.cart__item__content")
                    .querySelector("div.cart__item__content__description > h2").innerText;

                const productcouleur = input
                    .closest("div.cart__item__content")
                    .querySelector("div.cart__item__content__description > p").innerText;

                const productNameColor = productName + " " + productcouleur;

                let localstorageKey = JSON.parse(localStorage.getItem(productNameColor));

                localStorage.removeItem(productNameColor);

                input.closest("div.cart__item__content").parentNode.remove();

                const result = AllProducts.find(AllProduct => AllProduct.name === localstorageKey.name && AllProduct.colors === localstorageKey.color);

                AllProducts = AllProducts.filter(e => e !== result);

                EcouteQuantity(AllProducts);
                DisplayTotalPrice(AllProducts);
            });
        });
    }

    // conditions regex et verification
    function validationRegex(form) {

        // conditions regex string email et adresse
        const stringRegex = /^[a-zA-Z-]+$/;
        const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+).(.\w{2,3})+$/;
        const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

        let control = true;

        if (!form.firstName.value.match(stringRegex)) {
            document.getElementById("firstNameErrorMsg").innerText = "Le prénom donné ne semble pas correct !";
            control = false;
        } else {
            document.getElementById("firstNameErrorMsg").innerText = "";
        }


        if (!form.lastName.value.match(stringRegex)) {
            document.getElementById("lastNameErrorMsg").innerText = "Le nom donné ne semble pas correct !";
            control = false;
        } else {
            document.getElementById("lastNameErrorMsg").innerText = "";
        }

        if (!form.address.value.match(addressRegex)) {
            document.getElementById("addressErrorMsg").innerText = "L'adresse donnée ne semble pas correcte !";
            control = false;
        } else {
            document.getElementById("addressErrorMsg").innerText = "";
        }

        if (!form.city.value.match(stringRegex)) {
            document.getElementById("cityErrorMsg").innerText = "La ville donnée ne semble pas correcte !";
            control = false;
        } else {
            document.getElementById("cityErrorMsg").innerText = "";
        }

        if (!form.email.value.match(emailRegex)) {
            document.getElementById("emailErrorMsg").innerText = "L'email donné ne semble pas correct !";
            control = false;
        } else {
            document.getElementById("emailErrorMsg").innerText = "";
        }

        if (control) {
            return true;
        } else {
            return false;
        }


    }

    // fetch POST API si regex valide
    function validation() {

        let orderButton = document.getElementById("order");
        orderButton.addEventListener("click", function (event) {
            let form = document.querySelector(".cart__order__form");
            event.preventDefault();

            if (localStorage.length !== 0) {

                if (validationRegex(form)) {

                    let formInfo = {
                        firstName: form.firstName.value,
                        lastName: form.lastName.value,
                        address: form.address.value,
                        city: form.city.value,
                        email: form.email.value,
                    };

                    let products = [];

                    for (let i = 0; i < localStorage.length; i++) {
                        products[i] = JSON.parse(localStorage.getItem(localStorage.key(i))).id;
                    }

                    const order = {
                        contact: formInfo,
                        products: products,
                    };

                    // appel ajax à ton api en method POST sont body = json.stringify(order)

                    fetch("http://localhost:3000/api/products/order")
                        .then((res) => res.json())
                        .then(function (data) {
                        window.location.href = ""
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                } else {
                    event.preventDefault();
                    alert("le formulaire est mal remplis");
                }

            } else {
                event.preventDefault();
                alert("Le panier est vide.");
            }
        })

    }
});