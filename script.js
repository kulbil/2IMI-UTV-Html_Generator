$("#menu").toggle();
$('#menuBtn').click(function() {
    $("#menu").toggle();
});

//Funksjon som runner når man forandrer på hvilket element man skal lage
$('#elementSelect').change(function() {
    console.log($("#elementSelect").prop('selectedIndex'));
    $("#customize").empty();
    switch ($("#elementSelect").prop('selectedIndex')) {
        case 1:
            hCreate();
            break;
        case 2:
            pCreate();
            break;
        case 3:
            imgCreate();
            break;
    }
    var PositionBtn = $("<button></button>");
    PositionBtn.attr("id", "PositionBtn");
});

//funksjon til å lage h element menyen
function hCreate() {
    var hSelectSizeNumber = $("<p></p>");
    hSelectSizeNumber.attr("id", "hSelectSizeNumber");

    var hSelectSizeSlider = $("<input></input>");
    hSelectSizeSlider.attr("type", "range");
    hSelectSizeSlider.attr("min", "1");
    hSelectSizeSlider.attr("max", "3");
    hSelectSizeSlider.attr("id", "hSelectSizeSlider");
    hSelectSizeSlider.attr("onchange", "changeSelectSize()");

    var hSelectSizeContainer = $("<div></div>");
    hSelectSizeContainer.attr("id", "hSelectSizeContainer");
    hSelectSizeContainer.append(hSelectSizeSlider, hSelectSizeNumber);

    var hContent = $("<input></input>");
    hContent.attr("placeholder", "Header Content");
    hContent.attr("id", "hContent");

    $('#customize').append(hSelectSizeContainer, hContent);

    document.getElementById("hSelectSizeNumber").innerHTML = document.getElementById('hSelectSizeSlider').value;
}

//funksjon til å lage p element menyen
function pCreate() {
    var pContent = $("<input></input>");
    pContent.attr("placeholder", "Paragraph Content");
    pContent.attr("id", "pContent");

    $('#customize').append(pContent);
}

//funksjon til å lage image element menyen
function imgCreate() {
    var imgPlaceholder = $("<input></input>");
    imgPlaceholder.attr("placeholder", "Velg dyr (dog, cat, frog)");
    imgPlaceholder.attr("id", "imgSource")

    $('#customize').append(imgPlaceholder);
} 

//Funksjon til å forandre på hva slags type h tag man vil ha (h1, h2, h3)
function changeSelectSize() {
    document.getElementById("hSelectSizeNumber").innerHTML = document.getElementById("hSelectSizeSlider").value;
}

//Funksjon til å forandre på bakgrunnsfargen med input elementet
$("#backgroundColorPicker").change(function(){
    document.body.style.backgroundColor = document.getElementById("backgroundColorPicker").value;
});

//Logistikk til submitknappen som gjør at man må trykke 2 gangerfør elementet blir llaget
var submitState = 0;

//funksjon som runner når du har trukket på "submit"
$("#submit").click(function() {
    submitState = 1;
    $("#menu").toggle(); //Lukker menyen etter man har trykket submit
});

//funksjon som runner hver gang man trykker på skjermen
function moseClick(event) {
    //Tar inn kordinatene til musen
    let x = event.clientX;
    let y = event.clientY;

    if(submitState == 2) { //Mer til logostikken
        switch ($("#elementSelect").prop('selectedIndex')) {
            case 1: //lager et h element
                if (document.getElementById("hSelectSizeNumber").innerHTML == 1) {
                    var hMaking = $("<h1></h1>");
                } else if (document.getElementById("hSelectSizeNumber").innerHTML == 2) {
                    var hMaking = $("<h2></h2>");
                } else if (document.getElementById("hSelectSizeNumber").innerHTML == 3) {
                    var hMaking = $("<h3></h3>");
                }
                
                console.log(document.getElementById("hSelectSizeNumber").innerHTML)
                hMaking.css("position", "fixed");
                hMaking.css("top", y + "px");
                hMaking.css("left", x + "px");
                hMaking.text(document.getElementById('hContent').value);
                $("#container").append(hMaking);

                break;
            case 2: //lager et p element
                var pMaking = $("<p></p>");
                pMaking.css("position", "fixed");
                pMaking.css("top", y + "px");
                pMaking.css("left", x + "px");
                pMaking.text(document.getElementById('pContent').value);
                $("#container").append(pMaking);

                break;
            case 3: //Lager et image element
                var imgMaking = $("<img></img>");
                imgMaking.css("position", "fixed");
                imgMaking.css("top", y + "px");
                imgMaking.css("left", x + "px");
                imgMaking.css("height", "100px");
                imgMaking.css("width", "100px");

                //Skjekker hva slags dyr man har valgt
                if (document.getElementById("imgSource").value == "dog") {
                    imgMaking.attr("src", "images/dog.png");
                } else if (document.getElementById("imgSource").value == "cat") {
                    imgMaking.attr("src", "images/cat.webp");
                } else if (document.getElementById("imgSource").value == "frog") {
                    imgMaking.attr("src", "images/frog.png");
                } else {
                    alert("velg et riktig dyr!");
                    break;
                }
                $("#container").append(imgMaking);

                break;
        }
        submitState = 0; //logistikken
    } else if (submitState == 1) { //Logistikken
        submitState++
    }
}