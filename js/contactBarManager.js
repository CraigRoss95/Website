
class SpecialContactBar extends HTMLElement {

    connectedCallback() { 
        var data;
        
        $.ajax({
            url: "/htmlTemplates/contactBar.html",
            data: data,
            success: function (data) {
                document.getElementById('special-contact-bar').innerHTML= data;
                
            },
            dataType: "text"
        });

    }
}

customElements.define('special-contact-bar', SpecialContactBar);