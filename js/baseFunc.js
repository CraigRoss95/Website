var fadeInTime = 150;
var fileName = "./" + location.href.split("/").slice(-1)[0]; 


function getTitle() {
    title = ""
    switch (fileName) {
        case "./other":
            title = "Craigs Website: Other"
            break;
        case "./portfolio":
            title = "Craigs Website: Portfolio"
            break;
        case "./blog":
            title = "Craigs Website: Blog"
            break;

        default:
            title = "Craigs Website:"
            break;
    }
    return title;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }