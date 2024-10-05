
class SpecialHeader extends HTMLElement {

    connectedCallback() { 
        var data;
        
        $.ajax({
            url: "/htmlTemplates/header.html",
            data: data,
            success: function (data) {
                var fileName = location.href.split("/").slice(-1); 
                document.getElementById('special-header').innerHTML= data;
                switch(fileName[0])
                {

                    case "portfolio":
                        document.getElementById("nav-bar-portfolio").className += " nav-bar-selected";
                        break;
                    case "other":
                        document.getElementById("nav-bar-other").className += " nav-bar-selected";   
                        break; 
                    default:
                        document.getElementById("nav-bar-about-me").className += " nav-bar-selected";
                        break;
                }
            },
            dataType: "text"
        });

    }
}

customElements.define('special-header', SpecialHeader);