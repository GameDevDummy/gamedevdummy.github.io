let burgAmount = 30;
let fieldSize = 1000;
let maxBurgenSize = 50;
let minBurgenDist = 80;
let minRoadDist = 200;

let burgen = [];

for(let i = 0; i < burgAmount; i++){
    GenBurg(0);
}

var roadsPath = ""

DrawRoads();

document.getElementById("roads").setAttribute("d",roadsPath)

function GenBurg(i){
    if(i >= 100) return;
    var posX = Math.random() * (fieldSize - maxBurgenSize);
    var posY = Math.random() * (fieldSize - maxBurgenSize);

    var tooClose;

    burgen.forEach(burg => {
        if(Math.abs(burg["posX"] - posX) < minBurgenDist &&
        Math.abs(burg["posY"] - posY) < minBurgenDist)
        {
            tooClose = true;
        }
    });

    if(tooClose){
        i++;
        GenBurg(i);
        return;
    }

    var obj = GenBurgObj(posX,posY);

    burgen.push({
        "posX":posX,
        "posY":posY,
        "obj":obj,
    });
}

function GenBurgObj(x,y){
    var burg = document.createElement("div");
    burg.className = "burg";
    burg.style.top = y;
    burg.style.left = x;

    var sprite = document.createElement("img");
    sprite.className = "burg-sprite"
    sprite.src = "sprites/castle.png";
    
    return document.getElementById("game").appendChild(burg).appendChild(sprite);
}


function DrawRoads(){
    burgen.forEach(burgOne => {
        burgen.forEach(burgTwo => {
            if(burgOne == burgTwo) return;
            if(Math.abs(burgOne["posX"] - burgTwo["posX"]) < minRoadDist &&
            Math.abs(burgOne["posY"] - burgTwo["posY"]) < minRoadDist)
            {
                DrawRoad(burgOne,burgTwo);
            }
        });
    });
}

function DrawRoad(burgOne,burgTwo){
    var endX = burgOne["posX"] + (burgTwo["posX"] + 25 / 2 - burgOne["posX"] + 25 / 2) * 0.5;
    var endY = burgOne["posY"] + (burgTwo["posY"] + 25 / 2 - burgOne["posY"] + 25 / 2) * 0.5;

    roadsPath += "M" + (burgOne["posX"] + 25 / 2) + " " + (burgOne["posY"] + 25 / 2);
    roadsPath += "L" + (endX) + " " + (endY);
}

