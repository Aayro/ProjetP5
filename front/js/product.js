document.addEventListener("DOMContentLoaded", function(event) {

    //-------------------fonction principale-------------------//
    //--------------------------------------------------------//
    async function main(){

        const url = new URL(window.location.href);

        let productId = url.searchParams.get("id");

        let product = await GetProduct(productId);

        DisplayProduct(product);
        
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
        const title = document.getElementsByTagName("title")[0];
        const parentImg = document.getElementsByClassName("item__img");


        // Création de notre balise image avec les attributs.
        const productImg = document.createElement("img");
        productImg.setAttribute("src", product.imageUrl);
        productImg.setAttribute("alt", product.altTxt);
        // Push après notre balise à la fin de la liste.
        parentImg[0].appendChild(productImg);
    }
});