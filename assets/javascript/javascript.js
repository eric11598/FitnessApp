

var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
        myIndex = 1
    }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 4000); // Change image every 2 seconds
}

var myInde = 0;
carouse();

function carouse() {
    var i;
    var x = document.getElementsByClassName("mySides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myInde++;
    if (myInde > x.length) {
        myInde = 1
    }
    x[myInde - 1].style.display = "block";
    setTimeout(carouse, 4000); // Change image every 2 seconds
}
