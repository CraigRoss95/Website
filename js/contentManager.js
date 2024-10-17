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
function loadContentTo(link
) { 
    var delayTime = 200;
    if (document.documentElement.scrollTop < 10){
        delayTime = 10
    }
    fileName = link;
    updateNavBar(link);
    fudgeUrl(link);
    scrollToTop();
    loadHeader();
    setTimeout(() => { 
        $.when(linkSwitchStatment(link))
        .then(applyClickScriptToAllImages())
    }, delayTime);
    
    
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

function applyClickScriptToAllImages()
{
    var imageElements = getFilteredImages()
    for(var i = 0; i < imageElements.length; i++) {
        if (imageElements[i].classList.contains("clickable-image") == false) {
            imageElements[i].classList.add("clickable-image")
            //see changeBlogPage for how to do this propperly
            imageElements[i].onclick = (function(event) {zoomImage(event)})
        }
    }
}

function getFilteredImages(){
    var allElements = document.getElementsByTagName("img");
    var responseElements = [];
    let imageIdBlackList = ["photo-viewer-image"]
    let imageSrcList = "Dixie.png"
    for(var i = 0; i < allElements.length; i++){
        if(
            
            ((allElements[i].src == "") == false
            && allElements[i].src.includes("Dixie.png") == false)

            && ((allElements[i].id == "") == false
            ||imageIdBlackList.includes(allElements[i].id) == false)
        
            && isOnBlackListedClassList(allElements[i])== false) {
            responseElements.push(allElements[i])
        }
    }
    return responseElements
}

function isOnBlackListedClassList(element) {
    let imageClassBlackList = ["clickable-icon-image"]

    if (element.classList.length == 0) {
        return false
    }

    for (var i = 0; i < imageClassBlackList.length; i++){
        if(element.classList.contains(imageClassBlackList[i])) {
            return true
        }
       
    }
    return false
}

function zoomImage(imageElement) {
    document.getElementById("photo-viewer-image").src = imageElement.target.src;
    document.getElementById("photo-viewer-background").style.visibility = "visible";
}

function closeImage() {

    document.getElementById("photo-viewer-background").style.visibility = "hidden";
}
customElements.define('special-content', SpecialContent);

