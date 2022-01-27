document.addEventListener("DOMContentLoaded", function(event) {

    //-------------------fonction principale-------------------//
    //--------------------------------------------------------//
    async function main(){

        let products = await GetProducts();
        
        for(let article of products){
            displayproduct(article);
        }

    };

    main();


    //-------------------Fonction d'intérrogation de notre api avec product-------------------//
    //-----------------------------------------------------------------------------------------//

    async function GetProducts(){

        return fetch("http://localhost:3000/api/products")
        .then(function (response) {
            if (response.ok){
                return response.json();
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    //-------------------Fonction d'affichage du produit-------------------//
    //---------------------------------------------------------------------//
    function displayproduct(article){

        const DOMitems = document.getElementById("items");

        DOMitems.insertAdjacentHTML(
        "beforeend",
        `<a href="./product.html?id=${article._id}">
            <article>
                <img src="${article.imageUrl}" alt="${article.altTxt}">
                <h3 class="productName">${article.name}</h3>
                <p class="productDescription">${article.description}</p>
                </article>
        </a>`
        );

    }

});