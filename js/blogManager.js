let metaDataUrl = "https://www.googleapis.com/blogger/v3/blogs/6475475122099132579/posts?key=AIzaSyAdOAfHb0dd2yQfcwUzjANM8HRFwrKajvI"
var bloggerKeyString = "?key=AIzaSyAdOAfHb0dd2yQfcwUzjANM8HRFwrKajvI"
var bloggerPostsString = "https://www.googleapis.com/blogger/v3/blogs/6475475122099132579/posts/"
var currentPageindex = 0;
var blogIds = []

let daysOfTheWeek = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

//only get ids from this query
function getPostIds() {
  if (blogIds[0] != null)
    {
      return blogIds;
    }
    url = "https://www.googleapis.com/blogger/v3/blogs/6475475122099132579/posts/" + bloggerKeyString + "&requestBody=false"
    blogIds = [];
  $.ajax({
    type: "GET",
    async: false,
    url: url,
    success: function(xml) {
      for (var i = 0; i < xml.items.length; i++){
        blogIds.push(xml.items[i].id)
      } 
    }
  })
  return blogIds;
}

function setPostViaId(index,id) {
  $.ajax({
    type: "GET",
    async: true,
    url: bloggerPostsString + id + bloggerKeyString,
    success: function(postResponse) {
      loadPostAtIndex(index,postResponse)
    }
    });
}

async function loadPostAtIndex(index,post)
{
  if (getPostIds()[index] != null)
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

function destroyAllChildren(element)
{
  element.children = [];
}

function loadBlog() {
  var postIds = getPostIds()
  for (var i = 0; i < postsPerPage; i++){
    if(postIds[i]!=null){
        document.getElementById("content-row-" + i).style.visibility = "visible"
        setPostViaId(i,postIds[i])
      }
      else {
        document.getElementById("content-row-" + i).style.visibility  = "hidden"
      }
  }
}


