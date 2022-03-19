// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function Project(title, imageURL, description) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
}

var entryArr = [];

//make these the same size
var fis = new Image();
fis.src = "Assets/portfolio-pictures/FIS.jpg";

var dv = new Image();
dv.src = "Assets/portfolio-pictures/dv.jpg";

var yodaImage = new Image();
yodaImage.src = "Assets/portfolio-pictures/yoda.png";

var aImage = new Image();
aImage.src = "Assets/portfolio-pictures/A.jpg";

var baImage = new Image();
baImage.src = "Assets/portfolio-pictures/BA.png";

var websiteImage = new Image();
websiteImage.src = "Assets/portfolio-pictures/website.png";

var unityImage = new Image();
unityImage.src = "Assets/portfolio-pictures/Unity3dDemo.png";

var JohnathanImage = new Image();
JohnathanImage.src = "Assets/portfolio-pictures/Jonathan.png";

entryArr.push({
    title: "FIS",
    imageURL: fis.src,
    description: "I currently work at FIS (Fidelity National Information Services), on the Tokens Team. At FIS we use a microservice architecture, we are all cogs in a much larger machine, our cog is the Tokens Service. This is where I learned a tech stack that was almost entirely new to me including Java, Spring, and Docker. I started this job in the summer of 2021, and have been working from my home office ever since. "
});

entryArr.push({
    title: "DonorView",
    imageURL: dv.src,
    description: "My recent position at DonorView responsibilities insured my skills in web development and database skills were maximised. I used my ASP.NET, HTML, CSS, JavaScript, and SQL skills to create and maintain features. The largest feature that I worked on during my time at DonorView was the Automatic Email Scheduler, a scheduler that queries constituent tables for constituents in need of an email. This position was a great opportunity for me to learn how to write industry quality code and use industry quality tools. As of April 2020 our teams started working from home and having our Agile meetings on Zoom. Unfortunately, my position was eliminated due to circumstances related to the pandemic."
});

entryArr.push({
    title: "Yoda",
    imageURL: yodaImage.src,
    description: "Yoda was the final project for my Computer Science capstone course: Senior Design & Development.The task given to us was to take an existing GitHub project and apply changes to fix existing issues, while also adding content as tasked by the Github issue tracker.We chose Yoda, “a wise and powerful virtual assistant”.My requested changes included the addition of a cooking module.In addition, I also had to fix an existing issues with the diary module where the user couldn't save entries to the json. We also had to write tests for our own functions as well as tests for existing functions lacking them. Together with my partners, we answered ten different requests before the end of the project."
});

entryArr.push({
    title: "Apocablocalypse",
    imageURL: aImage.src,
    description: "This was a game I worked on with some friends at Bridgewater State University. Apocablocalypse was my first time working on a project concurrently with other teammates using source control. The tools we used then are the same tools that I would use on later projects. These tools include: Git, Unity, and Trello. This was the first time in my career as a programmer that I really felt like I was collaborated with me peers. As a perk of being roommates with my team members I could give and receive feedback from across the room. This project was a very important turning point in my career; up until this point I had worked alone on all of my projects. When I worked in a group we were always pair programming. I was afraid that software engineering was going to be a very solitary job. What this project taught me is, that with proper source control, working together on software can greatly improve the quality of not only the code, but the experience of crafting software as a whole. "
});

entryArr.push({
    title: "Bridgewater Adventure",
    imageURL: baImage.src,
    description: "Bridgewater Adventure is a text-based adventure game made for my Data Structure & Algorithms class. This course was an early to mid level course in my college's Computer Science curriculum. The game was originally going to be eight rooms long, however after development started, the project quickly grew to a nearly forty room long game. The requirements for this project were to make a text based adventure game that utilized Object Oriented Programing. This project showed me the importance of building a good foundation for your project. A good foundation allows for conventions like inheritance and new features down the road. In the Summer of 2019, I went back and ported the game from Linux to Windows so I could get it running on my desktop and add it to my GitHub. "
});

entryArr.push({
    title: "This Website",
    imageURL: websiteImage.src,
    description: "My school's curriculum did not require Computer Science majors to take a web development course. Starting in the Summer of 2019, I began to self teach myself HTML and CSS by watching a YouTube tutorial and reading StackOverflow. While applying for jobs online, I also noticed that some companies listed an optional request for a website link. Having nearly five years of programing under my belt from college I picked up the basics with ease. After a two week HTML and CSS YouTube series I decided to start researching domains and build my website. In the future, I intend to learn more JavaScript to further enhance this website. "
});

entryArr.push({
    title: "3rd Person Camera Demo",
    imageURL: unityImage.src,
    description: "The Third Person Camera Demo was started as the precursor to Jonathan(see below). My highschool friends wanted to make a game together, so I joined them as the team's only programmer. When half of the team dropped out, the original adventure puzzle game was dropped. As a result so was the games third person camera. The camera controller was heavily inspired by the cameras in “A Hat in Time” and “Super Mario 64”. "
});

entryArr.push({
    title: "Jonathan",
    imageURL: JohnathanImage.src,
    description: "Jonathan is a side scrolling shoot ‘em up game made with a friend during the summer of 2018. The game was inspired by the game “Sin and Punishment”. Jonathan sports a vaporwave aesthetic. I was the only programmer on this project. The only other team member that worked on Jonathan was the art person from the previous game. "
});

function clickIcon(id) {
    document.getElementById("portfolio-title").textContent = entryArr[id].title;
    document.getElementById("portfolio-image").src = entryArr[id].imageURL;
    document.getElementById("portfolio-desc").textContent = entryArr[id].description;
}