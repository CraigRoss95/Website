
class SpecialHeader extends HTMLElement {
    connectedCallback() {
       loadHeader(); 
    }
}

function loadHeader(){
    switch(fileName) {
        case "./blog":
            loadHeaderFromURL("./htmlTemplates/headers/blogNav.html")
            break;
        default:
            removeHeader();
            break;
    }
}
function loadHeaderFromURL(url)
{
    var data;
        
        $.ajax({
            url: url,
            data: data,
            success: function (data) {
                document.getElementById('special-header').innerHTML= data;
                
            },
            dataType: "text"
        });
}

function removeHeader() {
    document.getElementById('special-header').innerHTML = ""
}
customElements.define('special-header', SpecialHeader);