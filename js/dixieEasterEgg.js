var intervalID;
var codeInjected = false;
var clickCount = 0;

function setupEasterEgg(){
    codeInjected = false;
    intervalID = window.setInterval(myCallback, 100);
    myCallback();
}
function myCallback() {
    if (codeInjected == false) {
        console.log("attepting injection")
        var imgs = document.getElementsByTagName("img");
        if (imgs.length > 0){
            
        var dixiePic = findImage(imgs);
        }
        if (dixiePic != null)
        {
        attemptInjection(dixiePic);
        }
    }
    else {
        window.clearInterval(intervalID);
    }
}
function findImage(imgs){
    for (var i = 0; i < imgs.length; i++) {
        if(imgs[i].src.includes("/Assets/Dixie.png"))
        {   
            window.clearInterval(intervalID);
            return imgs[i]
        }
    }
}
function attemptInjection(img) {
    
    img.style = "cursor:grab;width:100%;"
    img.onclick = function() { 
        clickCount = clickCount + 1;
        codeInjected = true;
        const bark = new Audio("Assets/DixieBark.mp3");
        const clonableBark = bark.cloneNode();
        clonableBark.play();
        checkAlerts()
    };
    console.log("injection sucessful to image: " + img.src)
}

function checkAlerts(){
    switch (clickCount){
        case 10:
            alert("Good doggie!")
            break;
        case 20:
            alert("Wow you must realy like dogs, huh?")
            break;
        case 30:
            alert("Do you just like the bark sound?")
            break;
        case 40:
            alert("Developer mode active in 10 more clicks")
            break;
        case 50:
            alert("Haha just kidding, no developer mode here")
            break;
        case 60:
            alert("No really I just wanted to add some funny alerts to this part")
            break;
        case 70:
            alert("You could probobly go out and pet a real dog in the time it is taking you to click and read all of these")
            break;
        case 80:
            alert("The dog (Canis familiaris or Canis lupus familiaris) is a domesticated descendant of the wolf. Also called the domestic dog, it was selectively bred from an extinct population of wolves during the Late Pleistocene by hunter-gatherers. The dog was the first species to be domesticated by humans, over 14,000 years ago and before the development of agriculture. Experts estimate that due to their long association with humans, dogs have gained the ability to thrive on a starch-rich diet that would be inadequate for other canids.\n\nDogs have been bred for desired behaviors, sensory capabilities, and physical attributes. Dog breeds vary widely in shape, size, and color. They have the same number of bones (with the exception of the tail), powerful jaws that house around 42 teeth, and well-developed senses of smell, hearing, and sight. Compared to humans, dogs have an inferior visual acuity, a superior sense of smell, and a relatively large olfactory cortex. They perform many roles for humans, such as hunting, herding, pulling loads, protection, companionship, therapy, aiding disabled people, and assisting police and the military.\n\nCommunication in dogs includes eye gaze, facial expression, vocalization, body posture (including movements of bodies and limbs), and gustatory communication (scents, pheromones, and taste). They mark their territories by urinating on them, which is more likely when entering a new environment. Over the millennia, dogs became uniquely adapted to human behavior; this adaptation includes being able to understand and communicate with humans. As such, the human-canine bond has been a topic of frequent study, and dogs' influence on human society has given them the sobriquet of \"man's best friend\".\n\nThe global dog population is estimated at 700 million to 1 billion, distributed around the world. The dog is the most popular pet in the United States, present in 34–40% of households. In developed countries, around 20% of dogs are kept as pets, while 75% of the population in developing countries largely consists of feral and community dogs.\n\nCredit: Wikipedia")
            break;
        case 90:
            alert("Okay last message, they repeat after this one")
            break;
        default:
            if (clickCount > 90 && clickCount % 10 == 0){
                alert("You have clicked Dixie " + clickCount + " times")
            }
            break;
        
    }
}
