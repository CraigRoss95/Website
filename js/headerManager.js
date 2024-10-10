
var fileName;
class SpecialHeader extends HTMLElement {
    //for loading page first time or via link
    connectedCallback() { 
        var data;
        
        $.ajax({
            url: "/htmlTemplates/header.html",
            data: data,
            success: function (data) {

                document.getElementById('special-header').innerHTML= data;
                switch(fileName)
                {

                    case "./portfolio":
                        updateNavBar("./portfolio");
                        break;
                    case "./other":
                        updateNavBar("./other");  
                        break; 
                    default:
                        updateNavBar("./")
                        break;
                }
            },
            dataType: "text"
        });
    }
}
function updateNavBar (link){
    var test = document.getElementById("nav-bar");
    if(test != null) {
        switch(link){
            case "./other.html":
            case "./other":
                document.getElementById("nav-bar-other").classList.add("nav-bar-selected");
                document.getElementById("nav-bar-portfolio").classList.remove("nav-bar-selected");
                document.getElementById("nav-bar-about-me").classList.remove("nav-bar-selected");
                break;
            case "./portfolio.html":
            case "./portfolio":
                document.getElementById("nav-bar-portfolio").classList.add("nav-bar-selected");
                document.getElementById("nav-bar-other").classList.remove("nav-bar-selected");
                document.getElementById("nav-bar-about-me").classList.remove("nav-bar-selected");
                break;
            default:
                document.getElementById("nav-bar-about-me").classList.add("nav-bar-selected");
                document.getElementById("nav-bar-portfolio").classList.remove("nav-bar-selected");
                document.getElementById("nav-bar-other").classList.remove("nav-bar-selected");
                break;
        }
    }
}

function underConstructionAlert() {
    alert("Feature comming soon");
}
customElements.define('special-header', SpecialHeader);