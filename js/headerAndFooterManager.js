
class SpecialHeader extends HTMLElement {

    connectedCallback() { 
        var data;
        
        $.ajax({
            url: "header.html",
            data: data,
            async: false,
            success: function (data) {
                document.getElementById('special-header').innerHTML= data;
                },
            dataType: "text"
        });

    }
}

customElements.define('special-header', SpecialHeader);