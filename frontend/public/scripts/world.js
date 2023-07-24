
let twain
let entities 

setupEntities()

const highScoreDisplay = document.getElementById("highScore");
const userLivesDisplay = document.getElementById("userLives");
const userLives = document.getElementById("scoreBox");
const decreaseButton = document.getElementById("decreaseButton");

// decreaseButton.addEventListener("click", decreaseScore);

let score = 0;
let lives = 5;

function increaseScore() {
    score++;
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
    loseLife()
    userLivesDisplay.innerText = "Lives: " + lives;
}

function onTrainClicked() {
    increaseScore()
    twain.hide()
    twain.reset()
    twain.setY(getRandomValue(userLives.offsetTop, window.innerHeight))
    showNextEntity()
}

function onTrainExpired() {
    twain.hide()
    twain.reset()
    twain.setY(getRandomValue(userLives.offsetTop, window.innerHeight))
    showNextEntity()
}

function onDecoyClicked(decoy) {
    console.log("window.innerHeight"+window.innerHeight)
    decreaseLives()
    decoy.hide()
    decoy.reset()
    decoy.setY(getRandomValue(userLives.offsetTop, window.innerHeight))
    showNextEntity()
}

function onDecoyExpired(decoy) {
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
// needs to be done multiple times
function showNextEntity() {
    entities[Math.floor(getRandomValue(0, entities.length))].show()
}

function getRandomValue(min, max) {
    return (Math.random() * (max - min)) + min
}

let remainingLives = lives;

function updateHearts() {
    console.log("updating hearts")
    console.log("lives: " + lives)
    console.log("remainingLives: " + remainingLives)
    for (let i = 1; i <= lives; i++) {
      const heart = document.getElementById(`heart${i}`);
      if (i <= remainingLives) {
        heart.style.visibility = 'visible';
      } else {
        heart.style.visibility = 'hidden';
      }
    }
  }

  function loseLife() {
    remainingLives--;
    updateHearts();
  }