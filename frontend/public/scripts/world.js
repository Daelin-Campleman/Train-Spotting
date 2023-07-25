let twain
let entities 

const highScoreDisplay = document.getElementById("highScore");
const userLivesDisplay = document.getElementById("userLives");
const scoreBox = document.getElementById("scoreBox");

setupEntities()

let score = 0;
let lives = 5;
let gameLevel = 0

const trainPoints = 1
const decoyPoints = -1
const powerupTrainPoints = 2
const powerupDecoyPoints = 2

let powerUp1 = false

function increaseScore() {
    // if (powerUp1 = true) {
    //     score =+ powerupTrainPoints
    // } else {
    //     score =+ trainPoints
    // }
    score++
    highScoreDisplay.innerText = "Highscore: " + score;
}

function decreaseScore() {
    score--;
    highScoreDisplay.innerText = "Highscore: " + score;
}

function increaseLives() {
    lives++;
    userLivesDisplay.innerText = "Lives: " + lives;
}

function decreaseLives() {
    lives = lives - 1
    userLivesDisplay.innerText = "Lives: " + lives;
}

function increaseGameLEvel() {
    if(score >= 10 ) {
        gameLevel++
    }
}

function onEntityClicked(entity){
    if(entity.type === 'train'){
        increaseScore()
    } else {
        decreaseLives()
    }
    resetEntity(entity)
}

function resetEntity(entity) {
    entity.hide()
    entity.reset()
    entity.setY(setLaneY())
    powerUpEnabled(entity)
    showNextEntity(entity)
}

function setupEntities() {
    twain = new Entity(document.getElementById('increaseButton'), 'train')
    twain.setY(setLaneY())
    twain.setOnClickListener(onEntityClicked);
    twain.setOnExpiredListener(resetEntity)
    entities = [
        twain,
        createTrainEntity(),
        createTrainEntity()
    ]
}

function createDecoyElement() {
    const newButton = document.createElement('button')
    newButton.setAttribute('class', 'decoy')
    newButton.style.position = 'absolute'
    const img = document.createElement('img')
    img.setAttribute('src', '/static/images/level1Truck1.png')
    newButton.appendChild(img)
    return newButton
}

function createDecoyEntity() {
    const decoy = createDecoyElement()
    document.body.appendChild(decoy)
    decoy.style.display = 'none'
    const entity = new Entity(decoy, 'decoy')
    entity.setY(setLaneY())
    entity.setOnClickListener(onEntityClicked)
    entity.setOnExpiredListener(resetEntity)
    return entity
}

function createTrainElement() {
    const newButton = document.createElement('button')
    newButton.setAttribute('class', 'train')
    newButton.style.position = 'absolute'
    const img = document.createElement('img')
    img.setAttribute('src', '/static/images/level2Train.png')
    newButton.appendChild(img)
    return newButton
}

function createTrainEntity() {
    const train = createTrainElement()
    document.body.appendChild(train)
    train.style.display = 'none'
    const entity = new Entity(train, 'train')
    entity.setY(setLaneY())
    entity.setOnClickListener(onEntityClicked)
    entity.setOnExpiredListener(resetEntity)
    return entity
}

const showNextEntity = async () => {
    entities[Math.floor(getRandomValue(0, entities.length))].show()
    await setTimeout('', 2000)
    entities[Math.floor(getRandomValue(0, entities.length))].show()
}

function getRandomValue(min, max) {
    return (Math.random() * (max - min)) + min
}

// not currently used
function setRandomY(){
    const scoreBoxValue = (scoreBox.offsetTop + scoreBox.clientHeight)
    return (getRandomValue(scoreBoxValue, window.innerHeight))
}

function setLaneY(){
    const scoreBoxValue = (scoreBox.offsetTop + scoreBox.clientHeight)
    x =  (window.innerHeight - scoreBoxValue - 60)
    numberOfLanes = Math.floor(x/100)
    randomLane = Math.floor(Math.random() * numberOfLanes)
    result = (randomLane / numberOfLanes * x) + (scoreBoxValue)
    return result
}

function updateHearts() {
    for (let i = 1; i <= lives; i++) {
      const heart = document.getElementById(`heart${i}`);
      if (i <= lives) {
        heart.style.visibility = 'visible';
      } else {
        heart.style.visibility = 'hidden';
      }
    }
}

function powerUpEnabled(entity) {
    const trainElement = document.getElementById('trainToAnimate');
    entity.levelUpTrain(trainElement)
}

function disablePowerUp() {
    // replace with old images
}