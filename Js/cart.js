var cart = {
    // (A) PROPERTIES
    hPdt: null, // HTML products list
    hItems: null, // HTML current cart
    items: {}, // Current items in cart
    iURL: "/Script-Imgs/", // Product image URL folder

    // (B) LOCALSTORAGE CART
    // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
    save: function () {
        localStorage.setItem("cart", JSON.stringify(cart.items));
    },

    // (B2) LOAD CART FROM LOCALSTORAGE
    load: function () {
        cart.items = localStorage.getItem("cart");
        if (cart.items == null) { cart.items = {}; } else { cart.items = JSON.parse(cart.items); }
    },

    // (B3) EMPTY ENTIRE CART
    nuke: function () {
        document.getElementById("emptyDiv").style.display = "block";
        if (true) {
            cart.items = {};
            localStorage.removeItem("cart");
            cart.list();

            document.getElementById("emptyDiv").style.display = "none";
        }
    },


    // (C) INITIALIZE
    init: function () {
        // (C1) GET HTML ELEMENTS
        cart.hPdt = document.getElementById("cart-products");
        cart.hItems = document.getElementById("cart-items");

        // INFO CONTAINER
        const Portfolio = document.createElement("div");
        const close_btn = document.createElement("button");
        close_btn.innerText = "X";
        const photoContainer = document.createElement("div");
        const itemPhoto = document.createElement("img");
        const itemInfoContainer = document.createElement("div");
        const addToCartBtn = document.createElement("div");
        const addToCartBtn_Text = document.createElement("p");
        addToCartBtn_Text.innerText = "Add to the cart";
        const infoLine = document.createElement("OtherMats\panoramLine.svg");
        const infoHeading = document.createElement("h2");
        const infoTextContainer = document.createElement("div");
        const infoText = document.createElement("p");
        const infoPriceContainer = document.createElement("div");
        const infoPriceText = document.createElement("p");
        infoPriceText.innerText = "Price: 12,34";

        Portfolio.style.display = "none";
        close_btn.style.display = "none";
        photoContainer.style.display = "none";
        itemPhoto.style.display = "none";
        itemInfoContainer.style.display = "none";
        addToCartBtn.style.display = "none";
        addToCartBtn_Text.style.display = "none";
        infoLine.style.display = "none";
        infoHeading.style.display = "none";
        infoTextContainer.style.display = "none";
        infoText.style.display = "none";
        infoPriceContainer.style.display = "none";
        infoPriceText.style.display = "none";

        Portfolio.setAttribute("id", "Portfolio");
        close_btn.setAttribute("id", "close_btn");
        photoContainer.setAttribute("id", "photoContainer");
        itemPhoto.setAttribute("id", "itemPhoto");
        itemInfoContainer.setAttribute("id", "itemInfoContainer");
        addToCartBtn.setAttribute("id", "addToCart")
        addToCartBtn_Text.setAttribute("id", "addToCart_Text")
        infoLine.setAttribute("id", "infoLine")
        infoHeading.setAttribute("id", "infoHeading")
        infoTextContainer.setAttribute("id", "infoTextContainer")
        infoText.setAttribute("id", "infoText")
        infoPriceContainer.setAttribute("id", "infoPriceContainer")
        infoPriceText.setAttribute("id", "infoPriceText")

        document.body.appendChild(Portfolio);
        // document.body.appendChild(close_btn);
        Portfolio.appendChild(close_btn);
        Portfolio.appendChild(photoContainer);
        photoContainer.appendChild(itemPhoto);
        Portfolio.appendChild(itemInfoContainer);
        Portfolio.appendChild(addToCartBtn);
        addToCartBtn.appendChild(addToCartBtn_Text);
        itemInfoContainer.appendChild(infoLine);
        itemInfoContainer.appendChild(infoHeading);
        itemInfoContainer.appendChild(infoTextContainer);
        infoTextContainer.appendChild(infoText);
        itemInfoContainer.appendChild(infoPriceContainer);
        infoPriceContainer.appendChild(infoPriceText);


        // (C2) DRAW PRODUCTS LIST
        cart.hPdt.innerHTML = "";
        let p, item, part;
        for (let id in products) {

            // WRAPPER
            p = products[id];
            item = document.createElement("div");
            item.className = "p-item";
            cart.hPdt.appendChild(item);

            // PRODUCT IMAGE
            part = document.createElement("img");
            part.src = cart.iURL + p.img;

            part.className = "p-img";

            let myPhoto = cart.iURL + p.img;
            let heading = p.name;
            let productDescription = p.desc;
            let price = p.price;
        

            part.onclick = function () {
                Portfolio.style.display = "block"
                close_btn.style.display = "block"
                photoContainer.style.display = "block"
                itemPhoto.style.display = "block"
                itemInfoContainer.style.display = "block"
                addToCartBtn.style.display = "block";
                addToCartBtn_Text.style.display = "block";
                infoLine.style.display = "block";
                infoHeading.style.display = "block";
                infoTextContainer.style.display = "block";
                infoText.style.display = "block";
                itemInfoContainer.style.display = "block";
                infoPriceContainer.style.display = "block";
                infoPriceText.style.display = "block";

                itemPhoto.src = myPhoto;
                infoHeading.innerText = heading;
                infoText.innerText = productDescription;
                infoPriceText.innerText = "Pricr: " + price + " $";
            }
            item.appendChild(part);

            const BtnClose = document.querySelector("#close_btn");
            BtnClose.addEventListener("click", CloseBlock);

            function CloseBlock() {
                document.getElementById("Portfolio").style.display = "none";
                document.getElementById("close_btn").style.display = "none";
            }

            // PRODUCT NAME
            part = document.createElement("div");
            part.innerHTML = p.name;
            part.className = "p-name";
            item.appendChild(part);

            // PRODUCT DESCRIPTION
            // part = document.createElement("div");
            // part.innerHTML = p.desc;
            // part.className = "p-desc";
            // item.appendChild(part);

            // PRODUCT PRICE
            part = document.createElement("div");
            part.innerHTML = "$" + p.price;
            part.className = "p-price";
            item.appendChild(part);

            // ADD TO CART
            part = document.createElement("input");
            part.type = "button";
            part.value = "Add to Cart";
            part.className = "cart p-add";
            part.onclick = cart.add;
            part.dataset.id = id;
            item.appendChild(part);
        }

        // (C3) LOAD CART FROM PREVIOUS SESSION
        cart.load();

        // (C4) LIST CURRENT CART ITEMS
        cart.list();
    },


    // (D) LIST CURRENT CART ITEMS (IN HTML)
    list: function () {
        // (D1) RESET
        cart.hItems.innerHTML = "";
        let item, part, pdt;
        let empty = true;
        for (let key in cart.items) {
            if (cart.items.hasOwnProperty(key)) { empty = false; break; }
        }
        // (D2) CART IS EMPTY
        if (empty) {
            item = document.createElement("div");
            item.innerHTML = "Cart is empty";
            cart.hItems.appendChild(item);

            // The bill container(cart-item) when the cart is empty
            document.getElementById("cart-items").style.display = "none";
            document.getElementById("cart-wrap").style.width = '85%';
            document.getElementById("cart-wrap").style.right = '0%';
        }

        // (D3) CART IS NOT EMPTY - LIST ITEMS
        else {
            let p, total = 0,
                subtotal = 0;
            // The bill container(cart-item) when the cart is not empty
            document.getElementById("cart-items").style.display = "block";
            document.getElementById("cart-wrap").style.width = '70%';
            document.getElementById("cart-wrap").style.right = '14%';

            for (let id in cart.items) {

                // ITEM
                p = products[id];
                item = document.createElement("div");
                item.className = "c-item";
                cart.hItems.appendChild(item);

                // NAME
                part = document.createElement("div");
                part.innerHTML = p.name;
                part.className = "c-name";
                item.appendChild(part);

                // REMOVE
                part = document.createElement("input");
                part.type = "button";
                part.value = "X";
                part.dataset.id = id;
                part.className = "c-del cart";
                part.addEventListener("click", cart.remove);
                item.appendChild(part);

                // QUANTITY
                part = document.createElement("input");
                part.type = "number";
                part.min = 0;
                part.value = cart.items[id];
                part.dataset.id = id;
                part.className = "c-qty";
                part.addEventListener("change", cart.change);
                item.appendChild(part);

                // SUBTOTAL
                subtotal = cart.items[id] * p.price;
                total += subtotal;
            }

            // TOTAL AMOUNT
            item = document.createElement("div");
            item.className = "c-total";
            item.id = "c-total";
            item.innerHTML = "TOTAL: $" + total;
            cart.hItems.appendChild(item);

            // EMPTY BUTTONS
            item = document.createElement("input");
            item.type = "button";
            item.value = "Empty";
            item.addEventListener("click", function () {
                document.getElementById("emptyDiv").style.display = "block";


            });
            item.className = "c-empty cart";
            cart.hItems.appendChild(item);

            // CHECKOUT BUTTONS
            item = document.createElement("input");
            item.type = "button";
            item.value = "Checkout";
            item.addEventListener("click", cart.checkout);
            item.className = "c-checkout cart";
            cart.hItems.appendChild(item);
        }
    },

    // (E) ADD ITEM INTO CART
    add: function () {
        if (cart.items[this.dataset.id] == undefined) {
            cart.items[this.dataset.id] = 1;
        } else {
            cart.items[this.dataset.id]++;
        }
        cart.save();
        cart.list();
    },

    // (F) CHANGE QUANTITY
    change: function () {
        // (F1) REMOVE ITEM
        if (this.value <= 0) {
            delete cart.items[this.dataset.id];
            cart.save();
            cart.list();
        }

        // (F2) UPDATE TOTAL ONLY
        else {
            cart.items[this.dataset.id] = this.value;
            var total = 0;
            for (let id in cart.items) {
                total += cart.items[id] * products[id].price;
                document.getElementById("c-total").innerHTML = "TOTAL: $" + total;
            }
        }
    },

    // (G) REMOVE ITEM FROM CART
    remove: function () {
        delete cart.items[this.dataset.id];
        cart.save();
        cart.list();
    },

    // (H) CHECKOUT
    checkout: function () {
        // SEND DATA TO SERVER
        // CHECKS
        // SEND AN EMAIL
        // RECORD TO DATABASE
        // PAYMENT
        // WHATEVER IS REQUIRED
        window.open("CheckOut.html", "_self");
        // alert("TO DO");

        /*
        var data = new FormData();
        data.append('cart', JSON.stringify(cart.items));
        data.append('products', JSON.stringify(products));
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "SERVER-SCRIPT");
        xhr.onload = function(){ ... };
        xhr.send(data);
        */
    }
};
window.addEventListener("DOMContentLoaded", cart.init);