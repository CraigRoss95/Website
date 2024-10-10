var intervalID;
var codeInjected = false;

function setupEasterEgg(){
    codeInjected = false;
    intervalID = window.setInterval(myCallback, 100);
    myCallback();
}
function myCallback() {
    if (codeInjected == false) {
        console.log("attepting injection")
        var imgs = document.getElementsByTagName("img");
        if (imgs.length > 0){
            
        var dixiePic = findImage(imgs);
        }
        if (dixiePic != null)
        {
        attemptInjection(dixiePic);
        }
    }
    else {
        window.clearInterval(intervalID);
    }
}
function findImage(imgs){
    for (var i = 0; i < imgs.length; i++) {
        if(imgs[i].src.includes("/Assets/Dixie.png"))
        {   
            window.clearInterval(intervalID);
            return imgs[i]
        }
    }
}
function attemptInjection(img) {
    
    img.style = "cursor:grab;width:100%;"
    img.onclick = function() { 
        codeInjected = true;
        const bark = new Audio("Assets/DixieBark.mp3");
        const clonableBark = bark.cloneNode();
        clonableBark.play();
    };
    console.log("injection sucessful to image: " + img.src)
}
