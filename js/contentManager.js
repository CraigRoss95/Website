let postsPerPage = 5;
var htmlContentTemplate = ""
var htmlContentTemplateAlt = ""
class SpecialContent extends HTMLElement {

    connectedCallback() { 
        setupTemplates();
        loadContentTo(fileName);
        fadeInDoc();
    }   
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function setupTemplates() {
    $.ajax({
        url: "htmlTemplates/contentRow.html",
        data: htmlContentTemplate,
        async: false,
        success: function (htmlData) {
            htmlContentTemplate = htmlData;
        },
        dataType: "text"
    });
    $.ajax({
        url: "htmlTemplates/contentRowAlt.html",
        data: htmlContentTemplateAlt,
        async: false,
        success: function (htmlData) {
            htmlContentTemplateAlt = htmlData
        },
        dataType: "text"
    });
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
    html = "";
    $.ajax ({
        url: fileName,
        data: jsonData,
        success : function (jsonData)
        {
            for(i = 0; i < jsonData.content.length; i++)
            {   
                var templateHTML = getHtmlTemplate(i);
                var contentRow = new DOMParser().parseFromString(templateHTML, "text/html");
                contentRow.getElementById("no-id-content-row").id = "content-row-" + i;
                contentRow.getElementById("title").innerHTML = jsonData.content[i].title;
                contentRow.getElementById("image").src = jsonData.content[i].image;
                contentRow.getElementById("text").innerHTML = getHtmlInner(jsonData.content[i].text);
                html = html + contentRow.body.innerHTML;
            }
            document.getElementById('special-content').innerHTML= html;
        }
    })
}

//for switching contents of page
function loadContentTo(link
) { 
    var delayTime = 200;
    if (document.documentElement.scrollTop < 10){
        delayTime = 0
    }
    fileName = link;
    updateNavBar(link);
    fudgeUrl(link);
    scrollToTop();
    setTimeout(() => { 
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
        case "./blog.html":
        case "./blog":
            generateBlog();
            break;
        default:
            populateRowsViaJson("htmlContent/indexContent.json");
            break;
    }
    }, delayTime);
    
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
    else{
        scrollToTop();
    }
}

function getHtmlTemplate(i) {
    if (i%2 == 0) {
        return htmlContentTemplate;
    }
    else {
        return htmlContentTemplateAlt;
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

function createEmptyContentBoxes(){
    var html = ""
    var currentTemplate = ""
    for(var i = 0; i<postsPerPage; i++){
        currentTemplate = getHtmlTemplate(i);
        var contentRow = new DOMParser().parseFromString(currentTemplate, "text/html");
        contentRow.getElementById("no-id-content-row").id = "content-row-" + i;
        var blogDiscriptionRow = contentRow.getElementById("blog-info")
        blogDiscriptionRow.style.visibility = "visible"
        html = html + contentRow.body.outerHTML
    }
    document.getElementById('special-content').innerHTML= html;
  }

function generateBlog() {
    createEmptyContentBoxes();
    loadBlog(0);

}
customElements.define('special-content', SpecialContent);

