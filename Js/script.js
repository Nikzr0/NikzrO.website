var x = 0;

function OpenCloseBill(){
    x++;
    if (x % 2 != 0) {
        document.getElementById("cart-items").style.display = "block";
        document.getElementById("cart-wrap").style.width = '70%';
        document.getElementById("cart-wrap").style.right = '14%';

    } else {
        document.getElementById("cart-items").style.display = "none";
        
        document.getElementById("cart-wrap").style.width = '85%';
        document.getElementById("cart-wrap").style.right = '0%';
    }
}

function CloseIt() {
    document.getElementById("emptyDiv").style.display ="none";
}

