document.addEventListener("DOMContentLoaded", function (event) {

    //-------------------fonction principale-------------------//
    //--------------------------------------------------------//
    async function main() {

        let url = new URL(window.location.href);
        let productId = url.searchParams.get("id");
        let product = await GetProduct(productId);

        DisplayProduct(product);
        BtnClick(product);

    };

    main();


    async function GetProduct(productId) {
        return fetch("http://localhost:3000/api/products/" + productId)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                };
            })
            .catch(function (error) {
                console.log(error);
            });

    };


    async function DisplayProduct(product) {

        // Récupération des parents.
        const title = document.getElementsByTagName("title")[0];
        const parentImg = document.getElementsByClassName("item__img");
        const parentName = document.getElementById("title");
        const parentPrice = document.getElementById("price");
        const parentDescription = document.getElementById("description");
        const parentQuantity = document.getElementById("quantity");

        // Création de notre balise image avec les attributs.
        const productImg = document.createElement("img");
        productImg.setAttribute("src", product.imageUrl);
        productImg.setAttribute("alt", product.altTxt);
        // Push après notre balise à la fin de la liste.
        parentImg[0].appendChild(productImg);

        // On change les différentes valeurs à la volée.
        title.innerHTML = product.name;
        parentName.innerText = product.name;
        parentPrice.innerText = product.price;
        parentDescription.innerText = product.description;
        parentQuantity.setAttribute("min", 0);

        //* Création des choix couleur-------------------------------------------------
        let SelecteurCouleur = document.getElementById("colors")
        let options = product.colors
        options.forEach(function (element) {
            SelecteurCouleur.appendChild(new Option(element, element));
        });



    };

    //-------------------Initialisation Class Produit-------------------//
    //---------------------------------------------------------------------//

    class ProductClass {
        constructor(id, color, qty) {
            this.id = id;
            this.color = color;
            this.qty = qty;
        };
    };

    async function BtnClick(product) {

        let colorchoosen = "";
        let qtychoosen = "";
        let qty = "";
        let btncart = document.getElementById("addToCart");

        let colorselection = document.getElementById("colors");
        colorselection.addEventListener("change", function (event) {
            colorchoosen = event.target.value;
        });

        let qtyselection = document.getElementById("quantity");
        qtyselection.addEventListener("change", function (event) {
            qty = event.target.value;
        });

        btncart.addEventListener("click", function () {

            let ProductLocalStorage = [];
            let oldQty = 0;

            for (let i = 0; i < localStorage.length; i++) {
                ProductLocalStorage[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));

                if (product._id === ProductLocalStorage[i].id && ProductLocalStorage[i].color === colorchoosen) {
                    oldQty = ProductLocalStorage[i].qty;
                };
            };

            qtychoosen = parseInt(oldQty) + parseInt(qty);

            let productChoosen = new ProductClass(
                product._id,
                colorchoosen,
                qtychoosen
            );

            if (colorchoosen != "" && qtychoosen >= 1 && qtychoosen <= 100) {

                localStorage.setItem(
                    product.name + " " + colorchoosen,
                    JSON.stringify(productChoosen)
                );
            } else {
                alert("Les champs à remplir ne sont pas correct.");
            };
        });
    };
});