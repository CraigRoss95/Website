
class SpecialFooter extends HTMLElement {

    connectedCallback() { 
        var data;
        
        $.ajax({
            url: "footer.html",
            data: data,
            success: function (data) {
                document.getElementById('special-footer').innerHTML= data;
                
            },
            dataType: "text"
        });

    }
}

customElements.define('special-footer', SpecialFooter);