let feed = "https://www.googleapis.com/blogger/v3/blogs/6475475122099132579/posts?key=AIzaSyAdOAfHb0dd2yQfcwUzjANM8HRFwrKajvI "
var currentPageindex = 0;

function getContentViaXml() {
  var jsonBlog;
  $.ajax({
    type: "GET",
    async: false,
    url: feed,

    success: function(xml) {
      jsonBlog = xml.items
    }
    });
    return jsonBlog;
}

function getFirstTag(text, startTag, endTag) {
  indexStart = text.indexOf(startTag)
  indexEnd= text.indexOf(endTag)+ endTag.length;
  return text.substring(indexStart,indexEnd);
}

function containsTagSubstring(text, startTag ,endTag){
  if (text.includes(startTag) && text.includes(endTag))
    {
      indexStart = text.indexOf(startTag)
      indexEnd= text.indexOf(endTag)+ endTag.length
      if (indexEnd> indexStart)
      {
        return true
      }
    }
    return false
  }

function stripTag(text, startTag,endTag) {
  text = text.replace(startTag, "")
  text = text.replace(endTag, "")
  return text
}
function getBetweenPTags(text)
{
  var contentsArray = new Array
  var currentString = ""
  while(containsTagSubstring(text, "<p>", "</p>"))
  {
    currentString = getFirstTag(text, "<p>", "</p>")
    contentsArray.push(stripTag(currentString, "<p>", "</p>"))
    text = text.replace(currentString,"")
  }
  return contentsArray;
}

function loadBlog(page) {
  var jsonBlog;
  jsonBlog = getContentViaXml();
  for (var i = 0; i < postsPerPage; i++){
    if (jsonBlog[i] != null)
    {
      var rowDom = new DOMParser().parseFromString(document.getElementById("content-row-" + i).innerHTML, "text/html")
      var xmlContentDom = new DOMParser().parseFromString(jsonBlog[i].content, "text/html")

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

      rowDom.getElementById("title").innerHTML = jsonBlog[i].title;
      rowDom.getElementById("image").src = imgSrc;
      rowDom.getElementById("text").innerHTML = xmlContentDom.body.innerHTML;

      document.getElementById("content-row-" + i).innerHTML = rowDom.body.innerHTML
    }
  }
}


