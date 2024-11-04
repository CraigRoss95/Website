let postsPerPage = 3;
var htmlContentTemplate = ""
var htmlContentTemplateAlt = ""
class SpecialContent extends HTMLElement {

    connectedCallback() { 
        setupTemplates();
        loadContentTo(fileName);
        fadeInDoc();
    }   
}
var sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

async function scrollToTop() {
    while(window.scrollY > 0){
        window.scrollTo({top: window.scrollY - 40, behavior: "auto"})
        console.log("scrolling")
        await sleep(1);
    }
    await sleep(100);
        
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
        async: false,
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
        async: false,
        success : function (jsonData)
        {
            for(i = 0; i < jsonData.content.length; i++)
            {   
                var templateHTML = getHtmlTemplate(i);
                var contentRow = new DOMParser().parseFromString(templateHTML, "text/html");
                contentRow.getElementById("no-id-content-row").id = "content-row-" + i;
                contentRow.getElementById("title").innerHTML = jsonData.content[i].title;
                contentRow.getElementById("image").src = jsonData.content[i].image;
                contentRow.getElementById("post-text").innerHTML = getHtmlInner(jsonData.content[i].text);
                html = html + contentRow.body.innerHTML;
            }
            document.getElementById('special-content').innerHTML= html;
        }
    })
}

//for switching contents of page
async function loadContentTo(link
) { 
    
    
    fileName = link;
    updateNavBar(link);
    fudgeUrl(link);
    loadHeader();
    await scrollToTop();
    $.when(linkSwitchStatment(link))
    .then(applyClickScriptToAllImages())
    
    
    
}

function linkSwitchStatment(link)
{
    switch(link)
    {
        case "./other.html":
        case "./other":
            $.when(populateRowsViaJson("htmlContent/otherContent.json"))
            .then(setupEasterEgg());
            break;
        case "./portfolio.html":
        case "./portfolio":
            $.when(populateRowsViaHtml("htmlContent/portfolioContent.html"))
            .then(createPortfolioApp());
            break;
        case "./blog.html":
        case "./blog":
            generateBlog();
            break;
        default:
            populateRowsViaJson("htmlContent/indexContent.json");
            break;
    }
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
        document.getElementById("special-header").style.display = "none";
        document.getElementById("special-content").style.opacity = "100%";
        document.getElementById("special-header").style.opacity = "100%";
        $("#special-content").fadeIn(fadeInTime);
        $("#special-header").fadeIn(fadeInTime);
    }, fadeInTime)

}

function createEmptyContentBoxes() {
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
    applyClickScriptToAllImages();

}

customElements.define('special-content', SpecialContent);

