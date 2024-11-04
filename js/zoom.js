function applyClickScriptToAllImages()
{
    var imageElements = getFilteredImages()
    for(var i = 0; i < imageElements.length; i++) {
        if (imageElements[i].classList.contains("clickable-image") == false) {
            imageElements[i].classList.add("clickable-image")
            imageElements[i].onclick = (function(event) {zoomImage(event)})
        }
    }
}

function getFilteredImages(){
    var allElements = document.getElementsByTagName("img");
    var responseElements = [];
    let imageIdBlackList = ["photo-viewer-image"]
    for(var i = 0; i < allElements.length; i++){
        if(
            
            ((allElements[i].src == "") == false
            && allElements[i].src.includes("Dixie.png") == false)

            && ((allElements[i].id == "") == false
            ||imageIdBlackList.includes(allElements[i].id) == false)
        
            && isOnBlackListedClassList(allElements[i])== false) {
            responseElements.push(allElements[i])
        }
    }
    return responseElements
}

function isOnBlackListedClassList(element) {
    let imageClassBlackList = ["clickable-icon-image", "no-zoom"]

    if (element.classList.length == 0) {
        return false
    }

    for (var i = 0; i < imageClassBlackList.length; i++){
        if(element.classList.contains(imageClassBlackList[i])) {
            return true
        }
       
    }
    return false
}

function zoomImage(imageElement) {
    document.getElementById("photo-viewer-image").src = imageElement.target.src;
    document.getElementById("photo-viewer-background").style.visibility = "visible";
}

function closeImage() {

    document.getElementById("photo-viewer-background").style.visibility = "hidden";
}