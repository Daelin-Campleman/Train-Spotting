
let twain
let entities 

setupEntities()

const highScoreDisplay = document.getElementById("highScore");
const userLives = document.getElementById("userLives");
const decreaseButton = document.getElementById("decreaseButton");

decreaseButton.addEventListener("click", decreaseScore);

let score = 0;

function increaseScore() {
    score++;
    highScoreDisplay.innerText = "Highscore: " + score;
}

function decreaseScore() {
    score--;
    highScoreDisplay.innerText = "Highscore: " + score;
}

function onTrainClicked() {
    increaseScore()
    twain.hide()
    twain.reset()
    twain.setY(getRandomValue(userLives.offsetTop, window.innerHeight))
    showNextEntity()
}

function onTrainExpired() {
    decreaseScore()
    twain.hide()
    twain.reset()
    twain.setY(getRandomValue(userLives.offsetTop, window.innerHeight))
    showNextEntity()
}

function onDecoyClicked(decoy) {
    decreaseScore()
    decoy.hide()
    decoy.reset()
    decoy.setY(getRandomValue(userLives.offsetTop, window.innerHeight))
    showNextEntity()
}

function onDecoyExpired(decoy) {
    increaseScore()
    decoy.hide()
    decoy.reset()
    decoy.setY(getRandomValue(userLives.offsetTop, window.innerHeight))
    showNextEntity()
}

function setupEntities() {
    twain = new Entity(document.getElementById('increaseButton'))
    twain.setOnClickListener(onTrainClicked);
    twain.setOnExpiredListener(onTrainExpired)
    entities = [
        twain,
        createDecoyEntity(),
        createDecoyEntity()
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
    const entity = new Entity(decoy)
    entity.setOnClickListener(() => {
        onDecoyClicked(entity)
    })
    entity.setOnExpiredListener(()=> {
        onDecoyExpired(entity)
    })
    return entity
}

function showNextEntity() {
    entities[Math.floor(getRandomValue(0, entities.length))].show()
}

function getRandomValue(min, max) {
    return (Math.random() * (max - min)) + min
}