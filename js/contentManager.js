
class SpecialContent extends HTMLElement {

    connectedCallback() { 
        var data;
        var fileName = location.href.split("/").slice(-1); 
        var contentFileDir;
        switch(fileName[0])
        {
            case "portfolio":
                contentFileDir = "htmlContent/portfolioContent.html";
                break;
            case "other":
                contentFileDir = "htmlContent/otherContent.html";
                break;
            default:
                contentFileDir = "htmlContent/indexContent.html";
                break;
        }
        
        $.ajax({
            url: contentFileDir,
            data: data,
            success: function (data) {
                document.getElementById('special-content').innerHTML= data;
            },
            dataType: "text"
        });

    }
}

customElements.define('special-content', SpecialContent);