
class SpecialContent extends HTMLElement {

    connectedCallback() { 

        var test = fileName;
        loadContentTo(fileName);
        fadeInDoc();
    }   
}

function populateRowsViaHtml (fileName){
    contentFileDir = fileName;
    var data;
    $.ajax({
        url: contentFileDir,
        data: data,
        success: function (data) {
            document.getElementById('special-content').innerHTML= data; 
        },
        dataType: "text"
    });
}
function populateRowsViaJson(fileName) {
    var jsonData;
    var htmlData;
    html = "";
    $.ajax ({
        url: fileName,
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
}
//for switching contents of page
function loadContentTo(link
) { 
    switch(link)
    {
        case "./other.html":
        case "./other":
            $.when(populateRowsViaJson("htmlContent/otherContent.json"))
            .then(setupEasterEgg());
            break;
        
        case "./portfolio.html":
        case "./portfolio":
            populateRowsViaHtml("htmlContent/portfolioContent.html");
            break;
        default:
            populateRowsViaJson("htmlContent/indexContent.json");
            break;
    }
    fileName = link;
    updateNavBar(link);
    fudgeUrl(link);
}

function fudgeUrl(link){
    var title = getTitle();
    let stateObj = { id: "100" }; 
    window.history.replaceState(stateObj, title, link); 
    document.title = title;
}

function switchContentTo(link){
    if (link != fileName) {
        loadContentTo(link);
    }
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
    $("#special-skeleton").fadeIn(fadeInTime);
    setTimeout(() => {
        document.getElementById("special-content").style.display = "none";
        document.getElementById("special-content").style.opacity = "100%";
        $("#special-content").fadeIn(fadeInTime);
    }, fadeInTime)

}
customElements.define('special-content', SpecialContent);

