document.addEventListener("DOMContentLoaded", function(event) {

    //-------------------fonction principale-------------------//
    //--------------------------------------------------------//
    async function main(){

        const url = new URL(window.location.href);

        let productId = url.searchParams.get("id");

        let product = await GetProduct(productId);

        DisplayProduct(product);
        BtnClick(product);
    };

    main();


    async function GetProduct(productId){
        return fetch("http://localhost:3000/api/products/"+productId)
                .then(function (response) {
                    if (response.ok){
                        return response.json();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })

    }


    async function DisplayProduct(product){
        
        // Récupération des parents.
        const parentImg = document.getElementsByClassName("item__img");
        const titlebase = document.getElementsByTagName("title")[0];
        const title = document.getElementsByClassName("name")[0];
        const price = document.getElementById("price");
        const description = document.getElementById("description");
        const SelecteurColors = document.getElementById("colors");

        // Création de notre balise image avec les attributs.
        const productImg = document.createElement("img");
        productImg.setAttribute("src", product.imageUrl);
        productImg.setAttribute("alt", product.altTxt);
        // Push après notre balise à la fin de la liste.
        parentImg[0].appendChild(productImg);

        titlebase.insertAdjacentHTML("beforeend",`${product.name}`)

        title.insertAdjacentHTML("beforeend",`${product.name}`);

        price.insertAdjacentHTML("beforeend",`${product.price}`);
    
        description.insertAdjacentHTML("beforeend",`${product.description}`);
    
        
        //* Création des choix couleur-------------------------------------------------

        let itemscolors = product.colors;
        itemscolors.forEach(function (element) {
            SelecteurColors.appendChild(new Option(element, element));
        });
    };

    async function BtnClick (product){
        let colorchoosen = "";
        let qtychoosen = "";
        let btncart = document.getElementById("addToCart");

        let colorselection = document.getElementById("colors");
        colorselection.addEventListener("change", function(event) {
            colorchoosen = event.target.value;
            console.log(colorchoosen)
        });

        let qtyselection = document.getElementById("quantity");
        qtyselection.addEventListener("change", function(event) {
            qtychoosen = event.target.value;
            console.log(qtychoosen)
        });

        btncart.addEventListener("click", function (){
            // Les infos sont envoyées dans le local storage
            localStorage.setItem("Colors", colorchoosen);
            localStorage.setItem("Quantity", qtychoosen);
        })
    }
});