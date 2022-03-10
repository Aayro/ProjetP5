document.addEventListener("DOMContentLoaded", function (event) {

    async function main() {

        let url = new URL(window.location.href);

        document.getElementById("orderId").innerText = url.searchParams.get("id");

        localStorage.clear();
    }
    main()

})