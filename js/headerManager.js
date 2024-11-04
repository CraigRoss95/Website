
class SpecialHeader extends HTMLElement {
}
var data
function loadHeader(){
    switch(fileName) {
        case "./blog":
            loadHeaderFromURL("./htmlTemplates/headers/blogNav.html")
            break;
        case "./":
            loadHeaderFromURL("./htmlTemplates/headers/aboutHeader.html")
            break;
        default:
            removeHeader();
            break;
    }
}
function loadHeaderFromURL(url,callback)
{
    var data;
        
        $.ajax({
            url: url,
            data: data,
            async: false,
            success: function (data) {
                document.getElementById('special-header').innerHTML = data;
            },
            dataType: "text"
        });
}

function removeHeader() {
    document.getElementById('special-header').innerHTML = ""
}
customElements.define('special-header', SpecialHeader);