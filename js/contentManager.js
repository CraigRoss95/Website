
class SpecialContent extends HTMLElement {

    connectedCallback() { 
        
        var data;
        var fileName = location.href.split("/").slice(-1); 
        var contentFileDir;
        switch(fileName[0])
        {
            case "portfolio":
                contentFileDir = "htmlContent/portfolioContent.html";
                $.ajax({
                    url: contentFileDir,
                    data: data,
                    success: function (data) {
                        document.getElementById('special-content').innerHTML= data;
                        
                    },
                    
                    dataType: "text"
                });
                fadeInDoc();

                break;
            case "other":
                populateRowsViaJson("htmlContent/otherContent.json");
                break;
            default:
                populateRowsViaJson("htmlContent/indexContent.json");
                break;
        }
    }   
}

function populateRowsViaJson(filename) {
    var jsonData;
    var htmlData;
    html = "";
    $.ajax ({
        url: filename,
        data: jsonData,
        success : function (jsonData)
        {
            for(i = 0; i < jsonData.content.length; i++)
            {
                //Get template
                $.ajax({
                    url: getHtmlTemplate(i),
                    data: htmlData,
                    async: false,
                    success: function (htmlData) {
                        newData = new DOMParser().parseFromString(htmlData, "text/html");
                        newData.getElementById("title").innerHTML = jsonData.content[i].title;
                        newData.getElementById("image").src = jsonData.content[i].image;
                        newData.getElementById("text").innerHTML = getHtmlInner(jsonData.content[i].text);
                        html = html + newData.body.innerHTML;
                    },
                    dataType: "text"
                });
                document.getElementById('special-content').innerHTML= html;
            }
        }
    })
    fadeInDoc();
}

    function getHtmlTemplate(i) {
        if (i%2 == 0) {
            return "htmlTemplates/contentRow.html";
        }
        else {
            return "htmlTemplates/contentRowAlt.html"
        }

    }

    function getHtmlInner(htmlfileName)
    {
        var htmlData
        var data
        $.ajax({
            url: htmlfileName,
            data: data,
            async: false,
            success: function (data) {
                htmlData = data
            },
            dataType: "text"
        });
        return htmlData;
    }

    function fadeInDoc () {
        $("#special-skeleton").fadeIn(500);

    }
customElements.define('special-content', SpecialContent);

