const vehicleArray = []

const highScoreDisplay = document.getElementById("highScore");
const userLivesDisplay = document.getElementById("userLives");
const scoreBox = document.getElementById("scoreBox");

const trainFactory = new TrainFactory()
const truckFactory = new TruckFactory()

setupEntities(trainFactory, 5)
setupEntities(truckFactory, 5)

let score = 0;
let lives = 5;
let gameLevel = 0

function updateScore() {
    highScoreDisplay.innerText = "Highscore: " + score;

    if(score >= 3) {
        levelUpGameLogic()
    }
    if(score >= 7) {
        levelDownGameLogic()
    }
}

function updateLives() {
    userLivesDisplay.innerText = "Lives: " + lives;
    updateHearts()

}

function onEntityClicked(entity){
    score = entity.modifyScoreOnClick(score)
    lives = entity.modifyLivesOnClick(lives)
    if(lives <= 0) {
        userDied()
    }
    updateScore()
    updateLives()
    resetEntity(entity)
}

function resetEntity(entity) {
    entity.hide()
    entity.reset()
    entity.setY(setLaneY())
}

function setupEntities(factory, numVehicles) {
    for (let i = 0; i < numVehicles; i++){
        vehicleArray.push(factory.createVehicle(onEntityClicked, resetEntity))
    }
}

// TODO: Replace with Broadcaster pattern
function levelUpGameLogic() {
    for (let i = 0; i < vehicleArray.length; i++){
        vehicleArray[i].levelUp()
    }
}

function levelDownGameLogic() {
    for (let i = 0; i < vehicleArray.length; i++){
        vehicleArray[i].levelDown()
    }
}

const showNextEntity = async () => {
    vehicleArray[Math.floor(getRandomValue(0, vehicleArray.length))].show()
}

function getRandomValue(min, max) {
    return (Math.random() * (max - min)) + min
}

function setLaneY(){
    const scoreBoxValue = (scoreBox.offsetTop + scoreBox.clientHeight)
    const x =  (window.innerHeight - scoreBoxValue - 60)
    const numberOfLanes = Math.floor(x/100)
    console.log(numberOfLanes)
    const randomLane = Math.floor(Math.random() * numberOfLanes)
    return (randomLane / numberOfLanes * x) + (scoreBoxValue)
}

function updateHearts() {
    if(lives >= 0 && lives <= 5) {
        const heart = document.getElementById(`heart${lives+1}`);
        heart.style.visibility = 'hidden';
    }
}

function userDied() {
    const thing = document.getElementById('gameEndPopup').showModal()

}
