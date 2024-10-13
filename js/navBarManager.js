
var fileName;
class SpecialNavBar extends HTMLElement {
    //for loading page first time or via link
    connectedCallback() { 
        var data;
        
        $.ajax({
            url: "/htmlTemplates/navBar.html",
            data: data,
            success: function (data) {

                document.getElementById('special-nav-bar').innerHTML= data;
                switch(fileName)
                {

                    case "./blog":
                        updateNavBar("./blog");
                        break;
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
                document.getElementById("nav-bar-blog").classList.remove("nav-bar-selected");
                break;
            case "./portfolio.html":
            case "./portfolio":
                document.getElementById("nav-bar-portfolio").classList.add("nav-bar-selected");

                document.getElementById("nav-bar-other").classList.remove("nav-bar-selected");
                document.getElementById("nav-bar-about-me").classList.remove("nav-bar-selected");
                document.getElementById("nav-bar-blog").classList.remove("nav-bar-selected");
                break;
            case "./blog.html":
                case "./blog":
                    document.getElementById("nav-bar-blog").classList.add("nav-bar-selected");
    
                    document.getElementById("nav-bar-other").classList.remove("nav-bar-selected");
                    document.getElementById("nav-bar-about-me").classList.remove("nav-bar-selected");
                    document.getElementById("nav-bar-portfolio").classList.remove("nav-bar-selected");
                    break;
            default:
                document.getElementById("nav-bar-about-me").classList.add("nav-bar-selected");
                
                document.getElementById("nav-bar-portfolio").classList.remove("nav-bar-selected");
                document.getElementById("nav-bar-other").classList.remove("nav-bar-selected");
                document.getElementById("nav-bar-blog").classList.remove("nav-bar-selected");
                break;
        }
    }
}

function underConstructionAlert() {
    alert("Feature comming soon");
}
customElements.define('special-nav-bar', SpecialNavBar);