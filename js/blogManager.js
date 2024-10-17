let metaDataUrl = "https://1qbqdowij1.execute-api.us-east-2.amazonaws.com/ids"
let postUrl = "https://1qbqdowij1.execute-api.us-east-2.amazonaws.com/post?id="

var currentPageindex;
var blogIds = []


let daysOfTheWeek = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

//only get ids from this query
  function getPostIds() {
    if (blogIds[0] != null)
      {
        return;
      }
      
      url = metaDataUrl
      blogIds = [];
      $.ajax({
        type: "GET",
        async: false,
        url: url,
        success: function(response) {
          var parsedJson = JSON.parse(response);

          for (var i = 0; i < parsedJson.items.length; i++){
            blogIds.push(parsedJson.items[i].id)
            } 
            
          }
        })
      }

function setPostViaId(index,id) {
  $.ajax({
    type: "GET",
    url: postUrl + id,
    success: function(response) {
      var parsedJson = JSON.parse(response);
      loadPostAtIndex(index,parsedJson)
    }
    });
}

function loadPostAtIndex(index,post)
{
  
  if (blogIds[index] != null)
    {
      var rowDom = new DOMParser().parseFromString(document.getElementById("content-row-" + index).innerHTML, "text/html")
      var xmlContentDom = new DOMParser().parseFromString(post.content, "text/html")

      var imgSrc
      if (xmlContentDom.images[0] != null)
      {
        imgSrc = xmlContentDom.images[0].src;
        while (xmlContentDom.images.length > 0)
        {
          xmlContentDom.images[0].parentElement.remove()
        }
      }
      else {
        imgSrc = "./Assets/Feed-icon.svg.png"
      }
      var blogText = xmlContentDom.body.innerHTML

      var date = new Date(post.published)
      var dateString = daysOfTheWeek[date.getDay()]+ ": " + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

      rowDom.getElementById("title").innerHTML = post.title;
      rowDom.getElementById("image").src = imgSrc;
      //remove innerHTML

      rowDom.getElementById("post-text").innerHTML = blogText;
      rowDom.getElementById("post-link").innerText = "View on Blogger";
      rowDom.getElementById("post-link").href = post.url;
      rowDom.getElementById("post-date").innerText = dateString;
      document.getElementById("content-row-" + index).innerHTML = rowDom.body.innerHTML;
    }
}

async function loadBlog(pageIndex) {
  getPostIds()
  currentPageindex = pageIndex;
  for (var i = 0; i < postsPerPage; i++){
    if(blogIds[(currentPageindex * postsPerPage)+ i]!=null){
        document.getElementById("content-row-" + i).style.display = "flex"
        setPostViaId(i,blogIds[(currentPageindex * postsPerPage)+i])
      }
      else {
        document.getElementById("content-row-" + i).style.display = "none"
      }
  }
  applyClickScriptToAllImages()

  if (document.getElementById("blog-nav-button-0") == null){
    createButtons()
  }
  applyBlogMenuCSS();
}

function createButtons(){
  
  var parent = document.getElementById("nav-bar-mid-section")

  for(var i = 0; i < blogIds.length/postsPerPage ; i++) {
    var buttonElement = document.createElement("button");
    buttonElement.classList.add("blog-nav-button");
    buttonElement.id = "blog-nav-button-" + i;
    buttonElement.textContent = i+1;
    buttonElement.onclick = (function (event) {
      var index = Number(event.currentTarget.textContent) -1
      changeBlogPage(index)
    })
    parent.appendChild(buttonElement)
  }
}

function pageForward(){
  if (getCanGoForwardPage())
    changeBlogPage(currentPageindex + 1)
}

function pageBackward(){
  if (getCanGoBackwardPage())
    changeBlogPage(currentPageindex - 1)
}

function applyBlogMenuCSS()
{
  if (getCanGoBackwardPage() == false &&
    document.getElementById("header-button-back").classList.contains("grey-out") == false) {
      document.getElementById("header-button-back").classList.add("grey-out")
  }

  if (getCanGoBackwardPage() == true &&
  document.getElementById("header-button-back").classList.contains("grey-out") == true) {
    document.getElementById("header-button-back").classList.remove("grey-out")
  }

  if (getCanGoForwardPage() == false &&
  document.getElementById("header-button-forward").classList.contains("grey-out") == false) {
    document.getElementById("header-button-forward").classList.add("grey-out")
  }

  if (getCanGoForwardPage() == true &&
  document.getElementById("header-button-forward").classList.contains("grey-out") == true) {
    document.getElementById("header-button-forward").classList.remove("grey-out")
  }
  if (document.getElementsByClassName("blog-nav-selected")[0] != null) {
    document.getElementsByClassName("blog-nav-selected")[0].classList.remove("blog-nav-selected")
  }
  
  document.getElementById("blog-nav-button-" + currentPageindex).classList.add("blog-nav-selected")
}


function getCanGoForwardPage() {
  return (currentPageindex < (blogIds.length/postsPerPage) - 1)
}
function getCanGoBackwardPage() {
  return (currentPageindex > 0)
}

function changeBlogPage (index) {
  if (currentPageindex == index)
    {
      return
    }
    loadBlog(index)
}


