var entryArr = [];
var portfolioJson;

function loadPortfolioContent() {
    $.ajax ({
        url: "htmlContent/portfolioContent.json",
        data: portfolioJson,
        async: false,
        success : function (data)
        {
            portfolioJson = data.content;
        }
    })
}

function createPortfolioButtons() {

    for(var i = 0; i < portfolioJson.length; i++){
        var newButton = document.createElement("button");
        //<button id="0" class="clickable-icon" onClick="clickIcon(this.id)"> <img src="Assets/icons/FIS-icon.jpg" class = "clickable-icon-image" /> </button>
        newButton.id = "portfolio-button-" + i;
        newButton.classList.add("clickable-icon");

        //TODO add onClick functonality
        newButton.onclick = (function (event) {
            var index = Number(event.currentTarget.id.replace("portfolio-button-",""))
            clickIcon(index)
          })

        var iconImage = document.createElement("img")
        iconImage.src = portfolioJson[i].iconImageSrc
        iconImage.classList.add("clickable-icon-image");

        newButton.appendChild(iconImage);
        document.getElementById("iconRow").appendChild(newButton);
    }
}

function createPortfolioApp() {
    loadPortfolioContent();
    createPortfolioButtons();
    clickIcon(0);
}

//keep this
function clickIcon(id) {
    document.getElementById("portfolio-title").textContent = portfolioJson[id].title;
    document.getElementById("portfolio-image").src = portfolioJson[id].imageSrc;
    document.getElementById("portfolio-desc").textContent = portfolioJson[id].text;
}