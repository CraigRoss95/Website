var fadeoutTime = 250;
var fadeInTime = 500;
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

        default:
            title = "Craigs Website:"
            break;
    }
    return title;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }