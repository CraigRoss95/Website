class SpecialSkeleton extends HTMLElement {

    connectedCallback() { 
        var data;
        
        $.ajax({
            url: "htmlTemplates/skeleton.html",
            data: data,
            success: function (data) {
                document.getElementById('special-skeleton').innerHTML= data;
                
            },
            dataType: "text"
        });

    }
}

customElements.define('special-skeleton', SpecialSkeleton);