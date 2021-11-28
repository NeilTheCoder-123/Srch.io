
obtech = "";
song = "";
img = "";
objects = [];
status1 = "";

function preload(){
    
}

function setup(){
    canvas = createCanvas(640, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 500);
    video.hide();
    
}

function start(){
    obtech = document.getElementById("name").value;
    Odetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded(){
    console.log("CocoSSD is on the service....");
    status1 = true;
    //Odetect.detect(video, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 640, 500);
    if (status1 != ""){
        var r = random(255);
        var g = random(255);
        var b = random(255);
        //Odetect.detect(video, )
        Odetect.detect(video, gotResult);
        for (index = 0; index < objects.length; index++) {
            if (objects[index].label == obtech){
                document.getElementById("output").innerHTML = obtech+" Detected";
                var synth = window.speechSynthesis;
                speak_data = obtech+" Detected";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            } else if (objects.length < 0) {
                document.getElementById("output").innerHTML = obtech+" Not Detected";
                
            } else {
                document.getElementById("output").innerHTML = obtech+" Not Detected";
                
            }    
            document.getElementById("status").innerHTML = "Status - Detected Objects";
            fill(r,g,b);
            percent = floor(objects[index].confidence*100);
            text(objects[index].label+" "+percent+"%", objects[index].x+15, objects[index].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
        }
    }

    //fill("rgb(255, 0, 0)");
    /*text("Dog", 45, 75);
    noFill();
    stroke("rgb(255, 0, 0)");
    rect(30, 60, 450, 350);*/

    //fill("rgb(255, 0, 0)");
    /*text("Cat", 320, 55);
    noFill();
    stroke("rgb(255, 0, 0)");
    rect(300, 40, 280, 350);*/
}

