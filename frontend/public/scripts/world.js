const vehicleArray = []
const landmarkArray = []

const highScoreDisplay = document.getElementById("highScore");
const userLivesDisplay = document.getElementById("userLives");
const scoreBox = document.getElementById("scoreBox");

const trainFactory = new TrainFactory()
const truckFactory = new TruckFactory()
const landmarkFactory = new LandmarkFactory()

setupEntities(trainFactory, 5)
setupEntities(truckFactory, 5)
setupLandmarks(landmarkFactory, 11)

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
    updateHearts()
}

function onEntityClicked(entity){

    if(score >= 3) {
        score = entity.modifyLevelUpScoreOnClick(score)
        lives = entity.modifyLivesOnClick(lives)
    } else {
    score = entity.modifyScoreOnClick(score)
    lives = entity.modifyLivesOnClick(lives)
    }
    if(score >= 7) {
        levelDownGameLogic()
        score = entity.modifyScoreOnClick(score)
        lives = entity.modifyLivesOnClick(lives)
    }

    if(lives <= 0) {
        userDied()
    }
    updateScore()
    updateLives()
    resetEntity(entity)
}

function resetEntity(entity) {
    entity.hide()
    entity.setY(setLaneY())
    entity.reset()
}

function resetLandmark(entity) {
    entity.hide()
    entity.setY(setLaneForDestinations())
    entity.reset()
}

function setupEntities(factory, numVehicles) {
    for (let i = 0; i < numVehicles; i++){
        vehicleArray.push(factory.createVehicle(onEntityClicked, resetLandmark, setLaneY()))
    }
}

function setupLandmarks(factory, numLandmarks) {
    for (let i = 0; i < numLandmarks; i++){
        landmarkArray.push(factory.createVehicle(onEntityClicked, resetEntity, setLaneForDestinations()))
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

const showNextVehicle = () => {
    vehicleArray[Math.floor(getRandomValue(0, vehicleArray.length))].show()
}

const showNextLandmark = () => {
    landmarkArray[Math.floor(getRandomValue(0, landmarkArray.length))].show()
}

function getRandomValue(min, max) {
    return (Math.random() * (max - min)) + min
}

function setLaneY() {
    const scoreBoxValue = (scoreBox.offsetTop + scoreBox.clientHeight)
    const x =  (window.innerHeight - scoreBoxValue - 60)
    const numberOfLanes = Math.floor(x/100)
    const randomLane = Math.floor(Math.random() * numberOfLanes)
    return (randomLane / numberOfLanes * x) + (scoreBoxValue)
}

function setLaneForDestinations() {
    const usedLane = setLaneY()
    return (usedLane + 60)
}

function updateHearts() {
    if(lives >= 0 && lives <= 5) {
        const heart = document.getElementById(`heart${lives+1}`);
        heart.style.visibility = 'hidden';
    }
}

function userDied() {
    const thing = document.getElementById('gameEndPopup').showModal()
    // double checky this 
    fetch(`/saveScore?score=${score}`)
}
